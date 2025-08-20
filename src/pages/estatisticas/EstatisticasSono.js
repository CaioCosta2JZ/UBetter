import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const SleepScreen = () => (
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
        <Text style={styles.valueText}>6h</Text>
        <Text style={styles.targetText}>de 8h</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '75%' }]} />
      </View>
      <TouchableOpacity style={styles.addButton}>
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
      <Text style={styles.weeklyTotalConsumption}>32h</Text>
      <View style={styles.barChartContainer}>
        {[
          { label: 'S', height: 40 },
          { label: 'T', height: 60 },
          { label: 'Q', height: 30 },
          { label: 'Q', height: 80 },
          { label: 'S', height: 70 },
          { label: 'S', height: 20 },
          { label: 'D', height: 50 },
        ].map((bar, index) => (
          <View key={index} style={styles.barWrapper}>
            <View style={[styles.bar, { height: bar.height }]} />
            <Text style={styles.barLabel}>{bar.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.dailyListContainer}>
        {[
          { day: 'Segunda', amount: '6h' },
          { day: 'Terça', amount: '7h' },
          { day: 'Quarta', amount: '5h' },
          { day: 'Quinta', amount: '8h' },
          { day: 'Sexta', amount: '7h' },
          { day: 'Sábado', amount: '4h' },
          { day: 'Domingo (hoje)', amount: '6h' },
        ].map((item, index) => (
          <View key={index} style={styles.dailyListItem}>
            <Text style={styles.dailyListDay}>{item.day}</Text>
            <Text style={styles.dailyListAmount}>{item.amount}</Text>
          </View>
        ))}
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
        <Text style={styles.valueText}>8h por noite</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="#099747" />
      </TouchableOpacity>
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
        <Text style={styles.valueText}>50h</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="#099747" />
      </TouchableOpacity>
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
        <Text style={styles.valueText}>120h</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="#099747" />
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    fontFamily: 'poppins',
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
    fontFamily: 'poppins',
  },
  weeklyTotalConsumption: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'poppins',
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
    fontFamily: 'poppins',
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
    fontFamily: 'poppins',
  },
  dailyListAmount: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'poppins',
  },
});

export default SleepScreen;