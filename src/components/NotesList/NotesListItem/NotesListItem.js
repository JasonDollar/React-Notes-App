import React from 'react'
import {Link} from 'react-router-dom'

const NotesListItem = ({note, toggleNoteList}) => {
  const {title, body, id} = note
  let notesBody
  if (body.length > 100) {
    notesBody = body.substring(0, 100)
  } else {
    notesBody = body
  }
  return (
    <li onClick={toggleNoteList}>
      <Link to={`/notes/${id}`}>

        <h3>{title}</h3>
        <p>{notesBody}</p>
   
        
      </Link>
    </li>
  )
}

export default NotesListItem
