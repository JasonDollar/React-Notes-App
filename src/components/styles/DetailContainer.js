import styled from 'styled-components'

const DetailContainer = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.fontColor};
  position: fixed;
  top: 4rem;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  /* margin: 0 1rem; */
  /* padding-top: 4rem; */
  transform: translateX(100%);
  word-break: break-all;
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
    position: static;
    padding: 1rem;
    @media (min-width: 766px) {
      position: sticky;
      top: 5rem;
      right: 0;
      width: 100%;
      transform: translateX(0);
    }
  }
`

export default DetailContainer