import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import api from '../middleware/api'
import rootReducer from './reducers/RootReducer'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk) 
)

export default configureStore