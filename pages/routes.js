import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './home';
import NovaMeta from './nova-meta';
import Estatisticas from './estatisticas';
import PerfilScreen from './perfilScreen';
import TelaLogin from './login';
import TelaCadastro from './cadastro';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabApp() {
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#099747',
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#000',
            elevation: 0,
            height: 60,
            border: "none",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Nova Meta"
          component={NovaMeta}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Estatisticas"
          component={Estatisticas}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}
export default function Routes() {
  return  (
    <Stack.Navigator  
      screenOptions={{ headerShown: false }}
      initialRouteName="Cadastro">
      <Stack.Screen
        name="Login"
        component={TelaLogin}
         
      />
      <Stack.Screen
        name="Cadastro"
        component={TelaCadastro}
      
      />
      <Stack.Screen
        name="App"
        component={TabApp}
      
      />
    </Stack.Navigator>
  );
}