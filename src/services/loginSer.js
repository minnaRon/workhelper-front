/**
 * Module, service
 * @description  Handles data exchange between the browser and the server related to
 * the current user.
 * Fuctions:
 * * login
 * Exports function login as default
 */
import axios from 'axios'

const baseUrl = '/api'

/**
 * Function login
 * @description Sends user's credentials to server for login.
 * @param {object} credentials - User's credentials to log in.
 * * properties: username, password
 * @return {object} response.data - User's authentication information sent by the server.
 * success
 * * properties: token, username, name
 * failed
 * * status 401, error: 'invalid username or password'
 */
const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

export default { login }
