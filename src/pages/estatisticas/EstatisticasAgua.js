import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const WaterScreen = () => (
  <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>

    {/*Card - Água consumida hoje*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Água hoje</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="water-outline" size={24} color="#007AFF" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>20L</Text>
        <Text style={styles.targetText}>de 40L</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '50%' }]} />
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>

    {/*Card - Água consumida na semana*/}
    <View style={styles.card}>
      <View style={styles.weeklyCardHeader}>
        <Text style={styles.weeklyCardTitle}>Água consumida na semana</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="water-outline" size={24} color="#007AFF" />
        </View>
      </View>
      <Text style={styles.weeklyTotalConsumption}>100L</Text>
      <View style={styles.barChartContainer}>
        {[
          { label: 'S', height: 40 },
          { label: 'T', height: 70 },
          { label: 'Q', height: 20 },
          { label: 'Q', height: 90 },
          { label: 'S', height: 75 },
          { label: 'S', height: 30 },
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
          { day: 'Segunda', amount: '20L' },
          { day: 'Terça', amount: '20L' },
          { day: 'Quarta', amount: '20L' },
          { day: 'Quinta', amount: '20L' },
          { day: 'Sexta', amount: '20L' },
          { day: 'Sábado', amount: '20L' },
          { day: 'Domingo (hoje)', amount: '20L' },
        ].map((item, index) => (
          <View key={index} style={styles.dailyListItem}>
            <Text style={styles.dailyListDay}>{item.day}</Text>
            <Text style={styles.dailyListAmount}>{item.amount}</Text>
          </View>
        ))}
      </View>
    </View>

    {/*Card - Água meta*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Meta definida</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="water-outline" size={24} color="#007AFF" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>20L Diários</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>

    {/*Card - Água consumida no ultimo mês*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Água consumida no ultimo mês</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="water-outline" size={24} color="#007AFF" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>1000L</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>

    {/*Card - Água consumida desde o início*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Água consumida desde o início</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="water-outline" size={24} color="#007AFF" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>2000L</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="#007AFF" />
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
    fontFamily: 'poppins',
    fontWeight: 'regular',
  },
  cardIcon: {
    backgroundColor: '#0A84FF20',
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
    marginInline: "2px",
    flex: 1,
  },
  bar: {
    width: '100%',
    backgroundColor: '#007AFF',
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

export default WaterScreen;