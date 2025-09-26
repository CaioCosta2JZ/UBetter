import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Image } from 'react-native';


const TelaLogin = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    

    return (
        <>


            <View style={styles.container}>
                <View style={styles.topo}>
                    <Image source={require('../../assets/UBetter.png')} style={styles.logo} />
                </View>

                <View style={styles.formulario}>
                    <Text style={styles.coisa}>Email</Text>
                    <TextInput style={styles.input} placeholder="Email" keyboardType="text" value={email}
                        onChangeText={setEmail} />

                    <Text style={styles.coisa}>Senha</Text>
                    <TextInput style={styles.input} placeholder="Senha"value={senha}
                        onChangeText={setSenha} secureTextEntry />

                    <TouchableOpacity style={styles.botao}>
                        <Text style={styles.textoBotao}>Entrar</Text>
                    </TouchableOpacity>
                    <Text style={styles.coisa2} onPress={() => navigation.navigate('Cadastro')}>Não tem conta? {' '}
                        <Text style={{ color: '#099747' }} onPress={() => navigation.navigate('Cadastro')}>Crie uma.</Text>{' '}</Text>

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
export default TelaLogin;