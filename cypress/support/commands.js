Cypress.Commands.add('createUser', ({ username, name, password, language }) => {
  cy.request('POST', 'http://localhost:8080/api/users', {
    username,
    name,
    password,
    language,
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8080/api/login',
    body: { username, password },
  }).then(({ body }) => {
    localStorage.setItem('loggedWorkappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000/work')
  })
})

Cypress.Commands.add('reset_db', (languages, vocabularies) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8080/api/testing/reset',
    body: { languages, vocabularies },
  }).then(({ body }) => {
    Cypress.env('languageId', body.languageId)
  })
})

Cypress.Commands.add('createWork', (name, isProject, type) => {
  const loggedUserJSON = window.localStorage.getItem('loggedWorkappUser')
  const user = JSON.parse(loggedUserJSON)
  const token = `bearer ${user.token}`

  cy.request({
    method: 'POST',
    url: 'http://localhost:8080/api/works',
    headers: { Authorization: token },
    body: { name, isProject, type },
  }).then(() => {
    cy.visit('http://localhost:3000/work')
  })
})
