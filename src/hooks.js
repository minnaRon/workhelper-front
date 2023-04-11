/**
 * module hooks
 * @description helps management
 * hook useField - Manages the state of an individual form field.
 * hook useService - Handles data exchange between the browser and the server.
 */
import { useState } from 'react'
import axios from 'axios'

/**
 * hook useField
 * @description helps form state management, manages the state of an individual form field
 * @param {string} type - Type of the form field
 * @param {string} id - Id of the form field
 * @param {string} defaultvalue - Value given to be state's default value, optional.
 * @returns {object} with properties:
 * * {function} reset - Function to reset value of the state
 * * {object} fields with properties:
 * * * {string} type - Type of the form field
 * * * {string} id - Id of the form field,
 * * * {string} value - Value of the state
 * * * {function} onChange - Function to change value of the state
 */
export const useField = (type, id, defaultvalue = '') => {
  const [value, setValue] = useState(defaultvalue)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return { reset, fields: { type, id, value, onChange } }
}

/**
 * hook useService
 * @description Handles data exchange between the browser and the server.
 * @param {string} baseUrl - BaseUrl of the resource's endpoint in the server.
 * @returns {object} service - Includes all functions (below) to communicate with the server.
 * functions @returns {object/array} response.data - Data from the response of the server:
 * * {function} getAll()          - res.data {array}: All resources from the baseUrl.
 * * {function} create(resource)  - res.data {object}: Created new resource based by param. object.
 * * {function} get(id)           - res.data {object}: Resource from the baseUrl + param. id.
 */
export const useService = (baseUrl) => {
  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    return response.data
  }

  const get = async (objectId) => {
    //console.log('--vocabularySer--get--language--', languageId)
    const response = await axios.get(`${baseUrl}/${objectId}`)
    //console.log('--vocabularySer--get--response.data--', response.data)
    return response.data
  }

  const service = {
    create,
    getAll,
    get,
  }

  return { service }
}
