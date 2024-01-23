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
    it('Vytvorenie témy a lekcie', function() {
        cy.viewport(1920, 937)
        cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia')
        cy.get('@nastavenia').click() 
        cy.get('[href="/admin/elearning/training"]').click()
        cy.get('[placeholder="Kľúčové slovo"]').type("PO CY")
        cy.get('[type="submit"]').click()
        cy.contains('PO CY').click()
        cy.wait(3000)
        cy.get(':nth-child(2) > .nav-link').click()
        cy.get('.fa').click()
        //Nevypíše lekciu a skontroluje, či vyhodí error
        cy.get('tbody').find('.form-control').first().clear().type('Téma')
        //cy.get('tbody').find('.form-control').last().clear().type('Lekcia')
        cy.get('[type="submit"]').click()
        cy.get('.toast').should('contain.text','Názov lekcie je povinný údaj')

        //Nevypíše tému a skontroluje, či vyhodí error
        cy.get('tbody').find('.form-control').first().clear()
        cy.get('tbody').find('.form-control').last().clear().type('Lekcia')
        cy.get('[type="submit"]').click()
        cy.get('.toast').should('contain.text','Názov témy je povinný údaj')

        //Vypíše všetky potrebné inputy a skontroluje, či vyhodí OK
        cy.get('tbody').find('.form-control').first().clear().type('Téma')
        cy.get('tbody').find('.form-control').last().clear().type('Lekcia')
        cy.get('#FinalLessonCount').clear().type(10)
        cy.get('[type="submit"]').click()
        cy.get('.toast').should('contain.text','OK!')

    })
})