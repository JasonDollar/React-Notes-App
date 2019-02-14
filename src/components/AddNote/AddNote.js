import React, { Component } from 'react'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
// import uuid from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

import ActionButton from '../styles/ActionButton'
import * as actions from '../../store/actions'

import classes from './AddNote.module.scss'

class AddNote extends Component {
  state = {
    title: '',
    body: '',
    editedAt: '',
    createdAt: '',
  }
  // componentDidMount = () => {
  //   console.log(this.props.firestore)
  //   if ((this.props.match && this.props.match.params.id)) {
  //     const noteToBeEdited = this.props.notes.find(item => item.id === this.props.match.params.id)
  //     console.log(noteToBeEdited)
  //     if (noteToBeEdited) {
  //       this.setState({
  //         id: noteToBeEdited.id,
  //         title: noteToBeEdited.title,
  //         body: noteToBeEdited.body,
  //         createdAt: noteToBeEdited.createdAt
  //       })
  //     } else {
  //       this.props.history.push('/notes')
  //     }
  //   }
  // }
  

  onInputChange = e => {
    const elementName =  e.target.name
    const elementValue = e.target.value
    // if (elementName === 'title') {
    //   this.setState({title: elementValue})
    // } else if (elementName === 'body') {
    //   this.setState({body : elementValue})
    // }
    this.setState({[elementName]: elementValue})
  }

  onFormSubmit = e => {
    e.preventDefault();
    const {firestore} = this.props
    const note = {
      title: this.state.title,
      body: this.state.body,
      editedAt: Date.now(),
      createdAt: Date.now()
    }
    firestore.add({collection: 'notes'}, note)
      .then((docRef) => {
        this.props.history.push(`/notes/${docRef.id}`)
        // console.log(docRef.id)
      })
    // if (this.props.action === 'editNote') {
    //   this.props.editNote(note)
    // } else {

    //   this.props.addNote(note)
    
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

// const mapStateToProps = state => ({
//   notes: state.firestore.ordered.notes
// })

// const mapDispatchToProps = dispatch => ({
//   addNote: (note) => dispatch(actions.addNote(note)),
//   editNote: (note) => dispatch(actions.editNote(note))
// })

// export default compose (
//   firestoreConnect(),
// connect(mapStateToProps, mapDispatchToProps)
// )(AddNote)

export default firestoreConnect()(AddNote)
