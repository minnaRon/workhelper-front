/**
 * Module, service
 * @description  Handles data exchange between the browser and the server related to
 * chosen vocabulary.
 * Fuctions:
 * * create
 * * get
 * Exports functions create and get as default
 */
import axios from 'axios'

const baseUrl = '/api/vocabularies'

/**
 * Function get
 * @description Fetches vocabulary with the language user chose from the database.
 * @param {String} languageId - The id of the User's selected language.
 * * properties:
 * @return {object} response.data - Vocabulary with the chosen language.
 * * properties: id, languageId, vocabulary, lastUpdate
 */
const get = async (languageId) => {
  //console.log('--vocabularySer--get--language--', languageId)
  const response = await axios.get(`${baseUrl}/${languageId}`)
  //console.log('--vocabularySer--get--response.data--', response.data)
  return response.data
}

/**
 * Function create
 * @description Sends the inputs given by the user to the server to
 * create a new vocabulary.
 * @param {object} vocabulary - User's inputs for new vocabulary.
 * * properties:
 * @return {object} response.data - User's information sent by the server
 * * properties: id, languageId, vocabulary, lastUpdate
 */
const create = async (newVocabulary) => {
  const response = await axios.post(baseUrl, newVocabulary)
  return response.data
}

export default { create, get }
