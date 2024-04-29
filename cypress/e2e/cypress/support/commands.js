Cypress.Commands.add('loginAdmin', (username, password) => {
    cy.session([username, password], () => {
      cy.visit('/');
      cy.get('[class="btn btn-navigate btn-block"]', { timeout: 20000 }).should('be.visible');
      cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
      cy.get('[type="submit"]').should('be.visible');
      cy.get('[name="userName"]').type(username);
      cy.get('[name="password"]').type(password);
      cy.get('[type="submit"]').click();
      cy.viewport(1920, 937);
    });
  });