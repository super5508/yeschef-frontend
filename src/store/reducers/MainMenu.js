import { combineReducers } from 'redux'
import ActionTypes from '../ActionTypes'

const defaultState = {
    selected: 'home',
    visible: true
}

const changeMenuVisibility = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.HIDE_MAIN_MENU:
            return {
                ...state,
                visible: false
            }
        case ActionTypes.SHOW_MAIN_MENU:
            return {
                ...state,
                visible: true
            }
        default:
            return state;
    }
}

const selected = (state = defaultState, action) => {
    if (action.type === ActionTypes.UPDATE_SELECTED) {
        return {
            ...state,
            selected: action.selected
        }
    } else {
        return state;
    }

}

const mainMenu = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_SELECTED:
            return selected(state, action);
        case ActionTypes.SHOW_MAIN_MENU:
        case ActionTypes.HIDE_MAIN_MENU:
            return changeMenuVisibility(state, action);
        default:
            return state;
    }
}

const mainMenuReducer = combineReducers({
    mainMenu
})

export default mainMenuReducer;