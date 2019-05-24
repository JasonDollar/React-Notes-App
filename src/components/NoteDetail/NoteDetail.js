import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {format, distanceInWordsToNow} from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import ActionButton from '../styles/ActionButton'
import DetailContainer from '../styles/DetailContainer'
import * as actions from '../../store/actions'

// import classes from './NoteDetail.module.scss'

const OnlyMobile = styled.div`
  display: block;
  @media (min-width: 766px) {
    display: none;
  }
`

const NoteDetail = (props) => {
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
    // console.log(document.querySelector('#body').innerHTML)

    return () => {
      setActive(false)
    }
  }, [])

  let note, noteBody
  if (props.notes) {
    const filtered = props.notes.filter(item => item.id === props.match.params.id)
    if (filtered.length === 0) {
      props.history.push('/notes')
      
    }
    note = filtered[0]
    // console.log(note)
    // console.log(JSON.parse(note.body))
    // console.log(note.body.replace('"', ''))
    noteBody = note && note.body && JSON.parse(note.body).split('\n')
    // noteBody = [note.body]
    // console.log(noteBody)
  } else {
    return <Redirect to="/notes" />
  }
  
  if (note) {
    return (
      <DetailContainer className="active">
        <main className="content">
          <OnlyMobile>
            <ActionButton onClick={() => props.history.push('/notes') }>
              <FontAwesomeIcon icon="arrow-left" />{' '}Go back
            </ActionButton>
          </OnlyMobile>
          <div className="controls">
            <span className="details-text">Details:</span>
            <Link to={`/notes/edit/${note.id}`}  className="btn">
              <ActionButton width="100%">
                <span className="icon"><FontAwesomeIcon icon="edit"/>Edit note</span>
              </ActionButton>
            </Link>
            <ActionButton type="danger" onClick={() => props.removeNote(note.id) } className="btn">
              <span><FontAwesomeIcon icon="trash-alt"/>{' '}Delete Note</span>
            </ActionButton>
          </div>

          <h2 className="note-title">{note.title}</h2>

          <p className="details">Created: {format(note.createdAt, 'Do MMM YYYY, H:mm')}</p>
          <p className="details">Last edited: {distanceInWordsToNow(note.editedAt)} ago</p>

          <article className="note-body">{noteBody && noteBody.map(item => <p className="note-paragraph">{item}</p> )}</article>
   
          
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
