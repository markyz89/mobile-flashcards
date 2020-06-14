import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function QuizComplete (props) {
    const navigation = useNavigation()

    return (
        <React.Fragment>
            <Text style={styles.heading}>Well Done! You Finished!</Text>
            <Text>You got {props.correctAnswers} correct!</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('Quiz View', {
                deckName: props.deckName,
            })}
            >
                <Text>Take the quiz again?</Text>
            </TouchableOpacity>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    heading:{
        fontSize: 20,
    },
})