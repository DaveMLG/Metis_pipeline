describe('Product owner', function() {

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
    
    it('Vytvorenie nového školeniaa', function() {
    
    cy.viewport(1920, 937)
    cy.get('.language-icon').eq(1).click({force: true})
   
    
    
   

})
}) 

