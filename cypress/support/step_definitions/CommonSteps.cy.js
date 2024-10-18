const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given('I navigate to the admin page', () => {
  cy.visit(Cypress.env('websiteUrl'));
});

When('I visit the landing page and log in as a content guarantor', () => {
  cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
  cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
  cy.get('[type="submit"]').should('be.visible');
  cy.get('[type="submit"]').should('be.visible');
  cy.get('[name="userName"]').type(Cypress.env('loginGO'));
  cy.get('[name="password"]').type(Cypress.env('password'));
  cy.get('[type="submit"]').click();

})