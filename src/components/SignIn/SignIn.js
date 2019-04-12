import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions'

import AuthForm from '../styles/AuthForm'

const Login = ({signIn, isAuth}) => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  if (isAuth) {
    return <Redirect to="/notes" />
  } else {
    return (
      <AuthForm>
          <form onSubmit={e => {
            e.preventDefault()
            signIn(email, password)
          }} className="form">

            <h1 className="form__name">Sign In</h1>

            <div className="inputGroup">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={e => changeEmail(e.target.value)}/>
            </div>

            <div className="inputGroup">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={e => changePassword(e.target.value)}/>
            </div>

            <button type="submit" className="form__button">Sign In</button>
          </form>
      </AuthForm>
    )
  }
}
const mapStateToProps = state => ({
  isAuth: !!state.auth.uid
})

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signIn(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
