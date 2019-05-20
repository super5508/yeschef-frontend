import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import Store from './store/Store'
import { signin, signout } from './store/actionCreators/UserActionCtrators';

const store = Store()
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

window.addEventListener("load", () => {
    window.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(signin(user));
      } else {
        store.dispatch(signout());
      }
    });
  })