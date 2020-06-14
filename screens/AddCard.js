import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native';

import { addQuestion } from '../actions';

const QUESTION_KEY = 'questions'


class AddCard extends Component {

    constructor() {
        super()
        this.state = {
            question: '',
            answer: ''
        }
        this.handleText = this.handleText.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleText(name, value) {
        this.setState({
            [name]: value
        })
    }

    handleSubmit(value){
        let question = {
            question: this.state.question,
            answer: this.state.answer,
            deck: this.props.route.params.deckName
        }

        this.props.addQuestion(question)

        //let questions = this.props.decks[this.props.route.params.deckName].questions.concat(question)

        let questions = []
        Object.values(this.props.decks).forEach((item) => {
            item.questions.forEach((q) => {
                questions.push(q)
            })
        })

        questions = questions.concat(question)


        this._storeData(questions)
        this.props.navigation.goBack()
    }

    _storeData = async (questions) => {
        try {
          await AsyncStorage.setItem(
            QUESTION_KEY,
            JSON.stringify(questions)
          );
        } catch (error) {
          // Error saving data
          console.log(error)
        }
      };

    

    
    render() {

        return(
            <View style={styles.container}>
                <Text>Enter your question</Text>
                <TextInput 
                    style={styles.border}
                    multiline = {true}
                    numberOfLines = {2}
                    value={this.state.question}
                    onChangeText = {(text) => this.handleText("question", text)}
                />
                <Text>Enter the answer to this question</Text>
                <TextInput
                    style={styles.border}
                    multiline = {true}
                    numberOfLines = {4}
                    value={this.state.answer}
                    onChangeText = {(text) => this.handleText("answer", text)}
                />
                <TouchableOpacity 
                    style={styles.button, styles.greenButton}
                    onPress={this.handleSubmit}    
                >
                    <Text style={{color:'#fff'}}>Submit</Text>
                </TouchableOpacity>
            </View>
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
    border: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        marginHorizontal: 20
    },
    button: {
        
    },
    greenButton: {
        backgroundColor: 'green',
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 40,
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
        addQuestion: (question) => {dispatch(addQuestion(question))}
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(AddCard)