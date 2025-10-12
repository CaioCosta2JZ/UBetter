import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthNavigator = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário está logado - vai para Home
        navigation.reset({
          index: 0,
          routes: [{ name: 'App' }], 
        });
      } else {
        // Usuário não está logado - vai para Login
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
      setLoading(false);
    });

    // Cleanup
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#099747" />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default AuthNavigator;