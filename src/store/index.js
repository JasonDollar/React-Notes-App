import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import 'firebase/firestore';
import { reactReduxFirebase, authIsReady } from 'react-redux-firebase';
// import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
// import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// import {firebaseConfig} from '../firebase'
import rootReducer from './reducers/'



// react-redux-firebase config

// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
// const createStoreWithFirebase = compose(
//   reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
//   reduxFirestore(firebase)
// )(createStore);


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      composeEnhancers(applyMiddleware(thunk))

  // compose(
  //   reactReduxFirebase(firebase),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
)

export const getStateFromStore = () => {
  const state = store.getState()
  if (state.firebase.auth.uid) {
    return state.firebase.auth.uid
  } else {
    return ''
  }
}

export default store;

