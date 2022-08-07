/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Homepage flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('HomeHeader contains correct elements', () => {
    cy.contains('MOONHOLDINGS.XYZ')
    cy.contains('Log in')
    cy.contains('Get Started')
    cy.get('header > h1 > a').should('have.attr', 'title', 'MoonHoldings.xyz')
    cy.get('header > nav > a').should('have.attr', 'href', '/login')
    cy.get('button').first().should('have.text', 'Get Started')
  })

  it('HomeBanner contains correct elements', () => {
    cy.get('button').should('have.length', 2)
    cy.get('button').last().should('have.text', 'Get Started')
    cy.get('img').should('have.attr', 'src', '/mh-zen-banner.gif')
    cy.get('img').should('have.attr', 'title', 'Art commissioned from Zen0')
  })

  it('HomeCTA section & Get Started Click', () => {
    cy.get('button').last().click();
    cy.location('pathname').should('eq', '/sign-up')
  })
});
