export function answerQuestion (answer) {
    return {
        type: ANSWER_QUESTION,
        answer
    }
}

// case ANSWER_QUESTION:
        //     let newAnswer = {
        //         question: action.answer.question,
        //         answer: action.answer.questionAnswer,
        //         answered: true,
        //         correct: action.answer.correct,
        //         number: action.answer.questionNumber

        //     }
        //     return {
        //         ...state,
        //         [action.answer.deckName]:{
        //             ...state[action.answer.deckName],
        //             questions: [
        //                ...state[action.answer.deckName].questions.slice(0, action.answer.questionNumber),
        //                newAnswer,
        //                ...state[action.answer.deckName].questions.slice(action.answer.questionNumber, state[action.answer.deckName].questions.length - 1),
                       
                       
        //             ]
        //         }
        //     }

           // this.props.answerQuestion({
        //     deckName: this.props.deck.title,
        //     question: this.props.deck.questions[this.state.questionNumber].question,
        //     questionAnswer: this.props.deck.questions[this.state.questionNumber].answer,
        //     questionNumber: this.state.questionNumber,
        //     answered: true,
        //     correct: true
        // })