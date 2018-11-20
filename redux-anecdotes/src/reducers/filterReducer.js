const filterAtStart = ''

const reducer = (state = filterAtStart, action) => {
  switch (action.type) {
  case 'FILTER_CHANGE':
    return action.filter
  default:
    return state
  }
}

export const filterChange = (filter) => {
  return {
    type: 'FILTER_CHANGE',
    filter
  }
}


export default reducer