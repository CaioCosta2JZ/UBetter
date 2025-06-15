import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


export default function Home() {
  const [contagemDias, setContagemDias] = useState(0);
  const [contagemAgua, setContgemAgua] = useState(0);
  const [metaAgua, setMetaAgua] = useState(0);
  const [contagemCaminhada, setContagemCaminhada] = useState(0);
  const [metaCaminhada, setMetaCaminhada] = useState(0);
  const [contagemSono, setContagemSono] = useState(0);
  const [metaSono, setMetaSono] = useState(0);

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
              height: "25%",
              shadowColor: '#000',
              alignItems: "center",
              padding: 25,
              borderRadius: 16,
              color: "#666666"}}
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
            <TouchableOpacity style={styles.botaoAgua}>
              <Ionicons name="add-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
       

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
           <TouchableOpacity style={styles.botaoCam}>
             <Ionicons name="add-outline" size={24} color="#B91B1B" />
           </TouchableOpacity>
         </View>
         
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
            <TouchableOpacity style={styles.botaoSono}>
              <Ionicons name="add-outline" size={24} color="#099747" />
            </TouchableOpacity>
            </View>
       </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 20
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
    color: "white",
    fontSize: 20,
    marginTop: 20,
  },

  tituloCard: {
    color: "white",
    alignItems: "center",
  },

  contagemDias: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },

  textoMotivacional: {
    alignSelf: "center",
    color: "#666666",
    fontSize: 12,
  },

  tarefas: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
    tarefas2: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'column  ',
    gap: 10,
  },

  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '50%',
    shadowColor: '#000',
    fontFamily: 'poppins',
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
    fontFamily: 'poppins',
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
    fontFamily: 'poppins',
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
    fontFamily: 'poppins',
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
});