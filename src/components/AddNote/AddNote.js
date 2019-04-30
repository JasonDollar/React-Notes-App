import React, { Component } from 'react'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import ActionButton from '../styles/ActionButton'
import DetailContainer from '../styles/DetailContainer'
import NoteForm from '../styles/NoteForm'
import * as actions from '../../store/actions'

// import classes from './AddNote.module.scss'

class AddNote extends Component {
  state = {
    title: '',
    body: '',
    editedAt: '',
    createdAt: '',
  }
  componentDidMount = () => {
    if (!this.props.user) {
      this.props.history.push('/notes')
    }
  }
  

  onInputChange = e => { 
    const elementName =  e.target.name
    const elementValue = e.target.value

    this.setState({[elementName]: elementValue})
  }

  onFormSubmit = e => {
    e.preventDefault();
    const note = {
      title: this.state.title,
      body: this.state.body,
      editedAt: Date.now(),
      createdAt: Date.now(),
      createdBy: this.props.user 
    }

    this.props.addNote(note)
    
  }
  
  addNoteHandler = () => {}

  render() {
    // console.log(this.props.history)
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

const mapStateToProps = state => ({
  user: state.auth.uid
})

const mapDispatchToProps = dispatch => ({
  addNote: (note) => dispatch(actions.addNote(note)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNote)


