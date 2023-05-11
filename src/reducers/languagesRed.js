/**
 * Module, reducer
 * @description State storing information about languages.
 * Actions:
 * * setLanguages, payload: code, defaultFlagUnicode, id, nameInEnglish, nameLocal
 * * addlanguage ..in progress..
 * Exports action creators which returns function:
 * * initializeLanguages()
 * * addnewLanguage(newLanguage) ..in progress..
 * Exports languageSlice.reducer as default
 */
import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationRed'
import { useService } from '../hooks'

const { service } = useService('/api/languages')

/**
 * Reducer languageSlice
 * name: languages
 * actions:
 * * setLanguages - Sets all languages to the state, payload: code, defaultFlagUnicode, id, nameInEnglish, nameLocal
 * * addlanguage ..in progress..
 */
const languagesSlice = createSlice({
  name: 'languages',
  initialState: [],
  reducers: {
    setlanguages(state, action) {
      return [...action.payload]
    },
    addLanguage(state, { payload }) {
      return [...state, payload]
    },
  },
})
export const { setlanguages, addLanguage } = languagesSlice.actions

/**
 * Action creator initializeLanguages
 * @description @returns a function to fetch all created languages from the database and
 * then set them to the redux store.
 */
export const initializeLanguages = () => {
  return async (dispatch) => {
    const languages = await service.getAll()
    await dispatch(setlanguages(languages))
  }
}

/**
 * Action creator addnewLanguage
 * ..in progress..is needed later..
 */
export const addNewLanguage = (newLanguage) => {
  return (dispatch, getState) => {
    const state = getState()
    const m = state.vocabulary.vocabulary.checked.notificationMessages

    service
      .create(newLanguage)
      .then((response) => {
        dispatch(addLanguage(response))
      })
      .catch((error) => {
        dispatch(
          showNotification(
            m.langRedErroraddNewLanguage + error.response.data.error,
            'error'
          )
        )
      })
  }
}

export default languagesSlice.reducer
