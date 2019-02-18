import React, { Component } from 'react'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

import ActionButton from '../styles/ActionButton'

import classes from './AddNote.module.scss'

class AddNote extends Component {
  state = {
    title: '',
    body: '',
    editedAt: '',
    createdAt: '',
  }
  

  onInputChange = e => {
    const elementName =  e.target.name
    const elementValue = e.target.value

    this.setState({[elementName]: elementValue})
  }

  onFormSubmit = e => {
    e.preventDefault();
    const {firestore} = this.props
    const note = {
      title: this.state.title,
      body: this.state.body,
      editedAt: Date.now(),
      createdAt: Date.now(),
      createdBy: this.props.user ? this.props.user : ''
    }
    firestore.add({collection: `notes`, doc: this.props.user}, note)
      .then((docRef) => {
        this.props.history.push(`/notes/${docRef.id}`)
      })

    
  }
  
  addNoteHandler = () => {}

  render() {
    return (
      <div className={classes.AddNote}>
        <ActionButton onClick={() => {
          if (this.state.id) {
            this.props.history.push(`/notes/${this.state.id}`)
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
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.uid
})

// const mapDispatchToProps = dispatch => ({
//   addNote: (note) => dispatch(actions.addNote(note)),
//   editNote: (note) => dispatch(actions.editNote(note))
// })

export default compose (
  firestoreConnect(),
connect(mapStateToProps)
)(AddNote)

// export default firestoreConnect()(AddNote)
