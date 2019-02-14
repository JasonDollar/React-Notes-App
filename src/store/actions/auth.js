import * as actionTypes from './actionTypes'
import firebase from '../../firebase'


export const startLogin = () => {

}

export const login = (uid) => ({
  type: actionTypes.LOGIN,
  uid,
})