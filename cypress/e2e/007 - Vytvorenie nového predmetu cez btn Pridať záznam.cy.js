describe('Product owner', function() {
    before(() => {
      cy.loginAdmin(Cypress.env('loginGO'), Cypress.env('password'));
      
      cy.visit(Cypress.env('websiteUrl'))

    })
      it('Vytvorenie nového predmetu cez btn Pridať záznam', function() {
        cy.wait(500)
        cy.get('.icon-menu-ttt').click()
        cy.get('[href="/admin/elearning/subject"]').click()
        cy.get('[type="button"]').contains('Pridať záznam').click()

        //Pokúsi sa vytvoriť školenie bez toho, aby bol garant obsahu vyplnený, jazyk zvolený a bez loga
        cy.get('[type="submit"]').click()
        cy.get('.toast').contains('Názov je povinný údaj.').should('be.visible')    
        cy.get('.toast').contains('Názov na portáli je povinný údaj.').should('be.visible')    
        cy.get('.toast').contains('Jazyk nie je vyplnený.').should('be.visible')    
        cy.get('.toast').contains('Popis pri prejdení myšou je povinný údaj.').should('be.visible')    

        //doplnenie udajov a zobrazenie dalsich toast
        //cz0 en1 sk2 eq
        cy.get('#Title').type('PO predmet AAA')
        cy.wait(500)
        cy.get('#PortalTitle').type('PO predmet AAA_PT')
        cy.get('[name^="languageId"]').parent().eq(2).click()
        cy.get('[name="HoverDescription"]').find('.note-editable').type('Toto je popis pri prejdení myšou')
        cy.get('[type="submit"]').click()
        cy.get('.toast').contains('Logo je povinný údaj').should('be.visible', { timeout: 15000 })

        cy.get('input#LogoUrl').attachFile('/obrazky/logo1.png').wait(7000)
        cy.get('[type="submit"]').click()
        cy.get('.toast').contains('Predmet musí mať aspoň jedného koordinátora.').should('be.visible')    

        cy.get('[name = "selectedCoordinator"]').select('k, cy').next().click()
        cy.get('[type="submit"]').click()
        cy.wait(2000)
    }) 
})
