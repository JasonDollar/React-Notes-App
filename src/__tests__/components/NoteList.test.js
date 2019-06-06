import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import {notes} from '../../data/fixtures/notes'
import {NotesList} from '../../components/NotesList/NotesList'

let wrapper
beforeEach(() => {
  wrapper = shallow(<NotesList notes={notes} firebaseProcessing={false} isAuth />)
})

describe('NotesList component', () => {
  test('should match snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
  test('should render list with proper length', () => {
    const elements = wrapper.find('NotesListItem')
    expect(elements.length).toBe(notes.length)
  })
})