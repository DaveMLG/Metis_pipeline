describe('Product owner', function () {
  before(() => {
    cy.visit(Cypress.env('websiteUrl'))
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type(Cypress.env('loginGO'));
    cy.get('[name="password"]').type(Cypress.env('password'));
    cy.get('[type="submit"]').click();
  });

  it('Odporúčenie šablón lekcie pre garanta', function () {
    // Uloží data z popisu
    let DataValues = [];
    let jsonData = {};

   
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.wait(3000)
    cy.get('[type = "text"]').first().clear().type("Testovanie VO a všetkého okolo toho");
    cy.get('[type="submit"]').click().wait(3000)
    cy.get('tbody').contains('Neprevzaté').parent().parent().contains('Testovanie VO a všetkého okolo toho').click().wait(2000)
    cy.wait(3000);
    cy.get(':nth-child(5) > .nav-link').click();
    cy.wait(3000);
    cy.get('el-lessons-summary').find('tr').find('td').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('text').then((values) => {
          DataValues.push({ summaryValues: values });
        });
      }
    });

    cy.get('el-lessons-table').find('.vert-align').find('span:not(:has(a))').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('text').then((values) => {
          DataValues.push({ genericVals: values });
        });
      }
    });

    cy.get('el-lessons-table').find('[type="number"]').then((value) => {
      let val = value.length;
      for (let x = 0; x < val; x++) {
        cy.wrap(value[x]).invoke('val').then((values) => {
          DataValues.push({ orderCount: values });
        });
      }
    });

    cy.get('[class="af-table table table-hover table-bordered table-striped"]').find('select').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('val').then((originalValue) => {
          let renamedValue;
          switch (originalValue) {
            case '100':
              renamedValue = 'Nízka';
              break;
            case '300':
              renamedValue = 'Stredná';
              break;
            case '500':
              renamedValue = 'Vysoká';
              break;
            default:
              renamedValue = originalValue;
          }
    
          if (renamedValue !== "0: null" && renamedValue !== null) {
            DataValues.push({ selectVals: renamedValue });
          }
        });
      }
    });
    
    

    cy.wait(1000).then(() => {
      jsonData['Values'] = DataValues;
      cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2));
    });
  });
});
