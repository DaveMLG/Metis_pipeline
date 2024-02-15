describe('Product owner', function () {
  before(() => {
    cy.visit('https://dev.metis.academy/admin');
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type('skorg1.svo');
    cy.get('[name="password"]').type('ML_heslo1');
    cy.get('[type="submit"]').click();
  });

   //Polia pre dáta
   let 
   DataValues = [],
    jsonData = {}

  it('SPO odporúčanie šablóny', function () {
    cy.viewport(1920, 937);
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(5) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/lesson-template"]').click()
    cy.wait(5000)
    cy.get('[type = "text"]').first().clear().type('pretestovanie')
    cy.get('[type="submit"]').click()
    cy.wait(3000)
    cy.get('tbody').find('tr').first().find('a').click()

    cy.get('[type = "radio"]').should('have.class', 'radio-button-active').invoke('val').then((value) => {
      DataValues.push({educationType: value})
    })

    cy.get('.row').eq(1).find('[type = "checkbox"]:checked').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('val').then((valData) => {
          DataValues.push({possibleTasks: valData})
        })
      }
    })

    cy.get('.row').eq(2).find('[type = "checkbox"]:checked').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('val').then((valData) => {
          DataValues.push({trainingType: valData})
        })
    }})
    
    cy.get('[id="Title"]').invoke('val').then((value) => {
      DataValues.push({titleName: value})
    })
   
    cy.get('[class="tableFloatingHeaderOriginal"]').next().next().first().find('td').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('text').then((valData) => {
          DataValues.push({summary: valData})
        })
      }
    })
    cy.get('[class="tableFloatingHeaderOriginal"]').next().next().last().find('input').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('val').then((valData) => {
          const cleanedValData = valData.replace(/^0/, '')
          DataValues.push({templates: cleanedValData})
        })
      }
    })
    cy.get('[class="tableFloatingHeaderOriginal"]').next().next().last().find('td:nth-child(5), td:nth-child(7)').find('select').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('val').then((valFilter) => {
            DataValues.push({selectVals: valFilter });
        })
      }
    })
    cy.get('[class="tableFloatingHeaderOriginal"]').next().next().last().find('td:nth-child(6)').find('span').then((value) => {
      for (let x = 0; x < value.length; x++) {
        cy.wrap(value[x]).invoke('text').then((valData) => {
          DataValues.push({templateGeneric: valData })
        })
      }
    })

    cy.get('[onclick="history.back()"]').first().click()
    cy.wait(1000)
    cy.contains('Šablóna na pretestovanie úloh').parentsUntil('tr').parent().find('td:last-child').find('[type="checkbox"]').as('chckbx')
    //cy.get('@chckbx').check({force: true})
    cy.get('@chckbx').should('be.checked')

  })

  it('PO odporúčenie šablóny GO', function(){
    cy.visit('https://dev.metis.academy/admin');
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type('skorg1.vo');
    cy.get('[name="password"]').type('ML_heslo1');
    cy.get('[type="submit"]').click();

    cy.viewport(1920, 937);
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.wait(5000)
    cy.get('[type = "text"]').first().type("PO CY_edit");
    cy.get('[type="submit"]').click();
    cy.contains('PO CY_edit').click();
    cy.wait(3000);
    cy.get(':nth-child(4) > .nav-link').click();
    cy.wait(3000);

    cy.get('[type = "text"]').first().clear().type('Šablóna na pretestovanie úloh')
    cy.get('[type="submit"]').click()

    //cy.get('[type="checkbox"]').first().check({force: true})
    cy.get('[type="checkbox"]').should('be.checked')
  })

  it('GO prijatie šablóny a generovanie úloh', function(){

    cy.visit('https://dev.metis.academy/admin');
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type('skorg1.go');
    cy.get('[name="password"]').type('ML_heslo1');
    cy.get('[type="submit"]').click();

    cy.viewport(1920, 937);
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.wait(5000)
    cy.get('[type = "text"]').first().type("PO CY_edit");
    cy.get('[type="submit"]').click();
    cy.contains('PO CY_edit').click();
    cy.wait(3000);
    cy.get(':nth-child(4) > .nav-link').click();
    cy.wait(3000);
    
    cy.get('[type = "text"]').first().clear().type('Šablóna na pretestovanie úloh')
    cy.get('[type="submit"]').click()

    cy.get('[type="checkbox"]').first().check({force: true})
    cy.get('[type="checkbox"]').should('be.checked')
    cy.wait(1000)
    cy.get(':nth-child(5) > .nav-link').click();

    cy.get('[name="selectLessonTemplate"]').select('Šablóna na pretestovanie úloh')
    cy.get('[name="selectTheme"]').select(1)
    cy.get('[name="selectLesson"]').select(2)

    cy.get('[name="editForm"]').find('[type="button"]').contains('Gener').click()
    cy.wait(5000)
    cy.get('[class="btn btn-update btn-primary"]').last().click()

    cy.wait(1000).then(() => {
      jsonData['Values'] = DataValues;
      cy.writeFile('cypress/fixtures/templates_spo_po_go.json', JSON.stringify(jsonData, null, 2))
    })
  })
 })
