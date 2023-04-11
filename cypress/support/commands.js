Cypress.Commands.add('createUser', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:8080/api/users', { username, name, password })
  cy.visit('http://localhost:3000')
})
