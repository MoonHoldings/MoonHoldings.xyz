import {
  CHECK_TERMS_POLICIES,
  EMAIL_NOT_VALID,
  PASSWORD_REQUIREMENTS,
  PASSWORD_NOT_MATCH
} from '../../src/constants'

/// <reference types="cypress" />

describe('Sign Up flow - Happy Path', () => {

  let ranNum

  beforeEach(() => {
    cy.intercept('POST', '/api/register', {
      statusCode: 201,
      body: {
        success: true
      },
    })

    cy.visit('http://localhost:3000/sign-up')
    ranNum = Math.floor(Math.random() * 100);
  })

  it('Happy Path', () => {
    cy.get('.signup-window h2').contains('Sign Up')
    cy.contains('I certify that I am 18 years of age or older, agree to the terms, and acknowledge the privacy policy.')
    cy.contains('Sign Up With Twitter')
    cy.contains('Sign Up With Discord')
    
    // Email success
    cy.get('.e-box').should('have.attr', 'placeholder', 'Email')
    cy.get('.e-box').type(`foo${ranNum}@bar.com`)
    cy.get('#accept-terms').click();
    cy.get('.continue-btn').click();
    
    // Password success
    cy.get('.p-box').should('have.attr', 'placeholder', 'Password')
    cy.get('.p-box').type('Foobar1!')
    cy.get('.continue-btn').click();

    // Confirm Password success
    cy.get('.c-p-box').should('have.attr', 'placeholder', 'Confirm Password')
    cy.get('.c-p-box').type('Foobar1!')
    cy.get('.continue-btn').click();
    cy.get('.success-alert').contains('Account Created! Please login.')
    cy.wait(5000)
    cy.location('pathname').should('eq', '/login')
  })
});
