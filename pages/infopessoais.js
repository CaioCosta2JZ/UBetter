import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Image } from 'react-native';


const InfoPessoais = ({ navigation }) => {
    const [altura, setAltura] = useState("");
    const [peso, setPeso] = useState("");
    const [idade, setIdade] = useState("");

    return (
        <>


            <View style={styles.container}>
                <View style={styles.topo}>
                   <Text style={styles.titulo}>Nos fale um pouco mais sobre você</Text>
                   <Text style={styles.sub}>Precisamos dessas informações para saber as melhores metas para você, 
                    não se preocupe, é rapido!</Text>
                </View>

                <View style={styles.formulario}>
                    <Text style={styles.coisa}>Altura</Text>
                    <TextInput style={styles.input} keyboardType="text" placeholder="Altura em metros" value={altura}
                        onChangeText={setAltura} />

                    <Text style={styles.coisa}>Peso</Text>
                    <TextInput style={styles.input} keyboardType="text" placeholder="Peso em kg" value={peso}
                        onChangeText={setPeso} />

                    <Text style={styles.coisa}>Idade</Text>
                    <TextInput style={styles.input} keyboardType="text" placeholder="Senha" value={idade}
                        onChangeText={setIdade} />

                    <Text style={styles.coisa}>Pratica atividades físicas?</Text>
                    <View style={styles.coisa3}>
                    <TouchableOpacity style={styles.btnAtv}>
                        <Text style={styles.btnsim}>Sim</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnAtv}>
                        <Text style={styles.btnnao}>Não</Text>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.botao}>
                        <Text style={styles.textoBotao} onPress={() => navigation.navigate('App')}>Finalizar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Text style={styles.link} onPress={() => navigation.navigate('App')}>
                            Pular 
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
        paddingTop: 30,
         color: "white",
         fontSize: 20,
         fontWeight: 'bold',
    },
    sub: {
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
        color: '#8F8F8F',
        fontSize: 14 ,
        
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
        textAlign: 'center',
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
    coisa3: {
        flexDirection: 'row',
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

            btnAtv: {
            padding: 20,
            height: 50,
            width: "50%",
            borderRadius: 5,
            borderWidth: 2,
            opacity: 0.5,
            marginTop: 25,
            marginBottom: 25,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: "white",
            alignSelf: 'center',
        },
        btnnao:{
            color: 'white',
        },
        btnsim: {
            color: 'white',
        },

    textoBotao: {
        fontSize: 20,
        fontWeight: 'semi-bold',
        color: '#2DFF92',
    }
})
export default InfoPessoais;