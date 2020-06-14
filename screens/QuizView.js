import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import Question from '../components/Question'


class QuizView extends Component {
    
    render() {
        const { deck,} = this.props
        console.log(deck)
        
        return(
            <Question deck={deck} navigation={this.props.navigation} />
        )
    }
    
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 40,
       
      },
    heading:{
        fontSize: 20,
    },
    button: {
        backgroundColor: 'green',
        padding: 5,
    }
})

function mapStateToProps(state, props) {

    const deck = state[props.route.params.deckName]
    console.log(props)
    
    return {
        deck
    }
}

export default connect(mapStateToProps)(QuizView)