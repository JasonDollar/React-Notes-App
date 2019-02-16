import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {firebaseConnect} from 'react-redux-firebase'
import {firebase} from '../../firebase'
import {signUp} from '../../store/actions'

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
      <div>
        <form onSubmit={this.formSubmitHandler}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" onChange={this.inputchangeHandler} value={this.state.firstName}/>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" onChange={this.inputchangeHandler} value={this.state.lastName}/>
  
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={this.inputchangeHandler} value={this.state.email}/>
  
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={this.inputchangeHandler} value={this.state.password}/>
        
          <button type="submit">Sign up</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  isAuth: !!state.auth.uid
})

const mapDispatchToProps = dispatch => ({
  signUp: credentials => dispatch(signUp(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
