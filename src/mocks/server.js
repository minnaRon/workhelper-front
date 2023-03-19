/**
 * using msw with integration tests
 * msw -files: setupTest.js, mocks/server.js, mocks/handlers.js
 * msw server config: https://mswjs.io/docs/getting-started/integrate/node
 */
import { setupServer } from 'msw/node'

import { handlers } from './handlers'

export const server = setupServer(...handlers)
