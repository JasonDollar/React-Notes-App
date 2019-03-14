import React, {useState} from 'react'
import {connect} from 'react-redux'

import {filterNotesInOrder} from '../../helpers'
import NotesListItem from './NotesListItem/NotesListItem'
import NotesMenuActions from '../NotesMenuActions/NotesMenuActions'
import {history} from '../../data/history'

import classes from './NotesList.module.scss'



const NotesList = ({notes, toggleNoteDetail}) => {
  const [activeNoteId] =  history.location.pathname.split('/').filter(item => item.length > 9)
  // console.log(activeNoteId)
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
              toggleNoteDetail={toggleNoteDetail} 
              isActive={activeNoteId === item.id} 
              // setActiveClassId={setActiveClassId}
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