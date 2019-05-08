import {
  signUp,
  signIn,
  signOut,
  getUserUid,
  getUserData,
  authFailure,
  authSuccess,
  resetPassword,
  signOutSuccess,
  setUser,
  getUserDataError,
  startLogin
} from '../../store/actions'
import * as actionTypes from '../../store/actions/actionTypes'
import {uidTest, userDataTest, errorTest} from '../../data/fixtures/auth'

describe('auth actions - store', () => {
  test('auth success', () => {
    const action = authSuccess()
    expect(action).toEqual({
      type: actionTypes.AUTH_SUCCESS,
    })
  })
  test('auth failure', () => {
    const action = authFailure(errorTest)
    expect(action).toEqual({
      type: actionTypes.AUTH_FAILURE,
      payload: errorTest
    })
  })
  test('signout success', () => {
    const action = signOutSuccess()
    expect(action).toEqual({
      type: actionTypes.SIGNOUT_SUCCESS
    })
  })
  test('get user uid', () => {
    const action = getUserUid(uidTest)
    expect(action).toEqual({
      type: actionTypes.GET_USER_UID,
      payload: uidTest
    })
  })
  test('set user', () => {
    const action = setUser(userDataTest)
    expect(action).toEqual({
      type: actionTypes.SET_USER_DATA,
      payload: userDataTest
    })
  })
  test('get user data failure', () => {
    const action = getUserDataError(errorTest)
    expect(action).toEqual({
      type: actionTypes.SET_USER_DATA_FAILURE,
      payload: errorTest
    })
  })
  test('start login', () => {
    const action = startLogin()
    expect(action).toEqual({
      type: actionTypes.AUTH_START
    })
  })
})