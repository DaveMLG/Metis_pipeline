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
  
    it('GO pridanie úlohy', function () {
      // Uloží data z popisu

      cy.viewport(1920, 937);
      cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
      cy.get('@nastavenia').click();
      cy.get('[href="/admin/elearning/training"]').click();
      cy.wait(3000)
      cy.get('[type = "text"]').first().clear().type("CY testing");
      cy.get('[type="submit"]').click();
      cy.contains('CY testing').click();
      cy.wait(3000);
      cy.get(':nth-child(5) > .nav-link').click();
      cy.wait(3000);
      cy.get('[type="radio"]').eq(1).check({force: true})
      cy.get('[name="selectTheme"]').select(1)
      cy.get('[name="selectLesson"]').select(1)
      cy.get('[type="button"]').contains('Vložiť záznam').click()
      cy.contains('Šablóna lekcie').next().find('select').first().select(1)
      cy.contains('Šablóna lekcie').next().find('select').eq(1).select(1)
      cy.contains('Generovať úlohy').click()
      cy.contains('Zoznam úloh').next().find('input').first().clear().type('TaskToDelete')
      cy.contains('Uložiť').click()
    })

    it('VO overenie neželaného pridania', function () {
        
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
      cy.wait(3000)
      cy.get('[type = "text"]').first().clear().type("CY testing");
      cy.get('[type="submit"]').click();
      cy.get('tbody').contains('Prevzaté').parent().parent().contains('CY testing').click()
      cy.wait(3000);
      cy.get(':nth-child(5) > .nav-link').click();
      cy.wait(3000);
      cy.contains('Zoznam úloh').next().find('a').then((value) => {
        cy.wrap(value).should('not.contain', 'TaskToDelete')
      })
      });
    })