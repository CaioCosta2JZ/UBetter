import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function TelaPerfil() {
    return (
        <>
            <View style={styles.topo}>
                <Text style={styles.titulo}>Perfil</Text>
            </View>

            <View style={styles.container}>


                <View style={styles.formulario}>
                    <Text style={styles.coisa}>Nome</Text>
                    <TextInput style={styles.input} keyboardType="text" />
                    <Text style={styles.coisa}>Email</Text>
                    <TextInput style={styles.input} keyboardType="text" />
                    <Text style={styles.coisa}>Senha</Text>
                    <TextInput style={styles.input} keyboardType="text" />
                    <Text style={styles.coisa}>Confirmar senha</Text>
                    <TextInput style={styles.input} keyboardType="text" />
                    <TouchableOpacity style={styles.botao}>
                        <Text style={styles.textoBotao}>Cadastrar</Text>
                    </TouchableOpacity>
                    <Text style={styles.coisa2}>Não tem conta?</Text>
                </View>

            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',

    },
    coisa: {
        fontSize: 16,
        color: 'white',
        textAlign: "left"
    },
     coisa2: {
        fontSize: 14,
        color: 'white',
        textAlign: "left"
    },
    titulo: {
        fontSize: 30,
        color: 'white',

    },

    input: {
        paddingTop: 20,
        height: 50,
        width: 200,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#fff',
        color: '#fff',
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    topo: {
        flex: 1,
        width: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    formulario: {
        height: 100,
        justifyContent: 'center',
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
        backgroundColor: "green"
    },

    textoBotao: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})