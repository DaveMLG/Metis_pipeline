describe('Product owner', function() {
    beforeEach(() => {
      cy.visit('https://dev.metis.academy/admin');
      cy.viewport(1920, 937);
      cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
      cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
      cy.get('[type="submit"]').should('be.visible');
      cy.get('[name="userName"]').type('skorg1.k');
      cy.get('[name="password"]').type('ML_heslo1');
      cy.get('[type="submit"]').click();
    });
  
    it('Vytvorenie termínu predmetu s jedným školením', function() {

    })
})