/**
 * Module, component
 * @description View to show a notification when needed.
 * exports Notification as default
 */
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: notification.type === 'error' ? 'white' : 'white',
    fontSize: 15,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
  }

  return (
    <div id="notification" style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
