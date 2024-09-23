// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

//sort tabulky podla stlpca coulmnName
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



// ulozi nazov vytvoreneho TrainingTermu pre pouzitie v dalsom teste (dalsich files ked mu dodame data co preslo a co nie, si usetrime
// podmienky zbytocne navyse)



  
Cypress.Commands.add('loginStudent', (username, password) => {
  cy.visit('/');
  cy.get('[class="btn btn-navigate btn-block"]', { timeout: 20000 }).should('be.visible');
  cy.get('[class="btn btn-navigate btn-block"]').eq(1).click();
  cy.get('[type="submit"]').should('be.visible');
  cy.get('[name="userName"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('[type="submit"]').click();
  
});



Cypress.Commands.add('loginAdmin', (username, password) => {
  cy.visit('/');
  cy.get('[class="btn btn-navigate btn-block"]', { timeout: 20000 }).should('be.visible');
  cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
  cy.get('[type="submit"]').should('be.visible');
  cy.get('[name="userName"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('[type="submit"]').click();
  
});





Cypress.Commands.add('getCurrentTime', () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;
  return currentTime;
});




Cypress.Commands.add('getCurrentDate', () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = now.getFullYear();
  const currentDate = `${day}.${month}.${year}`;
  return currentDate;
});

