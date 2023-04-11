/**
 * snapshot
 */
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom/extend-expect'
import LoginForm from '../components/LoginForm'

const mockStore = configureStore([])

describe('<LoginForm />', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      user: null,
      vocabulary: {
        vocabulary: {
          checked: {
            loginform: {
              LFH2headlineT: 'KIRJAUTUMINEN',
              LFIusernameT: 'käyttäjänimi',
              LFIpasswordT: 'salasana',
              LFBsubmitT: 'KIRJAUDU',
              LFBbackT: 'TAKAISIN',
            },
          },
        },
      },
    })

    component = renderer.create(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
      </Provider>
    )
  })

  test('renders correct empty form (this fails also if local vocabulary changes', () => {
    expect(component.toJSON()).toMatchSnapshot()
  })
})
