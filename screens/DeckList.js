import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native';

import ListDeck from '../components/ListDeck'
import { getDecks, getCards } from '../actions';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();


const QUESTION_KEY = 'questions'
const DECK_KEY = 'decks'

class DeckList extends Component {

    componentDidMount() {
        this._retrieveData()
    }

    _retrieveData = async () => {
        try {
          const questionValue = await AsyncStorage.getItem(QUESTION_KEY);
          const deckValue = await AsyncStorage.getItem(DECK_KEY);

          if (deckValue !== null) {
            // We have data!!

            this.props.getDecks(JSON.parse(deckValue))
          }

          if (questionValue !== null) {
            // We have data!!

            this.props.getCards(JSON.parse(questionValue))
          }

          
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
      };


    render() {
        let decks = Object.keys(this.props.decks)

        return (
            <View style={styles.container}>
            <FlatList
                style={styles.container}
                data={decks}
                keyExtractor={(item, index) => item}                
                renderItem={
                    ({item}) => 
                    
                    <ListDeck 
                        name={item}
                        size={this.props.decks[item].questions.length}
                        
                    /> } 
            />
            </View>
            
        )
                
    }
    
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: 40,
     
    },
  });
  



function mapStateToProps(state) {
    return {
        decks: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDecks: (decks) => {dispatch(getDecks(decks))},
        getCards: (cards) => {dispatch(getCards(cards))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)