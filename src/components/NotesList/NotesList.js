import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {history} from '../../data/history'
import {filterNotesInOrder} from '../../helpers'
import NotesListItem from './NotesListItem/NotesListItem'
import NotesMenuActions from '../NotesMenuActions/NotesMenuActions'
import Spinner from '../styles/Spinner'
import ActionButton from '../styles/ActionButton'

import classes from './NotesList.module.scss'


const NotesList = ({notes, firebaseProcessing, isAuth}) => {
  let [action, activeNoteId] =  history.location.pathname.split('/').filter(item => item.length > 9 || item.length === 4)

  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('createdAsc')
  const [page, setPage] = useState(1)
  const notesPerPage = 7

  //set active page when sorting changes or new note is added 
  useEffect(() => {
    const noteIndex = processedNotes.findIndex(item => item.id === activeNoteId)
    if (action === 'edit') {
      return
    }
    if (noteIndex > -1) {
      const notePage = Math.ceil((noteIndex + 1) / notesPerPage)
      setPage(notePage)
    } 
  }, [activeNoteId, sortBy, action])


  const textFilterHandler = e => {
    const value = e.target.value
    setFilter(value)
  }
  const dropdownSortHandler = e => {
    const value = e.target.value
    setSortBy(value)
  }

  const processedNotes = filterNotesInOrder(notes, filter, sortBy, page)
  const sliceStart = page * notesPerPage - notesPerPage
  const paginatedNotes = processedNotes.slice(sliceStart, sliceStart + notesPerPage)

  if (firebaseProcessing) {
    return <Spinner />
  }
  if (!isAuth) {
    return <Redirect to="/signin" />
  }
  
  return (
    <aside className={classes.NotesList}>
      <NotesMenuActions setFilter={textFilterHandler} setSortBy={dropdownSortHandler} dropdownValue={sortBy}/>
      <ul className={classes.list}>
        {paginatedNotes && paginatedNotes.map(item => (
            <NotesListItem 
              key={item.id} 
              note={item} 
              isActive={activeNoteId === item.id} 
            />)
          )}
      </ul>
      <div className={classes.paginationButtons}>
        <ActionButton onClick={() => setPage(page - 1)} disabled={page < 2}>
          <FontAwesomeIcon icon="arrow-left" />{' '}Previous
        </ActionButton>
        <ActionButton onClick={() => setPage(page + 1)} disabled={processedNotes.length / page <= 10} >
        Next{' '}<FontAwesomeIcon icon="arrow-right" />
        </ActionButton>
      </div>
    </aside>
  )
}

const mapStateToProps = state => ({
  notes: state.notes,
  firebaseProcessing: state.auth.firebaseProcessing,
  isAuth: !!state.auth.uid,
})

export default connect(mapStateToProps)(NotesList)