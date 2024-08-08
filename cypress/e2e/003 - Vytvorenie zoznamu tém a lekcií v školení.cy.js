describe('Garant obsahu', function() {
    before(() => {
      cy.loginAdmin('cy.go', 'ML_heslo1');
      cy.viewport(1920, 937)
      cy.visit('https://dev.metis.academy/admin')

      })

      it('Vytvorenie zoznamu tém a lekcií v školení', function() {
        cy.wait(500)
        cy.get('.icon-menu-elearning').click()
        cy.get('[href="/admin/elearning/training"]').click()
        cy.get('.table-cell-data').contains('G školenie AAA').click();
        cy.wait(1000)
        cy.get('.nav-link').contains('Zoznam tém a lekcií').click()
        cy.wait(1000)

        //bez poctu lekcii a bez zaznamu o teme/lekcii
        cy.get('[type="submit"]').click()
        cy.get('.toast').contains('Počet lekcií musí byť väčší ako nula.').should('be.visible')    

        //bez poctu lekcii a s nevyplnenym zaznamom o teme/lekcii
        cy.get('.fa-plus').click()
        cy.get('[type="submit"]').click()
        cy.get('.toast').contains('Počet lekcií musí byť väčší ako nula.').should('be.visible')    
        cy.get('.toast').contains('Názov témy je povinný údaj.').should('be.visible')    
        cy.get('.toast').contains('Názov lekcie je povinný údaj.').should('be.visible')    

        
        //Vypíše tému a lekciu, nastaví hodnotu počtu lekcií na nula a skontroluje, či vyhodí error
        cy.get('tbody').find('.form-control').eq(0).clear().type('Téma')
        cy.get('tbody').find('.form-control').eq(1).clear().type('Lekcia')
        cy.wait(1000)
        cy.get('[type="submit"]').click()
        cy.get('.toast').contains('Počet lekcií musí byť väčší ako nula.').should('be.visible')    
        
        //Nevyplni tému a skontroluje či vyhodí error
        cy.get('#FinalLessonCount').clear().type(1)
        cy.get('tbody').find('.form-control').eq(0).clear()
        cy.get('tbody').find('.form-control').eq(1).clear()
        cy.get('[type="submit"]').click()
        cy.get('.toast').contains('Názov témy je povinný údaj.').should('be.visible')    
        cy.get('.toast').contains('Názov lekcie je povinný údaj.').should('be.visible')    

        //Vyplní všetky polia správne a skontroluje, či vyhodí OK
        cy.get('#FinalLessonCount').clear().type(1)
        cy.get('tbody').find('.form-control').eq(0).clear().type('Téma')
        cy.get('tbody').find('.form-control').eq(1).clear().type('Lekcia')
        cy.wait(2000)
        cy.get('[type="submit"]').click()
        cy.get('.toast').contains('OK!').should('be.visible')    
        

 
    })
})
