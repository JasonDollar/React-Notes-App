import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import uuid from 'uuid'
import * as actions from '../../store/actions'

class NoteForm extends Component {
  state = {
    id: '',
    title: '',
    body: '',
    editedAt: '',
    createdAt: '',
  }
  componentDidMount = () => {
    console.log('mounted')
    if ((this.props.match && this.props.match.params.id)) {
      const noteToBeEdited = this.props.notes.find(item => item.id === this.props.match.params.id)
      console.log(noteToBeEdited)
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
    const elementName =  e.target.id
    const elementValue = e.target.value
    if (elementName === 'title') {
      this.setState({title: elementValue})
    } else if (elementName === 'body') {
      this.setState({body : elementValue})
    }
  }

  onFormSubmit = e => {
    e.preventDefault();
    const note = {
      id: this.state.id ? this.state.id : '',
      title: this.state.title,
      body: this.state.body,
      editedAt: Date.now(),
      createdAt: this.state.createdAt ? this.state.createdAt : Date.now()
    }
    if (this.props.action === 'editNote') {
      this.props.editNote(note)
    } else {

      this.props.addNote(note)
    }
    this.props.history && this.props.history.push(`/notes/${this.state.id}`)
  }
  
  addNoteHandler = () => {}

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input type="text" value={this.state.title} onChange={this.onInputChange} id="title"/>
          <textarea id="body" onChange={this.onInputChange} value={this.state.body}></textarea>
          <button type="submit" onClick={() => {}}>Add</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notes: state.notes
})

const mapDispatchToProps = dispatch => ({
  addNote: (note) => dispatch(actions.addNote(note)),
  editNote: (note) => dispatch(actions.editNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm)
