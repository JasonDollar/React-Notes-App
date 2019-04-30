import styled from 'styled-components'

const NoteForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  & .note__title,
  & .note__body {
    border: 1px solid #DEDFE0;
    font-family: inherit;
    font-weight: 300;
    display: block;
    padding: .8rem;
    background: none;
  }

  & .note__title {
    font-size: 2rem;
    margin: 0;
    margin-top: 2rem;

    width: 100%;
  }

  & .note__body--container {
    flex: 1;
    display: flex;

  }
  
  & .note__body {
    flex: 1;
    margin: 2rem 0 2.5rem 0;

    
    font-size: 1.6rem;

    
    min-height: 30rem;
    
    
    width: 100%;
  } 
  & .note__button {
    /* flex: 1;
    @media (min-width: 576px) {
      margin-top: -4rem;
    } */
  }
`

export default NoteForm