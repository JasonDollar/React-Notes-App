import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import classes from './NoteDetail.module.css';
import {Link} from 'react-router-dom'
import * as actions from '../../store/actions'
import moment from 'moment'
import 'moment/locale/pl'
const NoteDetail = (props) => {
  // moment.locale('pl')
  const filtered = props.notes.filter(item => item.id === props.match.params.id)
  const note = filtered[0]
  console.log(props.notes)
  if (note) {
    return (
      <div className={classes.main}>
      <p>Details:</p>
      <h1>{note.title}</h1>
      <h3>{note.body}</h3>
      <p>Created: {moment(note.createdAt).format('LLL')}</p>
      <p>Last edited: {moment(note.editedAt).fromNow()}</p>
      <button><Link to={`/edit/${note.id}`}>EDIT</Link></button>
      <button onClick={() => props.removeNote(note.id)}>REMOVE</button>
      </div>
    )
  } else return <Redirect to="/notes" />
}

const mapStateToProps = state => ({
  notes: state.notes
})

const mapDispatchToProps = dispatch => ({
  removeNote: (id) => dispatch(actions.removeNote(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetail)
