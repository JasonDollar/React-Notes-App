import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import firebase from 'firebase'
import 'firebase/firestore';
// import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer, createFirestoreInstance } from 'redux-firestore';
// Reducers
import {firebaseConfig} from './firebase'

import store from './store'
import 'normalize.css'
import './index.css';
import App from './App';
import * as actions from './store/actions'
import {login} from './store/actions/auth'


// store.dispatch(actions.setNotes())
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Init firestore
const firestore = firebase.firestore();

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

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


// firebase.auth().onAuthChange(user => {
//   if (user) {
//     store.dispatch(login(user.uid))
//     console.log(user.uid)
//     // store.dispatch(startSetExpenses()).then(() => {
//     //   renderApp()
//     //   if (history.location.pathname === '/') {
//     //     history.push('/dashboard')
//     //   }
//     // })
//   } else {
//     // store.dispatch(logout())
//     // renderApp()
//     // history.push('/')
//   }
// })