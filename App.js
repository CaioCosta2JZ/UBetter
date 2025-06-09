import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Text, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from './pages/home.js';
import Perfil from './pages/perfil.js';
import Cadastro from './pages/cadastro.js';
import Login from './pages/login.js';
import NovaMeta from './pages/nova-meta.js';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}> {/* <-- fixed here */}
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#0071fe"
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen
            name="Perfil"
            component={Perfil}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen
            name="Login"
            component={Login}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen
            name="Cadastro"
            component={Cadastro}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              )
            }}
          />
          <Tab.Screen
            name="NovaMeta"
            component={NovaMeta}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-outline" color={color} size={size} />
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  }
});
