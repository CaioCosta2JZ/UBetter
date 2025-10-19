import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { db } from "../../config/firebase";
import { ref, onValue, set, serverTimestamp, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const SleepScreen = () => {
  const [metaSono, setMetaSono] = useState(0);
  const [contagemSono, setContagemSono] = useState(0);
  const [sonoSemanal, setSonoSemanal] = useState([]);
  const [sonoMensal, setSonoMensal] = useState(0);
  const [sonoTotal, setSonoTotal] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;

  // Função para obter a meta mais recente de sono
  const getMostRecentMeta = async () => {
    if (!user) return;

    try {
      const metasRef = ref(db, `usuarios/${user.uid}/metas`);
      const snapshot = await get(metasRef);
      
      let metaMaisRecente = null;
      
      if (snapshot.exists()) {
        const metas = snapshot.val();
        Object.entries(metas).forEach(([key, meta]) => {
          if (meta.categoria === 'Sono' && meta.ativo) {
            if (!metaMaisRecente || new Date(meta.dataCriacao) > new Date(metaMaisRecente.dataCriacao)) {
              metaMaisRecente = meta;
            }
          }
        });
      }
      
      if (metaMaisRecente) {
        setMetaSono(metaMaisRecente.valor);
      }
    } catch (error) {
      console.error('Erro ao buscar meta:', error);
    }
  };

  // Função para carregar a quantidade de sono do dia
  const carregarContagemSono = async () => {
    if (!user) return;

    const dataAtual = new Date().toISOString().split('T')[0];
    const sonoRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}/sono`);
    
    onValue(sonoRef, (snapshot) => {
      if (snapshot.exists()) {
        setContagemSono(snapshot.val());
      } else {
        setContagemSono(0);
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
      
      const sonoRef = ref(db, `usuarios/${user.uid}/contagens/${dataFormatada}`);
      const snapshot = await get(sonoRef);
      
      const valorSono = snapshot.exists() && snapshot.val().sono ? snapshot.val().sono : 0;
      
      dadosSemana.push({
        label: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][data.getDay()],
        height: valorSono > 0 ? (valorSono / metaSono) * 100 : 0,
        value: valorSono
      });
    }
    
    setSonoSemanal(dadosSemana);
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
        if (dataRegistro >= primeiroDiaMes && dataRegistro <= ultimoDiaMes && valores.sono) {
          totalMes += valores.sono;
        }
      });
    }

    setSonoMensal(totalMes);
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
        if (valores.sono) {
          total += valores.sono;
        }
      });
    }

    setSonoTotal(total);
  };

  // Função para adicionar sono
  const adicionarSono = async () => {
    if (!user) return;

    const dataAtual = new Date().toISOString().split('T')[0];
    const novoValor = contagemSono + 1; // Adiciona 1 hora
    
    try {
      // Salvar contagem diária
      const contagemRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}/sono`);
      await set(contagemRef, novoValor);

      // Atualizar estado local
      setContagemSono(novoValor);
    } catch (error) {
      console.error('Erro ao adicionar sono:', error);
    }
  };

  useEffect(() => {
    getMostRecentMeta();
    carregarContagemSono();
    carregarDadosSemana();
    carregarDadosMes();
    carregarTotal();
  }, [user]);

  useEffect(() => {
    if (metaSono > 0) {
      carregarDadosSemana();
    }
  }, [metaSono]);

  return (
  <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>
    {/* Card - Sono hoje */}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Sono hoje</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="moon-outline" size={24} color="#099747" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>{contagemSono}h</Text>
        <Text style={styles.targetText}>de {metaSono}h</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(contagemSono / metaSono) * 100}%` }]} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={adicionarSono}>
        <Ionicons name="add-outline" size={24} color="#099747" />
      </TouchableOpacity>
    </View>

    {/* Card - Sono na semana */}
    <View style={styles.card}>
      <View style={styles.weeklyCardHeader}>
        <Text style={styles.weeklyCardTitle}>Sono na semana</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="moon-outline" size={24} color="#045125" />
        </View>
      </View>
      <Text style={styles.weeklyTotalConsumption}>
        {sonoSemanal.reduce((total, dia) => total + dia.value, 0)}h
      </Text>
      <View style={styles.barChartContainer}>
        {sonoSemanal.map((bar, index) => (
          <View key={index} style={styles.barWrapper}>
            <View style={[styles.bar, { height: Math.min(bar.height, 100) }]} />
            <Text style={styles.barLabel}>{bar.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.dailyListContainer}>
        {sonoSemanal.map((item, index) => {
          const hoje = new Date();
          const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
          const diaIndex = (hoje.getDay() - (6 - index) + 7) % 7;
          const ehHoje = index === 6;
          
          return (
            <View key={index} style={styles.dailyListItem}>
              <Text style={styles.dailyListDay}>
                {`${dias[diaIndex]}${ehHoje ? ' (hoje)' : ''}`}
              </Text>
              <Text style={styles.dailyListAmount}>{item.value}h</Text>
            </View>
          );
        })}
      </View>
    </View>

    {/* Card - Meta de sono */}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Meta definida</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="moon-outline" size={24} color="#099747" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>{metaSono}h por noite</Text>
      </View>
    </View>

    {/* Card - Sono no último mês */}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Sono no último mês</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="moon-outline" size={24} color="#099747" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>{sonoMensal}h</Text>
      </View>
    </View>

    {/* Card - Sono desde o início */}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Sono desde o início</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="moon-outline" size={24} color="#099747" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>{sonoTotal}h</Text>
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
    backgroundColor: '#045125',
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
    backgroundColor: '#099747',
    borderRadius: 3,
  },
  addButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#045125',
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
    marginInline: '2px',
    flex: 1,
  },
  bar: {
    width: '100%',
    backgroundColor: '#099747',
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

export default SleepScreen;