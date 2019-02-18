import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/en-gb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import classNames from 'classnames'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'


import ActionButton from '../styles/ActionButton'

import classes from './NoteDetail.module.scss'

const ColorProvider = styled.main`
  background: ${props => props.theme.background};
  color: ${props => props.theme.fontColor};
`

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
 

  const containerClasses = classNames({
    [classes.main]: true,
    [classes.active]: isActive,
  })
  
  if (note) {
    return (
      <ColorProvider className={containerClasses}>
      <div className={classes.onlyMobile}>
        <ActionButton onClick={() => {
          props.toggleNoteDetail()
          props.history.push('/notes')
        }}>
          <FontAwesomeIcon icon="arrow-left" />{' '}Go back
        </ActionButton>
      </div>
      <div className={classes.content}>
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
        <ActionButton type="danger" onClick={() => props.firestore.delete({collection: 'notes', doc: note.id}) }>
          <span><FontAwesomeIcon icon="trash-alt"/>{' '}Delete Note</span>
        </ActionButton>
      </div>
      </ColorProvider>
    )
  } else return <Redirect to="/notes" />
}

const mapStateToProps = state => ({
  notes: state.firestore.ordered.notes
})

// const mapDispatchToProps = dispatch => ({
//   removeNote: (id) => dispatch(actions.removeNote(id))
// })

export default compose(
  firestoreConnect(),
connect(mapStateToProps)
)(NoteDetail)
