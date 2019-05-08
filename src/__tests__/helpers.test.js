import {filterNotesInOrder} from '../helpers'
import {notes} from '../data/fixtures/notes'

describe('filterNotesInOrder helper test', () => {
  test('should return empty aray when given wrong data, or no data', () => {
    const result = filterNotesInOrder({data: `it should be an array!`})
    const result2 = filterNotesInOrder()
    expect(result).toEqual([])
    expect(result2).toEqual([])
  })
  test('should filter notes when given proper string', () => {
    const result = filterNotesInOrder(notes, 'second')
    expect(result.length).toEqual(1)
    expect(result[0]).toEqual(notes[1])
  })
  test('should return empty aray when no filter match found', () => {
    const result = filterNotesInOrder(notes, 'third')
    expect(result).toEqual([])
  })
  test('should sort notes by created in ascending manner', () => {
    const result = filterNotesInOrder(notes, undefined, 'createdAsc')
    expect(result).toEqual(notes)
  })
  test('should sort notes by created in descending manner', () => {
    const result = filterNotesInOrder(notes, undefined, 'createdDesc')
    expect(result[0]).toEqual(notes[1])
    expect(result[1]).toEqual(notes[0])
  })
  test('should sort notes by edited in ascending manner', () => {
    const result = filterNotesInOrder(notes, undefined, 'editedAsc')
    expect(result).toEqual(notes)
  })
  test('should sort notes by edited in descending manner', () => {
    const result = filterNotesInOrder(notes, undefined, 'editedDesc')
    expect(result[0]).toEqual(notes[1])
    expect(result[1]).toEqual(notes[0])
  })
})