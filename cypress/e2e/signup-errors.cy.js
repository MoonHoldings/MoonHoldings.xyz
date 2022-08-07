import {
  CHECK_TERMS_POLICIES,
  EMAIL_NOT_VALID,
  PASSWORD_NOT_VALID,
  PASSWORD_REQUIREMENTS,
  PASSWORD_NOT_MATCH
} from '../../src/constants'

/// <reference types="cypress" />

describe('Sign Up flow - Sad Path', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sign-up')
  })

  it('Page contains correct elements', () => {
    cy.get('.signup-window h2').contains('Sign Up')
    cy.get('.e-box').should('have.attr', 'placeholder', 'Email')
  })

  // ! We should first display Email is not valid error
  it('Clicking continue without entering email throws error', () => {
    cy.get('.continue-btn').click();
    cy.get('.error-alert').contains(CHECK_TERMS_POLICIES)
  })

  it('Accepting terms & conditions and then clicking continue throws error if email is missing', () => {
    cy.get('#accept-terms').click();
    cy.get('.continue-btn').click();
    cy.get('.error-alert').contains(EMAIL_NOT_VALID)
  })
  
  it('User tries to continue without entering a Password', () => {
    cy.get('.e-box').type('foo@bar.com')
    cy.get('#accept-terms').click();
    cy.get('.p-box').should('have.attr', 'placeholder', 'Password')
    cy.get('.continue-btn').click();
    cy.contains(PASSWORD_REQUIREMENTS)

    cy.get('.p-box').should('have.attr', 'placeholder', 'Password')
    cy.get('.continue-btn').click();
    cy.get('.error-alert').contains(PASSWORD_NOT_VALID)
  })

  it('After valid Password, user clicks Continue to Confirm Password', () => {
    cy.get('.p-box').type('Foobar1!')
    cy.get('.continue-btn').click();
    cy.get('.c-p-box').should('have.attr', 'placeholder', 'Confirm Password')
  })

  it('User clicks Continue without confirming password', () => {
    // Email success
    cy.get('.e-box').type('foo@bar.com')
    cy.get('#accept-terms').click();
    cy.get('.p-box').should('have.attr', 'placeholder', 'Password')
    cy.get('.continue-btn').click();

    // Password success
    cy.get('.p-box').type('Foobar1!')
    cy.get('.continue-btn').click();

    // Confirm password fail
    cy.get('.continue-btn').click();
    cy.get('.error-alert').contains(PASSWORD_NOT_MATCH)
  })
});
