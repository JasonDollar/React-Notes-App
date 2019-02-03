import React, {Component, useState} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'
import classNames from 'classnames'

import {filterNotesInOrder} from '../../helpers'
import * as actions from '../../store/actions'
import NotesListItem from './NotesListItem/NotesListItem'
import NotesMenuActions from '../NotesMenuActions/NotesMenuActions'

import classes from './NotesList.module.scss'

const NotesList = ({notes, toggleNoteList, showNoteList}) => {

  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('createdAsc')
  const [activeClassId, setActiveClassId] = useState(0)

  const textFilterHandler = e => {
    const value = e.target.value
    setFilter(value)
  }
  const dropdownSortHandler = e => {
    const value = e.target.value
    console.log(value)
    setSortBy(value)
  }

  const containerClasses = classNames({
    [classes.NotesList]: true,
    [classes.active]: showNoteList,
  })
  const processedNotes = filterNotesInOrder(notes, filter, sortBy)
  
  return (
    <div className={containerClasses}>
      <NotesMenuActions setFilter={textFilterHandler} setSortBy={dropdownSortHandler} dropdownValue={sortBy}/>
      <ul className={classes.notesList}>
        {processedNotes.map(item => <NotesListItem note={item} key={item.id} toggleNoteList={toggleNoteList} isActive={activeClassId === item.id} setActiveClassId={setActiveClassId}/>)}
      </ul>
    </div>
  )
}


// class NotesList extends Component {
//   // componentDidMount = () => {
//   //   this.props.setNotes()
//   // }
  
//   render() {
//     const {notes} = this.props
//     return (
      
//     )
//   }
// }
const mapStateToProps = state => ({
  notes: state.notes
})

// const mapDispatchToProps = dispatch => ({
//   setNotes: () => dispatch(actions.setNotes())
// })

export default connect(mapStateToProps)(NotesList)
