import React from 'react'
import styled from 'styled-components'

import DetailContainer from '../styles/DetailContainer'


const Container = styled.main`
  display: block;
  @media (max-width: 766px) {
    display: none;
  }
`

const NotesPlaceholder = () => {
  return (
    <Container>
      <DetailContainer>
        Note Placeholder
      </DetailContainer>
    </Container>
  )
}

export default NotesPlaceholder
