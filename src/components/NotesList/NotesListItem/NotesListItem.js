import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'
import classNames from 'classnames'

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
    margin: 1rem 0;
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

  if (body.length > 32) {
    notesBody = body.substring(0, 32) + '...'
  } else {
    notesBody = body
  }
  if (title.length > 32) {
    notesTitle = title.substring(0, 30) + '...'
  } else {
    notesTitle = title
  }

  return (
    <ListItem 
      className={classNames({
        active: isActive,
      })}
    >
      <Link to={`/notes/view/${id}`} >

        <h3 className="header">{notesTitle}</h3>
        <p className="note">{notesBody}</p>
        <p className="time">{moment(createdAt).format('LLL')}</p>
   
      </Link>
    </ListItem>
  )
}

export default NotesListItem
