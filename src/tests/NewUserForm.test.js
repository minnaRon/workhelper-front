/**
 * snapshot
 */
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom/extend-expect'
import NewUserForm from '../components/NewUserForm'

const mockStore = configureStore([])

describe('<NewUserForm />', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      users: [],
      vocabulary: {
        vocabulary: {
          checked: {
            newuserform: {
              NUFH2headlineT: 'UUSI KÄYTTÄJÄ',
              NUFIusernameT: 'käyttäjänimi',
              NUFInameT: 'nimi',
              NUFIpasswordT: 'salasana',
              NUFIconfirmPasswordT: 'salasana uudelleen',
              NUFBsubmitT: 'TALLENNA JA KIRJAUDU',
              NUFBbackT: 'TAKAISIN',
            },
          },
        },
      },
    })

    component = renderer.create(
      <Provider store={store}>
        <Router>
          <NewUserForm />
        </Router>
      </Provider>
    )
  })

  test('renders correct empty form (this fails also if local vocabulary changes', () => {
    expect(component.toJSON()).toMatchSnapshot()
  })
})
