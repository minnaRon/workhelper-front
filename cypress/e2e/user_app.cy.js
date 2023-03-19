import '../support/commands'

describe('When new user ', function () {
  it('page welcome is opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('UUSI KÄYTTÄJÄ')
  })
  it('Opens NewUserForm ', function () {
    cy.visit('http://localhost:3000')
    cy.contains('UUSI KÄYTTÄJÄ').click()
    cy.contains('SALASANA UUDELLEEN')
  })
  it('returns to welcome page if button back pressed', function () {
    cy.visit('http://localhost:3000')
    cy.contains('UUSI KÄYTTÄJÄ').click()
    cy.contains('SALASANA UUDELLEEN')
    cy.get('#newUserForm-button-back').click()
    cy.contains('UUSI KÄYTTÄJÄ')
  })
  describe('When NewUserForm opened ', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:8080/api/testing/reset')
      cy.visit('http://localhost:3000')
      cy.contains('UUSI KÄYTTÄJÄ').click()
    })
    it('Creates and logs in user when input is correct', function () {
      cy.get('#newUserForm-username').type('cypressUsername')
      cy.get('#newUserForm-name').type('cypressName')
      cy.get('#newUserForm-password').type('cypressPassword')
      cy.get('#newUserForm-confirmPassword').type('cypressPassword')
      cy.get('#newUserForm-button-submit').click()
      cy.contains('TERVETULOA cypressName')
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
      cy.contains('SALASANA UUDELLEEN')
    })
    it('Fails to create with too short name', function () {
      cy.get('#newUserForm-username').type('cypressUsername')
      cy.get('#newUserForm-name').type('12')
      cy.get('#newUserForm-password').type('cypressPassword')
      cy.get('#newUserForm-confirmPassword').type('cypressPassword')
      cy.get('#newUserForm-button-submit').click()
      cy.wait(1000)
      cy.contains('SALASANA UUDELLEEN')
    })
    it('Fails to create with too short password', function () {
      cy.get('#newUserForm-username').type('12')
      cy.get('#newUserForm-name').type('cypressName')
      cy.get('#newUserForm-password').type('1234567')
      cy.get('#newUserForm-confirmPassword').type('1234567')
      cy.get('#newUserForm-button-submit').click()
      cy.wait(1000)
      cy.contains('SALASANA UUDELLEEN')
    })
    it('Fails to create if different password and confirmPassword', function () {
      cy.get('#newUserForm-username').type('12')
      cy.get('#newUserForm-name').type('cypressName')
      cy.get('#newUserForm-password').type('cypressPassword')
      cy.get('#newUserForm-confirmPassword').type('differentPassword')
      cy.get('#newUserForm-button-submit').click()
      cy.wait(1000)
      cy.contains('SALASANAT EIVÄT TÄSMÄÄ, TARKISTA SALASANAT')
    })
    describe('When already one user in db', function () {
      beforeEach(function () {
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
        cy.contains('SALASANA UUDELLEEN')
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
        cy.contains('TERVETULOA cypressName')
      })
      it('Fails to log in if username does not exist', function () {
        cy.contains('KIRJAUDU').click()
        cy.get('#loginForm-username').type('wrongCypressUsername')
        cy.get('#loginForm-password').type('cypressPassword')
        cy.get('#loginForm-button-login').click()
        cy.contains('KIRJAUTUMISTIEDOISSA OLI VIRHE')
      })
      it('Fails to log in if incorrect password', function () {
        cy.contains('KIRJAUDU').click()
        cy.get('#loginForm-username').type('cypressUsername')
        cy.get('#loginForm-password').type('wrongCypressPassword')
        cy.get('#loginForm-button-login').click()
        cy.contains('KIRJAUTUMISTIEDOISSA OLI VIRHE')
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
