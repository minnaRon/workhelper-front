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
  const vocabulary = useSelector((state) => state.vocabulary) //.loginform)
  // console.log('--loginform--vocabulary--', vocabulary)
  const v = vocabulary.vocabulary.checked.loginform
  // console.log('--loginform--m--', m)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

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
      //console.log('--loginform--useeffect--user', user)
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
  }, [user])

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
