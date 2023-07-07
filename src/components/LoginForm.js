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
import { setCurrentView } from '../reducers/workingRed'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import ButtonGroup from '@mui/material/ButtonGroup'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import LoginIcon from '@mui/icons-material/Login'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const vocabulary = useSelector((state) => state.vocabulary)
  const v = vocabulary.vocabulary.checked.loginform
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(setCurrentView('/login'))
  }, [])

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
    <Paper elevation={4}>
      <form onSubmit={handleLogin}>
        <Grid
          container
          pb={4}
          direction="column"
          justifyContent="center"
          align="center"
          rowSpacing={2}
        >
          <Grid item xs mr={7}>
            <Typography variant="h5">{v.LFH2headlineT}</Typography>
          </Grid>
          <Grid item xs>
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              label={v.LFIusernameT}
              type="text"
              id="loginForm-username"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Grid>
          <Grid item xs>
            <TextField
              size="small"
              InputLabelProps={{ shrink: true }}
              label={v.LFIpasswordT}
              type="password"
              id="loginForm-password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Grid>
          <Grid item xs ml={3}>
            <ButtonGroup>
              <Button
                variant="outlined"
                id="loginForm-button-back"
                onClick={() => navigate('/')}
              >
                {v.LFBbackT}
              </Button>
              <Button
                startIcon={<LoginIcon />}
                variant="contained"
                type="submit"
                id="loginForm-button-login"
              >
                {v.LFBsubmitT}
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default LoginForm
