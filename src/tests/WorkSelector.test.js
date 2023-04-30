/**
 * snapshot
 */
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom/extend-expect'
import WorkSelector from '../components/WorkSelector'

const mockStore = configureStore([])

describe('<WorkSelector />', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      user: {
        username: 'testUsername',
        name: 'testName',
        works: [{ id: 'testWork1Id' }, { id: 'testWork2Id' }],
        workTypes: ['working at home', 'studying'],
        password: 'testPassword',
      },
      works: [
        {
          name: 'testWork1',
          isProject: true,
          type: 'working at home',
          active: true,
          lastWorked: '2023-04-17T01:42:12.746Z',
          id: 'testWork1Id',
        },
        {
          name: 'testWork2',
          isProject: false,
          type: 'studying',
          active: true,
          lastWorked: '2023-04-17T01:42:12.746Z',
          id: 'testWork2Id',
        },
      ],
      vocabulary: {
        vocabulary: {
          checked: {
            workselector: {
              WSH1headlineT: 'Työn iloihin!',
              WSSworkT: 'TYÖN KOHDE: ',
              WSInewWorkT: '...TAI LISÄÄ UUSI: ',
              WSInewWorkP: 'LISÄÄ UUSI TYÖ',
              WSCisProjectT: 'ON PROJEKTI',
              WSRworkTypeT: 'TYÖTAPA: ',
              WSInewWorkTypeT: '...TAI LISÄÄ UUSI: ',
              WSInewWorkTypeP: 'LISÄÄ UUSI TYÖTAPA',
              WSBsubmitT: 'ALOITA TYÖT',
            },
          },
        },
      },
    })

    component = renderer.create(
      <Provider store={store}>
        <Router>
          <WorkSelector />
        </Router>
      </Provider>
    )
  })

  test('renders correct empty form (this fails also if local vocabulary changes', () => {
    expect(component.toJSON()).toMatchSnapshot()
  })
})
