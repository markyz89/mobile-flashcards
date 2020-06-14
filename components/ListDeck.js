import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native';

export default function ListDeck (props) {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Individual Deck', {
                    deckName: props.name,
                })}>
                <Text style={styles.heading}>{props.name}</Text>
                <Text style={styles.subheading} >{props.size} cards</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20
    },
    heading:{
        fontSize: 20,
        alignItems: "center",
    },
    subheading:{
        fontSize: 15,
        textAlign: 'center',
    }
})