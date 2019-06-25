import { combineReducers } from 'redux'
import user from './User'
import mainMenu from './MainMenu'

const rootReducer = combineReducers({
    user,
    mainMenu
  })
  
export default rootReducer;
