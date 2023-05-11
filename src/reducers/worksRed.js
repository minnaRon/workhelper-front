/**
 * Module, reducer WorkSlice
 * @description The state stores user's works.
 * Actions:
 * ..in progress.. check payload to be accurate vvvv
 * * addOne, payload: name, isProject, type, active, user, lastWorked
 * * setWorks, list of work objects sort by lastWorked:
 * * * properties: name, isProject, type, active, user, lastWorked
 * * updateOne
 * Exports action creators which returns function:
 * * initializeWorks()
 * * addWork(workObject)
 * * updateWork(currentWork)
 * Exports workSlice.reducer as default
 */
import { createSlice } from '@reduxjs/toolkit'
import { useService } from '../hooks'
import { setCurrentWork, setCurrentView } from './workingRed'

/* Hook for handle data exchange between the browser and the server */
const { service } = useService('/api/works')

/* Sorts most recently worked work first */
const byLastWorked = (a, b) => (new Date(b.lastWorked) > new Date(a.lastWorked) ? 1 : -1)

/**
 * Reducer workSlice
 * name: works
 * actions:
 * * addOne, payload: name, isProject, type, active, user, lastWorked
 * * setWorks, list of work objects sort by lastWorked:
 * * * properties: name, isProject, type, active, user, lastWorked
 * * updateOne - Updates existing work
 */
const workSlice = createSlice({
  name: 'works',
  initialState: [],
  reducers: {
    addOne(state, action) {
      return [...state, action.payload]
    },
    setWorks(state, action) {
      return action.payload.sort(byLastWorked)
    },
    updateOne(state, action) {
      const updatedWork = action.payload
      return state.map((w) => (w.id !== updatedWork.id ? w : updatedWork))
    },
  },
})
export const { addOne, setWorks, updateOne } = workSlice.actions

/**
 * Action creator initializeWorks
 * @description @returns a function to fetch user's works from the database and
 * then set them to the redux store.
 */
export const initializeWorks = () => {
  return async (dispatch, getState) => {
    const state = getState()
    service.setToken(state.user.token)
    const works = await service.getAll()
    dispatch(setWorks(works))
  }
}

/**
 * Action creator addWork
 * ..in progress.. needs proper error handling
 * @description @returns a function to add user's new work to the database and
 * then add saved work into the redux store in user's works and currentWork.
 * Sets working view to be current view (for this reason navigates to working view)
 */
export const addWork = (workObject) => {
  return (dispatch, getState) => {
    const state = getState()

    service.setToken(state.user.token)

    service
      .create(workObject)
      .then((response) => {
        dispatch(addOne(response))
        dispatch(setCurrentWork(response))
        dispatch(setCurrentView('/working'))
      })
      .catch((error) => {
        console.log('--worksRed--addWork--error--catch--', error.response.data.error)
      })
  }
}

/**
 * Action creator updateWork
 * @description @returns a function to update the information of the user's existing work to the database and
 * then add saved work into the redux store in user's works and currentWork.
 * Sets working view to be current view (for this reason navigates to working view)
 */
export const updateWork = (currentWork) => {
  return async (dispatch, getState) => {
    const state = getState()
    service.setToken(state.user.token)
    const updatedWork = await service.update(currentWork)
    await dispatch(updateOne(updatedWork))
    await dispatch(setCurrentWork(updatedWork))
    dispatch(setCurrentView('/working'))
  }
}

export default workSlice.reducer
