/**
 * index.js
 * @description Start of the application.
 * Adds Redux Provider and store to state management and
 * Router for navigation to views.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}

renderApp()
store.subscribe(renderApp)
