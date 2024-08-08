describe('Product owner', function () {
  before(() => {
    cy.visit('https://dev.metis.academy/admin');
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type('cy.go');
    cy.get('[name="password"]').type('ML_heslo1');
    cy.get('[type="submit"]').click();
  });
  it('Vytvorenie nového školenia', function () {
    cy.readFile('cypress/fixtures/vo_ThemesAndLectures.json', 'utf-8').then((jsonData) => {
      const valuesArray = jsonData.Values;

      const TaL = [];
      for (let x = 0; x < valuesArray.length; x++) {
        TaL.push(valuesArray[x].TaL);
      }
      const TaLFiltered = TaL.filter(item => item !== undefined);

      const tableVals = [];
      for (let x = 0; x < valuesArray.length; x++) {
        tableVals.push(valuesArray[x].tableVals);
      }
      const tableValsFiltered = tableVals.filter(item => item !== undefined);

    cy.viewport(1920, 937);
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
          cy.wrap(dataVals).should('eq', TaLFiltered[x]) 
        })
      }
    })

    cy.get('[name="editTrainingForm"]').find('tr').find('td:not(:last-child):not(:first-child):not(.tableInnerCell):not([type="number"])').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value).eq(x).invoke('text').then((dataVals) => {
           cy.wrap(dataVals).should('eq', tableValsFiltered[x]) 
        })
      }
      
      })
    })
    })
  })

