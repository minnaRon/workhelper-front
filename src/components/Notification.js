/**
 * Module, component
 * @description View to show a notification when needed.
 * exports Notification as default
 */
import { useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  return (
    <div id="notification">
      <Stack sx={{ width: '100%' }}>
        <Alert severity={notification.type}> {notification.message}</Alert>
      </Stack>
    </div>
  )
}

export default Notification
