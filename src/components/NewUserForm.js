/**
 * Module, component
 * @description Form for the new user of the application to register.
 * Local states:
 * state {string} username - User's input for username
 * state {string} name - User's input for name
 * state {string} password - User's input for password
 * state {string} confirmPassword - User's input for confirm password
 * const {object} user - Current user, object fetched from the redux store
 * Form includes:
 * inputs:
 * username, length 4-50, required
 * name, length 3-50, required,
 * password, length 8-50, required
 * confirmPassword, required
 * buttons: submit, back
 * exports NewUserForm as default
 */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showNotification } from '../reducers/notificationRed'
import { addNewUser } from '../reducers/usersRed'

const NewUserForm = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const user = useSelector((state) => state.user)
  const vocabulary = useSelector((state) => state.vocabulary) //.loginform)
  //console.log('--newuserform--vocabulary--', vocabulary)
  const v = vocabulary.vocabulary.checked.newuserform
  const m = vocabulary.vocabulary.checked.notificationMessages

  const dispatch = useDispatch()
  const navigate = useNavigate()

  /**
   * @description Function handles new user's register inputs after the form is submitted.
   * @param {*} event - not in use here,
   * function uses state to store values: username, name, password and confirmPassword.
   * Checks if password is the same as confirmPassword, dispatch error notification if not and
   * checks if the length of the password is between 8-50, dispatch error notification if not.
   * When password is valid:
   * Dispatches register info to usersReducer's addNewUser function and
   * then resets local state values: username, name, password and confirmPassword.
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      dispatch(showNotification(m.NUFEhandleSubmitPasswordDiff, 'error'))
    } else if (password.length < 8 || password.length > 50) {
      dispatch(showNotification(m.NUFEhandleSubmitPasswordLength, 'error'))
    } else {
      dispatch(addNewUser({ username, name, password }))
      if (user) {
        setUsername('')
        setName('')
        setPassword('')
        setConfirmPassword('')
      }
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
  }, [dispatch, user])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{v.NUFH2headlineT}</h2>
        <div>
          {v.NUFIusernameT}
          <input
            type="text"
            id="newUserForm-username"
            value={username}
            minLength={4}
            maxLength={50}
            required
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          {v.NUFInameT}
          <input
            type="text"
            id="newUserForm-name"
            value={name}
            minLength={3}
            maxLength={50}
            required
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          {v.NUFIpasswordT}
          <input
            type="password"
            id="newUserForm-password"
            value={password}
            minLength={8}
            maxLength={50}
            required
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          {v.NUFIconfirmPasswordT}
          <input
            type="password"
            id="newUserForm-confirmPassword"
            value={confirmPassword}
            required
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </div>
        <button type="submit" id="newUserForm-button-submit">
          {v.NUFBsubmitT}
        </button>
      </form>
      <button id="newUserForm-button-back" onClick={() => navigate('/')}>
        {v.NUFBbackT}
      </button>
    </div>
  )
}

export default NewUserForm
