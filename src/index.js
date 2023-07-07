/**
 * index.js
 * @description Start of the application.
 * Adds Redux Provider and store to state management and
 * Router for navigation to views.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(
    <ScopedCssBaseline>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ScopedCssBaseline>
  )
}

renderApp()
store.subscribe(renderApp)
