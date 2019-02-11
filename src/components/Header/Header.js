import React from 'react'
import styled from 'styled-components'

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
      </header>
    </HeaderContainer>
  )
}

export default Header