import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { db, auth } from "../config/firebase";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

const TelaCadastro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const salvarUsuario = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    // 1. Criar usuário no Auth
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;

        // 2. Salvar dados no Realtime Database usando o UID
        set(ref(db, "usuarios/" + user.uid), {
          nome: nome,
          email: email,
          criadoEm: new Date().toISOString()
        })
          .then(() => {
            Alert.alert("Sucesso", "Usuário cadastrado com sucesso");
            setNome("");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");
            navigation.navigate("InfoPessoais"); // ir para próxima tela
          })
          .catch((error) => {
            Alert.alert("Erro ao salvar no banco", error.message);
          });
      })
      .catch((error) => {
        Alert.alert("Erro no cadastro", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Image source={require('../../assets/UBetter.png')} style={styles.logo} />
      </View>

      <View style={styles.formulario}>
        <Text style={styles.coisa}>Nome</Text>
        <TextInput style={styles.input} placeholder="Nome" value={nome}
          onChangeText={setNome} />

        <Text style={styles.coisa}>Email</Text>
        <TextInput style={styles.input} keyboardType="email-address" placeholder="Email" value={email}
          onChangeText={setEmail} />

        <Text style={styles.coisa}>Senha</Text>
        <TextInput style={styles.input} placeholder="Senha" value={senha}
          onChangeText={setSenha} secureTextEntry />

        <Text style={styles.coisa}>Confirmar senha</Text>
        <TextInput style={styles.input} placeholder="Confirmar senha" value={confirmarSenha}
          onChangeText={setConfirmarSenha} secureTextEntry />

        <TouchableOpacity style={styles.botao} onPress={salvarUsuario}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>

        <Text style={styles.coisa2}>Já tem uma conta?{" "}
          <Text style={{ color: '#099747' }} onPress={() => navigation.navigate('Login')}>
            Logar.
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
    container: {
        fontFamily: 'arial',
        flex: 1,
        height: "100%",
        backgroundColor: '#101010',

    },
    logo: {
        width: '50%',
        paddingTop: 20,
        height: 100,
        resizeMode: 'center', // ou contentFit: 'contain' no Expo
        marginBottom: 20,
    },
    coisa: {
        fontFamily: 'arial',
        fontSize: 16,
        color: 'white',
        textAlign: "left"
    },
    coisa2: {
        fontSize: 14,
        color: 'white',
        textAlign: "center"
    },
    titulo: {
        fontFamily: 'arial',
        fontSize: 30,
        color: 'white',

    },

    input: {
        padding: 20,
        height: 50,
        width: "100%",
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#9B9B9B',
        color: '#fff',
        marginBottom: 10,
        paddingHorizontal: 5,
        placeholderTextColor: '#1E1C1C',
        alignSelf: 'center',
        fontFamily: 'arial',
    },
    topo: {
     
        flex: 1,
        width: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#101010',
        paddingBottom: 60,
    },
    formulario: {
        fontFamily: 'arial',
        paddingTop: 50,
        padding: 10,
        width: '100%',
        height: "100%",
        justifyContent: 'flex-start',
    },

    botao: {
        height: 50,
        width: 200,
        borderRadius: 5,
        opacity: 0.5,
        marginTop: 25,
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#053320",
        alignSelf: 'center',
        fontFamily: 'arial',
    },
     link: {
        marginTop: 20,
        textAlign: 'center',
        color: '#ddd',
        fontWeight: 700,
     
    },
    textoBotao: {
        fontSize: 20,
        fontWeight: 'semi-bold',
        color: '#2DFF92',
    }
})

export default TelaCadastro;
