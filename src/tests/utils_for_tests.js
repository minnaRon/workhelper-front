/**
 * renderWithProviders -function
 * brings store for integration tests when react redux toolkit is used
 * exports renderWithProviders -function to replace render -function, use similar as render -function
 * from https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react-redux/#-how-to-perform-testing-with-the-react-redux-toolkit
 */
import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import notificationReducer from '../reducers/notificationRed'
import userReducer from '../reducers/userRed'
import usersReducer from '../reducers/usersRed'
import vocabularyReducer from '../reducers/vocabularyRed'
import languagesReducer from '../reducers/languagesRed'
import worksReducer from '../reducers/worksRed'
import workingReducer from '../reducers/workingRed'
import mock_db from '../mocks/mock_db'
//console.log('--utils_for_tests--vocabularies--', mock_db.vocabularies[1])
//console.log('--utils_for_tests--languages--', mock_db.languages)

export function renderWithProviders(
  ui,
  {
    preloadedState = {
      notification: null,
      user: null,
      users: [],
      vocabulary: mock_db.vocabularies[1],
      languages: mock_db.languages,
      works: [],
      working: { work: null, view: null },
    },
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        notification: notificationReducer,
        user: userReducer,
        users: usersReducer,
        vocabulary: vocabularyReducer,
        languages: languagesReducer,
        works: worksReducer,
        working: workingReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
