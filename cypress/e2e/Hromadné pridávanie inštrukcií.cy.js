describe('Product owner', function() {
  beforeEach(() => {
    cy.visit('https://dev.metis.academy/admin');
    cy.viewport(1920, 937);
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type('skorg1.go');
    cy.get('[name="password"]').type('ML_heslo1');
    cy.get('[type="submit"]').click();
  });

  it('Hromadne pridá inštrukcie', function() {
    function clickRadioButtonInsertText() {
      const radioOptions = ['Lektora', 'Opravovač', 'Študenta']; 
      radioOptions.forEach((option) => {
        cy.get('[type="submit"]').click()
        cy.get(':nth-child(1) > .form-control').select(option);
        cy.get('.page-filter-buttons > .btn-primary').click();
        cy.wait(2000);
        cy.get('.col-12 > :nth-child(1)').click(); 
        cy.get('.note-editable').as('editable');
        cy.get('@editable').clear().type(option);
        cy.wait(2000) 
        cy.get('.btn-insert').click(); 
        cy.wait(2000); 
      });
    }

    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click(); 
    cy.get('[href="/admin/elearning/training"]').click();
    cy.get('[placeholder="Kľúčové slovo"]').type("CY testing");
    cy.get('[type="submit"]').click();
    cy.contains('CY testing').click();
    cy.get('.nav-link').contains('Inštrukcie').click();

    clickRadioButtonInsertText();
  });

  it('Hromadne edituje inštrukcie', function() {
    function clickRadioButtonInsertText() {
      const radioOptions = ['Lektora', 'Opravovač', 'Študenta']; 
      radioOptions.forEach((option) => {
        cy.get('[type="submit"]').click()
        cy.get(':nth-child(1) > .form-control').select(option);
        cy.get('.page-filter-buttons > .btn-primary').click();
        cy.wait(2000);
        cy.get('.col-12 > :nth-child(1)').click(); 
        cy.get('.note-editable').as('editable');
        cy.get('@editable').clear().type(option);
        cy.wait(2000) 
        cy.get('.btn-insert').click(); 
        cy.wait(2000); 
      });
    }
    
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.get('[placeholder="Kľúčové slovo"]').type("CY testing");
    cy.get('[type="submit"]').click();
    cy.contains('CY testing').click();
    cy.get('.nav-link').contains('Inštrukcie').click();
 
    clickRadioButtonInsertText();
  });

  it('Hromadne zmaže inštrukcie', function() {
    function selectOperator() {
      const radioOptions = ['Lektora', 'Opravovač', 'Študenta'];
      radioOptions.forEach((option, index) => {
        cy.get(':nth-child(1) > .form-control').select(option); 
        cy.get('.page-filter-buttons > .btn-primary').click(); 
        cy.wait(2000); 
        cy.get('.btn-delete').click(); 
        cy.get('.popover-content > div > .btn-danger').click(); 
      });
    }

    cy.viewport(1920, 937);
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click(); 
    cy.get('[href="/admin/elearning/training"]').click();
    cy.get('[placeholder="Kľúčové slovo"]').type("CY testing");
    cy.get('[type="submit"]').click();
    cy.contains('CY testing').click();
    cy.get('.nav-link').contains('Inštrukcie').click();

    selectOperator();
  });
});
