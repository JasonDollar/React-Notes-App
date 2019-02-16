import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import { ReactReduxFirebaseProvider, authIsReady } from 'react-redux-firebase'
import {createFirestoreInstance } from 'redux-firestore';

import 'normalize.css'
import './index.css';
import {firebase} from './firebase'
import store from './store'
import App from './App';
import {getUserUid, getUserData, authFailure} from './store/actions'


const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true ,// Firestore for Profile instead of Realtime DB
  attachAuthIsReady : true, 
};


const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}


const app = (
  <Provider store={store}>
  <ReactReduxFirebaseProvider {...rrfProps}>
  <BrowserRouter>
    
      <App />
  </BrowserRouter>
  </ReactReduxFirebaseProvider>
  </Provider>
)

// authIsReady(store).then(() => {

// })

ReactDOM.render(app, document.getElementById('root'));



firebase.auth().onAuthStateChanged(function(user) {
  console.log(user)
  if (user) {
    store.dispatch(getUserUid(user.uid))
    store.dispatch(getUserData(user.uid))
    // User is signed in.
  } else {
    // No user is signed in.
    store.dispatch(authFailure())
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();