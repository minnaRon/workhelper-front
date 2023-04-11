/**
 * Module, component
 * @description Takes care of routes and keeps user's information in Redux store's
 * state even if website is reloaded.
 */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import LoginInfo from './components/LoginInfo'
import NewUserForm from './components/NewUserForm'
import Notification from './components/Notification'
import Welcome from './components/Welcome'
import WorkTodayPlanForm from './components/WorkTodayPlanForm'
import { setUser } from './reducers/userRed'
import { chooseLanguage } from './reducers/vocabularyRed'
import { initializeLanguages } from './reducers/languagesRed'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  //console.log('--app--user--', user)
  const languages = useSelector((state) => state.languages)
  //console.log('--app--languages--', languages[0])

  const vocabulary = useSelector((state) => state.vocabulary)
  //console.log('--app--vocabulary--', vocabulary)

  /**
   * Hook useEffect
   * @description Dispatch to set all languages to the Redux store from the database.
   */
  useEffect(() => {
    const initialize = async () => {
      //console.log('--app--useEffect--eka')
      await dispatch(initializeLanguages())
    }
    initialize()
  }, [])

  /**
   * Hook useEffect
   * @description Filters language for vocabulary, using the code of the language.
   * Function chooseLanguage sets the vocabulary of the chosen language to the redux store.
   * ...in progress.. change filter to match with the country and language where user exists.
   * dispatch @params {string} language.id - Id of the language
   */
  useEffect(() => {
    // const initializeVocabulary = async () => {
    const language = languages.filter((l) => l.code === 'fin')[0]
    if (language) {
      //console.log('--app--useEffect--language--', language)
      dispatch(chooseLanguage(language.id))
    }
  }, [languages])

  /**
   * Hook useEffect
   * @description After the user is logged in sends user's information of authetication
   * to the state of the Redux store.
   * Hook checks if localStorage has the information of the logged user and
   * if is, dispatches the user's authentication information to Redux store's state.
   * dispatch @params {object} user - user's authetication information
   * properties: token, username, name
   */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedWorkappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //console.log('--app--useEffect--loggeduser--', user)
      dispatch(setUser(user))
      dispatch(chooseLanguage(user.language))
      //setTokens here
    }
  }, [])

  if (!user && vocabulary) {
    return (
      <div>
        <Notification />
        <LoginInfo />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/users/newuser" element={<NewUserForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    )
  }

  if (user && vocabulary) {
    return (
      <div>
        <Notification />
        <LoginInfo />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/users/newuser" element={<NewUserForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/todaysworkplan" element={<WorkTodayPlanForm />} />
        </Routes>
      </div>
    )
  }
}

export default App
