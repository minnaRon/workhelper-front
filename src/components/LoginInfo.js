/**
 * Module, component
 * @description If user has logged in -> shows username and logout -button.
 * User can press button to log out and navigate to welcome -view.
 * exports LoginInfo as default
 */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userRed'
import LanguageSelector from './LanguageSelector'

const LoginInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const vocabulary = useSelector((state) => state.vocabulary) //.loginform)
  //console.log('--loginInfo--vocabulary--', vocabulary)
  const v = vocabulary.vocabulary.checked.logininfo

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
      <LanguageSelector />
      {user ? (
        <div>
          {user.name}
          <button id="loginInfo-button-logout" onClick={logoutHandler}>
            {v.LIBlogoutT}
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default LoginInfo
