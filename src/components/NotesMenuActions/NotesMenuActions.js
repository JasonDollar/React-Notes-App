import React from 'react'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import ActionButton from '../styles/ActionButton'
import FilterInput from '../styles/FilterInput'

const Menu = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background: #fff;
`

const NotesMenuActions = ({setFilter, setSortBy, dropdownValue}) => {
  return (
    <Menu>
      <NavLink to="/notes/create" style={{margin: 0}}>
        <ActionButton type="button" width="100%"><FontAwesomeIcon icon="plus" />{' '}Create new</ActionButton> 
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
    </Menu>
  )
}

export default NotesMenuActions
