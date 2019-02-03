import moment from 'moment'

export const filterNotesInOrder = (notes, textFilter, sortBy) => {
  return notes.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(textFilter.toLowerCase())
    const bodyMatch = item.body.toLowerCase().includes(textFilter.toLowerCase())
    return titleMatch || bodyMatch
  }).sort((a, b) => {
    if (sortBy === 'created') {
      return a.createdAt - b.createdAt
    } else if (sortBy === 'edited') {
      return a.editedAt - b.editedAt
    }
  })
}