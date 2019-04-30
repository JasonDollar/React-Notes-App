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
`

export default DetailContainer