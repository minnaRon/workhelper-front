/**
 * Module, store
 * @description Stores all reducerSlices so their states are available
 * to the entire application.
 * ReducerSlices stores:
 * notification - notification message for the Notification component
 * * state properties: message, type
 * user - current user's authentication information
 * * state properties: token, username, name
 * users - all users of the application
 * * array containing user objects
 * * user's state properties: id, name, username, joiningday, lastVisited
 * Exports store as default
 */
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationRed'
import userReducer from './reducers/userRed'
import usersReducer from './reducers/usersRed'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
