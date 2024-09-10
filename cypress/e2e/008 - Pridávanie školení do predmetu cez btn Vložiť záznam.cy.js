describe('Product owner', function() {
    before(() => {
      cy.loginAdmin(Cypress.env('loginGO'), Cypress.env('password'));
      cy.viewport(1920, 937)
      cy.visit(Cypress.env('websiteUrl'))

    })

      it('Pridávanie školení do predmetu cez btn Vložiť záznam', function() {
        cy.wait(500)
        cy.get('.icon-menu-ttt').click()
        cy.get('[href="/admin/elearning/subject"]').click()
        
        cy.get('.table-cell-data').each(($cell) => {
          const cellText = $cell.text();
        
          if (cellText.includes("PO predmet AAA")) {
            cy.wrap($cell).click();
            return false; 
          } else if (cellText.includes("PO predmet BBB")) {
            cy.wrap($cell).click();
            return false; 
          }
        });    
        
        cy.wait(2000)
        cy.get('.nav-link').contains('Obsah').click()      
        cy.wait(2000)

        cy.get('.table-cell-data').each(($cell) => {
          const cellText = $cell.text();
        
          if (cellText.includes("G školenie AAA")) {
            cy.get('[type="checkbox"]', { withinSubject: $cell.closest('tr') }).first().check({ force: true });
            return false;
          } else if (cellText.includes("G školenie BBB")) {
            cy.get('[type="checkbox"]', { withinSubject: $cell.closest('tr') }).first().check({ force: true });
            return false;
          } else if (cellText.includes("G školenie CCC")) {
            cy.get('[type="checkbox"]', { withinSubject: $cell.closest('tr') }).first().check({ force: true });
            return false;
          }
        });
        
             
        cy.contains('Vložiť záznam').click()

        //doplnit not happy path situacie

        //Vyplní prvý zoznam školení
        cy.get('tbody > :nth-child(1) > :nth-child(4) > .form-control').select('Online')
        cy.get(':nth-child(1) > :nth-child(5) > .form-control').select('Denná')
        cy.get(':nth-child(1) > :nth-child(6) > .form-control').select('Moderované')
        
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').should('contain.text','OK!')
        

    })
})