/**
 * integration tests
 * using msw with integration tests
 * msw -files: setupTest.js, mocks/server.js, mocks/handlers.js
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { renderWithProviders } from './utils_for_tests'
import user from '@testing-library/user-event'
import App from '../App'

/**
 * testUser to log in with success
 * msw handler has this same user in the file mocks/handlers.js
 */
const testUser = {
  username: 'testUsername',
  name: 'testName',
  password: 'testPassword',
}

let container

afterEach(() => {
  container = null
})

describe('<Welcome /> ', () => {
  test('shows welcome -page with login button and link for new user', async () => {
    container = await renderWithProviders(<App />).container
    expect(container.querySelector('#welcome-button-login')).toBeInTheDocument()
    expect(container.querySelector('#welcome-link-newUser')).toBeInTheDocument()
  })
})

describe('<NewUserForm />', () => {
  beforeEach(async () => {
    await window.localStorage.removeItem('loggedWorkappUser')
    container = await renderWithProviders(<App />).container
    await user.click(container.querySelector('#welcome-link-newUser'))
  })

  test('when back -button clicked should return to the welcome -view', async () => {
    expect(container.querySelector('#newUserForm-username')).toBeInTheDocument()
    const backButton = container.querySelector('#newUserForm-button-back')
    await user.click(backButton)
    expect(container.querySelector('#welcome-button-login')).toBeInTheDocument()
  })
  test('registration fails with correct error message if incorrect inputs', async () => {
    const usernameInput = container.querySelector('#newUserForm-username')
    const nameInput = container.querySelector('#newUserForm-name')
    const passwordInput = container.querySelector('#newUserForm-password')
    const confirmPasswordInput = container.querySelector('#newUserForm-confirmPassword')
    const saveButton = container.querySelector('#newUserForm-button-submit')
    await user.type(usernameInput, testUser.username)
    await user.type(nameInput, testUser.name)
    await user.type(passwordInput, testUser.password)
    await user.type(confirmPasswordInput, testUser.password)
    await user.click(saveButton)
    let notificationElement = await screen.findByText(/username.*unique/i)
    expect(notificationElement).toBeInTheDocument()
    /*
    waitForElementToBeRemoved (below) is one way to get rid of:
    'console.error
      Warning: An update to Notification inside a test was not wrapped in act(...).'
    It waits until the component of the notification disappears.
    It also slows tests so much that might be more efficient to live with the warning for now
    until better solution is found.
    */
    await waitForElementToBeRemoved(() => container.querySelector('#notification'), {
      timeout: 3000,
    })

    await user.clear(usernameInput)
    await user.type(usernameInput, 'abc')
    await user.click(saveButton)
    notificationElement = await screen.findByText(/username.*4-50.*chars/i)
    expect(notificationElement).toBeInTheDocument()

    await user.clear(usernameInput)
    await user.type(usernameInput, 'newValidUsername')

    await user.clear(nameInput)
    await user.click(saveButton)
    notificationElement = await screen.findByText(/name.*missing/i)
    expect(notificationElement).toBeInTheDocument()

    await user.type(nameInput, 'newValidName')

    await user.clear(passwordInput)
    await user.clear(confirmPasswordInput)
    await user.type(passwordInput, '1234567')
    await user.type(confirmPasswordInput, '1234567')
    await user.click(saveButton)
    notificationElement = await screen.findByText(/SALASANAN.*8-50.*MERKKIÄ/i)
    expect(notificationElement).toBeInTheDocument()

    await user.clear(passwordInput)
    await user.type(passwordInput, testUser.password)

    await user.clear(confirmPasswordInput)
    await user.type(confirmPasswordInput, 'wrongPassword')
    await user.click(saveButton)
    notificationElement = await screen.findByText(/SALASANAT.*EIVÄT.*TÄSMÄÄ/i)
    expect(notificationElement).toBeInTheDocument()
  })

  test('registration succees and logs in with correct inputs', async () => {
    const usernameInput = container.querySelector('#newUserForm-username')
    const nameInput = container.querySelector('#newUserForm-name')
    const passwordInput = container.querySelector('#newUserForm-password')
    const confirmPasswordInput = container.querySelector('#newUserForm-confirmPassword')
    const saveButton = container.querySelector('#newUserForm-button-submit')
    await user.type(usernameInput, 'newValidUsername')
    await user.type(nameInput, testUser.name)
    await user.type(passwordInput, testUser.password)
    await user.type(confirmPasswordInput, testUser.password)
    await user.click(saveButton)
    const notificationElement = await screen.findByText(/TERVETULOA/i)
    expect(notificationElement).toBeInTheDocument()
    screen.findByText(/WorkTodayPlanForm/i)
    const planComponent = container.querySelector('#todayplanformsidfortests')
    expect(planComponent).toBeInTheDocument()
    const logoutButton = container.querySelector('#loginInfo-button-logout')
    await user.click(logoutButton)
    expect(container.querySelector('#welcome-button-login')).toBeInTheDocument()
  })
})

describe('<LoginForm />', () => {
  beforeEach(async () => {
    await window.localStorage.removeItem('loggedWorkappUser')
    container = await renderWithProviders(<App />).container
    await user.click(container.querySelector('#welcome-button-login'))
  })

  test('when back -button clicked should return to the welcome -view', async () => {
    expect(container.querySelector('#loginForm-username')).toBeInTheDocument()
    const backButton = container.querySelector('#loginForm-button-back')
    await user.click(backButton)
    expect(container.querySelector('#welcome-button-login')).toBeInTheDocument()
  })

  test('login fails with correct error message if incorrect credentials', async () => {
    const usernameInput = container.querySelector('#loginForm-username')
    const passwordInput = container.querySelector('#loginForm-password')
    const loginButton = container.querySelector('#loginForm-button-login')
    await user.type(usernameInput, 'wrongUsername')
    await user.type(passwordInput, testUser.password)
    await user.click(loginButton)
    let notificationElement = await screen.findByText(/invalid.*username/i)
    expect(notificationElement).toBeInTheDocument()

    await user.type(usernameInput, testUser.username)
    await user.type(passwordInput, 'wrongPassword')
    await user.click(loginButton)
    notificationElement = await screen.findByText(/invalid.*password/i)
    expect(notificationElement).toBeInTheDocument()
  })

  test('should login with correct credentials', async () => {
    const usernameInput = container.querySelector('#loginForm-username')
    const passwordInput = container.querySelector('#loginForm-password')
    const loginButton = container.querySelector('#loginForm-button-login')
    const backButton = container.querySelector('#loginForm-button-back')
    expect(backButton).toBeInTheDocument()
    await user.type(usernameInput, testUser.username)
    await user.type(passwordInput, testUser.password)
    await user.click(loginButton)
    await screen.findByText(/WorkTodayPlanForm/i)
    const planComponent = container.querySelector('#todayplanformsidfortests')
    expect(planComponent).toBeInTheDocument()
    const logoutButton = container.querySelector('#loginInfo-button-logout')
    await user.click(logoutButton)
    await expect(container.querySelector('#welcome-button-login')).toBeInTheDocument()
  })
})
