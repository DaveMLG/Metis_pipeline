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

  it('Vytvorenie nového školenia', function () {
    cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {
      const valuesArray = jsonData.Values;

      const genericValsData = [];
      for (let x = 0; x < valuesArray.length; x++) {
        genericValsData.push(valuesArray[x].genericVals);
      }
      const genericValsDataFiltered = genericValsData.filter(item => item !== undefined);

      const summaryValData = [];
      for (let x = 0; x < valuesArray.length; x++) {
        summaryValData.push(valuesArray[x].summaryVal);
      }

      const orderCountData = [];
      for (let x = 0; x < valuesArray.length; x++) {
        orderCountData.push(valuesArray[x].orderCount);
      }
      const orderCountFiltered = orderCountData.filter(item => item !== undefined);

      const selectValsData = [];
      for (let x = 0; x < valuesArray.length; x++) {
        selectValsData.push(valuesArray[x].selectVals);
      }
      const selectValsDataFiltered = selectValsData.filter(item => item !== undefined);

      cy.viewport(1920, 937);
      cy.get('.icon-menu-elearning').click();
      cy.get('[href="/admin/elearning/training"]').click();
      cy.wait(3000)
      cy.get('[type = "text"]').first().clear().type('G školenie AAA')
      cy.get('[type="submit"]').first().click();
      cy.wait(5000);
      //cy.sortTableByColumn('Vytvorené');
      cy.get('tbody').contains('Neprevzaté').parent().parent().contains('G školenie AAA').click().wait(2000)
      cy.get(':nth-child(5) > .nav-link').click();

      cy.get('el-lessons-summary').find('tr').find('td').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('text').then((values) => {
            const cleanedValues = values.replace(/&nbsp;/g, ' ').trim();
            cy.wrap(cleanedValues).should('eq', jsonData.Values[x].summaryValues.trim());
          });
        }
      })

      cy.get('el-lessons-table').find('.vert-align:not(:nth-child(8)):not(:nth-child(10)):not(:nth-child(11)):not(:nth-child(12)):not(:nth-child(14)):not(:nth-child(15)):not(:nth-child(16))').find('span:not(:has(a))').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('text').then((values) => {
            cy.wrap(values).should('eq', genericValsDataFiltered[x]);
          });
        }
      });
      cy.get('el-lessons-table').find('.vert-align:nth-child(8)').find('span:not(:has(a))').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('text').then((values) => {
            cy.wrap(values).should('eq', orderCountFiltered[x]);
          });
        }
      });
      cy.get('el-lessons-table').find('.vert-align:nth-child(10)').find('span:not(:has(a))').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('text').then((values) => {
            cy.wrap(values).should('eq', selectValsDataFiltered[x]);
          });
        }
      })
    });
  });
});


