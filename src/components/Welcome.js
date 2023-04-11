/**
 * Module, component
 * @description Welcome view for the application user.
 * Shown first and also after logout.
 * View includes:
 * buttons: login
 * links: to newUserForm to register
 * exports Welcome as default
 */
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Welcome = () => {
  const vocabulary = useSelector((state) => state.vocabulary)
  const v = vocabulary.vocabulary.checked.welcome
  const navigate = useNavigate()

  return (
    <div>
      <h2>{v.WH2headlineT}</h2>
      <button id="welcome-button-login" onClick={() => navigate('/login')}>
        {v.WBloginT}
      </button>
      <h5>
        <Link id="welcome-link-newUser" to="/users/newuser">
          {v.WLnewUserT}
        </Link>
      </h5>
    </div>
  )
}

export default Welcome
