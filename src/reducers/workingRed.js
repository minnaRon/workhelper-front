/**
 * Module, reducer WorkingSlice
 * @description The state stores user's current settings for using app to support working.
 * Actions:
 * * setCurrentWork, payload: name, isProject, type, active, user, lastWorked
 * * setCurrentView, payload: path
 * Exports workingSlice.reducer as default
 */
import { createSlice } from '@reduxjs/toolkit'

const workingSlice = createSlice({
  name: 'working',
  initialState: { work: null, view: null },
  reducers: {
    setCurrentWork(state, { payload }) {
      return { ...state, work: payload }
    },
    setCurrentView(state, { payload }) {
      return { ...state, view: payload }
    },
  },
})
export const { setCurrentWork, setCurrentView } = workingSlice.actions

export default workingSlice.reducer
