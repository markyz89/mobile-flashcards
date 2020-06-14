import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import reducers from './reducers';
import logger from 'redux-logger'

import IndividualDeck from './screens/IndividualDeck'
import AddCard from './screens/AddCard'
import QuizView from './screens/QuizView'
import Home from './screens/Home'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

export default function App() {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(reducers, composeEnhancers(
    applyMiddleware(
      logger
    )
  ))

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Individual Deck" component={IndividualDeck} />
            <Stack.Screen name="Add Card" component={AddCard} />
            <Stack.Screen name="Quiz View" component={QuizView} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
