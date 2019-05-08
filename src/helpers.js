

export const filterNotesInOrder = (notes, textFilter = '', sortBy = 'createdAsc') => {
  if (notes && Array.isArray(notes)) {
    return notes.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(textFilter.toLowerCase().trim())
      const bodyMatch = item.body.toLowerCase().includes(textFilter.toLowerCase().trim())
      return titleMatch || bodyMatch
    }).sort((a, b) => {
      if (sortBy === 'createdAsc') {
        return a.createdAt - b.createdAt
      } else if (sortBy === 'createdDesc') {
        return b.createdAt -  a.createdAt
      } else if (sortBy === 'editedAsc') {
        return a.editedAt - b.editedAt
      } else if (sortBy === 'editedDesc') {
        return b.editedAt -  a.editedAt
      }
    })
  } 
  return []
}