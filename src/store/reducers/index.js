import {combineReducers} from 'redux'

import notesReducer from './notes'

export default combineReducers({
  notes: notesReducer
})