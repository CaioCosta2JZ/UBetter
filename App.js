import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Image, ScrollView } from "react-native";



class App extends Component {

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 300,
    height : 300,
  }
  
});

export default App;
