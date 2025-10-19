import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { db } from "../../config/firebase";
import { ref, onValue, set, serverTimestamp, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const WalkScreen = () => {
  const [metaCaminhada, setMetaCaminhada] = useState(0);
  const [contagemCaminhada, setContagemCaminhada] = useState(0);
  const [caminhadaSemanal, setCaminhadaSemanal] = useState([]);
  const [caminhadaMensal, setCaminhadaMensal] = useState(0);
  const [caminhadaTotal, setCaminhadaTotal] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;

  // Função para obter a meta mais recente de caminhada
  const getMostRecentMeta = async () => {
    if (!user) return;

    try {
      const metasRef = ref(db, `usuarios/${user.uid}/metas`);
      const snapshot = await get(metasRef);
      
      let metaMaisRecente = null;
      
      if (snapshot.exists()) {
        const metas = snapshot.val();
        Object.entries(metas).forEach(([key, meta]) => {
          if (meta.categoria === 'Caminhada' && meta.ativo) {
            if (!metaMaisRecente || new Date(meta.dataCriacao) > new Date(metaMaisRecente.dataCriacao)) {
              metaMaisRecente = meta;
            }
          }
        });
      }
      
      if (metaMaisRecente) {
        setMetaCaminhada(metaMaisRecente.valor);
      }
    } catch (error) {
      console.error('Erro ao buscar meta:', error);
    }
  };

  // Função para carregar a quantidade de caminhada do dia
  const carregarContagemCaminhada = async () => {
    if (!user) return;

    const dataAtual = new Date().toISOString().split('T')[0];
    const caminhadaRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}/caminhada`);
    
    onValue(caminhadaRef, (snapshot) => {
      if (snapshot.exists()) {
        setContagemCaminhada(snapshot.val());
      } else {
        setContagemCaminhada(0);
      }
    });
  };

  // Função para carregar dados da semana
  const carregarDadosSemana = async () => {
    if (!user) return;

    const hoje = new Date();
    const dadosSemana = [];
    
    for (let i = 6; i >= 0; i--) {
      const data = new Date(hoje);
      data.setDate(data.getDate() - i);
      const dataFormatada = data.toISOString().split('T')[0];
      
      const caminhadaRef = ref(db, `usuarios/${user.uid}/contagens/${dataFormatada}`);
      const snapshot = await get(caminhadaRef);
      
      const valorCaminhada = snapshot.exists() && snapshot.val().caminhada ? snapshot.val().caminhada : 0;
      
      dadosSemana.push({
        label: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][data.getDay()],
        height: valorCaminhada > 0 ? (valorCaminhada / metaCaminhada) * 100 : 0,
        value: valorCaminhada
      });
    }
    
    setCaminhadaSemanal(dadosSemana);
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
        if (dataRegistro >= primeiroDiaMes && dataRegistro <= ultimoDiaMes && valores.caminhada) {
          totalMes += valores.caminhada;
        }
      });
    }

    setCaminhadaMensal(totalMes);
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
        if (valores.caminhada) {
          total += valores.caminhada;
        }
      });
    }

    setCaminhadaTotal(total);
  };

  // Função para adicionar caminhada
  const adicionarCaminhada = async () => {
    if (!user) return;

    const dataAtual = new Date().toISOString().split('T')[0];
    const novoValor = contagemCaminhada + 1; // Adiciona 1km
    
    try {
      // Salvar contagem diária
      const contagemRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}/caminhada`);
      await set(contagemRef, novoValor);

      // Atualizar estado local
      setContagemCaminhada(novoValor);
    } catch (error) {
      console.error('Erro ao adicionar caminhada:', error);
    }
  };

  useEffect(() => {
    getMostRecentMeta();
    carregarContagemCaminhada();
    carregarDadosSemana();
    carregarDadosMes();
    carregarTotal();
  }, [user]);

  useEffect(() => {
    if (metaCaminhada > 0) {
      carregarDadosSemana();
    }
  }, [metaCaminhada]);

  return (
  <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>

    {/*Card - Caminhada feita hoje*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Caminhada hoje</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="walk-outline" size={24} color="#B91B1B" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>{contagemCaminhada}km</Text>
        <Text style={styles.targetText}>de {metaCaminhada}km</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(contagemCaminhada / metaCaminhada) * 100}%` }]} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={adicionarCaminhada}>
        <Ionicons name="add-outline" size={24} color="#B91B1B" />
      </TouchableOpacity>
    </View>

    {/*Card - Caminhada feita na semana*/}
    <View style={styles.card}>
      <View style={styles.weeklyCardHeader}>
        <Text style={styles.weeklyCardTitle}>Caminhada feita na semana</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="walk-outline" size={24} color="#B91B1B" />
        </View>
      </View>
      <Text style={styles.weeklyTotalConsumption}>
        {caminhadaSemanal.reduce((total, dia) => total + dia.value, 0)}km
      </Text>
      <View style={styles.barChartContainer}>
        {caminhadaSemanal.map((bar, index) => (
          <View key={index} style={styles.barWrapper}>
            <View style={[styles.bar, { height: Math.min(bar.height, 100) }]} />
            <Text style={styles.barLabel}>{bar.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.dailyListContainer}>
        {caminhadaSemanal.map((item, index) => {
          const hoje = new Date();
          const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
          const diaIndex = (hoje.getDay() - (6 - index) + 7) % 7;
          const ehHoje = index === 6;
          
          return (
            <View key={index} style={styles.dailyListItem}>
              <Text style={styles.dailyListDay}>
                {`${dias[diaIndex]}${ehHoje ? ' (hoje)' : ''}`}
              </Text>
              <Text style={styles.dailyListAmount}>{item.value}km</Text>
            </View>
          );
        })}
      </View>
    </View>

    {/*Card - Caminhada meta*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Meta definida</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="walk-outline" size={24} color="#B91B1B" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>{metaCaminhada}km Diários</Text>
      </View>
    </View>

    {/*Card - Caminhada feita no ultimo mês*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Caminhada feita no ultimo mês</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="walk-outline" size={24} color="#B91B1B" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>{caminhadaMensal}km</Text>
      </View>
    </View>

    {/*Card - Caminhada feita desde o início*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Caminhada feita desde o início</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="walk-outline" size={24} color="#B91B1B" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>{caminhadaTotal}km</Text>
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
    fontWeight: '600',
  },
  cardIcon: {
    backgroundColor: '#6F0F0F',
    padding: 8,
    borderRadius: 12,
  },
  cardContent: {
    marginBottom: 20,
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
    backgroundColor: '#B91B1B',
    borderRadius: 3,
  },
  addButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#6F0F0F',
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
    backgroundColor: '#B91B1B',
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

export default WalkScreen;