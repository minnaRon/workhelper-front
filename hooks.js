/**
 * module hook
 * @description helps form state management, manages the state of an individual form field
 * exports hook function useField
 */
import { useState } from 'react'

/**
 * function useField
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
