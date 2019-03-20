import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'



import 'normalize.css'
import './index.css';
import {firebase} from './data/firebase'
import store from './store'
import App from './App';
import {getUserUid, getUserData, authFailure, setNotes, cleanNotes} from './store/actions'
import {history} from './data/history'





let app = (
  <Provider store={store}>
  <Router history={history}>
    
      <App />
  </Router>
  </Provider>
)


ReactDOM.render(app, document.getElementById('root'));



firebase.auth().onAuthStateChanged(function(user) {
  // console.log(user)
  if (user) {
    store.dispatch(setNotes(user.uid))
    store.dispatch(getUserUid(user.uid))
    store.dispatch(getUserData(user.uid))
    // User is signed in.
  } else {
    // No user is signed in.
    // store.dispatch(authFailure())
    // store.dispatch(cleanNotes())
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();