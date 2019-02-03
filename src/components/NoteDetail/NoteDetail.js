import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/en-gb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ActionButton from '../styles/ActionButton'


import * as actions from '../../store/actions'
import classes from './NoteDetail.module.scss';

const NoteDetail = (props) => {
  const filtered = props.notes.filter(item => item.id === props.match.params.id)
  const note = filtered[0]
  console.log(props.notes)
  
  if (note) {
    return (
      <div className={classes.main}>
      <div className={classes.onlyMobile}>
        <ActionButton>
          <FontAwesomeIcon icon="arrow-left" onClick={() => {
            props.toggleNoteList()
            props.history.push('/notes')
          }}/>{' '}Go back
        </ActionButton>
      </div>
      <p>Details:</p>
      <h1>{note.title}</h1>
      <h3>{note.body}</h3>
      <p>Created: {moment(note.createdAt).format('LLL')}</p>
      <p>Last edited: {moment(note.editedAt).fromNow()}</p>
      <Link to={`/edit/${note.id}`}>
        <ActionButton>
          <span className="icon"><FontAwesomeIcon icon="edit"/>Edit note</span>
        </ActionButton>
      </Link>
      <ActionButton type="danger" onClick={() => props.removeNote(note.id)}>
        <span><FontAwesomeIcon icon="trash-alt"/>{' '}Delete Note</span>
      </ActionButton>
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
