import * as actionTypes from '../actions/actionTypes'

const initialState = {
  uid: '',
  error: '',
  userData: {},
  firebaseProcessing: true
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_USER_UID: 
      return {
        ...state,
        uid: action.payload,
        error: ''
      }
    case actionTypes.AUTH_START: 
      return {
        ...state,
        error: '',
        firebaseProcessing: true,
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        error: '',
        firebaseProcessing: false
      }
    
    case actionTypes.AUTH_FAILURE:
      return {
        ...state,
        error: action.payload,
        uid: '',
        userData: {},
        firebaseProcessing: false
      }
    case actionTypes.SIGNOUT_SUCCESS: 
      return {
        ...state,
        uid: '',
        error: '',
        userData: null
      }
    case actionTypes.SET_USER_DATA: 
      return {
        ...state,
        userData: action.payload
      }
    case actionTypes.SET_USER_DATA_FAILURE: 
      return {
        ...state,
        userData: {},
        error: action.payload
      }
    default:
      return state
  }
}

export default authReducer