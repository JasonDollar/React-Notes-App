import React from 'react'
import styled from 'styled-components'




const Container = styled.main`
  display: block;
  @media (max-width: 766px) {
    display: none;
  }
`

const Content = styled.div`
  color: ${props => props.theme.fontColorGrey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  margin: 0 8rem;
  & .heading {
    font-size: 7rem;
  }
`

const NotesPlaceholder = () => {
  return (
    <Container>
        <Content>
          <h3 className="heading">
            Choose a note from the list on the left
          </h3>
        </Content>
    </Container>
  )
}

export default NotesPlaceholder
