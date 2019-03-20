import React, {useState} from 'react'
import {connect} from 'react-redux'

import {history} from '../../data/history'
import {filterNotesInOrder} from '../../helpers'
import NotesListItem from './NotesListItem/NotesListItem'
import NotesMenuActions from '../NotesMenuActions/NotesMenuActions'


import classes from './NotesList.module.scss'


const NotesList = ({notes}) => {
  const [activeNoteId] =  history.location.pathname.split('/').filter(item => item.length > 9)

  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('createdAsc')
  // const [activeClassId, setActiveClassId] = useState(activeNoteId)

  const textFilterHandler = e => {
    const value = e.target.value
    setFilter(value)
  }
  const dropdownSortHandler = e => {
    const value = e.target.value
    setSortBy(value)
  }

  const processedNotes = filterNotesInOrder(notes, filter, sortBy)
  
  return (
    <aside className={classes.NotesList}>
      <NotesMenuActions setFilter={textFilterHandler} setSortBy={dropdownSortHandler} dropdownValue={sortBy}/>
      <ul className={classes.list}>
        {processedNotes && processedNotes.map(item => (
            <NotesListItem 
              key={item.id} 
              note={item} 
              isActive={activeNoteId === item.id} 
            />)
          )}
      </ul>
    </aside>
  )
}

const mapStateToProps = state => ({
  notes: state.notes
})

export default connect(mapStateToProps)(NotesList)