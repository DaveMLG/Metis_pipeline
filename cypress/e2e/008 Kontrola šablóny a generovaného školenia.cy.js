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

  it('SPO odporúčanie šablóny', function () {

    cy.readFile('cypress/fixtures/templates_spo_po_go.json', 'utf-8').then((jsonData) => {
      const valuesArray = jsonData.Values;

      const summary = [];
      for (let x = 0; x < valuesArray.length; x++) {
        summary.push(valuesArray[x].summary);
      }
      const summaryFiltered = summary.filter(item => item !== undefined);

      const templates = [];
      for (let x = 0; x < valuesArray.length; x++) {
        templates.push(valuesArray[x].templates);
      }
      const templatesFiltered = templates.filter(item => item !== undefined);

      const selectVals = [];
      for (let x = 0; x < valuesArray.length; x++) {
        selectVals.push(valuesArray[x].selectVals);
      }
      const selectValsFiltered = selectVals.filter(item => item !== undefined);

      const templateGeneric = [];
      for (let x = 0; x < valuesArray.length; x++) {
        templateGeneric.push(valuesArray[x].templateGeneric);
      }
      const templateGenericFiltered = templateGeneric.filter(item => item !== undefined);
      console.log(templateGenericFiltered)
    

    cy.viewport(1920, 937);
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click()
    cy.wait(5000)
    cy.get('[type = "text"]').first().clear().type('PO CY_edit')
    cy.get('[type="submit"]').click()
    cy.wait(3000)
    cy.get('tbody').find('tr').first().find('a').click()
    cy.get(':nth-child(5) > .nav-link').click(); 

    cy.get('[class="tableFloatingHeaderOriginal"]').eq(1).next().next().first().find('td').filter(':nth-child(1), :nth-child(4), :nth-child(5), :nth-child(6)').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('text').then((valData) => {
          cy.wrap(valData).should('eq', summaryFiltered[x]) 
        })
      }

      cy.get('[class="tableFloatingHeaderOriginal"]').next().next().last().find('td:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3)):not(:nth-child(4)):not(:nth-child(5)):not(:nth-child(6)):not(:nth-child(8)):not(:nth-child(9)):not(:nth-child(12)):not(:nth-child(13)):not(:nth-child(14)):not(:nth-child(15)):not(:nth-child(16))').find('input').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('val').then((valData) => {
            cy.wrap(valData).should('eq', templatesFiltered[x]) 
          })
        }
      })

      /*cy.get('[class="tableFloatingHeaderOriginal"]').next().next().last().find('td:not(:nth-child(14))').find('select').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('val').then((valData) => {
            cy.wrap(valData).should('eq', selectValsFiltered[x]) 
          })
        }
      })*/
      cy.get('[class="tableFloatingHeaderOriginal"]').next().next().last().find('td:nth-child(8)').find('span').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('text').then((valData) => {
            cy.wrap(valData).should('eq', templateGenericFiltered[x]) 
          })
        }
      })
    })
  })
})
})