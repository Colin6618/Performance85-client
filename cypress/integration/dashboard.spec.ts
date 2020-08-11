/// <reference types="cypress" />

describe('Test Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
      .findByPlaceholderText(/example@gmail\.com/i)
      .focus()
      .type('username001@gmail.com{enter}123123123{enter}')
  })


  it('should go to single performance', function () {
    cy.findByText(/Track Performances/i).get('.performance__title')
      .first()
      .click()
      .wait(1000)
    cy.url().should('include', '/dashboard/performances/')
  })

  it('should add a new performance', () => {
    cy.server();
    cy.route('POST', '/api/performances', 'fixture:add-performance.json');
    cy.findByText(/Add/i)
      .click()
      .findByText(/Submit new performance/i)
      .wait(500)
      .findByPlaceholderText(/Enter the username to be reviewed/i)
      .click()
      .type('username001')
      .findByPlaceholderText(/Enter Title/i)
      .click()
      .type('Cypres testing')
      .findByPlaceholderText(/write markdown/i)
      .click()
      .type('## Cypres testing\n **hello cypress**')
      .findByText(/Preview/i).click()
      .findByText(/Write/i).click()
      .findByText(/submit/i, { selector: 'button' })
      .click()
  })

  // it('should add a new comment', () => {
  //   cy.server();
  //   cy.route('GET', '/api/performances', 'fixture:add-performance.json');
  //   cy.route('GET', '/api/performances/', 'fixture:single-performance.json');
  //   cy.route('PATCH', '/api/performances/*/comments', 'fixture:add-comment.json')
  //   cy.findByText(/Cypress testing/i, { selector: 'h3' })
  //     .click()
  //     .wait(500)
  //     .findByPlaceholderText(/write markdown/i)
  //     .click()
  //     .type('### Hello Cypres comment')
  //     .findByText(/Preview/i).click()
  //     .findByText(/Write/i).click()
  //     .findByText(/comment/i, { selector: 'button' })
  //     .click()
  // })


})
