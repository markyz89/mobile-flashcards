import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { answerQuestion } from '../actions';
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

import QuizComplete from './QuizComplete'
import { textChangeRangeIsUnchanged } from 'typescript';


class Question extends Component {

    constructor() {
        super()
        this.state = {
            answerShow: false,
            questionNumber: 0,
            answeredQuestions: [],
            complete: false,
            correctAnswers: 0
        }
        this.toggleAnswer = this.toggleAnswer.bind(this)
        this.handleCorrect = this.handleCorrect.bind(this)
        this.randomQuestion = this.randomQuestion.bind(this)
        this.resetQuiz = this.resetQuiz.bind(this)
    }

    componentWillMount() {
        this.randomQuestion()
    }

    randomQuestion(){
        let questionNo = Math.floor(Math.random() * this.props.deck.questions.length)
        let questionArray = this.state.answeredQuestions;


        if (this.state.answeredQuestions.length < this.props.deck.questions.length) {
            if(!this.state.answeredQuestions.includes(questionNo)) {
                questionArray.push(questionNo)
                this.setState({
                    questionNumber: questionNo,
                    answeredQuestions: questionArray,
                    answerShow: false      
                })
                console.log(this.props)
            } else {
                // recursion for when the random number returned is already in the array of numbers used.
                this.randomQuestion()
            }
        } else {
            this.setState({
                complete: true
            })
        }
        
    }

    
    toggleAnswer() {
        this.setState({
            answerShow: !this.state.answerShow
        })
    }

    handleCorrect() {

        this.setState({
            correctAnswers: this.state.correctAnswers + 1
        })

        this.randomQuestion()
    }

    resetQuiz() {
        this.setState({
            answeredQuestions: [],
            correctAnswers: 0,
            complete: false,
            answerShow: false
        }, () => {
            console.log(this.state)
            this.randomQuestion()
        })
        
    }

    render() {
    


        return (

            <View style={styles.container}>

                {this.state.complete && 
                    <React.Fragment>
                        <Text style={styles.heading}>Well Done! You Finished!</Text>
                        <Text style={styles.answer}>You got {this.state.correctAnswers} correct!</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.resetQuiz}
                        >
                        <Text style={{textDecorationLine: 'underline'}}>Take the quiz again?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {this.props.navigation.navigate('Individual Deck', {
                            deckName: this.props.deck.title,
                        })}}      
                        >
                        <Text style={{textDecorationLine: 'underline'}}>Back to deck</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                    
                }
                

                {!this.state.complete && 
                    
                    <React.Fragment>
                        <Text style={{
                            textAlign: 'right',
                            marginBottom: 20
                        }}>Question {this.state.answeredQuestions.length} of {this.props.deck.questions.length}</Text>

                        <Text>Question:</Text>
                        <Text style={styles.heading}>{this.props.deck.questions[this.state.questionNumber].question}</Text>

                        <TouchableOpacity style={[styles.button, styles.revealButton]} onPress={this.toggleAnswer}>
                            <Text style={{textDecorationLine: 'underline'}}>Reveal Answer</Text>
                        </TouchableOpacity>

                        {this.state.answerShow &&
                            <Text style={styles.answer} >{this.props.deck.questions[this.state.questionNumber].answer}</Text>
                        }
                        
                        <Text style={[styles.subheading, {marginTop: 20}]} >Was your answer correct?</Text>
                        <TouchableOpacity style={[styles.button, styles.greenButton]} 
                            onPress={this.handleCorrect}>
                            <Text>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.redButton,styles.button]}
                            onPress={this.randomQuestion}>
                            <Text>Incorrect</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                }
                
            
            </View>
        
        )
    }
    
}

// this component needs some logic to keep track of questions answered.
// this will need to be added to the redux state for each question?
// if it has been answered? Whether the user chose that the answer was correct or not
// a count of all questions that have been answered
// this count needs to be displayed
// when it gets to the end, the quiz ends.
// then the count of the questions answered correctly is shown.
// this is probably the msot difficult part of the project - logic-wise


// count - keep in local state (screen - quiz view - pass down as props) - don't want to mess up redux store - count and total
// render different component for quiz completion
// on buttons create an onPress method that update the count in the store for correct and total
// then just display that on the component rendered

    


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 40,
       
      },
    heading:{
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
        padding: 10,
        marginHorizontal: 'auto',
        marginTop: 10,
        borderRadius: 5,
    },
    greenButton: {
        backgroundColor: 'green',
        marginTop: 20
    },
    redButton: {
        backgroundColor: 'red',
    },
    answer: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 20,
        alignItems: 'center',
        textAlign: 'center',
    },
    revealButton: {
        marginVertical: 20,
    }

})

function mapStateToProps(state) {

    return {
        state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        answerQuestion: (answer) => {dispatch(answerQuestion(answer))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)
