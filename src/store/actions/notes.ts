import { Dispatch, AnyAction, Action } from 'redux'
import { ActionTypes } from './types'
import { firestore } from '../../data/firebase'

export interface Note {
  id?: string,
  title: string,
  body: string,
  createdAt?: number,
  editedAt: number,
  createdBy?: string
}

export interface AddNotetoStoreAction {
  type: ActionTypes.ADD_NOTE,
  payload: Note
}

export interface RemoveNoteInStoreAction {
  type: ActionTypes.REMOVE_NOTE,
  payload: string
}

export interface EditNoteInStoreAction {
  type: ActionTypes.EDIT_NOTE,
  payload: Note
}

export interface SetNotesToStoreAction {
  type: ActionTypes.SET_NOTES,
  payload: Note[]
}

export interface CleanNotesAction {
  type: ActionTypes.CLEAN_NOTES,
}

export const addNotetoStore = (note: Note, id: string): AddNotetoStoreAction => ({
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
        return dispatch<AddNotetoStoreAction>(addNotetoStore(note, docRef.id))
        })
  }
}

export const removeNoteInStore = (id: string): RemoveNoteInStoreAction => ({
  type: ActionTypes.REMOVE_NOTE,
  payload: id,
})

export const removeNote = (id: string) => {
  return (dispatch: Dispatch) => {
    return firestore.collection('notes').doc(id).delete()
      .then(() => dispatch<RemoveNoteInStoreAction>(removeNoteInStore(id)))
  }
}

export const editNoteInStore = (note: Note): EditNoteInStoreAction => ({
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
      .then(() => dispatch<EditNoteInStoreAction>(editNoteInStore(note))) 
  }
}

export const setNotesToStore = (notes: Note[]): SetNotesToStoreAction => ({
  type: ActionTypes.SET_NOTES,
  payload: notes,
})

export const setNotes = (user: string) => {
  return (dispatch: Dispatch<AnyAction>) => {
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
      .then(() => dispatch<SetNotesToStoreAction>(setNotesToStore(notes)))
  }
}

export const cleanNotes = (): CleanNotesAction => ({
  type: ActionTypes.CLEAN_NOTES
})