import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { format } from 'date-fns'
import {noteWithId} from '../../data/fixtures/notes'
import NoteListItem from '../../components/NotesList/NotesListItem/NotesListItem'

// let note, isActive
let wrapper
const singleNote = {
  ...noteWithId,
  body: JSON.stringify(noteWithId.body)
}

beforeEach(() => {
  wrapper = shallow(<NoteListItem note={singleNote} isActive />)
})

describe('NoteListItem component', () => {
  test('matches snapshot', () => {
    expect(toJSON(wrapper)).toMatchSnapshot()
  })
  test('should render proper note title', () => {
    const element = wrapper.find('.header').at(0)
    expect(element.render().text()).toBe(noteWithId.title)
  })
  test('should render proper note body', () => {
    const element = wrapper.find('.note').at(0)
    expect(element.render().text()).toBe(noteWithId.body)
  })
  test('should render proper time', () => {
    const element = wrapper.find('.time').at(0)
    expect(element.render().text()).toBe(format(noteWithId.createdAt, 'Do MMM YYYY, H:mm'))
  })
})