/**
 * Module, component Form WorkSelector
 * @description User selects current work using this form.
 * The user selects the name of the work, the way of working
 * * and marks the work as a project when it is a project.
 * New work is possible to add using input fields;
 * * newWorkName, newWorkType and checking project checkbox as needed.
 * exports WorkSelector as default
 */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addWork } from '../reducers/worksRed'
import { updateUser } from '../reducers/usersRed'
import { updateWork } from '../reducers/worksRed'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

const WorkSelector = () => {
  const works = useSelector((state) => state.works)
  const user = useSelector((state) => state.user)
  const vocabulary = useSelector((state) => state.vocabulary)
  const v = vocabulary.vocabulary.checked.workselector

  const [selectedWork, setSelectedWork] = useState(works[0] || 'LISÄÄ ENSIMMÄINEN TYÖ')
  const [isProject, setIsProject] = useState(selectedWork.isProject || false)
  const [workType, setWorkType] = useState(selectedWork.type || 'working at home')
  const [newWorkName, setNewWorkName] = useState('')
  const [newWorkType, setNewWorkType] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!user) {
    navigate('/')
  }

  /**
   * hook useEffect
   * Executed if the state of the works or the user changes.
   * @description Sets default selected options using first work object in the array of the works
   * which is sorted by lastVisited work object to be first in the array.
   */
  useEffect(() => {
    if (works[0]) {
      setSelectedWork(works[0])
      setIsProject(selectedWork.isProject)
      setWorkType(selectedWork.type)
    }
  }, [works, user])

  /**
   * function isNew
   * @description Checks if user's newWorkType input already exists
   * in the array of the user's work types.
   * @returns true if work type is new, false if already exists.
   * Is case sensitive; 'Alpha' and 'alpha' not the same.
   * */
  const isNew = (newWorkType) => {
    const workTypes = user.workTypes
    return workTypes.find((type) => type === newWorkType) === undefined
  }

  /**
   * @description Function handles submit of the information of the selected work.
   * @param {*} event - not in use here, uses state values.
   * Checks if type of working is new and typed in the input field newWorkType.
   * * if type of working is new, dispatch update to user's workTypes.
   * Checks if work is new and typed in the input field newWorkName.
   * * if is new work, dispatch to add it in the database and user's info.
   * If work selected using already existing options,
   * * dispatches update using selected options to the information of the existing work.
   */
  const handleSubmit = (event) => {
    event.preventDefault()
    if (newWorkType && isNew(newWorkType)) {
      const updatedWorkTypes = [...user.workTypes, newWorkType]
      dispatch(updateUser({ workTypes: updatedWorkTypes }))
    }
    if (newWorkName) {
      const newWork = {
        name: newWorkName,
        isProject: isProject || false,
        type: newWorkType || workType,
      }
      dispatch(addWork(newWork))
    } else {
      dispatch(updateWork({ ...selectedWork, isProject, type: newWorkType || workType }))
    }
    setNewWorkName('')
    setNewWorkType('')
  }

  /**
   * list optionsSelectWork
   * @description option list for work select menu
   * @returns list of the select options of the work names to use in the select menu.
   */
  const optionsSelectWorkForAutoComplete = works.map((work) => ({
    ...work,
    label: work.name,
  }))

  /**
   * handler changeWorkHandler
   * @description handles the work selection made by the user.
   * Sets correct values of the selected work for local states: selectedWork, isProject, workType
   * These values will be shown in the form as default before submit is done.
   */
  const workHandler = (work) => {
    if (work) {
      setSelectedWork(work)
      setIsProject(work.isProject)
      setWorkType(work.type)
    }
  }

  /**
   * list optionsRadioWorkType
   * @description radio option list of types of working.
   * @returns list of the radio options of the work types.
   */
  const optionsSelectWorkTypeForAutoComplete = user.workTypes.map((type) => ({
    type,
    label: type,
  }))

  return (
    <form onSubmit={handleSubmit}>
      <Grid container pb={4} align="start" justifyContent="center" rowSpacing={2}>
        <Grid item xs={12} mr={7}>
          <Typography variant="h5">{v.WSH1headlineT}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disabled={newWorkName.length > 0}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            disablePortal
            size="small"
            id="workSelector-select-work"
            value={selectedWork.name}
            options={optionsSelectWorkForAutoComplete}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={v.WSSworkT} />}
            onChange={(event, newValue) => {
              workHandler(newValue)
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            label={v.WSInewWorkT}
            id="workSelector-input-newWork"
            type="text"
            value={newWorkName}
            placeholder={v.WSInewWorkP}
            onChange={({ target }) => {
              setNewWorkName(target.value)
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            id="workSelector-checkbox-isProject"
            control={<Checkbox checked={isProject || false} />}
            label={v.WSCisProjectT}
            onChange={(e) => setIsProject(e.target.checked)}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disabled={newWorkType.length > 0}
            isOptionEqualToValue={(option, value) => option.type === value}
            disablePortal
            value={workType || ''}
            size="small"
            id="workSelector-select-newWorkTypek"
            options={optionsSelectWorkTypeForAutoComplete}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={v.WSRworkTypeT} />}
            onChange={(event, newValue) => {
              setWorkType(newValue.type)
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            label={v.WSInewWorkTypeT}
            id="workSelector-input-newWorkType"
            type="text"
            value={newWorkType}
            placeholder={v.WSInewWorkTypeP}
            onChange={({ target }) => {
              setNewWorkType(target.value)
            }}
          />
        </Grid>
        <Grid item xs>
          <Button variant="contained" type="submit" id="workSelector-button-submit">
            {v.WSBsubmitT}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default WorkSelector
