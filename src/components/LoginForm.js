/**
 * Module, component
 * @description Login form for the application user.
 * Local states:
 * state {string} username - User's input for username
 * state {string} password - User's input for password
 * const {object} user - Current user, object fetched from the redux store
 * Form includes:
 * inputs: username, password
 * buttons: login, back
 * exports LoginForm as default
 */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../reducers/userRed'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  /**
   * @description Function handles user's login inputs after the form is submitted.
   * @param {*} event - not in use here,
   * function uses state to store values: username and password.
   * Dispatches login info to userReducer's login function and
   * then resets local state values: username and password.
   */
  const handleLogin = async (event) => {
    event.preventDefault()
    await dispatch(loginUser({ username, password }))
    if (user) {
      setUsername('')
      setPassword('')
    }
  }

  /**
   * Hook useEffect
   * @description After the user is logged in navigates to workPlanView
   */
  useEffect(() => {
    if (user) {
      navigate('/todaysworkplan')
    }
  }, [dispatch])

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>KIRJAUTUMINEN</h2>
        <div>
          KÄYTTÄJÄNIMI
          <input
            type="text"
            id="loginForm-username"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          SALASANA
          <input
            type="password"
            id="loginForm-password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="loginForm-button-login">
          KIRJAUDU
        </button>
      </form>
      <button id="loginForm-button-back" onClick={() => navigate('/')}>
        TAKAISIN
      </button>
    </div>
  )
}

export default LoginForm
