import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const Perfil = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações do Perfil</Text>
        <Image style={styles.profileImage} />
        <Text style={styles.profileName}>Nome do usuário</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => Alert.alert('Editar Perfil', 'Em desenvolvimento')}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Conquistas</Text>
        <View style={styles.achievementsContainer}>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>Água</Text>
            <Image
              source={require('../assets/trofeu-dourado-isolado-em-fundo-transparente 1.png')}
              style={styles.trophyImage}
            />
            <Text style={styles.achievementDescription}>Completou a meta 10 vezes consecutivas</Text>
          </View>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>Caminhada</Text>
            <Image
              source={require('../assets/10603705_42828-removebg-preview 1.png')}
              style={styles.medalImage}
            />
            <Text style={styles.achievementDescription}>Completou a meta 10 vezes consecutivas</Text>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações Pessoais</Text>
        <View style={styles.personalInfoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Peso</Text>
            <TextInput style={styles.infoInput} placeholder="Ex: 70 kg" placeholderTextColor="#666" />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Altura</Text>
            <TextInput style={styles.infoInput} placeholder="Ex: 1.80 m" placeholderTextColor="#666" />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Idade</Text>
            <TextInput style={styles.infoInput} placeholder="Ex: 30 anos" placeholderTextColor="#666" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'poppins',
    marginBottom: 10,
  },
  profileSection: { alignItems: 'center' },
  profileImage: {
    width: 100,
    height: 100,
    backgroundColor: '#555',
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'poppins',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#099747',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'poppins',
  },
  achievementsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  achievementCard: {
    backgroundColor: '#222',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    width: '48%',
  },
  achievementTitle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'poppins',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  trophyImage: { width: 80, height: 80, marginBottom: 10 },
  medalImage: { width: 80, height: 80, marginBottom: 10 },
  achievementDescription: {
    color: '#aaa',
    fontSize: 14,
    fontFamily: 'poppins',
    textAlign: 'center',
  },
  personalInfoContainer: { marginTop: 10, width: '100%' },
  infoRow: { display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  infoLabel: {
    color: '#FFF',
    fontFamily: 'poppins',
    fontSize: 16,
    alignContent: 'center',
    fontWeight: 'bold',
  },
  infoInput: {
    width: 150,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#FFF',
  },
});

export default Perfil;