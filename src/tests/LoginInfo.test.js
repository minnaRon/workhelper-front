/**
 * snapshot
 */
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom/extend-expect'
import LoginInfo from '../components/LoginInfo'

const mockStore = configureStore([])

describe('<LoginForm />', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      user: {
        username: 'testUsername',
        name: 'testName',
        password: 'testPassword',
      },
    })

    component = renderer.create(
      <Provider store={store}>
        <Router>
          <LoginInfo />
        </Router>
      </Provider>
    )
  })

  test('renders correct login info after login (this fails also if local vocabulary changes', () => {
    expect(component.toJSON()).toMatchSnapshot()
  })
})
