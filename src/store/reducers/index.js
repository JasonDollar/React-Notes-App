import {combineReducers} from 'redux'

import notesReducer from './notes'
import authReducer from './auth'

export default combineReducers({
  notes: notesReducer,
  auth: authReducer,
})