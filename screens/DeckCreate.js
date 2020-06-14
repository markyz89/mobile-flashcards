import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux'

import { addDeck } from '../actions';

const DECK_KEY = 'decks'

class DeckCreate extends Component {

    constructor() {
        super()
        this.state = {
            deckName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(){
        let deck = this.state.deckName

        this.props.addDeck(deck)
        //async storage
        
        let deckState = this.props.decks

        console.log(decks)

        let decks = Object.assign(
            {...deckState},
                {[deck]:{
                title: deck,
                questions: [],
            }}
        )
        

        this._storeData(decks)

        this.props.navigation.navigate('Individual Deck', {
            deckName: this.state.deckName,
            // deckSize: props.size
        })
    }

    handleChange(event){
        this.setState({
            deckName: event.target.value
        })
    }

    _storeData = async (decks) => {
        try {
          await AsyncStorage.setItem(
            DECK_KEY,
            JSON.stringify(decks)
          );
        } catch (error) {
          // Error saving data
          console.log(error)
        }
      };

    
    render() {

        return(
            <View style={styles.container}>
            <Text style={styles.heading}>What is the title of your new deck?</Text>
            <TextInput 
                style={styles.border}
                value={this.state.deckName}
                onChange={this.handleChange}
            />
            <TouchableOpacity 
                style={styles.blueButton}
                onPress={this.handleSubmit}    
            >
                <Text style={{color:'#fff'}}>Create Deck</Text>
            </TouchableOpacity>
        </View>
        )
    }
    
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 40,
        paddingHorizontal: 10,
    },
    heading:{
        fontSize: 20,
        alignItems: 'center'
    },
    border: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    blueButton: {
        backgroundColor: 'blue',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
    },
})

function mapStateToProps(state) {
    return {
        decks: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addDeck: (deck) => {dispatch(addDeck(deck))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeckCreate)