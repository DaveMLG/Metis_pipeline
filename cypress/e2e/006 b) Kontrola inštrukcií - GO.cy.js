describe('Product owner', function () {
  before(() => {
    cy.visit('https://dev.metis.academy/admin');
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type('skorg1.go');
    cy.get('[name="password"]').type('ML_heslo1');
    cy.get('[type="submit"]').click();
  });
  it('Vytvorenie nového školenia', function () {
    cy.readFile('cypress/fixtures/instructions.json', 'utf-8').then((jsonData) => {
      const valuesArray = jsonData.Values;

      const instructions = [];
      for (let x = 0; x < valuesArray.length; x++) {
        instructions.push(valuesArray[x].genericVals);
      }
      console.log(instructions)
    cy.viewport(1920, 937);
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.get('[placeholder="Kľúčové slovo"]').type("PO CY_edit");
    cy.get('[type="submit"]').click();
    cy.contains('PO CY_edit').click();
    cy.wait(3000);
    cy.get(':nth-child(6) > .nav-link').click();
    cy.wait(3000);
    cy.get('table').find('td:not(:last-child)').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('text').then((dataVals) => {
          cy.wrap(dataVals).should('eq', instructions[x]) 
        })
      }
    })
  })
})
})
 

