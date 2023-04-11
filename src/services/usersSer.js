/**
 * Module, service
 * @description  Handles data exchange between the browser and the server related to
 * all users.
 * Fuctions:
 * * create
 * Exports function create as default
 */
import axios from 'axios'

const baseUrl = '/api/users'

/**
 * Function create
 * @description Sends the inputs given by the new user to the server to
 * create a new user.
 * @param {object} newUser - User's inputs for registration.
 * * properties: username, name, password
 * @return {object} response.data - User's information sent by the server
 * * properties: id, name, username, joiningday, lastVisited
 */
const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

export default { create }
