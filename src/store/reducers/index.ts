import {combineReducers} from 'redux'
// import { firebaseReducer } from 'react-redux-firebase'
// import { firestoreReducer } from 'redux-firestore'
import { AuthState } from './auth'
import { Note } from '../actions/notes'

import { notesReducer } from './notes'
import authReducer from './auth'

export interface StoreState {
  notes: Note[],
  auth: AuthState
}

export default combineReducers<StoreState>({
  notes: notesReducer,
  auth: authReducer,
  // firebase: firebaseReducer,
  // firestore: firestoreReducer,
})