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
import { initializeWorks } from '../reducers/worksRed'
import { initializeUsers } from '../reducers/usersRed'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const vocabulary = useSelector((state) => state.vocabulary) //.loginform)
  const v = vocabulary.vocabulary.checked.loginform
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  /**
   * @description Function handles user's login inputs after the form is submitted.
   * @param {*} event - not in use here,
   * function uses state to store values: username and password.
   * Dispatches login info to userReducer's login function
   */
  const handleLogin = async (event) => {
    event.preventDefault()
    await dispatch(loginUser({ username, password }))
  }

  /**
   * Hook useEffect
   * @description After the user is logged in dispatches users and
   * user's works in the redux store,
   * then resets local state values: username and password.
   * navigates to path '/work'.
   */
  useEffect(() => {
    if (user && username) {
      dispatch(initializeUsers())
      dispatch(initializeWorks())
      setUsername('')
      setPassword('')
      navigate('/work')
    }
  }, [handleLogin])

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>{v.LFH2headlineT}</h2>
        <div>
          {v.LFIusernameT}
          <input
            type="text"
            id="loginForm-username"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          {v.LFIpasswordT}
          <input
            type="password"
            id="loginForm-password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="loginForm-button-login">
          {v.LFBsubmitT}
        </button>
      </form>
      <button id="loginForm-button-back" onClick={() => navigate('/')}>
        {v.LFBbackT}
      </button>
    </div>
  )
}

export default LoginForm
