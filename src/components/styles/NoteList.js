import styled from 'styled-components'

const NoteList = styled.aside`
  /* flex: 3; */
  /* grid-area: "list";
  flex: 1 1 100%; */
  min-height: calc(100vh - 4rem);
  justify-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* grid-template-rows: auto 1fr;
  max-height: 100vh;
  overflow-y: scroll;
  transition: all .3s; */
  background: white;
  padding: 0;
  border-right: 1px solid #ebe8e8;
  /* min-height: 100vh;
  margin: 1rem 0; */
  position: relative;

  @media (min-width: 576px) {
    padding-right: .5rem;
  }
  & .list {
    display: grid;
    /* grid-template-rows: 10rem;
    overflow-y: scroll;
    flex: 1; */
    list-style: none;
    margin: 0 1.5rem;
    /* margin-top: 0;
    padding: 0; */
  }

  & .paginationButtons {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    margin: 1rem 0;
    @media (max-width: 576px) {
      padding: 1.5rem 0;
    }
    & > * {
      flex: 0 1 45%;
    }
  }
`

export default NoteList