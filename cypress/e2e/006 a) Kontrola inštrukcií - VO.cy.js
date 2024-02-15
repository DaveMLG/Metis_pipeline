describe('Product owner', function () {
  before(() => {
    cy.visit('https://dev.metis.academy/admin');
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type('skorg1.vo');
    cy.get('[name="password"]').type('ML_heslo1');
    cy.get('[type="submit"]').click();
  });

   //Polia pre dáta
   let 
   DataValues = [],
    jsonData = {}

  it('Vytvorenie nového školenia', function () {
    cy.viewport(1920, 937);
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.wait(3000)
    cy.get('[type = "text"]').first().clear().type("PO CY_edit");
    cy.get('[type="submit"]').click();
    cy.contains('PO CY_edit').click();
    cy.wait(3000);
    cy.get(':nth-child(6) > .nav-link').click();
    cy.wait(3000);

    cy.get('table').find('td:not(:last-child)').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('text').then((dataVals) => {
          DataValues.push({genericVals: dataVals})
        })
      }
    })
    cy.wait(1000).then(() => {
      jsonData['Values'] = DataValues;
      cy.writeFile('cypress/fixtures/instructions.json', JSON.stringify(jsonData, null, 2))
    })
  })
})