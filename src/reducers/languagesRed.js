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
import languagesService from '../services/languagesSer'

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
      //console.log('--languagesRed--setLanguages--action.payload--', action.payload)
      return [...action.payload]
    },
    addLanguage(state, { payload }) {
      //console.log('--languagesRed--setLanguages--payload--', payload)
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
    const languages = await languagesService.getAll()
    //console.log('--languageRed--initializeLanguages--languages--', languages)
    await dispatch(setlanguages(languages))
  }
}

/**
 * Action creator addnewLanguage
 * ..in progress..
 */
export const addNewLanguage = (newLanguage) => {
  //console.log('--languageRed--addnewLanguage--newLanguage--', newLanguage)
  return (dispatch, getState) => {
    const state = getState()
    const m = state.vocabulary.vocabulary.checked.notificationMessages

    languagesService
      .create(newLanguage)
      .then((response) => {
        //console.log('--languageRed--addnewLanguage--response--', response)
        dispatch(addLanguage(response))
      })
      .catch((error) => {
        //console.log('--languageRed--addnewLanguage--catch--', error.response.data.error)
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
