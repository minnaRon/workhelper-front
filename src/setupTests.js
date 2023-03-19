/**
 * using msw with integration tests
 * msw -files: setupTest.js, mocks/server.js, mocks/handlers.js
 * msw setup: https://mswjs.io/docs/getting-started/integrate/node
 */
import { server } from './mocks/server.js'

beforeAll(() => {
  server.listen()
})

afterEach(() => server.resetHandlers())

afterAll(() => {
  server.close()
})
