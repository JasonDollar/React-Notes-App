import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {firebase, firestore} from '../../data/firebase'
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
import {uidTest, userDataTest, errorTest, userLoginDataTest} from '../../data/fixtures/auth'

const createMockStore = configureMockStore([thunk])

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

describe('auth actions - database',  () => {
  test('get user data',async (done) => {
    const store = createMockStore({})
    await firestore.collection("users").doc(uidTest).set(userDataTest)
    store.dispatch(getUserData(uidTest))
      .then((data) => {
        const actions = store.getActions()

        expect(actions[0]).toEqual({
          type: actionTypes.SET_USER_DATA,
          payload: userDataTest
        })
        done()
      })
  })
  test('sign in user and get its uid',async (done) => {
    const store = createMockStore({})
    const {email, password} = userLoginDataTest
    store.dispatch(signIn(email, password))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({type: actionTypes.AUTH_START})
        expect(actions[1]).toEqual({type: actionTypes.AUTH_SUCCESS})
        expect(actions[2]).toEqual({
          type: actionTypes.GET_USER_UID,
          payload: expect.any(String)
        })
        done()
      })
  })
  test('sign out user',async (done) => {
    const store = createMockStore({})
    store.dispatch(signOut())
      .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({type: actionTypes.SIGNOUT_SUCCESS})
        done()
      })
  })
  test('reset user password',async (done) => {
    const store = createMockStore({})
    store.dispatch(resetPassword(userLoginDataTest.email))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({type: actionTypes.RESET_SUCCESS})
        done()
      })
  })
})