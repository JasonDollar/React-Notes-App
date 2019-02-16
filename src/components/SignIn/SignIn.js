import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signIn} from '../../store/actions'

const Login = ({signIn, isAuth}) => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  if (isAuth) {
    return <Redirect to="/notes" />
  } else {
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          signIn(email, password)
        }}>
          email:<input type="email" value={email} onChange={e => changeEmail(e.target.value)}/>
          <input type="password" value={password} onChange={e => changePassword(e.target.value)}/>
          <button type="submit">Sub</button>
        </form>
      </div>
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
