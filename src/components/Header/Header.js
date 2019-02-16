import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../../store/actions'

const HeaderContainer = styled.div`
  background: royalblue;
  width: 100%;
  line-height: 2;
  & .container > * {
    margin-right: 2rem;
    color: #fff;
  }
`

const Header = ({signOut, isAuth}) => {
  return (
    <HeaderContainer>
      <header className="container">
        Header
        <Link to="/notes">Home</Link>
        {!isAuth ? <Link to="/signin">Sign In</Link> : null}
        {!isAuth ? <Link to="/signup">Sign UP</Link> : null}
        {isAuth ? <button onClick={signOut}>Sign Out</button> : null}
      </header>
    </HeaderContainer>
  )
}
const mapStateToProps = state => ({
  isAuth: !!state.auth.uid
})

const mapDispatchToprops = dispatch => ({
  signOut: () => dispatch(signOut())
})

export default connect(mapStateToProps, mapDispatchToprops)(Header)