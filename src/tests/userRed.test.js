/**
 * unit tests
 * testing redux reducer: https://github.com/xjamundx/redux-shopping-cart/tree/testing/lessons/05-reducer-test
 * mocking api: https://github.com/xjamundx/redux-shopping-cart/tree/testing/lessons/11-api-jest-mock
 * testing redux thunk: https://github.com/xjamundx/redux-shopping-cart/tree/testing/lessons/12-thunk-mocked-dispatch
 */
import userReducer, { setUser, loginUser } from '../reducers/userRed'
import * as loginService from '../services/loginSer'

const testUser = { username: 'redUsername', name: 'redName', password: 'redPassword' }

/** loginService mocked here */
jest.mock('../services/loginSer', () => {
  return {
    async login(credentials) {
      if (
        typeof credentials === 'object' &&
        credentials.toString() ===
          { username: testUser.username, password: testUser.password }.toString()
      ) {
        return { token: 'redToken', username: testUser.username, name: testUser.name }
      } else if (
        credentials.toString() !==
        { username: testUser.username, password: testUser.password.toString() }
      ) {
        return { error: 'invalid username or password' }
      }
    },
  }
})

test('login should work', async () => {
  const result = await loginService.login({
    username: testUser.username,
    password: testUser.password,
  })
  expect(result).toEqual({
    token: 'redToken',
    username: testUser.username,
    name: testUser.name,
  })
})

/** unittests for actions of reducer */
describe('user reducer', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = userReducer(initialState, action)
    expect(result).toEqual(null)
  })
  it('correct action should return user object with properties token, username and name of the user', () => {
    const initialState = undefined
    const action = setUser({
      token: 'redToken',
      username: 'redUsername',
      name: 'redName',
    })
    const result = userReducer(initialState, action)
    expect(result).toEqual({
      token: 'redToken',
      username: 'redUsername',
      name: 'redName',
    })
  })
})

/** redux thunk -test for loginUser */
describe('thunks', () => {
  describe('login with mocked dispatch', () => {
    it('should login and dispatch setUser action with correct payload', async () => {
      const dispatch = jest.fn()
      const state = {
        user: null,
        vocabulary: {
          vocabulary: {
            checked: {
              notificationMessages: {
                langRedErroraddNewLanguage: 'uuden kielen lisääminen epäonnistui: ',
                userRedIloginUserstart: 'Tervetuloa',
                userRedIloginUserend: 'työn iloa!',
                userRedEloginUserstart: 'Kirjautumistiedoissa oli virhe: ',
                userRedEloginUserend: ', yritä uudelleen',
                userRedIlogoutstart: 'Heipä hei',
                userRedIlogoutend: 'nähdään taas!',
                usersRedEaddNewUser: 'Uuden käyttäjän luominen epäonnistui: ',
              },
            },
          },
        },
      }
      const thunk = loginUser({
        username: testUser.username,
        password: testUser.password,
      })
      await thunk(dispatch, () => state, undefined)
      const { calls } = dispatch.mock
      expect(calls).toHaveLength(3)
      expect(calls[0][0].type).toEqual('user/setUser')
      expect(calls[0][0].payload).toEqual({
        token: 'redToken',
        username: 'redUsername',
        name: 'redName',
      })
    })
  })
})
