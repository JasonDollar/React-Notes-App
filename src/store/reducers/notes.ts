import * as actionTypes from '../actions/actionTypes'
import { ActionTypes, NotesActions } from '../actions/types'
import { Note } from '../actions/notes'

const initialState: Note[] = []

const notesReducer = (state = initialState, action: NotesActions): Note[] => {
  switch (action.type) {
    case ActionTypes.ADD_NOTE: 
      return [
        ...state,
        action.payload
      ]
    case ActionTypes.REMOVE_NOTE: 
      return state.filter((item: Note) => item.id !== action.payload)
    case ActionTypes.EDIT_NOTE: 
      return state.map((item: Note) => {
        if (item.id === action.payload.id) {
          return {...action.payload, createdAt: item.createdAt}
        } else return item
      })
    case ActionTypes.SET_NOTES: {
      return [
        ...action.payload
      ]
    }
    case ActionTypes.CLEAN_NOTES: 
      return []
    default: 
      return state
  }
}

export { notesReducer }