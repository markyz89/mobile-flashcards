export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const DELETE_DECK = 'DELETE_DECK'
export const DELETE_QUESTION = 'DELETE_QUESTION'
export const GET_DECKS = 'GET_DECKS'
export const GET_CARDS = 'GET_CARDS'

export function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}



export function getCards (answer) {
    return {
        type: GET_CARDS,
        answer
    }
}

export function getDecks (decks) {
    return {
        type: GET_DECKS,
        decks
    }
}