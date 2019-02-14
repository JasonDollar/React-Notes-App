import { createStore, combineReducers, compose } from 'redux';
import 'firebase/firestore';
// import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers
import {firebaseConfig} from '../firebase'
import rootReducer from './reducers/'



// react-redux-firebase config

// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
// const createStoreWithFirebase = compose(
//   reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
//   reduxFirestore(firebase)
// )(createStore);

// const rootReducer = combineReducers({
//   firebase: firebaseReducer,
//   firestore: firestoreReducer,
//   notes: notesReducer,
//   // notify: notifyReducer,
//   // settings: settingsReducer
// });

// Check for settings in localStorage
// if (localStorage.getItem('settings') == null) {
//   // Default settings
//   const defaultSettings = {
//     disableBalanceOnAdd: true,
//     disableBalanceOnEdit: false,
//     allowRegistration: false
//   };

//   // Set to localStorage
//   localStorage.setItem('settings', JSON.stringify(defaultSettings));
// }

// Create initial state
// const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };
const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  // compose(
  //   reactReduxFirebase(firebase),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);

export default store;



// import {createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import rootReducer from './reducers'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// export default store

/*

+ 
+ const store = createStore(reducer, /* preloadedState,  composeEnhancers(
  - const store = createStore(reducer, /* preloadedState,  compose(
    applyMiddleware(...middleware)
  ));
*/