import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'
import * as actions from '../../store/actions'
import NotesListItem from './NotesListItem/NotesListItem'

import classes from './NotesList.module.css'




class NotesList extends Component {
  // componentDidMount = () => {
  //   this.props.setNotes()
  // }
  
  render() {
    const {notes} = this.props
    return (
      <div className={classes.NotesList}>
      {notes.map(item => <NotesListItem note={item} key={item.id}/>)}
    </div>
    )
  }
}
const mapStateToProps = state => ({
  notes: state.notes
})

// const mapDispatchToProps = dispatch => ({
//   setNotes: () => dispatch(actions.setNotes())
// })

export default connect(mapStateToProps)(NotesList)
