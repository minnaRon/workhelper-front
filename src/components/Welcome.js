/**
 * Module, component
 * @description Welcome view for the application user.
 * Shown first and also after logout.
 * View includes:
 * buttons: login
 * links: to newUserForm to register
 * exports Welcome as default
 */
import { Link, useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate()

  return (
    <div>
      <p>TERVETULOA!</p>
      <button id="welcome-button-login" onClick={() => navigate('/login')}>
        KIRJAUDU
      </button>
      <h5>
        <Link id="welcome-link-newUser" to="/users/newuser">
          UUSI KÄYTTÄJÄ
        </Link>
      </h5>
    </div>
  )
}

export default Welcome
