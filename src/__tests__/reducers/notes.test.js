import notesReducer from '../../store/reducers/notes'

import {notes, noteWithId, testId, editedNote} from '../../data/fixtures/notes'
import * as actionTypes from '../../store/actions/actionTypes'

describe('notes reducer', () => {
  test('should set default state', () => {
    const state = notesReducer(undefined, {type: '@@INIT'})
    expect(state).toEqual([])
  })

  test('should add note to state', () => {
    const action = {
      type: actionTypes.ADD_NOTE,
      payload: noteWithId
    }
    const state = notesReducer(notes, action)
    expect(state.length).toBe(3)
    expect(state).toEqual([...notes, noteWithId])
  })

  test('should remove note from state', () => {
    const action = {
      type: actionTypes.REMOVE_NOTE,
      payload: testId
    }
    const state = notesReducer(notes, action)
    expect(state).toEqual([notes[0]])
  })
  test('should not remove note from state when no note found', () => {
    const action = {
      type: actionTypes.REMOVE_NOTE,
      payload: -1
    }
    const state = notesReducer(notes, action)
    expect(state).toEqual(notes)
  })
  test('should edit note from state', () => {
    const action = {
      type: actionTypes.EDIT_NOTE,
      payload: {
        id: testId,
        title: 'edited',
        body: 'edited',
        editedAt: 123123123
      }
    }
    const state = notesReducer(notes, action)
    expect(state[1].title).toEqual(action.payload.title)
    expect(state[1].editedAt).toEqual(action.payload.editedAt)
  })
  test('should not edit note when no note found', () => {
    const action = {
      type: actionTypes.EDIT_NOTE,
      payload: {
        id: -1,
        title: 'edited',
        body: 'edited',
        editedAt: 123123123
      }
    }
    const state = notesReducer(notes, action)
    expect(state).toEqual(notes)
  })

  test('should set notes', () => {
    const action = {
      type: actionTypes.SET_NOTES,
      payload: notes
    }
    const state = notesReducer(notes, action)
    expect(state).toEqual(notes)
  })
  
  
})