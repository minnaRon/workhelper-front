/**
 * Module, reducer
 * @description State and actions of the user.
 * Actions:
 * * setUser, payload: token, username, name
 * Exports action creators which returns function:
 * * login(credentials) - credentials includes username and password
 * * logout(user) - user includes token, username, name
 * Exports userSlice.reducer as default
 */
import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginSer'
import { showNotification } from './notificationRed'

/**
 * Reducer userSlice
 * name: user
 * actions:
 * setUser - Sets user to state, payload: token, username, name
 */
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})
export const { setUser } = userSlice.actions

/**
 * Action creator login
 * @description Returns a function to call loginService to check user's credentials,
 * if credentials are valid:
 * * server sends back user's token, username and name (as loggedUser), which are stored in localStorage,
 * * then function dispatches action setUser to store user's token, username and name to state,
 * * and dispatches action creator showNotification to notify user about succesfull login.
 * if credentials are not valid:
 * * server sends back error message and
 * * action creator showNotification is dispatched to notify user about login failed.
 * @param {object} credentials - User's credentials to log in.
 * * properties: username and password
 */
export const loginUser = (credentials) => {
  return (dispatch) => {
    loginService
      .login(credentials)
      .then((loggedUser) => {
        window.localStorage.setItem('loggedWorkappUser', JSON.stringify(loggedUser))
        //setTokens
        dispatch(setUser(loggedUser))
        dispatch(showNotification(`TERVETULOA ${loggedUser.name}, TYÖN ILOA!`))
      })
      .catch((error) => {
        dispatch(
          showNotification(
            'KIRJAUTUMISTIEDOISSA OLI VIRHE: ' +
              error.response.data.error +
              ', YRITÄ UUDELLEEN',
            'error'
          )
        )
      })
  }
}
/**
 * Action creator logout
 * @description Returns a function to remove user's token, username and name from localStorage,
 * dispatch action setUser with param null to change user state to be null and
 * dispatch action creator showNotification to notify user about succesfull logout.
 * @param {object} user - User's info stored in state, is used in the message of the notification.
 * * properties: token, username, name
 */
export const logout = (user) => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedWorkappUser')
    await dispatch(setUser(null))
    dispatch(showNotification(`HEIPÄ HEI ${user.name}, NÄHDÄÄN TAAS!`))
  }
}

export default userSlice.reducer
