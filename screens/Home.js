import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DeckCreate from './DeckCreate'
import DeckList from './DeckList';

const Tab = createBottomTabNavigator();

class Home extends Component {
    
    render() {
        return(

            <Tab.Navigator>
                <Tab.Screen name="Deck List" component={DeckList} />
                <Tab.Screen name="Deck Create" component={DeckCreate}/>
            </Tab.Navigator>
            
        )
    }
    
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    heading:{
        fontSize: 20,
    },
    subheading:{
        fontSize: 15
    }
})

export default Home