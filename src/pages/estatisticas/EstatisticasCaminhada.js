import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const WalkScreen = () => (
  <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>

    {/*Card - Caminhada feita hoje*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Caminhada hoje</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="walk-outline" size={24} color="#B91B1B" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>20km</Text>
        <Text style={styles.targetText}>de 40km</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '50%' }]} />
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="#B91B1B" />
      </TouchableOpacity>
    </View>

    {/*Card - Caminhada feita na semana*/}
    <View style={styles.card}>
      <View style={styles.weeklyCardHeader}>
        <Text style={styles.weeklyCardTitle}>Caminhada feita na semana</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="walk-outline" size={24} color="#B91B1B" />
        </View>
      </View>
      <Text style={styles.weeklyTotalConsumption}>10km</Text>
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
          { day: 'Segunda', amount: '20km' },
          { day: 'Terça', amount: '20km' },
          { day: 'Quarta', amount: '20km' },
          { day: 'Quinta', amount: '20km' },
          { day: 'Sexta', amount: '20km' },
          { day: 'Sábado', amount: '20km' },
          { day: 'Domingo (hoje)', amount: '20km' },
        ].map((item, index) => (
          <View key={index} style={styles.dailyListItem}>
            <Text style={styles.dailyListDay}>{item.day}</Text>
            <Text style={styles.dailyListAmount}>{item.amount}</Text>
          </View>
        ))}
      </View>
    </View>

    {/*Card - Caminhada meta*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Meta definida</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="walk-outline" size={24} color="#B91B1B" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>20km Diários</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="#B91B1B" />
      </TouchableOpacity>
    </View>

    {/*Card - Caminhada feita no ultimo mês*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Caminhada feita no ultimo mês</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="walk-outline" size={24} color="#B91B1B" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>100km</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="#B91B1B" />
      </TouchableOpacity>
    </View>

    {/*Card - Caminhada feita desde o início*/}
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Caminhada feita desde o início</Text>
        <View style={styles.cardIcon}>
          <Ionicons name="walk-outline" size={24} color="#B91B1B" />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.valueText}>2000km</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-outline" size={24} color="#B91B1B" />
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
    backgroundColor: '#6F0F0F',
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
    backgroundColor: '#B91B1B',
    borderRadius: 3,
  },
  addButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#6F0F0F',
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
    backgroundColor: '#B91B1B',
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
    paddingVertical: 15,
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

export default WalkScreen;