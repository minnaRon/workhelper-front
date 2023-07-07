/**
 * Module, File mock_db.js
 * @description Mock db is used with e2e cypress tests.
 * export default { testUsers, vocabularies, languages }
 */
const testUsers = [
  {
    username: 'testUsername',
    name: 'testName',
    password: 'testPassword',
    works: [],
    workTypes: ['working at home', 'studying'],
    id: 'testid6416494c5fa80158b4c42704',
  },
  {
    username: 'testUsername2',
    name: 'testName2',
    password: 'testPassword2',
    works: [],
    workTypes: ['working at home', 'studying'],
    id: 'testi2kaksi94c5fa80158b4c42704',
  },
]

const languages = [
  {
    id: 'testLangIdEng123',
    code: 'eng',
    nameInEnglish: 'English',
    nameLocal: 'English',
    defaultFlagCountrycode: 'GB',
  },
  {
    id: 'testLangIdFin123',
    code: 'fin',
    nameInEnglish: 'Finnish',
    nameLocal: 'suomi',
    defaultFlagCountrycode: 'FI',
  },
]

const works = [
  {
    name: 'testWork',
    isProject: true,
    type: 'studying',
    user: new Object({ id: 'testid6416494c5fa80158b4c42704' }),
    active: true,
    lastWorked: new Date(),
  },
  {
    name: 'testWork2',
    isProject: false,
    type: 'studying2',
    user: new Object({ id: 'testi2kaksi94c5fa80158b4c42704' }),
    active: true,
    lastWorked: new Date(),
  },
]

const vocabularies = [
  {
    language: 'testLangIdEng123',
    languageCode: 'eng',
    vocabulary: {
      checked: {
        notificationMessages: {
          langRedErroraddNewLanguage: 'failed to add a new language: ',
          userRedIloginUserstart: 'Welcome',
          userRedIloginUserend: 'have a good one!',
          userRedEloginUserstart: 'Failed to log in: ',
          userRedEloginUserend: ', try again',
          userRedIlogoutstart: 'Bye bye',
          userRedIlogoutend: 'see you soon!',
          usersRedEaddNewUser: 'Failed to create a new user: ',
          NUFEhandleSubmitPasswordDiff: 'Passwords are different, check passwords',
          NUFEhandleSubmitPasswordLength: 'Password length must be 8-50 characters',
        },
        welcome: {
          WH2headlineT: 'WELCOME!',
          WBloginT: 'LOG IN',
          WLnewUserT: 'NEW USER',
        },
        loginform: {
          LFH2headlineT: 'LOG IN',
          LFIusernameT: 'username',
          LFIpasswordT: 'password',
          LFBsubmitT: 'LOGIN',
          LFBbackT: 'BACK',
          LFIforDevT: 'DEV HELPER INPUT',
          LFBforDevT: 'DEV HELPER BUTTON',
        },
        logininfo: {
          LIBlogoutT: 'LOG OUT',
        },
        newuserform: {
          NUFH2headlineT: 'NEW USER',
          NUFIusernameT: 'username',
          NUFInameT: 'name',
          NUFIpasswordT: 'password',
          NUFIconfirmPasswordT: 'confirm password',
          NUFBsubmitT: 'SAVE AND LOGIN',
          NUFBbackT: 'BACK',
        },
        workselector: {
          WSH1headlineT: 'SELECT: ',
          WSSworkT: 'object of work: ',
          WSInewWorkT: '...or add a new one: ',
          WSInewWorkP: 'add a new work item',
          WSCisProjectT: 'is a project',
          WSRworkTypeT: 'way of working: ',
          WSInewWorkTypeT: '...or add a new one: ',
          WSInewWorkTypeP: 'add a new way of working',
          WSBsubmitT: 'start working',
        },
      },
    },
  },
  {
    language: 'testLangIdFin123',
    languageCode: 'fin',
    vocabulary: {
      checked: {
        notificationMessages: {
          langRedErroraddNewLanguage: 'uuden kielen lisääminen epäonnistui: ',
          userRedIloginUserstart: 'Tervetuloa',
          userRedIloginUserend: 'työn iloa!',
          userRedEloginUserstart: 'Kirjautumistiedoissa oli virhe: ',
          userRedEloginUserend: ', yritä uudelleen',
          userRedIlogoutstart: 'Heipä hei',
          userRedIlogoutend: 'nähdään taas!',
          usersRedEaddNewUser: 'Uuden käyttäjän luominen epäonnistui: ',
          NUFEhandleSubmitPasswordDiff: 'Salasanat eivät täsmää, tarkista salasanat',
          NUFEhandleSubmitPasswordLength: 'Salasanan pituuden tulee olla 8-50 merkkiä',
        },
        welcome: {
          WH2headlineT: 'TERVETULOA!',
          WBloginT: 'KIRJAUDU',
          WLnewUserT: 'UUSI KÄYTTÄJÄ',
        },
        loginform: {
          LFH2headlineT: 'KIRJAUTUMINEN',
          LFIusernameT: 'käyttäjänimi',
          LFIpasswordT: 'salasana',
          LFBsubmitT: 'KIRJAUDU',
          LFBbackT: 'TAKAISIN',
        },
        logininfo: {
          LIBlogoutT: 'KIRJAUDU ULOS',
        },
        newuserform: {
          NUFH2headlineT: 'UUSI KÄYTTÄJÄ',
          NUFIusernameT: 'käyttäjänimi',
          NUFInameT: 'nimi',
          NUFIpasswordT: 'salasana',
          NUFIconfirmPasswordT: 'salasana uudelleen',
          NUFBsubmitT: 'TALLENNA JA KIRJAUDU',
          NUFBbackT: 'TAKAISIN',
        },
        workselector: {
          WSH1headlineT: 'VALITSE: ',
          WSSworkT: 'TYÖN KOHDE: ',
          WSInewWorkT: '...TAI LISÄÄ UUSI: ',
          WSInewWorkP: 'LISÄÄ UUSI TYÖ',
          WSCisProjectT: 'ON PROJEKTI',
          WSRworkTypeT: 'TYÖTAPA: ',
          WSInewWorkTypeT: '...TAI LISÄÄ UUSI: ',
          WSInewWorkTypeP: 'LISÄÄ UUSI TYÖTAPA',
          WSBsubmitT: 'ALOITA TYÖT',
        },
      },
      newPlaces: {
        loginform: {
          LFIforDevT: {
            eng: 'DEV HELPER INPUT',
            usersWhoTranslate: ['642861b1b1863882baf0ac83'],
            translations: {
              'EKA KÄÄNNÖS INPUT': 1,
            },
          },
          LFBforDevT: {
            eng: 'DEV HELPER BUTTON',
            usersWhoTranslate: ['642861b1b1863882baf0ac83', '642862c7b1863882baf0ac86'],
            translations: {
              'EKA KÄÄNNÖS BUTTON': 1,
              'TOKA KÄÄNNÖS BUTTON': 1,
            },
          },
        },
      },
    },
  },
]

export default { testUsers, vocabularies, languages, works }
