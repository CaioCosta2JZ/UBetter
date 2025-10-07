import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { auth, db } from "../config/firebase";
import { ref, onValue, update } from "firebase/database";

const Perfil = () => {
  const [usuario, setUsuario] = useState({
    nome: "",
    peso: "",
    altura: "",
    idade: "",
  });

  useEffect(() => {
    const user = auth.currentUser; // usuário logado
    if (user) {
      const usuarioRef = ref(db, "usuarios/" + user.uid);

      // Escuta em tempo real
      onValue(usuarioRef, (snapshot) => {
        if (snapshot.exists()) {
          setUsuario(snapshot.val());
        } else {
          console.log("Nenhum dado encontrado para este usuário");
        }
      });
    }
  }, []);

  const handleSalvar = () => {
    const user = auth.currentUser;
    if (!user) return;

    const usuarioRef = ref(db, "usuarios/" + user.uid);
    update(usuarioRef, {
      nome: usuario.nome,
      peso: usuario.peso,
      altura: usuario.altura,
      idade: usuario.idade,
    })
      .then(() => Alert.alert("Sucesso", "Informações atualizadas!"))
      .catch((err) => Alert.alert("Erro", err.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações do Perfil</Text>
        <Image style={styles.profileImage} />
        <Text style={styles.profileName}  value={usuario.nome}></Text>
        <TouchableOpacity style={styles.editButton} onPress={handleSalvar}>
          <Text style={styles.editButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações Pessoais</Text>
        <View style={styles.personalInfoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Peso</Text>
            <TextInput
              style={styles.infoInput}
              value={usuario.peso}
              onChangeText={(text) => setUsuario({ ...usuario, peso: text })}
              placeholder="Ex: 70 kg"
              placeholderTextColor="#666"
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Altura</Text>
            <TextInput
              style={styles.infoInput}
              value={usuario.altura}
              onChangeText={(text) => setUsuario({ ...usuario, altura: text })}
              placeholder="Ex: 1.80 m"
              placeholderTextColor="#666"
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Idade</Text>
            <TextInput
              style={styles.infoInput}
              value={usuario.idade}
              onChangeText={(text) => setUsuario({ ...usuario, idade: text })}
              placeholder="Ex: 30 anos"
              placeholderTextColor="#666"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'arial',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    backgroundColor: '#555',
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'arial',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#099747',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'arial',
  },
  personalInfoContainer: { marginTop: 10, width: '100%' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  infoLabel: {
    color: '#FFF',
    fontFamily: 'arial',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  infoInput: {
    width: 150,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#FFF',
  },
});

export default Perfil;
