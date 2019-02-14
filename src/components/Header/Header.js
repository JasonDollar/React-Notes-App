import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const HeaderContainer = styled.div`
  background: royalblue;
  width: 100%;
  line-height: 2;
`

const Header = () => {
  return (
    <HeaderContainer>
      <header className="container">
        Header
        <Link to="/login">Login</Link>
        <button>Logout</button>
      </header>
    </HeaderContainer>
  )
}

export default Header