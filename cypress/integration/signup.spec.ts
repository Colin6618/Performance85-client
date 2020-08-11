/// <reference types="cypress" />
describe('Should Check Signup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup')
  })

  it('Should not be empty', function () {
    cy.findByText(/signup/i)
      .click()
      .findByText(/Name should not contain special symbols/i)
  })
  it('Should report error if invalid inputs happen', function () {
    cy.findByPlaceholderText(/Enter Your Name/i)
      .focus()
      .type('name111{enter}username111{enter}username111@gmail.com');
    cy.findByPlaceholderText(/^password$/i)
      .focus()
      .type('123123{enter}12312344{enter}')
      .findByText(/Confirm Password does not match/i)
  })
})
