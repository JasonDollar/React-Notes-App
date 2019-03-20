import React from 'react'
import styled from 'styled-components'

import DetailContainer from '../styles/DetailContainer'
import Spinner from '../styles/Spinner'


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
        <Spinner />
      </DetailContainer>
    </Container>
  )
}

export default NotesPlaceholder
