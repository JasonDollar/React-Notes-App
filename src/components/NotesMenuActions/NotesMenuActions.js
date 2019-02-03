import React from 'react'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './NotesMenuActions.module.scss'

const NotesMenuActions = ({setFilter, setSortBy, dropdownValue}) => {
  return (
    <div className={`${classes.Menu}`}>
      <NavLink to="/create">
        <span className="icon"><FontAwesomeIcon icon="plus" />Create new</span> 
        </NavLink>
        <input type="text" onChange={setFilter}/>
        <div>
          <label htmlFor="sortBy">Sort by: </label>
          <select name="sortBy" id="sortBy" onChange={setSortBy} value={dropdownValue}>
            <option value="created">Created</option>
            <option value="edited">Edited</option>
          </select>
        </div>
    </div>
  )
}

export default NotesMenuActions
