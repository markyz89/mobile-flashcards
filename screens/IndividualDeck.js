import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'


class IndividualDeck extends Component {
 
    render() {

        return(
            <View style={styles.container}>
                <Text style={styles.heading}>{this.props.route.params.deckName}</Text>
                <Text style={styles.subheading} >{this.props[this.props.route.params.deckName].questions.length} cards</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Add Card', {
                        deckName: this.props.route.params.deckName,
                    })}
                    > 
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Quiz View', {
                        deckName: this.props.route.params.deckName,
                    })}
                >
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
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

function mapStateToProps(state){
    return state
}



export default connect(mapStateToProps)(IndividualDeck)