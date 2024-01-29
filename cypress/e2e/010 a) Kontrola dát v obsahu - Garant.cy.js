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

  it('Odporúčenie šablón lekcie pre garanta', function () {
    // Uloží data z popisu
    let DataValues = [];
    let jsonData = {};

    cy.viewport(1920, 937);
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.get('[placeholder="Kľúčové slovo"]').type("PO CY_edit");
    cy.get('[type="submit"]').click();
    cy.contains('PO CY_edit').click();
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

    cy.get('[class="table table-hover table-bordered table-striped"]').find('select').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('val').then((values) => {
          DataValues.push({ selectVals: values });
        });
      }
    });

    cy.wait(1000).then(() => {
      jsonData['Values'] = DataValues;
      cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2));
    });
  });
});
