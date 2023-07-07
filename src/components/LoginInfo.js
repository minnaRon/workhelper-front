/**
 * Module, component
 * @description If user has logged in -> shows username and logout -button.
 * User can press button to log out and navigate to welcome -view.
 * exports LoginInfo as default
 */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userRed'
import LanguageSelector from './LanguageSelector'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Avatar from '@mui/material/Avatar'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { blue } from '@mui/material/colors'

const LoginInfo = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const view = useSelector((state) => state.working.view)
  const vocabulary = useSelector((state) => state.vocabulary) //.loginform)
  const v = vocabulary.vocabulary.checked.logininfo
  //
  const w = vocabulary.vocabulary.checked.welcome
  const open = Boolean(anchorEl)

  /**
   * @description Function handles user's logout after logout -button is pressed.
   * Dispatches logout info to userReducer's logout function and
   * then navigates to Welcome -view.
   */
  const logoutHandler = () => {
    dispatch(logout(user))
    setAnchorEl(null)
    navigate('/')
  }

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleAccountMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <LanguageSelector />
          </Grid>
          <Grid item xs="auto">
            {user ? (
              <div>
                <Avatar
                  sx={{ bgcolor: blue[500] }}
                  id="loginInfo-avatar-user"
                  onClick={handleAvatarClick}
                  aria-controls={open ? 'loginInfo-menu-account' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  {user.name.split('')[0][0]}
                </Avatar>
                <Menu
                  id="loginInfo-menu-account"
                  anchorEl={anchorEl}
                  open={open}
                  MenuListProps={{ 'aria-labelledby': 'loginInfo-avatar-user' }}
                  onClose={handleAccountMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem>{user.name}</MenuItem>
                  <MenuItem>
                    <Button
                      variant="contained"
                      size="small"
                      id="loginInfo-button-logout"
                      onClick={logoutHandler}
                    >
                      {v.LIBlogoutT}
                    </Button>
                  </MenuItem>
                </Menu>
              </div>
            ) : view === '/' ? (
              <Button
                style={{ float: 'right' }}
                variant="contained"
                size="small"
                id="welcome-button-login"
                onClick={() => navigate('/login')}
              >
                {w.WBloginT}
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default LoginInfo
