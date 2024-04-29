// ***********************************************
// This example commands.js shows you how to
// create the custom commands: 'createDefaultTodos'
// and 'createTodo'.
//
// The commands.js file is a great place to
// modify existing commands and create custom
// commands for use throughout your tests.
//
// You can read more about custom commands here:
// https://on.cypress.io/commands
// ***********************************************

Cypress.Commands.add('sortTableByColumn', (columnName) => {
  cy.get(`.sort-indicator:contains("${columnName}")`).first().as('alias');
  cy.get('@alias').click().then(() => {
    cy.get('@alias').parent().should('have.class', 'sort-asc').then(($element) => {
      if ($element.length > 0) {
        cy.get('@alias').click();
      }
    });
    cy.get('@alias').parent().should('have.class', 'sort-desc');
  });
  cy.wait(1000)
});

Cypress.Commands.add('pageReload', () => {
  cy.get('.btn-back').first().click()
  cy.wait(3000);
  cy.get(':nth-child(6) > .nav-link').click();
  cy.wait(3000);
  cy.get('[type="radio"]').first().check({ force: true });
  cy.wait(3000);
  cy.get('.fa-edit').first().click();
})

import 'cypress-file-upload';

Cypress.Commands.add('loginAdmin', (username, password) => {
  cy.session([username, password], () => {
    cy.visit('https://dev.metis.academy/admin/');
    cy.get('[class="btn btn-navigate btn-block"]', { timeout: 20000 }).should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type(username);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.viewport(1920, 937);
  });
});