import authReducer, {initialState} from '../../store/reducers/auth'
import * as actionTypes from '../../store/actions/actionTypes'
import {userDataTest, errorTest, uidTest} from '../../data/fixtures/auth'

describe('auth reducer', () => {
  test('should set default state state', () => {
    const state = authReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual(initialState)
  })

  test('should start auth process', () => {
    const action = {
      type: actionTypes.AUTH_START
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState, 
      error: '',
      firebaseProcessing: true,
    })
  })
  test('should finish auth process with success', () => {
    const action = {
      type: actionTypes.AUTH_SUCCESS
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState, 
      error: '',
      firebaseProcessing: false,
      passwordReset: false,
    })
  })
  test('should finish auth process with failure', () => {
    const action = {
      type: actionTypes.AUTH_FAILURE,
      payload: errorTest
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState, 
      error: action.payload,
      uid: '',
      userData: {},
      firebaseProcessing: false
    })
  })
  test('should set user uid', () => {
    const action = {
      type: actionTypes.GET_USER_UID,
      payload: uidTest
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      uid: action.payload,
      error: ''
    })
  })
  test('should clean store after user signout', () => {
    const action = {
      type: actionTypes.SIGNOUT_SUCCESS,
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      uid: '',
      error: '',
      userData: null,
      passwordReset: false,
    })
  })
  test('should set user data', () => {
    const action = {
      type: actionTypes.SET_USER_DATA,
      payload: userDataTest
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      userData: action.payload
    })
  })
  test('should not set user data when error occured', () => {
    const action = {
      type: actionTypes.SET_USER_DATA_FAILURE,
      payload: errorTest
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      userData: {},
      error: action.payload
    })
  })
  test('should succeed with password reset', () => {
    const action = {
      type: actionTypes.RESET_SUCCESS,
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      error: '',
      passwordReset: true,
    })
  })
  test('should load errors when password reset fails', () => {
    const action = {
      type: actionTypes.RESET_FAILURE,
      payload: errorTest
    }
    const state = authReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      error: action.payload,
      passwordReset: false,
    })
  })
  
})