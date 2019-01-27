import React from 'react'
import {Link} from 'react-router-dom'

const NotesListItem = ({note}) => {
  const {title, body, id} = note
  let notesBody
  if (body.length > 100) {
    notesBody = body.substring(0, 100)
  } else {
    notesBody = body
  }
  return (
    <Link to={`/notes/${id}`}>
      <h3>{title}</h3>
      <p>{notesBody}</p>
      
    </Link>
  )
}

export default NotesListItem
