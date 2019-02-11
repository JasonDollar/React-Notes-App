import React from 'react'
import styled from 'styled-components'

const Container = styled.main`
  display: block;
  @media (max-width: 766px) {
    display: none;
  }
`

const NotesPlaceholder = () => {
  return (
    <Container>
      Note Placeholder
    </Container>
  )
}

export default NotesPlaceholder
