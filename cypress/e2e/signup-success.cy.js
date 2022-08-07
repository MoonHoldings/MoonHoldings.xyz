import {
  CHECK_TERMS_POLICIES,
  EMAIL_NOT_VALID,
  PASSWORD_REQUIREMENTS,
  PASSWORD_NOT_MATCH
} from '../../src/constants'

/// <reference types="cypress" />

describe('Sign Up flow', () => {
  it('Happy Path', () => {
    cy.visit('http://localhost:3000/sign-up')

    cy.get('.signup-window h2').contains('Sign Up')
    cy.contains('I certify that I am 18 years of age or older, agree to the terms, and acknowledge the privacy policy.')
    cy.contains('Sign Up With Twitter')
    cy.contains('Sign Up With Discord')
    
    // Email success
    cy.get('.e-box').should('have.attr', 'placeholder', 'Email')
    cy.get('.e-box').type('foo@bar.com')
    cy.get('#accept-terms').click();
    cy.get('.continue-btn').click();
    
    // Password success
    cy.get('.p-box').should('have.attr', 'placeholder', 'Password')
    cy.get('.p-box').type('Foobar1!')
    cy.get('.continue-btn').click();

    // Confirm password fail
    cy.get('.continue-btn').click();
    cy.get('.error-alert').contains(PASSWORD_NOT_MATCH)
  })
});
