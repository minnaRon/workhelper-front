/**
 * Module, reducer
 * @description State of the notification and actions of the notification.
 * Actions:
 * * setNotification, payload: message, type
 * Exports action creators returning function:
 * * showNotification(message, type, time)
 * Exports notificationSlice.reducer as default
 */
import { createSlice } from '@reduxjs/toolkit'

/**
 * Reducer notificationSlice
 * name: notification
 * actions:
 * setNotification - Sets notification to state, payload: message, type
 */
const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})
export const { setNotification } = notificationSlice.actions

/**
 * Action creator showNotification
 * @description Returns a function to dispatch action setNotification.
 * @param {string} message - message to show on the screen in the view of the Notification.
 * @param {string} type - default type 'info' or type 'error' determines style
 * of the Notification view.
 * @param {number} time - as seconds determines how long time Notification is shown
 * on the screen before setTimeout dispatches action setNotification to be null.
 */
let timeoutId = null
export const showNotification = (message, type = 'info', time = 3) => {
  return (dispatch) => {
    dispatch(setNotification({ message, type }))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(setNotification(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
