import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import store from './store'
import './index.css';
import App from './App';
import * as actions from './store/actions'

store.dispatch(actions.setNotes())

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


/*
    apiKey: "AIzaSyBehX-0_61woayouo2MAxXwdpkErqZkOno",
    authDomain: "react-notes-56e35.firebaseapp.com",
    databaseURL: "https://react-notes-56e35.firebaseio.com",
    projectId: "react-notes-56e35",
    storageBucket: "react-notes-56e35.appspot.com",
    messagingSenderId: "892435779270"

*/