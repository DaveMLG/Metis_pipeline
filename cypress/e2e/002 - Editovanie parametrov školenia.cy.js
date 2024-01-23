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
    it('Editovanie parametrov školenia', function() {
        cy.viewport(1920, 937)
        cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia')
        cy.get('@nastavenia').click() 
        cy.get('[href="/admin/elearning/training"]').click()
        cy.get('tbody').find('a').contains('PO CY').click()
        cy.wait(3000)
        cy.contains('PO CY').click()
        cy.wait(3000)
        //Zmení názov školenia a jeho názov na portáli, skontroluje či vyhodí OK
        cy.get('#Title').clear().type('PO CY_edit')
        cy.get('#PortalTitle').clear().type('PO CY_edit')
        cy.get('[type="submit"]').click()
        cy.get('.toast').should('contain.text','OK!')
        cy.wait(5000)

        //Zmení názov na pôvodný, skontroluje či vyhodí OK
        cy.get('#Title').clear().type('PO CY')
        cy.get('#PortalTitle').clear().type('PO CY')
        cy.get('[type="submit"]').click()
        cy.get('.toast').should('contain.text','OK!')
    })

})