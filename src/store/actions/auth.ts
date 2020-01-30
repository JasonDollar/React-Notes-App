import { Dispatch, AnyAction } from 'redux'
import { firebase, firestore } from '../../data/firebase'
import { ActionTypes } from './types'

export interface NewUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

type UserData = firebase.firestore.DocumentData | undefined
export interface Error {
  message ?: string
}


export interface AuthSuccessAction {
  type: ActionTypes.AUTH_SUCCESS
}

export interface ResetSuccessAction {
  type: ActionTypes.RESET_SUCCESS
}

export interface ResetFailureAction {
  type: ActionTypes.RESET_FAILURE,
  payload: Error
}

export interface SignOutSuccessAction {
  type: ActionTypes.SIGNOUT_SUCCESS
}

export interface StartLoginAction {
  type: ActionTypes.AUTH_START
}

export interface GetUserUidAction {
  type: ActionTypes.GET_USER_UID,
  payload: string
}

export interface SetUserAction {
  type: ActionTypes.SET_USER_DATA,
  payload: UserData
}

export interface GetUserDataErrorAction {
  type: ActionTypes.SET_USER_DATA_FAILURE,
  payload: Error
}

export interface AuthFailureAction {
  type: ActionTypes.AUTH_FAILURE,
  payload: Error
}

export const authSuccess = (): AuthSuccessAction => ({
  type: ActionTypes.AUTH_SUCCESS,
})

export const authFailure = (err: Error): AuthFailureAction => ({
  type: ActionTypes.AUTH_FAILURE,
  payload: err
})

export const signOutSuccess = (): SignOutSuccessAction => ({
  type: ActionTypes.SIGNOUT_SUCCESS
})

export const getUserUid = (uid: string): GetUserUidAction => ({
  type: ActionTypes.GET_USER_UID,
  payload: uid
})

export const setUser = (userData: UserData): SetUserAction => ({
  type: ActionTypes.SET_USER_DATA,
  payload: userData
})

export const getUserDataError = (err: Error): GetUserDataErrorAction => ({
  type: ActionTypes.SET_USER_DATA_FAILURE,
  payload: err
})

export const startLogin = (): StartLoginAction => ({
  type: ActionTypes.AUTH_START
})

export const getUserData = (uid: string) => {
  return (dispatch: Dispatch<AnyAction>) => {
    return firestore.collection('users').doc(uid).get()
      .then((res) => {
        if (res.exists) {
          const userData = res.data()
          return dispatch<SetUserAction>(setUser(userData))
        }
      })
      .catch(err => dispatch<GetUserDataErrorAction>(getUserDataError(err)))
  }
}


export const signUp = (newUser: NewUser) => {
  return (dispatch: Dispatch) => {
    dispatch<StartLoginAction>(startLogin())
    return firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((res) => {
      dispatch<GetUserUidAction>(getUserUid(res.user!.uid))
      return firestore.collection('users').doc(res.user!.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName
      })
    })
    .then(() =>  dispatch<AuthSuccessAction>(authSuccess()))
    .catch(err => dispatch<AuthFailureAction>(authFailure(err)))
  }
}

export const signIn = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch<StartLoginAction>(startLogin())
    return firebase.auth().signInWithEmailAndPassword(
      email,
      password
    ).then(() => {
      const user = firebase.auth().currentUser
      dispatch<AuthSuccessAction>(authSuccess())
      return dispatch<GetUserUidAction>(getUserUid(user!.uid))
    })
    .catch(err => dispatch<AuthFailureAction>(authFailure(err)))
  }
}

export const signOut = () => {
  return (dispatch: Dispatch) => {
    return firebase.auth().signOut()
      .then(() => dispatch<SignOutSuccessAction>(signOutSuccess()))
      .catch(err => dispatch<AuthFailureAction>(authFailure(err)))
  }
}

export const resetPassword = (email: string) => (dispatch: Dispatch) => {
  return firebase.auth().sendPasswordResetEmail(email)
    .then(() => dispatch<ResetSuccessAction>({type: ActionTypes.RESET_SUCCESS}))
    .catch((err) => dispatch<ResetFailureAction>({type: ActionTypes.RESET_FAILURE, payload: err}))
}