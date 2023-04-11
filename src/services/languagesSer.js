/**
 * Module, service
 * @description  Handles data exchange between the browser and the server related to
 * languages.
 * Fuctions:
 * * create
 * * getAll
 * Exports functions create and getAll as default
 */
import axios from 'axios'

const baseUrl = '/api/languages'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`)
  //console.log('--languagesSer--get--response.data--', response.data)
  return response.data
}

const create = async (newLanguage) => {
  const response = await axios.post(baseUrl, newLanguage)
  return response.data
}

export default { create, getAll }
