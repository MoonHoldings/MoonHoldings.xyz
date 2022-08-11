import {
  LOGIN,
  MOON_XYZ,
} from '../../src/constants'

/// <reference types="cypress" />

describe('Log In flow - Happy Path', () => {

  let ranNum

  beforeEach(() => {
    cy.intercept('POST', '/api/login', {
      statusCode: 201,
      data: {
        success: true,
        message: 'logged in'
      },
    })

    cy.visit('http://localhost:3000/login')
  })

  it('Happy Path', () => {
    cy.get('.login-window h1').contains(MOON_XYZ)
    cy.get('.login-window h2').contains(LOGIN)
    cy.get('.email-input a').should('have.attr', 'href', '/forgot-password')
    cy.contains('Log In With Twitter')
    cy.contains('Log In With Discord')
    
    cy.get('.e-box').should('be.visible')
    cy.get('.e-box').should('have.attr', 'placeholder', 'Email')
    cy.get('.e-box').type(`foo@bar.com`)
    cy.get('.continue-btn').click();

    cy.get('.e-box').should('not.be.visible')
    cy.get('.p-box').should('be.visible')
    cy.get('.p-box').should('have.attr', 'placeholder', 'Password')

    cy.get('.p-box').type('Foobar1!')
    cy.get('.continue-btn').click();
  })
});
