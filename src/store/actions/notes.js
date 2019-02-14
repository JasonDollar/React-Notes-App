import * as actionTypes from './actionTypes'
import {db} from '../../firebase'


export const addNotetoStore = (note, id) => ({
  type: actionTypes.ADD_NOTE,
  payload: {
    title: note.title,
    body: note.body,
    createdAt: note.createdAt,
    editedAt: note.editedAt
  },
})

export const addNote = (note) => {
  return dispatch => {
    db.collection('notes').add(note)
      .then(docRef => dispatch(addNotetoStore(note, docRef.id)))
  }
}

export const removeNoteInStore = (id) => ({
  type: actionTypes.REMOVE_NOTE,
  payload: id,
})

export const removeNote = id => {
  return dispatch => {
    db.collection('notes').doc(id).delete()
      .then(() => dispatch(removeNoteInStore(id)))
  }
}

export const editNoteInStore = note => ({
  type: actionTypes.EDIT_NOTE,
  payload: {
    id: note.id,
    title: note.title,
    body: note.body,
    editedAt: note.editedAt
  }
})

export const editNote = (note) => {
  return dispatch => {
    db.collection('notes').doc(note.id).set(note)
      .then(() => dispatch(editNoteInStore(note))) 
  }
}

export const setNotesToStore = (notes) => ({
  type: actionTypes.SET_NOTES,
  payload: notes,
})

export const setNotes = () => {
  return dispatch => {
    const notes = []
     db.collection('notes').get()
      .then(querySnapshot => {
        querySnapshot.forEach(item => {
          const noteBody = item.data()
          // console.log(noteBody, item.id)
          notes.push({
            ...noteBody,
            id: item.id,
          })
        })
      })
      .then(() => dispatch(setNotesToStore(notes)))
  }
}