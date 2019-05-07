import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/en-gb'
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
    note = filtered[0]
    // console.log(note)
    // console.log(JSON.parse(note.body))
    // console.log(note.body.replace('"', ''))
    noteBody = JSON.parse(note.body).split('\n')
    // noteBody = [note.body]
    // console.log(noteBody)
  } else {
    return <Redirect to="/notes" />
  }
  
  if (note) {
    return (
      <DetailContainer className={isActive ? 'active' : ''}>
        <main className="content">
          <OnlyMobile>
            <ActionButton onClick={() => props.history.push('/notes') }>
              <FontAwesomeIcon icon="arrow-left" />{' '}Go back
            </ActionButton>
          </OnlyMobile>
          <p>Details:</p>
          <h2>{note.title}</h2>
          <article>{noteBody.map(item => <p>{item}</p> )}</article>
          <p>Created: {moment(note.createdAt).format('LLL')}</p>
          <p>Last edited: {moment(note.editedAt).fromNow()}</p>
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
