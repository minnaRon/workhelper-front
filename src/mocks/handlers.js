/**
 * using msw with integration tests
 * msw -files: setupTest.js, mocks/server.js, mocks/handlers.js
 * imports mock_db -file - includes db collections as arrays
 * msw handlers: https://mswjs.io/docs/api/rest
 */
import { rest } from 'msw'
import mock_db from './mock_db'

const testToken = 'testToken'

export const handlers = [
  /* add new user */
  rest.post('/api/users', async (req, res, ctx) => {
    const { username, name, password: passwordFromReq } = req.body

    if (!username) {
      return res(
        ctx.status(401),
        ctx.json({
          error: 'username is missing',
        }),
        ctx.delay(150)
      )
    }

    if (username === mock_db.testUsers[0].username) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'username must be unique' }),
        ctx.delay(150)
      )
    }

    if (username.length < 4 || username.lenth > 50) {
      return res(
        ctx.status(401),
        ctx.json({
          error: 'username should contain 4-50 chars',
        }),
        ctx.delay(150)
      )
    }

    if (passwordFromReq.length < 8 || passwordFromReq.length > 50) {
      console.log('--handlers--add new user--fails password')
      return res(
        ctx.status(400),
        ctx.json({ error: 'password should be 8-50 chars' }),
        ctx.delay(150)
      )
    }

    if (!name) {
      return res(
        ctx.status(401),
        ctx.json({
          error: 'name is missing',
        }),
        ctx.delay(150)
      )
    }

    if (name.length < 3 || username.lenth > 50) {
      return res(
        ctx.status(401),
        ctx.json({
          error: 'name should contain 4-50 chars',
        }),
        ctx.delay(150)
      )
    }

    const newUser = {
      username,
      name,
      password: 'testPassword',
      joiningday: new Date(),
      lastVisited: new Date(),
      id: mock_db.testUsers[0].id,
    }
    mock_db.testUsers.push(newUser)
    // eslint-disable-next-line no-unused-vars
    const { password, ...userToReturn } = newUser

    return res(ctx.status(201), ctx.json(userToReturn), ctx.delay(150))
  }),

  /* login */
  rest.post('/api/login', async (req, res, ctx) => {
    const { username, password } = req.body
    const user = mock_db.testUsers.filter((u) => u.username === username)[0]

    if (!user || password !== user.password) {
      return res(
        ctx.status(401),
        ctx.json({
          error: 'invalid username or password',
        }),
        ctx.delay(150)
      )
    }

    return res(
      ctx.status(200),
      ctx.json({
        token: testToken,
        username: user.username,
        name: user.name,
      }),
      ctx.delay(150)
    )
  }),

  /* get all languages */
  rest.get('/api/languages', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mock_db.languages), ctx.delay(150))
  }),

  /* get vocabulary with user's chosen languageId */
  rest.get('/api/vocabularies/:languageId', async (req, res, ctx) => {
    const languageId = req.params.languageId
    const vocabulary = await mock_db.vocabularies.filter(
      (v) => v.language === languageId
    )[0]
    return res(ctx.status(200), ctx.json(vocabulary), ctx.delay(150))
  }),
]
