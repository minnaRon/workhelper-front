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
      dispatch(showNotification('SALASANAT EIVÄT TÄSMÄÄ, TARKISTA SALASANAT', 'error'))
    } else if (password.length < 8 || password.length > 50) {
      dispatch(showNotification('SALASANAN PITUUS TULEE OLLA 8-50 MERKKIÄ', 'error'))
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
  }, [dispatch])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>UUSI KÄYTTÄJÄ</h2>
        <div>
          KÄYTTÄJÄNIMI
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
          NIMI
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
          SALASANA
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
          SALASANA UUDELLEEN
          <input
            type="password"
            id="newUserForm-confirmPassword"
            value={confirmPassword}
            required
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </div>
        <button type="submit" id="newUserForm-button-submit">
          TALLENNA JA KIRJAUDU
        </button>
      </form>
      <button id="newUserForm-button-back" onClick={() => navigate('/')}>
        TAKAISIN
      </button>
    </div>
  )
}

export default NewUserForm
