import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const novaMeta = () => {
  const [category, setCategory] = useState('Água');
  const [value, setValue] = useState('');
  const [period, setPeriod] = useState('Diária');

  const saveGoal = () => {
    if (!value || value <= 0) {
      alert('Por favor, insira um valor maior que 0.');
      return;
    }
    alert(`Meta salva: ${value} ${category === 'Água' ? 'L' : category === 'Caminhada' ? 'km' : 'h'} ${period}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Meta</Text>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.categoryButton, category === 'Água' && styles.activeButton]}
            onPress={() => setCategory('Água')}>
            <Ionicons name="water-outline" size={20} color="#007AFF" />
            <Text style={styles.buttonText}>Água</Text>
            <Text style={styles.subText}>L</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, category === 'Caminhada' && styles.activeButton]}
            onPress={() => setCategory('Caminhada')}>
            <Ionicons name="walk-outline" size={20} color="#B91B1B" />
            <Text style={styles.buttonText}>Caminhada</Text>
            <Text style={styles.subText}>Km</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, category === 'Sono' && styles.activeButton]}
            onPress={() => setCategory('Sono')}>
            <Ionicons name="moon-outline" size={20} color="#099747" />
            <Text style={styles.buttonText}>Sono</Text>
            <Text style={styles.subText}>Hr</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
          placeholder="40"
          placeholderTextColor="#888"
        />
        <Text style={styles.label}>Período</Text>
        <View style={styles.periodContainer}>
          {['Diária', 'Semanal', 'Mensal', 'Total'].map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.periodButton, period === p && styles.activeButton]}
              onPress={() => setPeriod(p)}>
              <Text style={styles.buttonText}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={saveGoal}>
            <Text style={styles.saveBbuttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101010', padding: 20 },
  title: { color: '#FFF', fontFamily: 'poppins', fontSize: 24, textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#1C1C1E', borderRadius: 16, padding: 20 },
  label: { color: '#FFF', fontSize: 16, marginBottom: 10, fontFamily: 'poppins' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  categoryButton: { padding: 10, borderRadius: 8, backgroundColor: '#333', flex: 1, alignItems: 'center', marginHorizontal: 5 },
  activeButton: { backgroundColor: '#020202', },
  buttonText: { color: '#fff', fontSize: 14, fontFamily: 'poppins',},
  cancelButtonText: { color: '#FF2D2D', fontSize: 14, fontFamily: 'poppins', },
  saveBbuttonText: { color: '#2DFF92', fontSize: 14, fontFamily: 'poppins', },
  input: { backgroundColor: '#101010', color: '#FFF', border: '1px solid #FFF', padding: 10, borderRadius: 8, marginBottom: 20 },
  periodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  periodButton: { padding: 10, borderRadius: 8, backgroundColor: '#333', flex: 1, alignItems: 'center', marginHorizontal: 5 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelButton: { backgroundColor: '#280202', fontFamily: 'poppins', padding: 10, borderRadius: 8, flex: 1, alignItems: 'center', marginRight: 5 },
  saveButton: { backgroundColor: '#053320', fontFamily: 'poppins', padding: 10, borderRadius: 8, flex: 2, alignItems: 'center' },
  subText: { color: '#888', fontSize: 12, fontFamily: 'poppins' },
});

export default novaMeta;