import React, {Fragment} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut, cleanNotes} from '../../store/actions'

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
    height: 100%;
    max-width: 104rem;
    margin: 0 auto;
    padding: 1rem;
    & > * {
      margin-right: 2rem;
      color: #fff;
    }
    & a {
      text-decoration: none;
    }
  }
`

const Header = ({signOut, isAuth, cleanNotes,firebaseProcessing}) => {
  console.log(firebaseProcessing)

  const renderLinks = () => {
    if (firebaseProcessing === false) {
      return (
        <Fragment>
          <Link to="/notes">Home</Link>
          {!isAuth ? <Link to="/signin">Sign In</Link> : null}
          {!isAuth ? <Link to="/signup">Sign UP</Link> : null}
          {isAuth ? <button onClick={() => {
            signOut()
            cleanNotes()
          }}>Sign Out</button> : null}
        </Fragment>
      )
    } else {
      
      return <div></div>

    }
  }

  return (
    <HeaderContainer>
      <header className="header">
        <span>
          Notes
        </span>
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