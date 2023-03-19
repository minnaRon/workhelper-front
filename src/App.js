/**
 * Module, component
 * @description Takes care of routes and keeps user's information in Redux store's
 * state even if website is reloaded.
 */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import LoginInfo from './components/LoginInfo'
import NewUserForm from './components/NewUserForm'
import Notification from './components/Notification'
import Welcome from './components/Welcome'
import WorkTodayPlanForm from './components/WorkTodayPlanForm'
import { setUser } from './reducers/userRed'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  /**
   * Hook useEffect
   * @description After the user is logged in sends user's information of authetication
   * to the state of the Redux store.
   * Hook checks if localStorage has the information of the logged user and
   * if is, dispatches the user's authentication information to Redux store's state.
   * dispatch @params {object} user - user's authetication information
   * properties: token, username, name
   */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedWorkappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      //setTokens here
    }
  }, [])

  if (!user) {
    return (
      <div>
        <Notification />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/users/newuser" element={<NewUserForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <LoginInfo />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/users/newuser" element={<NewUserForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/todaysworkplan" element={<WorkTodayPlanForm />} />
      </Routes>
    </div>
  )
}
export default App
