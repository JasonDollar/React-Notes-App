import React, { Component } from 'react'
import {connect} from 'react-redux'

import {Redirect} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import ActionButton from '../styles/ActionButton'
import DetailContainer from '../styles/DetailContainer'
import NoteForm from '../styles/NoteForm'
import * as actions from '../../store/actions'
// import classes from './AddNote.module.scss'

class EditNote extends Component {
  state = {
    id: '',
    title: '',
    body: '',
    editedAt: '',
    createdAt: '',
    // createdBy: ''
  }
  componentDidMount = () => {
    if ((this.props.match && this.props.match.params.id && this.props.notes)) {
      const noteToBeEdited = this.props.notes.find(item => item.id === this.props.match.params.id)
      // console.log(noteToBeEdited)
      if (noteToBeEdited) {
        // console.log(noteToBeEdited)
        this.setState({
          id: noteToBeEdited.id,
          title: noteToBeEdited.title,
          body: JSON.parse(noteToBeEdited.body),
          createdAt: noteToBeEdited.createdAt,
          // createdBy: noteToBeEdited.createdBy
        })
      } else {
        this.props.history.push('/notes')
      }
    }
  }
  

  onInputChange = e => {
    const elementName =  e.target.name
    const elementValue = e.target.value

    this.setState({[elementName]: elementValue})
    console.log((this.state.body))
  }

  onFormSubmit = e => {
    e.preventDefault();
    const note = {
      id: this.state.id,
      title: this.state.title,
      body: JSON.stringify(this.state.body),
      editedAt: Date.now(),
    }
    this.props.editNote(note)

  }
  

  render() {
    if (!this.props.notes) {
      return <Redirect to="/notes" />
    } else {

      return (
        <DetailContainer className="active">
        <div className="content form">
          <ActionButton type="button" onClick={this.props.history.goBack}>
            <FontAwesomeIcon icon="arrow-left" />
            {' '}Go back
          </ActionButton>
          
          <NoteForm onSubmit={this.onFormSubmit}>
            <input 
              className="note__title"
              type="text" 
              value={this.state.title} 
              onChange={this.onInputChange} 
              id="title" 
              name="title"
            />
            <div className="note__body--container">
              <textarea className="note__body" id="body" onChange={this.onInputChange} value={this.state.body} name="body"></textarea>
            </div>
            <ActionButton type="submit" className="note__button">
              <span className="icon"><FontAwesomeIcon icon="save" />{' '}Save note</span>
            </ActionButton>
          </NoteForm>
        </div>
      </DetailContainer>
      )
    }
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
  userId: state.auth.uid
})

const mapDispatchToProps = dispatch => ({
  editNote: (note) => dispatch(actions.editNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNote)
// .replace('/n', '')