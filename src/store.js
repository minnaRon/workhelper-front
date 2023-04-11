/**
 * Module, store
 * @description Stores all reducerSlices so their states are available
 * to the entire application.
 * ReducerSlices stores:
 * notification - Notification message for the Notification component.
 * * state properties: message, type
 * user - Current user's authentication information.
 * * state properties: token, username, name
 * users - All users of the application.
 * * array containing user objects
 * * user's state properties: id, name, username, joiningday, lastVisited
 * vocabulary - Current vocabulary with chosen language.
 * * state properties: languageId, vocabulary, lastUpdate
 * * structure of vocabulary:
 * * * checked - componentName - place of text: translation
 * * * newPlaces - ..in progress..
 * languages - All languages fetched from the database.
 * * state properties: code, nameInEnglish, nameLocal, defaultFlagUnicode
 * Exports store as default
 */
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationRed'
import userReducer from './reducers/userRed'
import usersReducer from './reducers/usersRed'
import vocabularyReducer from './reducers/vocabularyRed'
import languagesReducer from './reducers/languagesRed'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
    vocabulary: vocabularyReducer,
    languages: languagesReducer,
  },
})

export default store
