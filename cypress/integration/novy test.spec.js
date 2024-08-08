describe('Student', function() {

    before(() => {
    
    cy.visit('https://dev.metis.academy/admin')
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible')
    cy.get('[class="btn btn-navigate btn-block"]').eq(1).click()
    cy.get('[type="submit"]').should('be.visible')
    cy.get('[type="submit"]').should('be.visible')
    cy.get('[name="userName"]').type('skorg1.student1')
    cy.get('[name="password"]').type('ML_heslo1')
    cy.get('[type="submit"]').click()
    
    })
    
    it('Order uloh PM', function() {
    
    cy.viewport(1920, 937)
    cy.get('.icom').click()    
    cy.contains('Moje predmety').click()
    cy.wait(5000)
    cy.get('[title="Dočasný predmet"]').parent().parent().find('.col-sm-2').click()
    cy.wait(2000)
    cy.get('.icon').find('[title="Hodnotenie"]').click()


    //Hodnotenie nad 65%
    cy.get('.icon').find('[title="Hodnotenie nad 65%"]').click();

    cy.get('.ulohy').then(($kontrola1) => {
        if ($kontrola1.find('dashboard-exercise-list-item').length > 0) {
          cy.get('.btn.btn-hover').contains(/Výsledky/).each(($button) => {
            expect($button).to.have.class('green-bck');
          });
        } else {
          cy.log('Skipping code block as no exercises were found');
        }
      });
      

      
    //Hodnotenie medzi 50% a 65%
    cy.get('.icon').find('[title="Hodnotenie nad 65%"]').click();
    cy.get('.icon').find('[title="Hodnotenie medzi 50% a 65%"]').click();
    cy.get('.ulohy').then(($kontrola1) => {
        if ($kontrola1.find('dashboard-exercise-list-item').length > 0) {
          cy.get('.btn.btn-hover').contains(/Výsledky/).each(($button) => {
            expect($button).to.have.class('orange-bck');
          });
        } else {
          cy.log('Skipping code block as no exercises were found');
        }
      });


    //Hodnotenie pod 50%
    cy.get('.icon').find('[title="Hodnotenie medzi 50% a 65%"]').click();
    cy.get('.icon').find('[title="Hodnotenie pod 50%"]').click();
    cy.get('.ulohy').then(($kontrola1) => {
        if ($kontrola1.find('dashboard-exercise-list-item').length > 0) {
          cy.get('.btn.btn-hover').contains(/Výsledky/).each(($button) => {
            expect($button).to.have.class('red-bck');
          });
        } else {
          cy.log('Skipping code block as no exercises were found');
        }
      });

})
}) 

