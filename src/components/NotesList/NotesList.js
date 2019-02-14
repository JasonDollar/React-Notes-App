import React, {useState} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
// import uuid from 'uuid'
// import classNames from 'classnames'

import {filterNotesInOrder} from '../../helpers'
// import * as actions from '../../store/actions'
import NotesListItem from './NotesListItem/NotesListItem'
import NotesMenuActions from '../NotesMenuActions/NotesMenuActions'

import classes from './NotesList.module.scss'

const NotesList = ({notes, toggleNoteDetail}) => {

  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('createdAsc')
  const [activeClassId, setActiveClassId] = useState(0)

  const textFilterHandler = e => {
    const value = e.target.value
    setFilter(value)
  }
  const dropdownSortHandler = e => {
    const value = e.target.value
    setSortBy(value)
  }
  // console.log(firestore)


  const processedNotes = filterNotesInOrder(notes, filter, sortBy)
  // const processedNotes = notes
  
  return (
    <div className={classes.NotesList}>
      <NotesMenuActions setFilter={textFilterHandler} setSortBy={dropdownSortHandler} dropdownValue={sortBy}/>
      <ul className={classes.list}>
        {processedNotes && processedNotes.map(item => (
            <NotesListItem 
              note={item} key={item.id} 
              toggleNoteDetail={toggleNoteDetail} 
              isActive={activeClassId === item.id} 
              setActiveClassId={setActiveClassId}
            />)
          )}
      </ul>
    </div>
  )
}


const mapStateToProps = state => ({
  notes: state.firestore.ordered.notes
})

// const mapDispatchToProps = dispatch => ({
//   setNotes: () => dispatch(actions.setNotes())
// })

export default compose(
  firestoreConnect([{collection: 'notes'}]),
  connect(mapStateToProps)
  )(NotesList)

// export default connect(mapStateToProps)(NotesList)