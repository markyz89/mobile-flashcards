import { ADD_QUESTION, DELETE_QUESTION, ADD_DECK, DELETE_DECK, GET_DECKS, GET_CARDS} from '../actions'

const intitialState = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces',
                answered: false,
                correct: null,
                deck: 'React'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event',
                answered: false,
                correct: null,
                deck: 'React'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
        {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.',
            answered: false,
            correct: null,
            deck: 'JavaScript'
        }
        ]
    }
}

export default function reducer (state = intitialState, action) {

    switch(action.type) {
        
            case ADD_QUESTION:
                let newQuestion = {
                    question: action.question.question,
                    answer: action.question.answer,
                    answered: false,
                    correct: null,
                    deck: action.question.deck
                }
            return {
                ...state,
                    [action.question.deck]:{
                        ...state[action.question.deck],
                        questions: [
                            ...state[action.question.deck].questions,
                            newQuestion
                        ]
                    }
            }
            case GET_CARDS:
                console.log(action)
                let newState = {}
                Object.assign(newState, state)

                action.answer.forEach((item) => {

                    if(Object.keys(state).includes(item.deck)) {
                        let i=0
                        newState[item.deck].questions.forEach((q) => {
                            if(q.question == item.question) {
                                i += 1;
                            }
                        })

                        if(!i) {
                            newState[item.deck].questions = newState[item.deck].questions.concat(item)
                        }

                    }
                })

                return newState
            case GET_DECKS:
                console.log(action)
                return {
                    ...state,
                    ...action.decks

                }
            
            case ADD_DECK:
                console.log(action)
                return {
                    ...state,
                    [action.deck]: {
                        questions: [],
                        title: [action.deck]
                    }
                }
            
            default :

            return state
    }

}