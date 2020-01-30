import { combineReducers } from 'redux'

import { AuthState } from './auth'
import { Note } from '../actions/notes'

import { notesReducer } from './notes'
import { authReducer } from './auth'

export interface StoreState {
  notes: Note[],
  auth: AuthState
}
const rootReducer = combineReducers<StoreState>({
  notes: notesReducer,
  auth: authReducer,
  // firebase: firebaseReducer,
  // firestore: firestoreReducer,
})


export default rootReducer

export type AppState = ReturnType<typeof rootReducer>