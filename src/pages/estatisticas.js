import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WaterScreen from './estatisticas/EstatisticasAgua';
import WalkScreen from './estatisticas/EstatisticasCaminhada';
import SleepScreen from './estatisticas/EstatisticasSono';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('Água'); // Default screen

  return (
    <View style={styles.appContainer}>
      <View>
        <Text style={styles.titleScreen}>Estatísticas</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeScreen === 'Água' && styles.activeButton]}
          onPress={() => setActiveScreen('Água')}>
          <Text style={[styles.buttonText, activeScreen === 'Água' && styles.activeText]}>Água</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeScreen === 'Caminhada' && styles.activeButton]}
          onPress={() => setActiveScreen('Caminhada')}>
          <Text style={[styles.buttonText, activeScreen === 'Caminhada' && styles.activeText]}>Caminhada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeScreen === 'Sono' && styles.activeButton]}
          onPress={() => setActiveScreen('Sono')}>
          <Text style={[styles.buttonText, activeScreen === 'Sono' && styles.activeText]}>Sono</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Rendering of Screens */}
      {activeScreen === 'Água' && <WaterScreen />}
      {activeScreen === 'Caminhada' && <WalkScreen />}
      {activeScreen === 'Sono' && <SleepScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  titleScreen: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'arial',
    marginVertical: 20,
    fontSize: 24,
  },
  appContainer: { 
    flex: 1, 
    backgroundColor: '#101010', 
    paddingBottom: "70px", 
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    paddingInline: '20px',
    flexDirection: 'row',
    fontFamily: 'arial',
    justifyContent: 'space-between',
  },
  button: {
    border: '1px solid white',
    display: 'flex',
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  activeButton: {
    display: 'flex',
    color: '#000',
    fontFamily: 'arial',
    backgroundColor: '#fff',
  },
  activeText: { color: '#000' },
  buttonText: { color: '#FFF', fontSize: 16 },
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#000', padding: 20 },
  title: { color: '#FFF', fontSize: 20, marginBottom: 20 },
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
    backgroundColor: '#0A84FF20',
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
    fontWeight: 'bold',
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
    height: 100,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: '70%',
    maxWidth: 25,
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
    paddingVertical: 10,
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

export default App;