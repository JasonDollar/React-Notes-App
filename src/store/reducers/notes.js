import * as actionTypes from '../actions/actionTypes'


const initialState = []

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTE: 
      return [
        ...state,
        action.payload
      ]
    case actionTypes.REMOVE_NOTE: 
      return state.filter(item => item.id !== action.payload)
    case actionTypes.EDIT_NOTE: 
      return state.map(item => {
        if (item.id === action.payload.id) {
          return {...action.payload, createdAt: item.createdAt}
        } else return item
      })
    case actionTypes.SET_NOTES: {
      return [
        ...action.payload
      ]
    }
    default: 
      return state
  }
}

export default notesReducer