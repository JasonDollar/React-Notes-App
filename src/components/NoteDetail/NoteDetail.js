import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/en-gb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import classNames from 'classnames'
import ActionButton from '../styles/ActionButton'

import * as actions from '../../store/actions'
import classes from './NoteDetail.module.scss';

const ColorProvider = styled.main`
  background: ${props => props.theme.background};
  color: ${props => props.theme.fontColor};
`

const NoteDetail = (props) => {
  const filtered = props.notes.filter(item => item.id === props.match.params.id)
  const note = filtered[0]
  console.log(props.notes)

  const containerClasses = classNames({
    [classes.main]: true,
    [classes.active]: props.showNoteDetail,
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
        <ActionButton type="danger" onClick={() => props.removeNote(note.id)}>
          <span><FontAwesomeIcon icon="trash-alt"/>{' '}Delete Note</span>
        </ActionButton>
      </div>
      </ColorProvider>
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
