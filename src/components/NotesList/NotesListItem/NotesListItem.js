import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import classNames from 'classnames'
// import {withRouter} from 'react-router-dom'
// import classes from './NoteListItem.module.scss';

const ListItem = styled.li`
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 0 1rem;

  &.active {
    background-color: #ccc;
  }

  & a:link,
  & a:visited {
    outline: 0;
    color: inherit;
    text-decoration: none;
  }
`

const NotesListItem = ({note, toggleNoteList, isActive, setActiveClassId}) => {
  const {title, body, id, createdAt} = note
  let notesBody

  if (body.length > 30) {
    notesBody = body.substring(0, 30) + ' ...'
  } else {
    notesBody = body
  }

  return (
    <ListItem 
      className={classNames({
        active: isActive,
      })}
      onClick={() => {
        toggleNoteList()
        setActiveClassId(id)
      }} 
    
    >
      <Link to={`/notes/${id}`} >

        <h3>{title}</h3>
        <p>{notesBody}</p>
        <p>{moment(createdAt).format('LLL')}</p>
   
        
      </Link>
    </ListItem>
  )
}

export default NotesListItem
