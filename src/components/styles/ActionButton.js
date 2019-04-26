import styled from 'styled-components'

const ActionButton = styled.button`
  font-size: 2rem;
  color: ${props => props.theme.fontColorWhite};
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 5px;
  background: ${props => props.type === 'danger' ? props.theme.danger : props.theme.info};
  padding: .5rem 1.6rem;
  /* margin: .5rem; */
  margin-left: 0;
  width: ${props => props.width ? props.width : ''};

  &:disabled {
    filter: grayscale(80%) brightness(1.2);
    cursor: not-allowed;
  }
`

export default ActionButton