/**
 * Module, component Working
 * ..in progress..
 * @description The main view for everything related to current working.
 * includes:
 * information of current work
 */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationRed'
import { setCurrentView } from '../reducers/workingRed'
import Notification from './Notification'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import LinearProgress from '@mui/material/LinearProgress'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import WorkMainView from './WorkMainView'
import LoginInfo from './LoginInfo'

const Working = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const { work } = useSelector((state) => state.working)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showNotification('HYVÄÄ TYÖPÄIVÄÄ! '))
    dispatch(setCurrentView('/working'))
  }, [])

  return (
    <div>
      {isDrawerOpen ? (
        <Drawer
          PaperProps={{
            sx: { width: 360 },
          }}
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Box p={2} textAlign="center" role="presentation">
            <LoginInfo />
            <Notification />
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6">TYÖN TIEDOT:</Typography>
                <Typography>{work.isProject ? 'PROJEKTI' : ''}</Typography>
                <Typography>{work.name}</Typography>
                <Typography>{work.type}</Typography>
              </CardContent>
            </Card>
            <WorkMainView />
          </Box>
        </Drawer>
      ) : (
        <div>
          <Box sx={{ width: 40 }}>
            <Card elevation={4}>
              <CardActionArea
                style={{ float: 'right', fontSize: 10 }}
                onClick={() => setIsDrawerOpen(true)}
              >
                <OpenInFullIcon />
                <CardContent>
                  <LinearProgress
                    variant="determinate"
                    value={30}
                    color={work ? 'primary' : 'secondary'}
                    sx={{
                      width: 4,
                      height: 200,
                      '& span.MuiLinearProgress-bar': {
                        transform: `translateY(${100 - 30}%)!important`,
                      },
                    }}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </div>
      )}
    </div>
  )
}

export default Working
