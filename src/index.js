import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import store from './store/Store'
import { signin, signout } from './store/actionCreators/UserActionCreators';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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