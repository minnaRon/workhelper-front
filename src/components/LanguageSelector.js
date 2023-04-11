/**
 * Module, component LanguageSelector
 * @description Manages changes of the vocabulary language.
 * The language of the vocabulary is chosen through this component.
 * Current language is implemented as country flag.
 * Other available languages are implemented as options of the select -element,
 * using country flag and native name of the language.
 * exports LanguageSelector as default
 */
import { useDispatch, useSelector } from 'react-redux'
import { chooseLanguage } from '../reducers/vocabularyRed'

const LanguageSelector = () => {
  const languages = useSelector((state) => state.languages)
  if (!languages) {
    return null
  }
  const dispatch = useDispatch()

  /* prepares and returns flag emoji based by countryCode with 2 chars */
  const getFlagEmoji = (countryCode) => {
    //console.log('--Welcome--countryCode--', countryCode)
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt())
    return String.fromCodePoint(...codePoints)
  }

  /* gets vocabulary from redux store */
  const vocabulary = useSelector((state) => state.vocabulary)
  //console.log('--Welcome--vocabulary--', vocabulary)

  const localLanguage = languages.filter((l) => l.id === vocabulary.language)[0]
  //console.log('--Welcome--localLanguage--', localLanguage)
  //console.log('--Welcome--localLanguageFlag--', localLanguage.defaultFlagUnicode)
  const otherLanguages = languages.filter((l) => l.id !== localLanguage.id)

  //console.log('--Welcome--otherLanguages--', otherLanguages)

  /* setSecondLanguage('eng') */
  const options = otherLanguages.map((language) => {
    // console.log('--languageSelector--language.id--', language.id)
    return (
      <option key={language.id} value={language.id}>
        {getFlagEmoji(language.defaultFlagCountrycode)} {language.nameLocal}
      </option>
    )
  })

  /* set language for vocabulary as selected */
  const changeLanguage = (event) => {
    //console.log('--Welcome--changeLanguage--event--', event)
    dispatch(chooseLanguage(event.target.value))
  }

  return (
    <div>
      <a
        id="languageSelector-button-localLanguage"
        onClick={() => dispatch(chooseLanguage(localLanguage.id))}
      >
        {getFlagEmoji(localLanguage.defaultFlagCountrycode)}
      </a>
      <label>
        <select
          id="languageSelector-select-userOwnChoiceLanguage"
          onClick={changeLanguage}
        >
          {options}
        </select>
      </label>
    </div>
  )
}

export default LanguageSelector
