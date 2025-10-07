import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const TelaLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.trim(), senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuário logado:", user.email);
        navigation.navigate("App"); // redireciona após login
      })
      .catch((error) => {
        console.error(error.code, error.message);
        Alert.alert("Erro ao entrar", "Verifique email e senha.");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Image source={require('../../assets/UBetter.png')} style={styles.logo} />
      </View>

      <View style={styles.formulario}>
        <Text style={styles.coisa}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.coisa}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={login}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.coisa2}>
          Não tem conta?{" "}
          <Text style={{ color: '#099747' }} onPress={() => navigation.navigate('Cadastro')}>
            Crie uma.
          </Text>
        </Text>

        <TouchableOpacity>
          <Text style={styles.link} onPress={() => navigation.navigate('App')}>
            Permanecer sem conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#101010' },
  logo: { width: '50%', height: 100, resizeMode: 'center', marginBottom: 20 },
  coisa: { fontSize: 16, color: 'white', textAlign: "left" },
  coisa2: { fontSize: 14, color: 'white', textAlign: "center" },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#9B9B9B',
    color: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  topo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#101010',
    paddingBottom: 60,
  },
  formulario: { paddingTop: 50, padding: 10, width: '100%', flex: 2 },
  botao: {
    height: 50,
    width: 200,
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#053320",
    alignSelf: 'center',
  },
  link: { marginTop: 20, textAlign: 'center', color: '#ddd', fontWeight: "700" },
  textoBotao: { fontSize: 20, fontWeight: '600', color: '#2DFF92' }
});

export default TelaLogin;
