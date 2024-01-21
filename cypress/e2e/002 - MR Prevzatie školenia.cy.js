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
      cy.wait(5000)
      cy.get('.form-inline > :nth-child(1) > .form-control').clear().type('PO CY')
      cy.get('.page-filter-buttons > .btn-primary').click()
      cy.wait(2000)
      cy.contains('PO CY').click()
      cy.get('[type="submit"]').click()
      cy.get('.toast').contains('OK!').should('be.visible')    
      cy.timeout(100000)
      cy.contains('Prevziať').click()
   
     
    })
  })