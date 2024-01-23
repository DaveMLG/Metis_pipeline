describe('Product owner', function() {
    before(() => {
      cy.visit('https://dev.metis.academy/admin')
        cy.get('[class="btn btn-navigate btn-block"]').should('be.visible')
        cy.get('[class="btn btn-navigate btn-block"]').eq(0).click()
        cy.get('[type="submit"]').should('be.visible')
        cy.get('[type="submit"]').should('be.visible')
        cy.get('[name="userName"]').type('skorg1.vo')
        cy.get('[name="password"]').type('ML_heslo1')
        cy.get('[type="submit"]').click()
      })
    it('Vytvorenie nového školenia', function() {
        cy.viewport(1920, 937)
        cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia')
        cy.get('@nastavenia').click() 
        cy.get('[href="/admin/elearning/training"]').click()
        cy.get('button').contains('Pridať záznam').click()
        cy.get('.form-body').find('[type="radio"]').first().check({force: true})
        cy.get('#Title').type('PO CY')
        cy.get('#PortalTitle').type('PO CY')
        cy.contains('Popis pri prejdení myšou').parentsUntil('.row').find('.note-editable').type('Toto je popis pri prejdení myšou')
        cy.get('[type="radio"]').eq(2).should('have.value', '3')

        //Pokúsi sa vytvoriť školenie bez toho, aby bol garant obsahu vyplnený, jazyk zvolený a bez loga

        cy.get('[type="submit"]').click()
        cy.get('.toast').should('contain.text','Jazyk nie je vyplnený')
        cy.wait(3000)

         //Pokúsi sa vytvoriť školenie bez toho, aby bol garant obsahu vyplnený a bez loga
        cy.get('.form-body').find('[type="radio"]').eq(14).check({force: true})
        cy.get('[type="submit"]').click()
        cy.get('.toast').should('contain.text','Logo je povinný údaj')
        cy.wait(3000)

        //Vyplní všetky potrebné inputy a skontroluje, či vyhodí OK.
        cy.get('input#LogoUrl').attachFile('/obrazky/logo1.png')
        cy.get('[name="selectedGuarantor"]').select('go, skorg1').next().click()
        cy.get('[type="submit"]').click()
    })  
})