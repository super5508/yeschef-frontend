import { combineReducers } from 'redux'
import ActionTypes from '../ActionTypes'

const defaultState = {
    userProfile: null,
    isLogin: null,
    userMetadata: null,
    message_type: ''
}

const defaulmessage = ''

const receivedUserMetadata = (state = defaultState, action) => {
    if (action.type === ActionTypes.USER_RECEIVE_METADATA) {
        return {
            ...state,
            userMetadata: action.usersMetadata
        }
    } else {
        return state;
    }
}

const updateUser = (state = defaultState, action) => {
    if (action.type === ActionTypes.USER_UPDATE_PROFILE) {
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
            userMetadata: null,
            isLogin: false

        }
    } else {
        return state;
    }
}

const authStat = (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.USER_SIGNOUT:
            return signout(state, action);
        case ActionTypes.USER_UPDATE_PROFILE:
            return updateUser(state, action);
        case ActionTypes.USER_RECEIVE_METADATA:
            return receivedUserMetadata(state, action);

        default:
            return state;
    }
}

const message = (state = defaulmessage, action) => {
    switch (action.type) {
        case ActionTypes.MESSAGE_TYPE:
            return { state, message_type: action.message }
        default:
            return state
    }
}

const userReducer = combineReducers({
    authStat,
    message
})

export default userReducer;