import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
// import {firebaseConnect} from 'react-redux-firebase'
// import {firebase} from '../../firebase'
import {signUp} from '../../store/actions'
import AuthForm from '../styles/AuthForm'

class SignUp extends React.Component {
  state = {
    firstName: 'Jason',
    lastName: 'Dollar',
    email: 'test@test.test',
    password: 'qweqwe'
  }

  inputchangeHandler = e => {
    const {value, id} = e.target
    this.setState({
      [id]: value
    })
  }

  formSubmitHandler = e => {
    e.preventDefault();
    this.props.signUp(this.state)
  }

  render() {
    if (this.props.isAuth) {
      return <Redirect to="/notes" />
    }
    return (
      <AuthForm>
        <form className="form" onSubmit={this.formSubmitHandler}>
          <h1 className="form__name">Sign Up</h1>

          <div className="inputGroup">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" onChange={this.inputchangeHandler} value={this.state.firstName}/>
          </div>

          <div className="inputGroup">
          <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.inputchangeHandler} value={this.state.lastName}/>
          </div>

          <div className="inputGroup">
          <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.inputchangeHandler} value={this.state.email}/>
          </div>

          <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={this.inputchangeHandler} value={this.state.password}/>
          </div>
          {this.props.error && <span className="errorMessage">{this.props.error.message}</span>}
          <button type="submit" className="form__button">Sign up</button>
          <div className="form__link--container">
            <Link to="/signin" className="form__link">User already? Log in</Link>
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
  signUp: credentials => dispatch(signUp(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
