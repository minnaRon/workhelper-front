/**
 * Module, component
 * @description Takes care of routes and keeps user's information in Redux store's
 * state even if website is reloaded.
 */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import LoginInfo from './components/LoginInfo'
import NewUserForm from './components/NewUserForm'
import Notification from './components/Notification'
import Welcome from './components/Welcome'
import WorkMainView from './components/WorkMainView'
import Working from './components/Working'
import { setUser } from './reducers/userRed'
import { chooseVocabulary } from './reducers/vocabularyRed'
import { initializeLanguages } from './reducers/languagesRed'
import { initializeWorks } from './reducers/worksRed'
import { initializeUsers } from './reducers/usersRed'
import { setCurrentWork, setCurrentView } from './reducers/workingRed'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  //console.log('--app--user--', user)
  const languages = useSelector((state) => state.languages)
  //console.log('--app--languages--', languages[0])

  const vocabulary = useSelector((state) => state.vocabulary)
  //console.log('--app--vocabulary--', vocabulary)
  const working = useSelector((state) => state.working)
  //console.log('--app--working--', working)

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
    const language = languages.filter((l) => l.code === 'fin')[0]
    if (language) {
      //console.log('--app--useEffect--language--', language)
      dispatch(chooseVocabulary(language.id))
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
    if (!user && loggedUserJSON !== null && loggedUserJSON !== 'null') {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      dispatch(chooseVocabulary(user.language))
      dispatch(initializeUsers())
      dispatch(initializeWorks())

      const workingJSON = window.localStorage.getItem('loggedWorkappWorking')
      if (workingJSON) {
        const { work, view } = JSON.parse(workingJSON)
        dispatch(setCurrentWork(work))
        dispatch(setCurrentView(view))
        navigate(view)
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('loggedWorkappUser', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    window.localStorage.setItem('loggedWorkappWorking', JSON.stringify(working))
    navigate(working.view)
  }, [working])

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
          <Route path="/work" element={<WorkMainView />} />
          <Route path="/working" element={<Working />} />
        </Routes>
      </div>
    )
  }
}

export default App
