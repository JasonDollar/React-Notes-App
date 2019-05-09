import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {firebase, firestore} from '../../data/firebase'
import {
  addNote,
  removeNote,
  editNote,
  setNotes,
  cleanNotes,
  addNotetoStore,
  removeNoteInStore,
  editNoteInStore,
  setNotesToStore,
} from '../../store/actions'
import * as types from '../../store/actions/actionTypes'
import {notes, noteWithoutId, noteWithId, testId, editedNote} from '../../data/fixtures/notes'

const createMockStore = configureMockStore([thunk])

// beforeAll(() => {
//   firestore.collection('notes').delete()
// })


describe('notes actions - store', () => {
  test('add note', () => {
    const action = addNotetoStore(noteWithoutId, testId)
    expect(action).toEqual({
      type: types.ADD_NOTE, 
      payload: {...noteWithId, id: testId}
    })
  })

  test('remove note', () => {
    const action = removeNoteInStore(testId)
    expect(action).toEqual({
      type: types.REMOVE_NOTE, 
      payload: testId 
    })
  }) 

  test('edit note', () => {
    const editedNote = {...noteWithId, title: 'edited'}
    const action = editNoteInStore(editedNote)
    expect(action).toEqual({
      type: types.EDIT_NOTE,
      payload: {
        id: editedNote.id,
        title: editedNote.title,
        body: editedNote.body,
        editedAt: editedNote.editedAt
      }
    })
  })

  test('clean notes', () => {
    const action = cleanNotes()
    expect(action).toEqual({
      type: types.CLEAN_NOTES
    })
  })
  test('set notes to store', () => {
    const action = setNotesToStore(notes)
    expect(action).toEqual({
      type: types.SET_NOTES,
      payload: notes,
    })
  })

})


describe('notes actions - database', () => {
  test('should add note to database and then to store', (done) => {
    const store = createMockStore({})
    store.dispatch(addNote(noteWithoutId))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
          type: types.ADD_NOTE,
          payload: {
            ...noteWithoutId,
            id: expect.any(String)
          }
        })
        return firestore.collection('notes').doc(actions[0].payload.id).get()
      })
      .then(doc => {
        expect(doc.data()).toEqual(noteWithoutId)
        done()
      })
  })

  test('should fetch notes from firebase', (done) => {
    const store = createMockStore({})
    store.dispatch(setNotes(noteWithId.createdBy))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0].type).toBe(types.SET_NOTES)
        expect(actions[0].payload.length).toBeGreaterThan(0)
        done()
      })
  })
  test('should remove note from firebase', (done) => {
    const store = createMockStore({})
    store.dispatch(removeNote(testId))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
          type: types.REMOVE_NOTE,
          payload: testId

        })
        return firestore.collection('notes').doc(actions[0].payload).get()
      })
      .then((doc) => {
        expect(doc.data()).toBeFalsy()
        done()
      })
  })

  test('should edit note in firebase', async (done) => {
    const store = createMockStore({})
    await firestore.collection("notes").doc(testId).set(noteWithoutId)

    store.dispatch(editNote(editedNote))
      .then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
          type: types.EDIT_NOTE,
          payload: {
            id: editedNote.id,
            title: editedNote.title,
            body: editedNote.body,
            editedAt: editedNote.editedAt
          }
        })
        return firestore.collection('notes').doc(testId).get()
      })
      .then((doc) => {
        expect(doc.data()).toEqual(editedNote)
        done()
      })
  })
  
})