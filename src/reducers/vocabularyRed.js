/**
 * Module, reducer
 * @description The state stores the selected language vocabulary.
 * Actions:
 * * setVocabulary, payload: languageId, vocabulary, lastUpdate
 * Exports action creators which returns function:
 * * addNewVocabulary(newVocabulary) - ..in progress..
 * Exports vocabularySlice.reducer as default
 */
import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './notificationRed'
import vocabularyService from '../services/vocabularySer'

/**
 * Reducer vocabularySlice
 * name: vocabulary
 * actions:
 * * setVocabulary, payload: languageId, vocabulary, lastUpdate
 * * addVocabulary - ..in progress..
 */
const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState: null,
  reducers: {
    setVocabulary(state, action) {
      return action.payload
    },
    addVocabulary(state, { payload }) {
      /*console.log(
        '--vocabularyRed--slice--addText--state--action.payload--',
        state,
        payload
      )
      */
      return [...state, payload]
    },
  },
})
export const { setVocabulary, addVocabulary } = vocabularySlice.actions

//name better? handles errors? check this
export const chooseLanguage = (languageId) => {
  //console.log('--vocabularyRed--chooseLanguage--languageId--', languageId)
  return async (dispatch) => {
    const vocabulary = await vocabularyService.get(languageId)
    //console.log('--vocabularyRed--changeLanguage--vocabulary--', vocabulary[0])
    await dispatch(setVocabulary(vocabulary))
  }
}

/**
 * Action creator addNewVocabulary
 * ..in progress..
 */
export const addNewVocabulary = (newVocabulary) => {
  //console.log('--vocabularyRed--addNewVocabulary--newText--', newVocabulary)
  return (dispatch, getState) => {
    const state = getState()
    const m = state.vocabulary.vocabulary.checked.notificationMessages
    console.log('--addNewvocabulary needs to change message to use vocabulary: ', m)
    vocabularyService
      .create(newVocabulary)
      .then((response) => {
        //console.log('--vocabularyRed--addNewVocabulary--response--', response)
        dispatch(addVocabulary(response))
      })
      .catch((error) => {
        /*console.log(
          '--vocabularyRed--addNewVocabulary--catch--',
          error.response.data.error
        )
        */
        dispatch(
          showNotification(
            'UUDEN TEKSTIN LISÄÄMINEN EPÄONNISTUI: ' + error.response.data.error,
            'error'
          )
        )
      })
  }
}

export default vocabularySlice.reducer
