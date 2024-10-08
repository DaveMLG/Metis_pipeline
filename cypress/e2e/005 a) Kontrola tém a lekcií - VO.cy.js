describe('Product owner', function () {
  before(() => {
    cy.visit(Cypress.env('websiteUrl'))
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type(Cypress.env('loginVO'));
    cy.get('[name="password"]').type(Cypress.env('password'));
    cy.get('[type="submit"]').click();
  });

   //Polia pre dáta
   let 
   DataValues = [],
    jsonData = {}

  it('Vytvorenie nového školenia', function () {
    
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.wait(3000)
    cy.get('[type = "text"]').first().clear().type("G školenie AAA");
    cy.get('[type="submit"]').click();
    cy.get('tbody').contains('Neprevzaté').parent().parent().contains('G školenie AAA').click().wait(2000)
    cy.wait(3000);
    cy.get(':nth-child(2) > .nav-link').click();
    cy.wait(3000);
    cy.get('[name="editTrainingForm"]').find('input').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value).eq(x).invoke('val').then((dataVals) => {
          DataValues.push({TaL: dataVals})
        })
      }
    })
    cy.get('[name="editTrainingForm"]').find('tr').find('td:not(:last-child):not(:first-child):not(.tableInnerCell):not([type="number"])').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value).eq(x).invoke('text').then((dataVals) => {
          DataValues.push({tableVals: dataVals}) 
        })
      }
      cy.wait(1000).then(() => {
        jsonData['Values'] = DataValues;
        cy.writeFile('cypress/fixtures/vo_ThemesAndLectures.json', JSON.stringify(jsonData, null, 2))
      })
    })
    })
  })
    
