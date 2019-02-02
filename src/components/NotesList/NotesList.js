import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'
import classNames from 'classnames'

import * as actions from '../../store/actions'
import NotesListItem from './NotesListItem/NotesListItem'
import NotesMenuActions from '../NotesMenuActions/NotesMenuActions'

import classes from './NotesList.module.scss'

const NotesList = ({notes, toggleNoteList, showNoteList}) => {
  const containerClasses = classNames({
    [classes.NotesList]: true,
    [classes.active]: showNoteList,
  })
  
  return (
    <div className={containerClasses}>
      <NotesMenuActions />
      <ul className={classes.notesList}>
        {notes.map(item => <NotesListItem note={item} key={item.id} toggleNoteList={toggleNoteList}/>)}
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
