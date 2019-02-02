import React from 'react'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './NotesMenuActions.module.scss'

const NotesMenuActions = () => {
  return (
    <div className={`${classes.Menu}`}>
      <NavLink to="/create">
        <span className="icon"><FontAwesomeIcon icon="plus" />Create new</span> 
      </NavLink>
    </div>
  )
}

export default NotesMenuActions
