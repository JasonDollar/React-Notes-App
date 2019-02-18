import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'


// import 

const Welcome = ({isAuth}) => {
  if (isAuth) {
    return <Redirect to="/notes" />
  }
  return (
    <div>
      <Link to="/signin">SignIn</Link>
      <Link to="/signup">SignUP</Link>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuth: !!state.auth.uid
})

export default connect(mapStateToProps)(Welcome)
