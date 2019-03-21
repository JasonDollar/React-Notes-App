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
import * as actions from './store/actions'
// import {getUserUid, getUserData, authFailure, setNotes, cleanNotes, authSuccess} from './store/actions'
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
  // console.log(user.providerData.forEach(item => console.log(item)))
  if (user) {
    store.dispatch(actions.setNotes(user.uid))
    store.dispatch(actions.getUserUid(user.uid))
    store.dispatch(actions.getUserData(user.uid))
    store.dispatch(actions.authSuccess())
    // User is signed in.
  } else {
    console.log('lol')
    // No user is signed in.
    store.dispatch(actions.authFailure())
    // store.dispatch(cleanNotes())
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();