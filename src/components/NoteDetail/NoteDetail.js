import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/en-gb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ActionButton from '../styles/ActionButton'
import DetailContainer from '../styles/DetailContainer'
import * as actions from '../../store/actions'

import classes from './NoteDetail.module.scss'

const NoteDetail = (props) => {
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    setActive(true)

    return () => {
      setActive(false)
    }
  }, [])

  let note
  if (props.notes) {
    const filtered = props.notes.filter(item => item.id === props.match.params.id)
    note = filtered[0]
  } else {
    return <Redirect to="/notes" />
  }
  
  if (note) {
    return (
      <DetailContainer className={isActive ? 'active' : ''}>
        <main className={classes.content}>
          <div className={classes.onlyMobile}>
            <ActionButton onClick={() => props.history.push('/notes') }>
              <FontAwesomeIcon icon="arrow-left" />{' '}Go back
            </ActionButton>
          </div>
          <p>Details:</p>
          <h2 className={classes.title}>{note.title}</h2>
          <p className={classes.body}>{note.body}</p>
          <p className={classes.created}>Created: {moment(note.createdAt).format('LLL')}</p>
          <p className={classes.edited}>Last edited: {moment(note.editedAt).fromNow()}</p>
          <Link to={`/notes/edit/${note.id}`} style={{display: 'inlineBlock', width: '50%'}}>
            <ActionButton>
              <span className="icon"><FontAwesomeIcon icon="edit"/>Edit note</span>
            </ActionButton>
          </Link>
          <ActionButton type="danger" onClick={() => props.removeNote(note.id) }>
            <span><FontAwesomeIcon icon="trash-alt"/>{' '}Delete Note</span>
          </ActionButton>
        </main>
      </DetailContainer>
    )
  } else return <Redirect to="/notes" />
}

const mapStateToProps = state => ({
  notes: state.notes
})

const mapDispatchToProps = dispatch => ({
  removeNote: (id) => dispatch(actions.removeNote(id))
})

export default connect(mapStateToProps,mapDispatchToProps)(NoteDetail)
