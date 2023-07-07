/**
 * Module, component
 * @description Welcome view for the application user.
 * Shown first and also after logout.
 * View includes:
 * buttons: login
 * links: to newUserForm to register
 * exports Welcome as default
 */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { setCurrentView } from '../reducers/workingRed'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import Link from '@mui/material/Link'

const Welcome = () => {
  const vocabulary = useSelector((state) => state.vocabulary)
  const v = vocabulary.vocabulary.checked.welcome
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentView('/'))
  }, [])

  return (
    <Grid>
      <Card elevation={4}>
        <CardActions style={{ float: 'right', fontSize: 10 }}>
          <Link component={RouterLink} id="welcome-link-newUser" to="/users/newuser">
            {v.WLnewUserT}
          </Link>
        </CardActions>
        <CardMedia
          component="img"
          height="300"
          src="picWelcome.jpg"
          alt="laptop ready to work"
        />
        <CardContent>
          <Typography variant="h4">{v.WH2headlineT}</Typography>
          <Typography>
            TEE TÄNNE TEKSTI KUVAAMAAN SOVELLUKSEN OMINAISUUKSIA {v.WTdescribe}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Welcome
