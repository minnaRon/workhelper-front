/**
 * Module, reducer
 * @description State storing information about all app users and
 * actions regarding all app users.
 * Actions:
 * * addUser, payload: id, name, username, joiningday, lastVisited
 * Exports action creators which returns function:
 * * addNewUser(newUser) - newUser includes username, name and password
 * Exports usersSlice.reducer as default
 */
import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationRed'
import { loginUser } from './userRed'
import usersService from '../services/usersSer'

/**
 * Reducer usersSlice
 * name: users
 * actions:
 * addUser - Adds new user to state, payload: id, name, username, joiningday, lastVisited
 * dates format as 2023-03-18T23:29:16.416Z
 */
const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addUser(state, action) {
      return [...state, action.payload]
    },
  },
})
export const { addUser } = usersSlice.actions

/**
 * Action creator addNewUser
 * @description Returns a function to call usersService to create a new user.
 * if user's newUser inputs {username, name, password} are valid:
 * * server sends back user's id, name, username, joiningday and lastVisited -date (as response),
 * * then function dispatches action addUser to store those new user's information to state among other users.
 * * and dispatches action creator login to log new user in with correct credentials.
 * if user's newUser inputs {username, name, password} are not valid:
 * * server sends back error message and
 * * action creator showNotification is dispatched to notify user about registration failed.
 * @param {object} newUser - inputs provided by the user for registration.
 * * properties: username, name, password
 * @param {object} response - user information sent by the server
 * * properties: id, name, username, joiningday, lastVisited
 */
export const addNewUser = (newUser) => {
  //console.log('--usersRed--addNewUser--newUser--', newUser)
  return (dispatch, getState) => {
    const state = getState()
    const m = state.vocabulary.vocabulary.checked.notificationMessages

    usersService
      .create(newUser)
      .then((response) => {
        //console.log('--usersRed--addNewUser--response--', response)
        dispatch(addUser(response))
        dispatch(loginUser({ username: response.username, password: newUser.password }))
      })
      .catch((error) => {
        //console.log('--usersRed--addNewUser--catch--', error.response.data.error)
        dispatch(
          showNotification(m.usersRedEaddNewUser + error.response.data.error, 'error')
        )
      })
  }
}

export default usersSlice.reducer
