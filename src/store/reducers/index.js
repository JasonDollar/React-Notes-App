import {combineReducers} from 'redux'
// import { firebaseReducer } from 'react-redux-firebase'
// import { firestoreReducer } from 'redux-firestore'

import notesReducer from './notes'
import authReducer from './auth'

export default combineReducers({
  notes: notesReducer,
  auth: authReducer,
  // firebase: firebaseReducer,
  // firestore: firestoreReducer,
})