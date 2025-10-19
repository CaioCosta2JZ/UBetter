import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { db } from "../../config/firebase";
import { ref, onValue, set, serverTimestamp, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const WaterScreen = () => {
  const [metaAgua, setMetaAgua] = useState(0);
  const [contagemAgua, setContagemAgua] = useState(0);
  const [aguaSemanal, setAguaSemanal] = useState([]);
  const [aguaMensal, setAguaMensal] = useState(0);
  const [aguaTotal, setAguaTotal] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;

  // Função para obter a meta mais recente de água
  const getMostRecentMeta = async () => {
    if (!user) return;

    try {
      const metasRef = ref(db, `usuarios/${user.uid}/metas`);
      const snapshot = await get(metasRef);
      
      let metaMaisRecente = null;
      
      if (snapshot.exists()) {
        const metas = snapshot.val();
        Object.entries(metas).forEach(([key, meta]) => {
          if (meta.categoria === 'Água' && meta.ativo) {
            if (!metaMaisRecente || new Date(meta.dataCriacao) > new Date(metaMaisRecente.dataCriacao)) {
              metaMaisRecente = meta;
            }
          }
        });
      }
      
      if (metaMaisRecente) {
        setMetaAgua(metaMaisRecente.valor);
      }
    } catch (error) {
      console.error('Erro ao buscar meta:', error);
    }
  };

  // Função para carregar a quantidade de água do dia
  const carregarContagemAgua = async () => {
    if (!user) return;

    const dataAtual = new Date().toISOString().split('T')[0];
    const aguaRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}/agua`);
    
    onValue(aguaRef, (snapshot) => {
      if (snapshot.exists()) {
        setContagemAgua(snapshot.val());
      } else {
        setContagemAgua(0);
      }
    });
  };

  // Função para carregar dados da semana
  const carregarDadosSemana = async () => {
    if (!user) return;

    const hoje = new Date();
    const contagensRef = ref(db, `usuarios/${user.uid}/contagens`);
    
    try {
      const snapshot = await get(contagensRef);
      const dadosSemana = [];
      
      for (let i = 6; i >= 0; i--) {
        const data = new Date(hoje);
        data.setDate(data.getDate() - i);
        const dataFormatada = data.toISOString().split('T')[0];
        
        const valorAgua = snapshot.exists() && 
                         snapshot.val()[dataFormatada] && 
                         snapshot.val()[dataFormatada].agua ? 
                         snapshot.val()[dataFormatada].agua : 0;
        
        dadosSemana.push({
          label: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][data.getDay()],
          height: valorAgua > 0 && metaAgua > 0 ? (valorAgua / metaAgua) * 100 : 0,
          value: valorAgua
        });
      }
      
      setAguaSemanal(dadosSemana);
    } catch (error) {
      console.error('Erro ao carregar dados da semana:', error);
      setAguaSemanal([]);
    }
  };

  // Função para carregar dados do mês
  const carregarDadosMes = async () => {
    if (!user) return;

    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDiaMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
    let totalMes = 0;

    // Lê os dados das contagens diárias
    const contagensRef = ref(db, `usuarios/${user.uid}/contagens`);
    const snapshot = await get(contagensRef);

    if (snapshot.exists()) {
      const dados = snapshot.val();
      Object.entries(dados).forEach(([data, valores]) => {
        const dataRegistro = new Date(data);
        if (dataRegistro >= primeiroDiaMes && dataRegistro <= ultimoDiaMes && valores.agua) {
          totalMes += valores.agua;
        }
      });
    }

    setAguaMensal(totalMes);
  };

  // Função para carregar total histórico
  const carregarTotal = async () => {
    if (!user) return;

    const contagensRef = ref(db, `usuarios/${user.uid}/contagens`);
    const snapshot = await get(contagensRef);
    let total = 0;

    if (snapshot.exists()) {
      const dados = snapshot.val();
      Object.values(dados).forEach(valores => {
        if (valores.agua) {
          total += valores.agua;
        }
      });
    }

    setAguaTotal(total);
  };

  // Função para adicionar água
  const adicionarAgua = async () => {
    if (!user) return;

    const dataAtual = new Date().toISOString().split('T')[0];
    const novoValor = contagemAgua + 200; // Adiciona 200ml
    
    try {
      // Salvar contagem diária
      const contagemRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}/agua`);
      await set(contagemRef, novoValor);

      // Salvar nas estatísticas
      const estatisticasRef = ref(db, `usuarios/${user.uid}/estatisticas/agua/${dataAtual}`);
      await set(estatisticasRef, novoValor);

      // Atualizar estado local
      setContagemAgua(novoValor);
    } catch (error) {
      console.error('Erro ao adicionar água:', error);
    }
  };

  useEffect(() => {
    if (!user) return;

    // Configurar listeners
    const dataAtual = new Date().toISOString().split('T')[0];
    const aguaRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}/agua`);
    const metasRef = ref(db, `usuarios/${user.uid}/metas`);

    // Listener para contagem de água do dia
    const unsubscribeAgua = onValue(aguaRef, (snapshot) => {
      const valor = snapshot.exists() ? snapshot.val() : 0;
      setContagemAgua(valor);
      
      // Atualiza os dados semanais e mensais quando houver mudança
      carregarDadosSemana();
      carregarDadosMes();
      carregarTotal();
    });

    // Listener para metas
    const unsubscribeMetas = onValue(metasRef, (snapshot) => {
      if (snapshot.exists()) {
        const metas = snapshot.val();
        let metaMaisRecente = null;
        let timestampMaisRecente = 0;

        Object.entries(metas).forEach(([key, meta]) => {
          if (meta.categoria === 'Água' && meta.ativo) {
            const timestamp = new Date(meta.dataCriacao).getTime();
            if (timestamp > timestampMaisRecente) {
              timestampMaisRecente = timestamp;
              metaMaisRecente = meta;
            }
          }
        });

        if (metaMaisRecente) {
          setMetaAgua(metaMaisRecente.valor);
        }
      }
    });

    // Carregar dados iniciais
    carregarDadosSemana();
    carregarDadosMes();
    carregarTotal();

    // Cleanup listeners
    return () => {
      unsubscribeAgua();
      unsubscribeMetas();
    };
  }, [user]);

  useEffect(() => {
    if (metaAgua > 0) {
      carregarDadosSemana();
    }
  }, [metaAgua]);

  return (
  <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>

    {/*Card - Água consumida hoje*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Água hoje</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="water-outline" size={24} color="#007AFF" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>{contagemAgua}ml</Text>
        <Text style={styles.targetText}>de {metaAgua}ml</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(contagemAgua / metaAgua) * 100}%` }]} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={adicionarAgua}>
        <Ionicons name="add-outline" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>

    {/*Card - Água consumida na semana*/}
    <View style={styles.card}>
      <View style={styles.weeklyCardHeader}>
        <Text style={styles.weeklyCardTitle}>Água consumida na semana</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="water-outline" size={24} color="#007AFF" />
        </View>
      </View>
      <Text style={styles.weeklyTotalConsumption}>
        {aguaSemanal.reduce((total, dia) => total + dia.value, 0)}ml
      </Text>
      <View style={styles.barChartContainer}>
        {aguaSemanal.map((bar, index) => (
          <View key={index} style={styles.barWrapper}>
            <View style={[styles.bar, { height: Math.min(bar.height, 100) }]} />
            <Text style={styles.barLabel}>{bar.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.dailyListContainer}>
        {aguaSemanal.map((item, index) => {
          const hoje = new Date();
          const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
          const diaIndex = (hoje.getDay() - (6 - index) + 7) % 7;
          const ehHoje = index === 6;
          
          return (
            <View key={index} style={styles.dailyListItem}>
              <Text style={styles.dailyListDay}>
                {`${dias[diaIndex]}${ehHoje ? ' (hoje)' : ''}`}
              </Text>
              <Text style={styles.dailyListAmount}>{item.value}ml</Text>
            </View>
          );
        })}
      </View>
    </View>

    {/*Card - Água meta*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Meta definida</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="water-outline" size={24} color="#007AFF" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>{metaAgua}ml Diários</Text>
      </View>
    </View>

    {/*Card - Água consumida no ultimo mês*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Água consumida no ultimo mês</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="water-outline" size={24} color="#007AFF" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>{aguaMensal}ml</Text>
      </View>
    </View>

    {/*Card - Água consumida desde o início*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Água consumida desde o início</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="water-outline" size={24} color="#007AFF" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>{aguaTotal}ml</Text>
      </View>
    </View>

  </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    fontFamily: 'arial',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'arial',
    fontWeight: 'regular',
  },
  cardIcon: {
    backgroundColor: '#0A84FF20',
    padding: 8,
    borderRadius: 12,
  },
  cardContent: {
    marginBottom: 20,
    fontFamily: 'arial',
  },
  valueText: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  targetText: {
    color: '#666',
    fontSize: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  addButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#0A84FF20',
    padding: 8,
    borderRadius: 12,
  },
  weeklyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  weeklyCardTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'arial',
  },
  weeklyTotalConsumption: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'arial',
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: '100%',
    height: 100,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  barWrapper: {
    alignItems: 'center',
    marginInline: "2px",
    flex: 1,
  },
  bar: {
    width: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  barLabel: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'arial',
  },
  dailyListContainer: {
    marginTop: 10,
  },
  dailyListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3C',
  },
  dailyListDay: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'arial',
  },
  dailyListAmount: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'arial',
  },
});

export default WaterScreen;