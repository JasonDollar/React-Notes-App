import React, {Fragment} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut, cleanNotes} from '../../store/actions'
import ActionButton from '../styles/ActionButton'

const HeaderContainer = styled.div`
  background: royalblue;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  height: 4rem;
  /* line-height: 2; */
  & .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 104rem;
    margin: 0 auto;
    padding: 1rem;
    color: #fff;
    font-size: 2rem;
  }
  & .appName {
    color: inherit;
    text-decoration: none;
    font-size: 2.4rem;
    margin-right: 2rem;
    line-height: 1;
  }
`

const SignOut = styled.button`
  background: none;
  border:none;
  color: inherit;
  
`

const Links = styled.div`
  & .link {
    color: inherit;
    text-decoration: none;
    margin-right: 2rem;
  }
  
  & .links-exp {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const Header = ({signOut, isAuth, cleanNotes,firebaseProcessing}) => {
  console.log(firebaseProcessing)

  const renderLinks = () => {
    if (firebaseProcessing === false) {
      return (
        <Links className={isAuth ? 'links-exp' : ''}>
          
          
          {!isAuth ? <Link to="/signin" className="link">Sign In</Link> : null}
          {!isAuth ? <Link to="/signup" className="link">Sign Up</Link> : null}
          {isAuth ? <SignOut type="danger" onClick={() => {
            signOut()
            cleanNotes()
          }}>Sign Out</SignOut> : null}
        </Links>
      )
    } else {
      
      return <div></div>

    }
  }

  return (
    <HeaderContainer>
      <header className="header">
        <Link className="appName" to='/notes'>
          NotesLite
        </Link>
        {renderLinks()}
      </header>
    </HeaderContainer>
  )
}
const mapStateToProps = state => ({
  isAuth: !!state.auth.uid,
  firebaseProcessing: state.auth.firebaseProcessing
})

const mapDispatchToprops = dispatch => ({
  signOut: () => dispatch(signOut()),
  cleanNotes: () => dispatch(cleanNotes())
})

export default connect(mapStateToProps, mapDispatchToprops)(Header)