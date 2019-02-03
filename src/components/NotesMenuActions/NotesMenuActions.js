import React from 'react'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import styled from 'styled-components'
import ActionButton from '../styles/ActionButton'
import FilterInput from '../styles/FilterInput'

import classes from './NotesMenuActions.module.scss'

const NotesMenuActions = ({setFilter, setSortBy, dropdownValue}) => {
  return (
    <div className={`${classes.Menu}`}>
      <NavLink to="/create">
        <ActionButton><FontAwesomeIcon icon="plus" />{' '}Create new</ActionButton> 
        </NavLink>
        <div style={{position: 'relative', fontSize: '1.4rem', color: '#777'}}>
          <FilterInput type="text" onChange={setFilter}/>
          <span style={{
            position: "absolute",
            top: '50%',
            left: '1rem',
            transform: 'translateY(-50%)',
          }}>
            <FontAwesomeIcon icon='search' />
          </span> 
        </div>
        <div>
          <label htmlFor="sortBy">Sort by: </label>
          <select name="sortBy" id="sortBy" onChange={setSortBy} value={dropdownValue}>
            <option value="createdAsc">Created Asc</option>
            <option value="createdDesc">Created Desc</option>
            <option value="editedAsc">Edited Asc</option>
            <option value="editedDesc">Edited Desc</option>
          </select>
        </div>
    </div>
  )
}

export default NotesMenuActions
