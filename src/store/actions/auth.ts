import { Dispatch } from 'redux'
import * as actionTypes from './actionTypes'
import {firebase, firestore} from '../../data/firebase'
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


export interface AuthSuccess {
  type: ActionTypes.AUTH_SUCCESS
}

export interface ResetSuccess {
  type: ActionTypes.RESET_SUCCESS
}

export interface ResetFailure {
  type: ActionTypes.RESET_FAILURE,
  payload: Error
}

export interface SignOutSuccess {
  type: ActionTypes.SIGNOUT_SUCCESS
}

export interface StartLogin {
  type: ActionTypes.AUTH_START
}

export interface GetUserUid {
  type: ActionTypes.GET_USER_UID,
  payload: string
}

export interface SetUser {
  type: ActionTypes.SET_USER_DATA,
  payload: UserData
}

export interface GetUserDataError {
  type: ActionTypes.SET_USER_DATA_FAILURE,
  payload: Error
}

export interface AuthFailure {
  type: ActionTypes.AUTH_FAILURE,
  payload: Error
}

export const authSuccess = (): AuthSuccess => ({
  type: ActionTypes.AUTH_SUCCESS,
})

export const authFailure = (err: Error): AuthFailure => ({
  type: ActionTypes.AUTH_FAILURE,
  payload: err
})

export const signOutSuccess = (): SignOutSuccess => ({
  type: ActionTypes.SIGNOUT_SUCCESS
})

export const getUserUid = (uid: string): GetUserUid => ({
  type: ActionTypes.GET_USER_UID,
  payload: uid
})

export const setUser = (userData: UserData): SetUser => ({
  type: ActionTypes.SET_USER_DATA,
  payload: userData
})

export const getUserDataError = (err: Error): GetUserDataError => ({
  type: ActionTypes.SET_USER_DATA_FAILURE,
  payload: err
})

export const startLogin = (): StartLogin => ({
  type: ActionTypes.AUTH_START
})

export const getUserData = (uid: string) => {
  return (dispatch: Dispatch) => {
    return firestore.collection('users').doc(uid).get()
      .then((res) => {
        if (res.exists) {
          const userData = res.data()
          return dispatch(setUser(userData))
        }
      })
      .catch(err => dispatch(getUserDataError(err)))
  }
}


export const signUp = (newUser: NewUser) => {
  return (dispatch: Dispatch) => {
    dispatch(startLogin())
    return firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((res) => {
      dispatch(getUserUid(res.user!.uid))
      return firestore.collection('users').doc(res.user!.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName
      })
    })
    .then(() =>  dispatch(authSuccess()))
    .catch(err => dispatch(authFailure(err)))
  }
}

export const signIn = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(startLogin())
    return firebase.auth().signInWithEmailAndPassword(
      email,
      password
    ).then(() => {
      const user = firebase.auth().currentUser
      dispatch(authSuccess())
      return dispatch(getUserUid(user!.uid))
    })
    .catch(err => dispatch(authFailure(err)))
  }
}

export const signOut = () => {
  return (dispatch: Dispatch) => {
    return firebase.auth().signOut()
      .then(() => dispatch(signOutSuccess()))
      .catch(err => dispatch(authFailure(err)))
  }
}

export const resetPassword = (email: string) => (dispatch: Dispatch) => {
  return firebase.auth().sendPasswordResetEmail(email)
    .then(() => dispatch({type: ActionTypes.RESET_SUCCESS}))
    .catch((err) => dispatch({type: ActionTypes.RESET_FAILURE, payload: err}))
}