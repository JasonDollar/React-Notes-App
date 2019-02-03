import styled from 'styled-components'

const ActionButton = styled.button`
  font-size: 2rem;
  color: #eee;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 5px;
  background: ${props => props.type === 'danger' ? '#e02c2c' : '#28c268'};
  padding: .5rem 2rem;
  margin: .5rem;
  margin-left: 0;
`

export default ActionButton