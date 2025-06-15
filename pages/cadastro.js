import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Image } from 'react-native';


const TelaCadastro = ({ navigation }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    return (
        <>


            <View style={styles.container}>
                <View style={styles.topo}>
                    <Image source={require('../assets/UBetter.png')} style={styles.logo} />
                </View>

                <View style={styles.formulario}>
                    <Text style={styles.coisa}>Nome</Text>
                    <TextInput style={styles.input} keyboardType="text" placeholder="Nome" valuevalue={nome}
                        onChangeText={setNome} />

                    <Text style={styles.coisa}>Email</Text>
                    <TextInput style={styles.input} keyboardType="email-address" placeholder="Email" value={email}
                        onChangeText={setEmail} />

                    <Text style={styles.coisa}>Senha</Text>
                    <TextInput style={styles.input} keyboardType="text" placeholder="Senha" value={senha}
                        onChangeText={setSenha} />

                    <Text style={styles.coisa}>Confirmar senha</Text>
                    <TextInput style={styles.input} placeholder="Senha" value={confirmarSenha}
                        onChangeText={setConfirmarSenha} secureTextEntry />

                    <TouchableOpacity style={styles.botao}>
                        <Text style={styles.textoBotao}>Cadastrar</Text>
                    </TouchableOpacity>
                    <Text style={styles.coisa2}>Já tem uma conta? {' '}
                        <Text style={{ color: '#099747' }} onPress={() => navigation.navigate('Login')}>Logar.</Text>{' '}</Text>

                    <TouchableOpacity>
                        <Text style={styles.link} onPress={() => navigation.navigate('App')}>
                            Permanecer sem conta
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
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
        paddingBottom: 4,
        fontSize: 16,
        color: 'white',
        textAlign: "left"
    },
    coisa2: {
        fontSize: 14,
        color: 'white',
        textAlign: "center"
    },
    link: {
        marginTop: 20,
        textAlign: 'center',
        color: '#ddd',
        fontWeight: 700,
    },
    titulo: {
        paddingTop: 20,
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
        },

    textoBotao: {
        fontSize: 20,
        fontWeight: 'semi-bold',
        color: '#2DFF92',
    }
})
export default TelaCadastro;