import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from './pages/home';
import Perfil from './pages/perfil';
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import NovaMeta from './pages/nova-meta';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0071fe"
      }}>
        <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ({color, size}) => (
          <Ionicons name="home-outline"
           color={color}
           size={size}
           />
        )}} />
        <Tab.Screen name="Perfil" component={Perfil} options={{tabBarIcon: ({color, size}) => (
          <Ionicons name="person-outline"
           color={color}
           size={size}
           />
        )}} />
        <Tab.Screen name="NovaMeta" component={NovaMeta} options={{tabBarIcon: ({color, size}) => (
          <Ionicons name="add-outline"
           color={color}
           size={size}
           />
        )}} />
      </Tab.Navigator>
    </NavigationContainer>  
  )
}