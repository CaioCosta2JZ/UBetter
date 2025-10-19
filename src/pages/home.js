import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ref, set, get, push, update, off, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { db } from "../config/firebase";

export default function Home({ route, navigation }) {
  const [contagemDias, setContagemDias] = useState(0);
  const [contagemAgua, setContagemAgua] = useState(0);
  const [novaQuantidadeAgua, setNovaQuantidadeAgua] = useState('');
  const [metaAgua, setMetaAgua] = useState(0);
  const [contagemCaminhada, setContagemCaminhada] = useState(0);
  const [novaQuantidadeCaminhada, setNovaQuantidadeCaminhada] = useState('');
  const [metaCaminhada, setMetaCaminhada] = useState(0);
  const [contagemSono, setContagemSono] = useState(0);
  const [novaQuantidadeSono, setNovaQuantidadeSono] = useState('');
  const [metaSono, setMetaSono] = useState(0);
  const [modalAguaVisible, setModalAguaVisible] = useState(false);
  const [modalCaminhadaVisible, setModalCaminhadaVisible] = useState(false);
  const [modalSonoVisible, setModalSonoVisible] = useState(false);
  const [modalConclusaoVisible, setModalConclusaoVisible] = useState(false);
  const [metaConcluida, setMetaConcluida] = useState('');
  const [metaAguaConcluida, setMetaAguaConcluida] = useState(false);
  const [metaCaminhadaConcluida, setMetaCaminhadaConcluida] = useState(false);
  const [metaSonoConcluida, setMetaSonoConcluida] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  // Função para obter data no formato YYYY-MM-DD
  const getDataAtual = () => {
    const data = new Date();
    return data.toISOString().split('T')[0];
  };
useEffect(() => {
    if (user) {
      carregarDados();
    }
  }, [user]);
  
  // Inicializar dados do dia
  const inicializarDadosDoDia = async () => {
    if (!user) return;
    
    const dataAtual = getDataAtual();
    const contagensRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}`);
    
    try {
      const snapshot = await get(contagensRef);
      console.log('[DEBUG] inicializarDadosDoDia', { uid: user.uid, dataAtual, exists: snapshot.exists(), val: snapshot.exists() ? snapshot.val() : null });
      if (!snapshot.exists()) {
        await set(contagensRef, {
          agua: 0,
          caminhada: 0,
          sono: 0
        });
        console.log('[DEBUG] inicializarDadosDoDia: criado nó contagens do dia', { uid: user.uid, dataAtual });
      }
    } catch (error) {
      console.error('Erro ao inicializar dados do dia:', error);
    }
  };

  // Inicializar dados do dia ao detectar usuário (carregarDados será chamado por outros listeners)
  useEffect(() => {
    if (!user) return;
    inicializarDadosDoDia();
  }, [user]);

  // Atualizar metas quando receber nova meta
  useEffect(() => {
    if (route.params?.newGoal) {
      const { categoria, valor } = route.params.newGoal;
      switch (categoria) {
        case 'Água':
          setMetaAgua(valor);
          salvarMeta('agua', valor);
          break;
        case 'Caminhada':
          setMetaCaminhada(valor);
          salvarMeta('caminhada', valor);
          break;
        case 'Sono':
          setMetaSono(valor);
          salvarMeta('sono', valor);
          break;
      }
    }
  }, [route.params?.newGoal]);

  // As atualizações das contagens diárias agora são feitas pelas funções
  // `adicionarAgua`, `adicionarCaminhada` e `adicionarSono`, que leem/atualizam
  // o objeto completo `contagens/{dataAtual}`. Removemos efeitos que
  // gravavam campos isolados para evitar sobrescritas parciais.

  const getMostRecentMeta = async (categoria) => {
    if (!user) return null;
    try {
      const metasRef = ref(db, `usuarios/${user.uid}/metas`);
      const metasSnapshot = await get(metasRef);

      if (!metasSnapshot.exists()) return null;

      let metaMaisRecente = null;
      let timestampMaisRecente = 0;

      Object.entries(metasSnapshot.val()).forEach(([id, meta]) => {
        if (meta.categoria === categoria && meta.ativo) {
          const timestamp = new Date(meta.dataCriacao).getTime();
          if (timestamp > timestampMaisRecente) {
            timestampMaisRecente = timestamp;
            metaMaisRecente = { id, ...meta };
          }
        }
      });

      return metaMaisRecente;
    } catch (error) {
      console.error('Erro ao buscar meta recente:', error);
      return null;
    }
  };

  // Função para carregar as metas mais recentes
  useEffect(() => {
    const carregarMetasRecentes = async () => {
      if (!user) return;
      try {
        const metasRef = ref(db, `usuarios/${user.uid}/metas`);
        const metasSnapshot = await get(metasRef);
        if (metasSnapshot.exists()) {
          const metas = metasSnapshot.val();
          setMetaAgua(metas.agua || 0);
          setMetaCaminhada(metas.caminhada || 0);
          setMetaSono(metas.sono || 0);
        } else {
          setMetaAgua(0);
          setMetaCaminhada(0);
          setMetaSono(0);
        }
      } catch (error) {
        console.error('Erro ao carregar metas recentes:', error);
      }
    };
    carregarMetasRecentes();
  }, [user]);

  const carregarDados = async () => {
    if (!user) return;

    try {
      const dataAtual = getDataAtual();

      // Carregar contagens do dia atual
      const contagemRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}`);
      const contagemSnapshot = await get(contagemRef);

      if (contagemSnapshot.exists()) {
        const dados = contagemSnapshot.val();
        console.log('[DEBUG] carregarDados - contagens existentes', { uid: user.uid, dataAtual, dados });
        if (dados.agua !== undefined) setContagemAgua(dados.agua);
        if (dados.caminhada !== undefined) setContagemCaminhada(dados.caminhada);
        if (dados.sono !== undefined) setContagemSono(dados.sono);
      } else {
        // Se não existirem dados para o dia atual, inicializa com zero
        const novosDados = {
          agua: 0,
          caminhada: 0,
          sono: 0
        };
        await set(contagemRef, novosDados);
        console.log('[DEBUG] carregarDados - inicializou contagens do dia', { uid: user.uid, dataAtual });
        setContagemAgua(0);
        setContagemCaminhada(0);
        setContagemSono(0);
      }

      // Carregar metas mais recentes
      const metasRef = ref(db, `usuarios/${user.uid}/metas`);
      const metasSnapshot = await get(metasRef);

      if (metasSnapshot.exists()) {
        const metas = metasSnapshot.val();
        setMetaAgua(metas.agua || 0);
        setMetaCaminhada(metas.caminhada || 0);
        setMetaSono(metas.sono || 0);
      }

      // Carregar dias consecutivos
      const diasRef = ref(db, `usuarios/${user.uid}/estatisticas/diasConsecutivos`);
      const diasSnapshot = await get(diasRef);

      if (diasSnapshot.exists()) {
        setContagemDias(diasSnapshot.val());
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  // Add validation to salvarMeta
  const salvarMeta = async (tipo, valor) => {
    if (!user) return;
    if (valor <= 0) {
      console.error('Valor da meta deve ser maior que zero');
      return;
    }

    try {
      const metaRef = ref(db, `usuarios/${user.uid}/metas/${tipo}`);
      await set(metaRef, valor);
    } catch (error) {
      console.error('Erro ao salvar meta:', error);
    }
  };

  const salvarContagem = async (tipo, novoValor) => {
    if (!user) return;

    try {
      const dataAtual = getDataAtual();
      const timestamp = new Date().toISOString();

      // Obter o valor atual antes de atualizar
      const contagemRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}/${tipo}`);
      const snapshot = await get(contagemRef);
      const valorAtual = snapshot.exists() ? snapshot.val() : 0;
      const valorTotal = valorAtual + novoValor;

      // Salvar contagem diária atualizada
      await set(contagemRef, valorTotal);

      // Salvar histórico para estatísticas
      const historicoRef = ref(db, `usuarios/${user.uid}/historico/${tipo}`);
      const novoRegistro = push(historicoRef);
      await set(novoRegistro, {
        valor: novoValor,
        total: valorTotal,
        data: dataAtual,
        timestamp: timestamp
      });

      // Atualizar estatísticas gerais
      await atualizarEstatisticas(tipo, novoValor);
    } catch (error) {
      console.error('Erro ao salvar contagem:', error);
    }
  };

  const atualizarEstatisticas = async (tipo, valor) => {
    if (!user) return;

    try {
      const estatisticasRef = ref(db, `usuarios/${user.uid}/estatisticas/${tipo}`);
      const snapshot = await get(estatisticasRef);

      let estatisticas = {
        total: 0,
        media: 0,
        ultimaAtualizacao: new Date().toISOString()
      };

      if (snapshot.exists()) {
        estatisticas = snapshot.val();
      }

      estatisticas.total = (estatisticas.total || 0) + valor;
      estatisticas.ultimaAtualizacao = new Date().toISOString();

      await set(estatisticasRef, estatisticas);
    } catch (error) {
      console.error('Erro ao atualizar estatísticas:', error);
    }
  };

  const deletarMeta = async (categoria) => {
    if (!user) return;
    try {
      const meta = await getMostRecentMeta(categoria);
      if (meta && meta.id) {
        const metaRef = ref(db, `usuarios/${user.uid}/metas/${meta.id}`);
        await set(metaRef, { ...meta, ativo: false });

        // Atualiza estado local
        switch (categoria) {
          case 'Água': setMetaAgua(0); break;
          case 'Caminhada': setMetaCaminhada(0); break;
          case 'Sono': setMetaSono(0); break;
        }
      }
    } catch (error) {
      console.error('Erro ao deletar meta:', error);
    }
  };

  const verificarMeta = async (valor, meta, tipo) => {
    if (!meta || meta <= 0) return;
    if (valor >= meta) {
      switch (tipo) {
        case 'Água':
          if (!metaAguaConcluida) {
            setMetaAguaConcluida(true);
            setMetaConcluida(`Você concluiu sua meta de ${meta} L de água!`);
            setModalConclusaoVisible(true);
            incrementarDiasConsecutivos();
            await deletarMeta('Água');
          }
          break;
        case 'Caminhada':
          if (!metaCaminhadaConcluida) {
            setMetaCaminhadaConcluida(true);
            setMetaConcluida(`Você concluiu sua meta de ${meta} km de caminhada!`);
            setModalConclusaoVisible(true);
            incrementarDiasConsecutivos();
            await deletarMeta('Caminhada');
          }
          break;
        case 'Sono':
          if (!metaSonoConcluida) {
            setMetaSonoConcluida(true);
            setMetaConcluida(`Você concluiu sua meta de ${meta} h de sono!`);
            setModalConclusaoVisible(true);
            incrementarDiasConsecutivos();
            await deletarMeta('Sono');
          }
          break;
      }
    }
  };

  const incrementarDiasConsecutivos = async () => {
    if (!user) return;

    try {
      const diasRef = ref(db, `usuarios/${user.uid}/estatisticas/diasConsecutivos`);
      const novoDias = contagemDias + 1;
      await set(diasRef, novoDias);
      setContagemDias(novoDias);
    } catch (error) {
      console.error('Erro ao incrementar dias:', error);
    }
  };

  const adicionarAgua = async () => {
    const quantidade = parseFloat(novaQuantidadeAgua);
    if (!isNaN(quantidade)) {
      const dataAtual = getDataAtual();
      
      try {
        // Primeiro, busca o valor atual
        const contagemRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}/agua`);
        const snapshot = await get(contagemRef);
        const valorAtual = snapshot.exists() ? snapshot.val() : 0;
        console.log('[DEBUG] adicionarAgua - leitura antes', { uid: user.uid, dataAtual, valorAtual, quantidade });
        
        // Calcula o novo valor
        const novoValor = valorAtual + quantidade;
        
        // Atualiza a contagem do dia
        await set(contagemRef, novoValor);
        console.log('[DEBUG] adicionarAgua - gravou contagem', { uid: user.uid, dataAtual, novoValor });
        
        // Atualiza o histórico
        const historicoRef = push(ref(db, `usuarios/${user.uid}/historico/agua`));
        await set(historicoRef, {
          data: dataAtual,
          timestamp: new Date().toISOString(),
          valor: quantidade,
          totalDia: novoValor
        });
        
        // Atualiza estatísticas
        const estatisticasRef = ref(db, `usuarios/${user.uid}/estatisticas/agua`);
        const estatisticasSnapshot = await get(estatisticasRef);
        const totalAnterior = estatisticasSnapshot.exists() ? estatisticasSnapshot.val().total || 0 : 0;
        
        await set(estatisticasRef, {
          total: totalAnterior + quantidade,
          ultimaAtualizacao: new Date().toISOString()
        });
        console.log('[DEBUG] adicionarAgua - estatisticas atualizadas', { uid: user.uid, totalAnterior, incremento: quantidade });
        
        setContagemAgua(novoValor);
        setNovaQuantidadeAgua('');
        setModalAguaVisible(false);
        verificarMeta(novoValor, metaAgua, 'Água');
      } catch (error) {
        console.error('Erro ao adicionar água:', error);
      }
    }
  };

  const adicionarCaminhada = async () => {
    const quantidade = parseFloat(novaQuantidadeCaminhada);
    if (!isNaN(quantidade)) {
      const dataAtual = getDataAtual();
      try {
  // Ler dados do dia
  const contagemRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}`);
  const snapshot = await get(contagemRef);
  const dadosAtuais = snapshot.exists() ? snapshot.val() : { agua: 0, caminhada: 0, sono: 0 };
  console.log('[DEBUG] adicionarCaminhada - leitura antes', { uid: user.uid, dataAtual, dadosAtuais, quantidade });

  // Calcular novo valor
  const novoValor = (dadosAtuais.caminhada || 0) + quantidade;

        // Atualiza a contagem do dia
        await set(contagemRef, { ...dadosAtuais, caminhada: novoValor });

        // Atualiza o histórico
        const historicoRef = push(ref(db, `usuarios/${user.uid}/historico/caminhada`));
        await set(historicoRef, { data: dataAtual, timestamp: new Date().toISOString(), valor: quantidade, totalDia: novoValor });
        console.log('[DEBUG] adicionarCaminhada - gravou historico e contagem', { uid: user.uid, dataAtual, novoValor });

        // Atualiza estatísticas
        const estatisticasRef = ref(db, `usuarios/${user.uid}/estatisticas/caminhada`);
        const estatisticasSnapshot = await get(estatisticasRef);
        const totalAnterior = estatisticasSnapshot.exists() ? estatisticasSnapshot.val().total || 0 : 0;
        await set(estatisticasRef, { total: totalAnterior + quantidade, ultimaAtualizacao: new Date().toISOString() });

        setContagemCaminhada(novoValor);
        setNovaQuantidadeCaminhada('');
        setModalCaminhadaVisible(false);
        verificarMeta(novoValor, metaCaminhada, 'Caminhada');
      } catch (error) {
        console.error('Erro ao adicionar caminhada:', error);
      }
    }
  };

  const adicionarSono = async () => {
    const quantidade = parseFloat(novaQuantidadeSono);
    if (!isNaN(quantidade)) {
      const dataAtual = getDataAtual();
      try {
        // Ler dados do dia
        const contagemRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}`);
        const snapshot = await get(contagemRef);
        const dadosAtuais = snapshot.exists() ? snapshot.val() : { agua: 0, caminhada: 0, sono: 0 };
        console.log('[DEBUG] adicionarSono - leitura antes', { uid: user.uid, dataAtual, dadosAtuais, quantidade });

        // Calcular novo valor
        const novoValor = (dadosAtuais.sono || 0) + quantidade;

        // Atualiza a contagem do dia
        await set(contagemRef, { ...dadosAtuais, sono: novoValor });

        // Atualiza o histórico
        const historicoRef = push(ref(db, `usuarios/${user.uid}/historico/sono`));
        await set(historicoRef, { data: dataAtual, timestamp: new Date().toISOString(), valor: quantidade, totalDia: novoValor });
        console.log('[DEBUG] adicionarSono - gravou historico e contagem', { uid: user.uid, dataAtual, novoValor });

        // Atualiza estatísticas
        const estatisticasRef = ref(db, `usuarios/${user.uid}/estatisticas/sono`);
        const estatisticasSnapshot = await get(estatisticasRef);
        const totalAnterior = estatisticasSnapshot.exists() ? estatisticasSnapshot.val().total || 0 : 0;
        await set(estatisticasRef, { total: totalAnterior + quantidade, ultimaAtualizacao: new Date().toISOString() });

        setContagemSono(novoValor);
        setNovaQuantidadeSono('');
        setModalSonoVisible(false);
        verificarMeta(novoValor, metaSono, 'Sono');
      } catch (error) {
        console.error('Erro ao adicionar sono:', error);
      }
    }
  };

  const calcularProgresso = (atual, meta) => {
    if (meta <= 0) return 0;
    const progresso = (atual / meta) * 100;
    return Math.min(progresso, 100) + '%';
  };

  // Add listeners for real-time updates
  useEffect(() => {
    if (!user) return;

    const dataAtual = getDataAtual();

    // Listener para o nó de contagens do dia (objetos completos)
    const contagensRef = ref(db, `usuarios/${user.uid}/contagens/${dataAtual}`);
    const unsubscribeContagens = onValue(contagensRef, (snapshot) => {
      if (snapshot.exists()) {
        const dados = snapshot.val();
        try {
          console.log('[DEBUG] listener contagens onValue', { uid: user.uid, dataAtual, dados: JSON.stringify(dados) });
        } catch (e) {
          console.log('[DEBUG] listener contagens onValue (stringify failed)', { uid: user.uid, dataAtual, dados });
        }
        setContagemAgua(dados.agua || 0);
        setContagemCaminhada(dados.caminhada || 0);
        setContagemSono(dados.sono || 0);
      } else {
        console.log('[DEBUG] listener contagens onValue - sem dados, inicializando', { uid: user.uid, dataAtual });
        // inicializar se necessário
        set(contagensRef, { agua: 0, caminhada: 0, sono: 0 }).catch(() => {});
        setContagemAgua(0);
        setContagemCaminhada(0);
        setContagemSono(0);
      }
  // Não chamar carregarDados() aqui — listener já atualiza estado local.
    });

    // Listener para metas (manter metas sincronizadas)
    const metasRef = ref(db, `usuarios/${user.uid}/metas`);
    const unsubscribeMetas = onValue(metasRef, (snapshot) => {
      if (snapshot.exists()) {
        const metas = snapshot.val();
        try {
          console.log('[DEBUG] listener metas onValue', { uid: user.uid, count: Object.keys(metas).length, metas: JSON.stringify(metas) });
        } catch (e) {
          console.log('[DEBUG] listener metas onValue (stringify failed)', { uid: user.uid, count: Object.keys(metas).length });
        }
        let mostRecentMetas = { agua: { valor: 0, timestamp: 0 }, caminhada: { valor: 0, timestamp: 0 }, sono: { valor: 0, timestamp: 0 } };
        Object.entries(metas).forEach(([id, meta]) => {
          if (meta.ativo) {
            const timestamp = new Date(meta.dataCriacao).getTime();
            switch (meta.categoria) {
              case 'Água': if (timestamp > mostRecentMetas.agua.timestamp) mostRecentMetas.agua = { valor: meta.valor, timestamp }; break;
              case 'Caminhada': if (timestamp > mostRecentMetas.caminhada.timestamp) mostRecentMetas.caminhada = { valor: meta.valor, timestamp }; break;
              case 'Sono': if (timestamp > mostRecentMetas.sono.timestamp) mostRecentMetas.sono = { valor: meta.valor, timestamp }; break;
            }
          }
        });
        setMetaAgua(mostRecentMetas.agua.valor);
        setMetaCaminhada(mostRecentMetas.caminhada.valor);
        setMetaSono(mostRecentMetas.sono.valor);
      } else {
        console.log('[DEBUG] listener metas onValue - sem metas', { uid: user.uid });
      }
    });

    return () => {
      unsubscribeContagens();
      unsubscribeMetas();
    };
  }, [user]);

  // Update when coming back to screen
  useFocusEffect(
    useCallback(() => {
      if (user) {
        carregarDados();
      }
      return () => {};
    }, [user, carregarDados])
  );

  return (
    <ScrollView style={styles.containerHome} showsVerticalScrollIndicator={false}>

      <LinearGradient
        colors={['#005B28', '#182F22', '#212121']}
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: 200,
          shadowColor: '#000',
          alignItems: "center",
          padding: 25,
          borderRadius: 16,
          color: "#666666",
          marginHorizontal: 20,
        }}
        start={{
          x: 0.0,
          y: 0.0,
        }}
        end={{
          x: 1.0,
          y: 1.0,
        }}>
        <Text style={styles.tituloCard}>Meta diária</Text>
        <Text style={styles.contagemDias} id="contagemDias">
          {contagemDias} Dias
        </Text>
        <Text style={styles.textoMotivacional}>
          Continue a fazer a sua tarefa para não perder a meta
        </Text>
      </LinearGradient>

      <View style={styles.meio}>
        <Text style={styles.tarefasAtuais}>Tarefas atuais</Text>
      </View>

      <View style={styles.tarefas}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Água</Text>
            <View style={styles.cardAgua}>
              <Ionicons name="water-outline" size={24} color="#007AFF" />
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.valueText}>{contagemAgua} ml</Text>
            <Text style={styles.targetText}>{metaAgua}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressAgua, { width: calcularProgresso(contagemAgua, metaAgua) }]} />
          </View>
          <TouchableOpacity style={styles.botaoAgua} onPress={() => setModalAguaVisible(true)}>
            <Ionicons name="add-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalAguaVisible}
          onRequestClose={() => setModalAguaVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Adicionar Água</Text>
              <TextInput
                style={styles.input}
                placeholder="Quantidade em ml"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={novaQuantidadeAgua}
                onChangeText={setNovaQuantidadeAgua}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={adicionarAgua}>
                  <Text style={styles.modalButtonText}>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalAguaVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Caminhada</Text>
            <View style={styles.cardCaminhada}>
              <Ionicons name="walk-outline" size={24} color="#B91B1B" />
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.valueText}>{contagemCaminhada}</Text>
            <Text style={styles.targetText}>{metaCaminhada}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressCam, { width: calcularProgresso(contagemCaminhada, metaCaminhada) }]} />
          </View>
          <TouchableOpacity style={styles.botaoCam} onPress={() => setModalCaminhadaVisible(true)}>
            <Ionicons name="add-outline" size={24} color="#B91B1B" />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalCaminhadaVisible}
          onRequestClose={() => setModalCaminhadaVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Adicionar Caminhada</Text>
              <TextInput
                style={styles.input}
                placeholder="Km caminhados"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={novaQuantidadeCaminhada}
                onChangeText={setNovaQuantidadeCaminhada}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={adicionarCaminhada}>
                  <Text style={styles.modalButtonText}>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalCaminhadaVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </View>
      <View style={styles.tarefas2}>
        <View style={styles.cardFull}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Sono hoje</Text>
            <View style={styles.cardSono}>
              <Ionicons name="moon-outline" size={24} color="#099747" />
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.valueText}>{contagemSono}
            </Text>
            <Text style={styles.targetText}>{metaSono}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressSono, { width: calcularProgresso(contagemSono, metaSono) }]} />
          </View>
          <TouchableOpacity style={styles.botaoSono} onPress={() => setModalSonoVisible(true)}>
            <Ionicons name="add-outline" size={24} color="#099747" />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalSonoVisible}
          onRequestClose={() => setModalSonoVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Adicionar Sono</Text>
              <TextInput
                style={styles.input}
                placeholder="Horas dormidas"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={novaQuantidadeSono}
                onChangeText={setNovaQuantidadeSono}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={adicionarSono}>
                  <Text style={styles.modalButtonText}>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalSonoVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalConclusaoVisible}
        onRequestClose={() => setModalConclusaoVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Parabéns!</Text>
            <Text style={styles.modalText}>{metaConcluida}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalConclusaoVisible(false)}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#101010',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 0,
    marginVertical: 35,
  },
  inicio: {
    color: "white",
    fontSize: 20,
  },
  topo: {
    color: "white",
    fontSize: 20,
    paddingBottom: 20,
    textAlign: "center",
    alignItems: "center",
  },
  meio: {
    width: "100%",
    textAlign: "left",
    paddingBottom: 20,
  },

  tarefasAtuais: {
    paddingLeft: 20,

    color: "white",
    fontSize: 20,
    marginTop: 20,
  },

  tituloCard: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    fontFamily: 'arial',
  },

  contagemDias: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: 'arial',
  },

  textoMotivacional: {
    alignSelf: "center",
    color: "#666666",
    fontSize: 12,
    fontFamily: 'arial',
  },

  tarefas: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 5,
    paddingRight: 10,
    fontFamily: 'arial',
  },
  tarefas2: {
    fontFamily: 'arial',
    paddingTop: 5,
    flex: 1,
    flexDirection: 'column  ',
    gap: 10,
    marginHorizontal: 5,
  },

  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
  cardFull: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    fontFamily: 'arial',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
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
  cardAgua: {
    backgroundColor: '#0A84FF20',
    padding: 8,
    borderRadius: 12,
    width: 40,
  },
  cardCaminhada: {
    backgroundColor: '#6F0F0F',
    padding: 8,
    borderRadius: 12,
    width: 40,
  },
  cardSono: {
    backgroundColor: '#045125',
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
  progressAgua: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  progressCam: {
    height: '100%',
    backgroundColor: '#B91B1B',
    borderRadius: 3,
  },
  progressSono: {
    height: '100%',
    backgroundColor: '#099747',
    borderRadius: 3,
  },
  botaoAgua: {
    alignSelf: 'flex-end',
    backgroundColor: '#0A84FF20',
    padding: 8,
    borderRadius: 12,
  },
  botaoCam: {
    alignSelf: 'flex-end',
    backgroundColor: '#6F0F0F',
    padding: 8,
    borderRadius: 12,
  },
  botaoSono: {
    alignSelf: 'flex-end',
    backgroundColor: '#045125',
    padding: 8,
    borderRadius: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    color: '#FFF',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  modalButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  }
});