import styled from 'styled-components'

const DetailContainer = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.fontColor};
  min-height: 100%;


  position: fixed;
  top: 4rem;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  /* margin: 0 1rem; */
  /* padding-top: 4rem; */
  transform: translateX(100%);
  word-break: ${props => props.break === 'nobreak' ? 'normal' : 'break-all'};
  
  /* transition: all .8s ; */
    &.active {
    transform: translateX(0);
  }
  @media (min-width: 766px) {
    position: static;
    margin: 0 2rem;
    transform: translateX(0);
  }
  & .content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 4rem;
    -webkit-overflow-scrolling: touch;
    z-index: 150;
    padding: 1rem;
    overflow-y: scroll;
    @media (min-width: 766px) {
      position: sticky;
      top: 4rem;
      right: 0;
      width: 100%;
      transform: translateX(0);
      overflow-y: visible;
    }
  }
  & .content.form {
    @media (max-width: 766px) {
      
      max-height: calc(100vh - 5rem);
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }

  & .controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    padding: .5rem;
    padding-bottom: 1.5rem;
    transform: translateY(-4rem);
    @media (min-width: 576px) {
      position: static;
      transform: translateY(0);
    }
    
    & .details-text {
      color: ${props => props.theme.fontColorGrey};
      font-style: italic;
      margin-right: auto;
      @media (max-width: 576px) {
        display: none;
      }
    }
    & .btn {
      margin: 0 1rem;
      @media (max-width: 576px) {
        margin: 0;
        flex: 0 0 45%;
      }

    }
  }

  & .note-title {
    margin: 1.5rem 0;
    font-size: 3.2rem;
  }

  & .note-body {
    & .note-paragraph {
      margin: 1.2rem 0;
      font-size: 2rem;
    }
  }

  & .details {
    margin: .5rem 0;
    color: ${props => props.theme.fontColorGrey};
    font-style: italic;
    font-size: 1.2rem;

    @media (min-width: 576px) {
      font-size: 1.2rem;
    }
  }
`

export default DetailContainer