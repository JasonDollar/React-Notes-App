import * as actionTypes from './actionTypes'
import {firebase, firestore} from '../../data/firebase'
import {history} from '../../data/history'


export const addNotetoStore = (note, id) => ({
  type: actionTypes.ADD_NOTE,
  payload: {
    id,
    title: note.title,
    body: note.body,
    createdAt: note.createdAt,
    editedAt: note.editedAt,
    createdBy: note.createdBy
  },
})

export const addNote = (note) => {
  return dispatch => {
    return firestore.collection('notes').add(note)
      .then(docRef => {
        return dispatch(addNotetoStore(note, docRef.id))
        
        })
  }
}

export const removeNoteInStore = (id) => ({
  type: actionTypes.REMOVE_NOTE,
  payload: id,
})

export const removeNote = id => {
  return dispatch => {
    return firestore.collection('notes').doc(id).delete()
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
    return firestore.collection('notes').doc(note.id).update(note)
      .then(() => dispatch(editNoteInStore(note))) 
  }
}

export const setNotesToStore = (notes) => ({
  type: actionTypes.SET_NOTES,
  payload: notes,
})

export const setNotes = (user) => {
  return dispatch => {
    const notes = []
    // const currentUser = firebase.auth().currentUser
     return firestore.collection('notes').where("createdBy", "==", user).get()
      .then(querySnapshot => {
        querySnapshot.forEach(item => {
          const noteBody = item.data()
          // console.log(noteBody, item.id)
          notes.push({
            ...noteBody,
            id: item.id,
          })
          return notes
        })
      })
      .then(() => dispatch(setNotesToStore(notes)))
  }
}

export const cleanNotes = () => ({
  type: actionTypes.CLEAN_NOTES
})