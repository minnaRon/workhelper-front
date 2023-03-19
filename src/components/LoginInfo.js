/**
 * Module, component
 * @description If user has logged in -> shows username and logout -button.
 * User can press button to log out and navigate to welcome -view.
 * exports LoginInfo as default
 */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userRed'

const LoginInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  /**
   * @description Function handles user's logout after logout -button is pressed.
   * Dispatches logout info to userReducer's logout function and
   * then navigates to Welcome -view.
   */
  const logoutHandler = () => {
    dispatch(logout(user))
    navigate('/')
  }

  return (
    <div>
      {user ? (
        <div>
          {user.name}
          <button id="loginInfo-button-logout" onClick={logoutHandler}>
            KIRJAUDU ULOS
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default LoginInfo
