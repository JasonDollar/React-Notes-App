import React, { Component } from 'react'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import ActionButton from '../styles/ActionButton'
import DetailContainer from '../styles/DetailContainer'
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
    return (
      <DetailContainer className="active">
        <div className="content">
          <ActionButton onClick={() => {
            if (this.state.id) {
              this.props.history.push(`/notes/view/${this.state.id}`)
            } else {
              this.props.history.push('/notes') 
            }
          }}>
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

const mapStateToProps = state => ({
  user: state.auth.uid
})

const mapDispatchToProps = dispatch => ({
  addNote: (note) => dispatch(actions.addNote(note)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNote)


