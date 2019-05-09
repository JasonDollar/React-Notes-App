import * as actionTypes from './actionTypes'
import {firebase, firestore} from '../../data/firebase'

export const authSuccess = () => ({
  type: actionTypes.AUTH_SUCCESS,
})

export const authFailure = err => ({
  type: actionTypes.AUTH_FAILURE,
  payload: err
})

export const signOutSuccess = () => ({
  type: actionTypes.SIGNOUT_SUCCESS
})

export const getUserUid = uid => ({
  type: actionTypes.GET_USER_UID,
  payload: uid
})

export const setUser = (userData) => ({
  type: actionTypes.SET_USER_DATA,
  payload: userData
})

export const getUserDataError = err => ({
  type: actionTypes.SET_USER_DATA_FAILURE,
  payload: err
})

export const startLogin = () => ({
  type: actionTypes.AUTH_START
})

export const getUserData = (uid) => {
  return dispatch => {
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


export const signUp = newUser => {
  return dispatch => {
    dispatch(startLogin())
    return firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((res) => {
      dispatch(getUserUid(res.user.uid))
      return firestore.collection('users').doc(res.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName
      })
    })
    .then(() =>  dispatch(authSuccess()))
    .catch(err => dispatch(authFailure(err)))
  }
}

export const signIn = (email, password) => {
  return dispatch => {
    dispatch(startLogin())
    return firebase.auth().signInWithEmailAndPassword(
      email,
      password
    ).then(() => {
      const user = firebase.auth().currentUser
      dispatch(authSuccess())
      return dispatch(getUserUid(user.uid))
    })
    .catch(err => dispatch(authFailure(err)))
  }
}

export const signOut = () => {
  return dispatch => {
    return firebase.auth().signOut()
      .then(() => dispatch(signOutSuccess()))
      .catch(err => dispatch(authFailure(err)))
  }
}

export const resetPassword = (email) => dispatch => {
  return firebase.auth().sendPasswordResetEmail(email)
    .then(() => dispatch({type: actionTypes.RESET_SUCCESS}))
    .catch((err) => dispatch({type: actionTypes.RESET_FAILURE, payload: err}))
}