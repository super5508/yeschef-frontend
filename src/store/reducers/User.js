import { combineReducers } from 'redux'
import ActionTypes from '../ActionTypes'

const defaultState = {
    userProfile: null,
    isLogin: true
}

const signin = (state = defaultState, action) => {
    if (action.type === ActionTypes.USER_SIGNIN) {
        return {
            ...state,
            userProfile: action.user,
            isLogin: true
        }
    } else {
        return state;
    }
}

const signout = (state = defaultState, action) => {
    if (action.type === ActionTypes.USER_SIGNOUT) {
        return {
            ...state,

            userProfile: null,
            isLogin: false

        }
    } else {
        return state;
    }
}

const authStat = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.USER_SIGNIN:
            return signin(state, action);
        case ActionTypes.USER_SIGNOUT:
            return signout(state, action);
        default:
            return state;
    }
}

const userReducer = combineReducers({
    authStat
})

export default userReducer;