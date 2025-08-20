import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking, Alert } from 'react-native';

const Configuracoes = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Configurações</Text>
        <Image source={require('../assets/UBetter.png')} style={styles.logo} />
        <TouchableOpacity
          style={styles.logoutButton}
        >
          <Text style={styles.logoutButtonText}>Sair do aplicativo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'poppins',
    marginBottom: 10,
  },
  logo: {
    width: '50%',
    height: 100,
    resizeMode: 'contain', // ou contentFit: 'contain' no Expo
    marginBottom: 20,
  },
  actionButton: {
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  actionButtonText: { color: '#FFF', fontSize: 16, fontFamily: 'poppins' },
  logoutButton: {
    width: '100%',
    backgroundColor: '#280202',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  logoutButtonText: { color: '#FF2D2D', fontSize: 16, fontFamily: 'poppins' },
});

export default Configuracoes;