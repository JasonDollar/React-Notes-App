import React, {useState} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions'

import AuthForm from '../styles/AuthForm'

const Login = ({signIn, isAuth, error}) => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  
  const previewAccountHandler = () => {
    changeEmail('qwe@qwe.qwe')
    changePassword('qweqwe')
  }

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
            {error && <span className="errorMessage">{error.message}</span> }

            <button type="submit" className="form__button">Sign In</button>
            <div className="form__link--container">
              <button className="testAccount" onClick={previewAccountHandler}>Use Preview Account</button>
              <Link to="/signup" className="form__link">New User? Create an account</Link>
              <Link to="/reset" className="form__link">Forgot your password?</Link>
            </div>
          </form>
      </AuthForm>
    )
  }
}
const mapStateToProps = state => ({
  isAuth: !!state.auth.uid,
  error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signIn(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
