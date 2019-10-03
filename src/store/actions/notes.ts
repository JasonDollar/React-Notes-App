import { Dispatch } from 'redux'
import * as actionTypes from './actionTypes'
import { ActionTypes } from './types'
import {firestore} from '../../data/firebase'
// import {history} from '../../data/history'

export interface Note {
  id?: string,
  title: string,
  body: string,
  createdAt?: number,
  editedAt: number,
  createdBy?: string
}

export interface AddNotetoStore {
  type: ActionTypes.ADD_NOTE,
  payload: Note
}

export interface RemoveNoteInStore {
  type: ActionTypes.REMOVE_NOTE,
  payload: string
}

export interface EditNoteInStore {
  type: ActionTypes.EDIT_NOTE,
  payload: Note
}

export interface SetNotesToStore {
  type: ActionTypes.SET_NOTES,
  payload: Note[]
}

export interface CleanNotes {
  type: ActionTypes.CLEAN_NOTES,
}

export const addNotetoStore = (note: Note, id: string): AddNotetoStore => ({
  type: ActionTypes.ADD_NOTE,
  payload: {
    id,
    title: note.title,
    body: note.body,
    createdAt: note.createdAt,
    editedAt: note.editedAt,
    createdBy: note.createdBy
  },
})

export const addNote = (note: Note) => {
  return (dispatch: Dispatch) => {
    return firestore.collection('notes').add(note)
      .then(docRef => {
        return dispatch(addNotetoStore(note, docRef.id))
        
        })
  }
}

export const removeNoteInStore = (id: string): RemoveNoteInStore => ({
  type: ActionTypes.REMOVE_NOTE,
  payload: id,
})

export const removeNote = (id: string) => {
  return (dispatch: Dispatch) => {
    return firestore.collection('notes').doc(id).delete()
      .then(() => dispatch(removeNoteInStore(id)))
  }
}

export const editNoteInStore = (note: Note): EditNoteInStore => ({
  type: ActionTypes.EDIT_NOTE,
  payload: {
    id: note.id,
    title: note.title,
    body: note.body,
    editedAt: note.editedAt
  }
})

export const editNote = (note: Note) => {
  return (dispatch: Dispatch) => {
    return firestore.collection('notes').doc(note.id).update(note)
      .then(() => dispatch(editNoteInStore(note))) 
  }
}

export const setNotesToStore = (notes: Note[]): SetNotesToStore => ({
  type: ActionTypes.SET_NOTES,
  payload: notes,
})

export const setNotes = (user: string) => {
  return (dispatch: Dispatch) => {
    const notes: any = []
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

export const cleanNotes = (): CleanNotes => ({
  type: ActionTypes.CLEAN_NOTES
})