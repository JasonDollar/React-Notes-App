import { ActionTypes, AuthActions } from '../actions/types'
import { Error } from '../actions/auth'

interface UserData {
  firstName?: string,
  lastName?: string
}

export interface AuthState {
  uid: string,
  error: Error | string,
  userData: UserData | undefined,
  firebaseProcessing: boolean,
  passwordReset: boolean
}

export const initialState: AuthState = {
  uid: '',
  error: '',
  userData: {},
  firebaseProcessing: true,
  passwordReset: false
}

const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch(action.type) {
    case ActionTypes.AUTH_START: 
    return {
      ...state,
      error: '',
      firebaseProcessing: true,
    }
    case ActionTypes.AUTH_SUCCESS:
    return {
      ...state,
      error: '',
      firebaseProcessing: false,
      passwordReset: false,
    }
    
    case ActionTypes.AUTH_FAILURE:
    return {
      ...state,
      error: action.payload,
      uid: '',
      userData: {},
      firebaseProcessing: false
    }
    case ActionTypes.GET_USER_UID: 
      return {
        ...state,
        uid: action.payload,
        error: ''
      }
    case ActionTypes.SIGNOUT_SUCCESS: 
      return {
        ...state,
        uid: '',
        error: '',
        userData: {},
        passwordReset: false,
      }
    case ActionTypes.SET_USER_DATA: 
      return {
        ...state,
        userData: action.payload
      }
    case ActionTypes.SET_USER_DATA_FAILURE: 
      return {
        ...state,
        userData: {},
        error: action.payload
      }
    case ActionTypes.RESET_SUCCESS: 
      return {
        ...state,
        error: '',
        passwordReset: true,
      }
    case ActionTypes.RESET_FAILURE: 
      return {
        ...state,
        error: action.payload,
        passwordReset: false,
      }
    default:
      return state
  }
}

export { authReducer }