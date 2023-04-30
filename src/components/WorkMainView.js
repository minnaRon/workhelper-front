/**
 * Module, component WorkMainView
 * @description The main view for everything related to work.
 * includes:
 * WorkSelector
 */
import WorkSelector from './WorkSelector'

const WorkMainView = () => {
  return (
    <div id="todayplanformsidfortests">
      <p>Hello WorkTodayPlanForm!</p>
      <WorkSelector />
    </div>
  )
}

export default WorkMainView
