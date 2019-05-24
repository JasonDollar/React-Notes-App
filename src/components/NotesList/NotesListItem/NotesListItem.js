import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {format} from 'date-fns'

const ListItem = styled.li`
  outline: none;
  border: none;
  border-bottom: 1px solid ${props => props.theme.lightGrey};
  @media (max-width: 767px) {
    padding: 2px 0;
    }

  /* &.hover, */
  &.active {
    @media (min-width: 767px) {
      background-color: ${props => props.theme.lightGrey};
      
    }
  }

  & a:link,
  & a:visited {
    display: block;
    height: 100%;
    border-radius: 0;
    outline: 0;
    color: inherit;
    text-decoration: none;
    padding: 1rem;
    /* &,& > * {margin: 0;} */
  }

  .header, .note {
    margin: .5rem 0 1rem 0;
  }

  .time {
    font-style: italic;
    font-size: 1.4rem;
    color: ${props => props.theme.fontColorGrey}
  }
`

const NotesListItem = ({note, toggleNoteDetail, isActive}) => {
  const {title, body, id, createdAt} = note
  let notesBody, notesTitle

  notesBody = JSON.parse(body).split('\n')[0]
  // console.log(notesBody)
  // console.log(body)

  if (notesBody.length > 32) {
    notesBody = notesBody.substring(0, 32) + '...'
  }
  if (title.length > 32) {
    notesTitle = title.substring(0, 30) + '...'
  } else {
    notesTitle = title
  }

  return (
    <ListItem 
      className={isActive ? 'active' : ''}
    >
      <Link to={`/notes/view/${id}`} >

        <h3 className="header">{notesTitle}</h3>
        <p className="note">{notesBody}</p>
        <p className="time">{format(createdAt, 'Do MMM YYYY, H:mm')}</p>
   
      </Link>
    </ListItem>
  )
}

export default NotesListItem
