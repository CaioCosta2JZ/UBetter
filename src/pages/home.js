import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


export default function Home() {
  const [contagemDias, setContagemDias] = useState(0);
  const [contagemAgua, setContgemAgua] = useState(0);
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

  const adicionarAgua = () => {
    const quantidade = parseFloat(novaQuantidadeAgua);
    if (!isNaN(quantidade)) {
      setContgemAgua(contagemAgua + quantidade);
      setNovaQuantidadeAgua('');
      setModalAguaVisible(false);
    }
  };

  const adicionarCaminhada = () => {
    const quantidade = parseFloat(novaQuantidadeCaminhada);
    if (!isNaN(quantidade)) {
      setContagemCaminhada(contagemCaminhada + quantidade);
      setNovaQuantidadeCaminhada('');
      setModalCaminhadaVisible(false);
    }
  };

  const adicionarSono = () => {
    const quantidade = parseFloat(novaQuantidadeSono);
    if (!isNaN(quantidade)) {
      setContagemSono(contagemSono + quantidade);
      setNovaQuantidadeSono('');
      setModalSonoVisible(false);
    }
  };

  return (
    <ScrollView style={styles.containerHome} showsVerticalScrollIndicator={false}>
      <View style={styles.topo}>
        <Text style={styles.inicio}>Início</Text>
      </View>
      
      <LinearGradient
        // Button Linear Gradient
        colors={['#005B28', '#182F22', '#212121']}
        style={{ display: "flex",
              justifyContent: "space-between",
              height: 200,
              shadowColor: '#000',
              alignItems: "center",
              padding: 25,
              borderRadius: 16,
              color: "#666666",
              marginHorizontal: 20,}}
              start={{ x: 0.0, 
                      y: 0.0,
                      }}
              end={{ x: 1.0,
                      y: 1.0, }}>
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
              <Text style={styles.valueText}>{contagemAgua}</Text>
              <Text style={styles.targetText}>{metaAgua}</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressAgua, { width: '50%' }]} />
            </View>
            <TouchableOpacity style={styles.botaoAgua} onPress={() => setModalAguaVisible(true)}>
              <Ionicons name="add-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
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
             <View style={[styles.progressCam, { width: '50%' }]} />
           </View>
           <TouchableOpacity style={styles.botaoCam} onPress={() => setModalCaminhadaVisible(true)}>
             <Ionicons name="add-outline" size={24} color="#B91B1B" />
           </TouchableOpacity>
         </View>

         <Modal
            animationType="slide"
            transparent={true}
            visible={modalCaminhadaVisible}
            onRequestClose={() => setModalCaminhadaVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Adicionar Caminhada</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Minutos caminhados"
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
              <View style={[styles.progressSono, { width: '75%' }]} />
            </View>
            <TouchableOpacity style={styles.botaoSono} onPress={() => setModalSonoVisible(true)}>
              <Ionicons name="add-outline" size={24} color="#099747" />
            </TouchableOpacity>
            </View>

            <Modal
              animationType="slide"
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
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#101010',
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
    marginHorizontal: 20,
    paddingRight: 10,
    fontFamily: 'arial',
  },
    tarefas2: {
      fontFamily: 'arial',
    paddingTop: 10,
    flex: 1,
    flexDirection: 'column  ',
    gap: 10,
    marginHorizontal: 20,
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
  cardIconSono: {
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
});