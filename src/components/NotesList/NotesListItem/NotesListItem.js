import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import classNames from 'classnames'

const ListItem = styled.li`
  outline: none;
  border: none;
  border-bottom: 1px solid ${props => props.theme.lightGrey};
  padding: 0 1rem;

  &.active {
    @media (min-width: 767px) {
      background-color: ${props => props.theme.lightGrey};
      
    }
  }

  & a:link,
  & a:visited {
    outline: 0;
    color: inherit;
    text-decoration: none;
  }
`

const NotesListItem = ({note, toggleNoteDetail, isActive, setActiveClassId}) => {
  const {title, body, id, createdAt} = note
  let notesBody

  if (body.length > 32) {
    notesBody = body.substring(0, 32) + '...'
  } else {
    notesBody = body
  }

  return (
    <ListItem 
      className={classNames({
        active: isActive,
      })}
    >
      <Link to={`/notes/${id}`} onClick={() => {
        toggleNoteDetail()
        setActiveClassId(id)
      }} >

        <h3>{title}</h3>
        <p>{notesBody}</p>
        <p>{moment(createdAt).format('LLL')}</p>
   
        
      </Link>
    </ListItem>
  )
}

export default NotesListItem
