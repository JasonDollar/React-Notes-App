import React, { Component } from 'react'
import {connect} from 'react-redux'

import {Redirect} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import ActionButton from '../styles/ActionButton'
import DetailContainer from '../styles/DetailContainer'
import * as actions from '../../store/actions'
// import classes from './AddNote.module.scss'

class EditNote extends Component {
  state = {
    id: '',
    title: '',
    body: '',
    editedAt: '',
    createdAt: '',
  }
  componentDidMount = () => {
    if ((this.props.match && this.props.match.params.id && this.props.notes)) {
      const noteToBeEdited = this.props.notes.find(item => item.id === this.props.match.params.id)
      // console.log(noteToBeEdited)
      if (noteToBeEdited) {
        this.setState({
          id: noteToBeEdited.id,
          title: noteToBeEdited.title,
          body: noteToBeEdited.body,
          createdAt: noteToBeEdited.createdAt
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
  }

  onFormSubmit = e => {
    e.preventDefault();
    const note = {
      id: this.state.id,
      title: this.state.title,
      body: this.state.body,
      editedAt: Date.now(),
    }
    this.props.editNote(note)

  }
  
  addNoteHandler = () => {}

  render() {
    if (!this.props.notes) {
      return <Redirect to="/notes" />
    } else {

      return (
        <DetailContainer className="active">
          <div className="content">
            <ActionButton type="button" onClick={this.props.history.goBack}>
            <FontAwesomeIcon icon="arrow-left" />
            {' '}Go back
            </ActionButton>
            
            <form onSubmit={this.onFormSubmit}>
              <input type="text" value={this.state.title} onChange={this.onInputChange} id="title" name="title"/>
              <textarea id="body" onChange={this.onInputChange} value={this.state.body} name="body"></textarea>
              <ActionButton type="submit">
                <span className="icon"><FontAwesomeIcon icon="save" />{' '}Save note</span>
              </ActionButton>
            </form>
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
