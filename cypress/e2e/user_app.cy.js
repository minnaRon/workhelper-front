import '../support/commands'
import mock_db from '../../src/mocks/mock_db'

const languages = mock_db.languages
console.log('--user_app.cy--languages--', languages)
const vocabularies = mock_db.vocabularies
console.log('--user_app.cy--vocabularies--', vocabularies)

describe('When new user ', function () {
  beforeEach(function () {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/api/testing/reset',
      body: { languages, vocabularies },
    })
  })
  it('page welcome is opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('UUSI KÄYTTÄJÄ')
  })
  it('changes language', function () {
    cy.visit('http://localhost:3000')
    cy.contains('UUSI KÄYTTÄJÄ')
    cy.contains('English').click()
    cy.should('not.contain', 'UUSI KÄYTTÄJÄ')
    cy.contains('NEW USER')
    cy.contains('suomi').click()
    cy.contains('UUSI KÄYTTÄJÄ')
  })
  it('Opens NewUserForm ', function () {
    cy.visit('http://localhost:3000')
    cy.contains('UUSI KÄYTTÄJÄ').click()
    cy.contains('salasana uudelleen')
  })
  it('returns to welcome page if button back pressed', function () {
    cy.visit('http://localhost:3000')
    cy.contains('UUSI KÄYTTÄJÄ').click()
    cy.contains('salasana uudelleen')
    cy.get('#newUserForm-button-back').click()
    cy.contains('UUSI KÄYTTÄJÄ')
  })
  describe('When NewUserForm opened ', function () {
    beforeEach(function () {
      localStorage.removeItem('loggedWorkappUser')
      cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/testing/reset',
        body: { languages, vocabularies },
      })
      cy.visit('http://localhost:3000')
      cy.contains('UUSI KÄYTTÄJÄ').click()
    })
    it('Creates and logs in user when input is correct', function () {
      cy.get('#newUserForm-username').type('cypressUsername')
      cy.get('#newUserForm-name').type('cypressName')
      cy.get('#newUserForm-password').type('cypressPassword')
      cy.get('#newUserForm-confirmPassword').type('cypressPassword')
      cy.get('#newUserForm-button-submit').click()
      cy.contains('Tervetuloa cypressName')
    })
    it('Fails to create with too short username', function () {
      cy.get('#newUserForm-username').type('123')
      cy.get('#newUserForm-name').type('cypressName')
      cy.get('#newUserForm-password').type('cypressPassword')
      cy.get('#newUserForm-confirmPassword').type('cypressPassword')
      cy.get('#newUserForm-button-submit').click()
      cy.on('uncaught:exception', (err, runnable) => {
        expect(err.message).includes('username should contain 4-50 chars')
        done()
        return false
      })
      cy.contains('salasana uudelleen')
    })
    it('Fails to create with too short name', function () {
      cy.get('#newUserForm-username').type('cypressUsername')
      cy.get('#newUserForm-name').type('12')
      cy.get('#newUserForm-password').type('cypressPassword')
      cy.get('#newUserForm-confirmPassword').type('cypressPassword')
      cy.get('#newUserForm-button-submit').click()
      cy.wait(1000)
      cy.contains('salasana uudelleen')
    })
    it('Fails to create with too short password', function () {
      cy.get('#newUserForm-username').type('12')
      cy.get('#newUserForm-name').type('cypressName')
      cy.get('#newUserForm-password').type('1234567')
      cy.get('#newUserForm-confirmPassword').type('1234567')
      cy.get('#newUserForm-button-submit').click()
      cy.wait(1000)
      cy.contains('salasana uudelleen')
    })
    it('Fails to create if different password and confirmPassword', function () {
      cy.get('#newUserForm-username').type('12')
      cy.get('#newUserForm-name').type('cypressName')
      cy.get('#newUserForm-password').type('cypressPassword')
      cy.get('#newUserForm-confirmPassword').type('differentPassword')
      cy.get('#newUserForm-button-submit').click()
      cy.wait(1000)
      cy.contains('Salasanat eivät täsmää, tarkista salasanat')
    })
    describe('When already one user in db', function () {
      beforeEach(function () {
        cy.reset_db(languages, vocabularies)
        localStorage.removeItem('loggedWorkappUser')
        cy.createUser({
          username: 'cypressUsername',
          name: 'cypressName',
          password: 'cypressPassword',
        })
      })
      it('Fails to create if username already exists', function () {
        cy.contains('UUSI KÄYTTÄJÄ').click()
        cy.get('#newUserForm-username').type('cypressUsername')
        cy.get('#newUserForm-name').type('cypressName')
        cy.get('#newUserForm-password').type('cypressPassword')
        cy.get('#newUserForm-confirmPassword').type('cypressPassword')
        cy.get('#newUserForm-button-submit').click()
        cy.wait(1000)
        cy.contains('salasana uudelleen')
        cy.contains('username must be unique')
      })
      it('returns from login page to welcome page if button back pressed', function () {
        cy.contains('KIRJAUDU').click()
        cy.contains('KIRJAUTUMINEN')
        cy.get('#loginForm-button-back').click()
        cy.contains('UUSI KÄYTTÄJÄ')
      })
      it('Logs in with correct credentials', function () {
        cy.contains('KIRJAUDU').click()
        cy.get('#loginForm-username').type('cypressUsername')
        cy.get('#loginForm-password').type('cypressPassword')
        cy.get('#loginForm-button-login').click()
        cy.contains('Tervetuloa cypressName')
      })
      it('Fails to log in if username does not exist', function () {
        cy.contains('KIRJAUDU').click()
        cy.get('#loginForm-username').type('wrongCypressUsername')
        cy.get('#loginForm-password').type('cypressPassword')
        cy.get('#loginForm-button-login').click()
        cy.contains('Kirjautumistiedoissa oli virhe: ')
      })
      it('Fails to log in if incorrect password', function () {
        cy.contains('KIRJAUDU').click()
        cy.get('#loginForm-username').type('cypressUsername')
        cy.get('#loginForm-password').type('wrongCypressPassword')
        cy.get('#loginForm-button-login').click()
        cy.contains('Kirjautumistiedoissa oli virhe: ')
      })
      it('Logs out correctly', function () {
        cy.contains('KIRJAUDU').click()
        cy.get('#loginForm-username').type('cypressUsername')
        cy.get('#loginForm-password').type('cypressPassword')
        cy.get('#loginForm-button-login').click()
        cy.contains('KIRJAUDU ULOS').click()
        cy.contains('KIRJAUDU')
        cy.should('not.contain', 'KIRJAUDU ULOS')
      })
    })
  })
})
