import React, {useState} from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {resetPassword} from '../../store/actions'

import AuthForm from '../styles/AuthForm'

const ResetPassword = ({resetPasswordAction, isAuth, passwordReset, resetError}) => {
  const [email, changeEmail] = useState('')
  if (isAuth) {
    return <Redirect to="/notes" />
  } else {
    return (
      <AuthForm>
          <form onSubmit={e => {
            e.preventDefault()
            resetPasswordAction(email)
          }} className="form">

            <h1 className="form__name">Reset Password</h1>

            <div className="inputGroup">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={e => changeEmail(e.target.value)}/>
            </div> 


            <button type="submit" className="form__button">Reset</button>
            {resetError ? <span className="errorMessage">{resetError.message}</span>  : null}
          </form>
      </AuthForm>
    )
  }
}
const mapStateToProps = state => ({
  isAuth: !!state.auth.uid,
  passwordReset: state.auth.passwordReset,
  resetError: state.auth.error
})

const mapDispatchToProps = dispatch => ({
  resetPasswordAction: (email) => dispatch(resetPassword(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
