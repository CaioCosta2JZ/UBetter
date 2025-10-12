import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Perfil from './perfil';
import Configuracoes from './configuracoes';


const PerfilScreen = () => {
  const [activeScreen, setActiveScreen] = useState('Perfil');

  return (
    <View style={styles.appContainer}>
      <Text style={styles.titleScreen}>Meu Perfil</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeScreen === 'Perfil' && styles.activeButton]}
          onPress={() => setActiveScreen('Perfil')}
        >
          <Text style={[styles.buttonText, activeScreen === 'Perfil' && styles.activeText]}>
            Perfil
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeScreen === 'Configuracoes' && styles.activeButton]}
          onPress={() => setActiveScreen('Configuracoes')}
        >
          <Text style={[styles.buttonText, activeScreen === 'Configuracoes' && styles.activeText]}>
            Configurações
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeScreen === 'Perfil' && <Perfil />}
        {activeScreen === 'Configuracoes' && <Configuracoes />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: { flex: 1, backgroundColor: '#101010' },
  titleScreen: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'arial',
    marginVertical: 20,
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeButton: { backgroundColor: '#FFF' },
  buttonText: { color: '#FFF', fontSize: 16, fontFamily: 'arial' },
  activeText: { color: '#000' },
  scrollContent: { flexGrow: 1, paddingBottom: 80 },
});
export default PerfilScreen;