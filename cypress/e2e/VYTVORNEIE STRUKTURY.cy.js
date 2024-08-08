describe.skip('Garant obsahu', function() {
    beforeEach(() => {
      cy.loginAdmin('cy.k', 'ML_heslo1');
      cy.viewport(1920, 937)
      cy.visit('https://dev.metis.academy/admin')

      })

      const formatDate = (date) =>
        new Date(date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'numeric',
          year: 'numeric'
        }).split('/').join('.');
      
      const today = formatDate(Date.now());
      const tomorrow = formatDate(Date.now() + 86400000);
      

    it('Termín štúdia ZZZ', function() {
        cy.wait(500)
        cy.get('.icon-menu-ttt').click()
        cy.get('[href="/admin/elearning/study"]').click()
        cy.wait(500)
        cy.get('.table-cell-data').contains('PO štúdium ZZZ').click()
             
        cy.get('.green').contains('Vytvoriť termín').click()


        
        cy.get('.mat-datepicker-input').eq(0).clear().type(`${today}`);
        cy.wait(500);
        cy.get('.mat-datepicker-input').eq(1).clear().type(`${tomorrow}`);
        cy.wait(500);

        cy.get('[type="submit"]').click()
        cy.get('.toast', { timeout: 15000 }).contains('OK!').should('be.visible')   
        cy.url({ timeout: 10000 }).should('match', /https:\/\/dev\.metis\.academy\/admin\/training-term\/study-term\/\d+/);

    

    })



    it('Termín semestra ZZZ', function() {
        cy.get('.icon-menu-training-terms-top-menu').click()
        cy.get('[href="/admin/training-term/study-term"]').click()
        cy.wait(1000)
        cy.contains('ZZZ').click();
    
        cy.get('.green').contains('Vytvoriť termín').eq(0).click()

    
        cy.get('.mat-datepicker-input').eq(0).clear().type(`${today}`);
        cy.wait(500);
        cy.get('.mat-datepicker-input').eq(1).clear().type(`${tomorrow}`);
        cy.wait(500);

        cy.get('[type="submit"]').click()
        cy.get('.toast', { timeout: 15000 }).contains('OK!').should('be.visible')   
        cy.url({ timeout: 10000 }).should('match', /https:\/\/dev\.metis\.academy\/admin\/training-term\/semester-term\/\d+/);
  

    })


    it('Termín predmetu WWW', function() {
        cy.get('.green').contains('Vytvoriť termín').click()
        cy.get('[type="submit"]').click()
        cy.get('.toast', { timeout: 15000 }).contains('OK!').should('be.visible')   
        cy.url({ timeout: 10000 }).should('match', /https:\/\/dev\.metis\.academy\/admin\/training-term\/semester-term\/\d+/);
  

    })


    it('Termín školenia WWW', function() {
        cy.get('.green').contains('Vytvoriť termín').click()
        cy.get('.btn').contains('Áno').click()
   
        cy.get('.mat-datepicker-input').eq(0).clear().type(`${today}`);
        cy.wait(500);
        cy.get('.mat-datepicker-input').eq(1).clear().type(`${today}`);
        cy.wait(500);

        cy.get('#Capacity').clear().type('10')
        cy.get('[name="selectedLecturer"]').select('l, cy').next().click()

        cy.get('[name="selectedAdmin"]').select('av, cy').next().click()

        cy.get('[name="selectedEditor"]').select('et, cy').next().click()

        cy.get('[name="selectCorrector"]').select('co, cy').next().click()
        cy.get('[type="submit"]').click()
        cy.wait(2000)
        cy.get('.toast', { timeout: 15000 }).contains('OK!').should('be.visible')   
        cy.url({ timeout: 10000 }).should('match', /https:\/\/dev\.metis\.academy\/admin\/training-term\/training-term\/\d+/);

        //pridanie studentov
        cy.get('.nav-link').contains('Študenti').click() 
        cy.wait(1000)
        cy.contains('Pridať študenta').next().find('.form-control').type('student1')
        cy.contains('student1, cy').click()
        cy.contains('Pridať študenta').parent().find('.btn').contains('Pridať').click()
        cy.get('.toast').contains('OK!').should('be.visible')    
    
        cy.contains('Pridať študenta').next().find('.form-control').type('student1')
        cy.contains('student2, cy').click()
        cy.contains('Pridať študenta').parent().find('.btn').contains('Pridať').click()
        cy.get('.toast').contains('OK!').should('be.visible')    

        //nastavenie uloh na dnes
        cy.get('.btn:contains("Teraz")').each(($el) => {
            cy.wrap($el).click();
          });
    
        cy.get('[type="submit"]').last().click()
        cy.get('.toast', { timeout: 40000 }).contains('OK!').should('be.visible') 
      

    })


    
})