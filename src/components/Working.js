/**
 * Module, component Working
 * ..in progress..
 * @description The main view for everything related to current working.
 * includes:
 * information of current work
 */
import { useSelector } from 'react-redux'

const Working = () => {
  const { work } = useSelector((state) => state.working)

  return (
    <div>
      <p>Hello Working!</p>
      <p>
        {work.name}, {work.type}
      </p>
      <p>{work.isProject ? 'on' : 'ei ole'} projekti</p>
    </div>
  )
}

export default Working
