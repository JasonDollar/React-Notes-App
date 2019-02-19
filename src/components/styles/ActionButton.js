import styled from 'styled-components'

const ActionButton = styled.button`
  font-size: 2rem;
  color: ${props => props.theme.fontColorWhite};
  cursor: pointer;
  border: 1px solid white;
  border-radius: 5px;
  background: ${props => props.type === 'danger' ? props.theme.danger : props.theme.info};
  padding: .5rem 2rem;
  /* margin: .5rem; */
  margin-left: 0;
  width: ${props => props.width ? props.width : ''};
`

export default ActionButton