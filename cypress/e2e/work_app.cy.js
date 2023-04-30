import '../support/commands'
import mock_db from '../../src/mocks/mock_db'

const languages = mock_db.languages
const vocabularies = mock_db.vocabularies

const newUser = {
  username: 'cypressUsername',
  name: 'cypressName',
  password: 'cypressPassword',
  language: Cypress.env('languageId') || null,
}

describe('When already one user in db and logged in', function () {
  beforeEach(function () {
    cy.reset_db(languages, vocabularies)
    localStorage.removeItem('loggedWorkappUser')
    cy.createUser(newUser)
    cy.login({ username: newUser.username, password: newUser.password })
  })
  it('Logs in with correct credentials', function () {
    //this vvv line will change after workMainView is ready
    cy.contains('WorkTodayPlanForm')
  })
  it('WorkSelector is opened ', function () {
    cy.contains('TYÖN KOHDE: ')
  })
  it('Adds new work correctly with new work type and marked as project', function () {
    cy.get('#workSelector-input-newWork').type('cypressNewWork')
    cy.get('#workSelector-checkbox-isProject').click()
    cy.get('#workSelector-input-newWorkType').type('cypressNewWorkType')
    cy.get('#workSelector-button-submit').click()
    //this vvv line will change after working view is ready
    cy.contains('Hello Working!')
    cy.contains('cypressNewWork')
    cy.contains('on projekti')
    cy.contains('cypressNewWorkType')
  })
  it('Selects existing work correctly with existing work type and not marked as project', function () {
    cy.createWork('cypressWork', false, 'cypressWorkType')
    cy.get('#workSelector-select-work').select('cypressWork')
    cy.get('#workSelector-button-submit').click()
    //this vvv line will change after working view is ready
    cy.contains('Hello Working!')
    cy.contains('cypressWork')
    cy.contains('ei ole projekti')
    cy.contains('cypressWorkType')
  })
  it('Selects existing work correctly with changed new work type and changed as marked as project', function () {
    cy.createWork('cypressWork', false, 'cypressWorkType')
    cy.get('#workSelector-select-work').select('cypressWork')
    cy.get('#workSelector-checkbox-isProject').click()
    cy.get('#workSelector-input-newWorkType').type('cypressNewWorkType')
    cy.get('#workSelector-button-submit').click()
    //this vvv line will change after working view is ready
    cy.contains('Hello Working!')
    cy.contains('cypressWork')
    cy.contains('on projekti')
    cy.contains('cypressNewWorkType')
  })
})
