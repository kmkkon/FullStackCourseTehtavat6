const notificationAtStart = 'Note at start'

const reducer = (state = notificationAtStart, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.message
  case 'EMPTY':
    return ''
  default:
    return state
  }
}
/*
export const notificationSet = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message: message
  }
}
*/
export const notify = (message, secs) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message: message
    })
    setTimeout(() => {
      dispatch({
        type: 'EMPTY'
      })
    }, secs*1000)
  }
}
/*
export const notificationEmpty = () => {
  return{
    type: 'EMPTY'
  }
}
*/
export default reducer