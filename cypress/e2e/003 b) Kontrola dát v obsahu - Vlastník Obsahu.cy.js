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
      cy.get('[type = "text"]').first().clear().type('CY testing')
      cy.get('[type="submit"]').first().click();
      cy.wait(5000);
      //cy.sortTableByColumn('Vytvorené');
      cy.get('tbody').contains('Neprevzaté').parent().parent().contains('CY testing').click().wait(2000)
      cy.get(':nth-child(5) > .nav-link').click();

      /*cy.get('el-lessons-summary').find('tr').find('td').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('text').then((values) => {
            const cleanedValues = values.replace(/&nbsp;/g, ' ').trim();
            cy.wrap(cleanedValues).should('eq', jsonData.Values[x].summaryValues.trim());
          });
        }
      });*/

      cy.get('el-lessons-table').find('.vert-align:not(:nth-child(7)):not(:nth-child(9)):not(:nth-child(10)):not(:nth-child(11)):not(:nth-child(12)):not(:nth-child(13)):not(:nth-child(14)):not(:nth-child(15))').find('span:not(:has(a))').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('text').then((values) => {
            cy.wrap(values).should('eq', genericValsDataFiltered[x]);
          });
        }
      });
      cy.get('el-lessons-table').find('.vert-align:nth-child(7)').find('span:not(:has(a))').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('text').then((values) => {
            cy.wrap(values).should('eq', orderCountFiltered[x]);
          });
        }
      });
      cy.get('el-lessons-table').find('.vert-align:nth-child(9)').find('span:not(:has(a))').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('text').then((values) => {
            cy.wrap(values).should('eq', selectValsDataFiltered[x]);
          });
        }
      })
    });
  });
});


