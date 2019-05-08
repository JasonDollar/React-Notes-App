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
import {notes, noteWithoutId, noteWithId, testId} from '../../data/fixtures/notes'

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

})
