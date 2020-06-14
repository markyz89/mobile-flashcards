import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import Question from '../components/Question'


class QuizView extends Component {
    
    render() {
        const { deck } = this.props
        
            return(
                <View style={styles.container}>
                    <Question deck={deck} navigation={this.props.navigation} />
                </View>
                
            )
    }
    
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 40,
       
      }
})

function mapStateToProps(state, props) {

    const deck = state[props.route.params.deckName]
    
    return {
        deck
    }
}

export default connect(mapStateToProps)(QuizView)