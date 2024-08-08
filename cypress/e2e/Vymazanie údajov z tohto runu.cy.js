/*
describe('Multiple roly', function() {
    before(() => {
      cy.visit('https://dev.metis.academy/admin')
        cy.get('[class="btn btn-navigate btn-block"]').should('be.visible')
        cy.get('[class="btn btn-navigate btn-block"]').eq(0).click()
        cy.get('[type="submit"]').should('be.visible')
        cy.get('[type="submit"]').should('be.visible')
        cy.get('[name="userName"]').type('cy.k')
        cy.get('[name="password"]').type('ML_heslo1')
        cy.get('[type="submit"]').click()
      })
      it('Vymazanie údajov z tohto runu', function() {
        cy.viewport(1920, 937)
        
        //vymazanie studenta z TT
        cy.get('.icon-menu-training-terms-top-menu').click()
        cy.get('[href="/admin/training-term/training-term"]').click()
        cy.wait(1000)
        cy.task('load').then((title) => {
          const trimmedTitle = title.trim()
          cy.get('.table-cell-data').contains(trimmedTitle).click()
        });
    
        cy.get('.nav-link').contains('Študenti').click()      
        cy.get('.btn-danger').click()      
        cy.get('.btn-danger').contains('Vymazať').click()  
        cy.get('.toast').contains('OK!').should('be.visible')  


        //vymazanie TT
        cy.get('.nav-link').contains('Termín').click()  
        cy.get('.btn-delete').contains('Vymazať').click()  
        cy.get('.btn-sm').contains('Vymazať').click()
        cy.url({ timeout: 10000 }).should('match', /https:\/\/dev\.metis\.academy\/admin\/training-term\/subject-term\/\d+/);


        //vymazanie TT
        cy.get('.btn-delete').contains('Vymazať').click()  
        cy.get('.btn-danger').contains('Vymazať').click()  
        cy.url().should('match', /https:\/\/dev\.metis\.academy\/admin\/training-term\/subject-term/);

        
        //odhlasenie sa ako K
        cy.get('.icon-user').first().click()  
        cy.get('.icon-key').click() 


        //prihlasenie sa na VO
        cy.wait(1000)
        cy.get('[name="userName"]').type('cy.vo')
        cy.get('[name="password"]').type('ML_heslo1')
        cy.get('[type="submit"]').click()

        /*
        //doplnit
        //vymazanie vymazanie skolenia z predmetu AAA a predmetu AAA ALEBO vymazanie skolenia z predmetu BBB
        cy.get('.icon-menu-ttt').click()
        cy.get('[href="/admin/elearning/subject"]').first().click()
        cy.get('.table-cell-data').each(($cell) => {
        
          const cellText = $cell.text();
        
          if (cellText.includes("PO predmet AAA")) {
            cy.wrap($cell).click();
            cy.wait(1000)
            cy.get('.nav-link').contains('Obsah').click()      
            cy.get('.btn-danger').click()      
            cy.get('[type="submit"]').last().click()
            cy.wait(1000)   
            cy.get('.toast').contains('OK!').should('be.visible')  

            cy.get('.nav-link').contains('Popis').click()      
            cy.get('.btn-delete').contains('Vymazať').click()    
            cy.get('.popover-auto').should('be.visible')    
            cy.get('.btn-sm').contains('Vymazať').click() 
            cy.wait(1000)   
            cy.url().should('match', /https:\/\/dev\.metis\.academy\/admin\/elearning\/subject/);
            return false; 
          } else if (cellText.includes("PO predmet BBB")) {
            cy.wrap($cell).click();
            cy.get('.nav-link').contains('Obsah').click()      
            cy.get('.btn-danger').click()      
            cy.get('[type="submit"]').last().click()
            cy.wait(1000)   
            cy.get('.toast').contains('OK!').should('be.visible')  
            return false; 
          }
        });    
        

        //dokoncit
        //vymazanie PO skolenia AAA alebo PO skolenia BBB
        cy.get('.icon-menu-elearning').click()
        cy.get('[href="/admin/elearning/training"]').click()
        cy.wait(500)
        cy.contains('label', 'Status').next().select('true');
        cy.get('[type="submit"]').contains('Hľadať').click()
        cy.get('.table-cell-data').each(($cell) => {
        
          const cellText = $cell.text();
        
          if (cellText.includes("G školenie AAA")) {
            cy.wrap($cell).first().click();
            return false; 
          } else if (cellText.includes("G školenie BBB")) {
            cy.wrap($cell).first().click();
            return false; 
          }
        });      
        
        cy.wait(1000)
        cy.get('label[for="ParentTrainingTitle"]').should('contain', 'Garantské školenie').should('be.visible');
        cy.get('.btn-delete').contains('Vymazať').click()    
        cy.get('.popover-auto').should('be.visible')    
        cy.get('.btn-sm').contains('Vymazať').click()    
        cy.wait(1000)   
        cy.url().should('match', /https:\/\/dev\.metis\.academy\/admin\/elearning\/training/);


        //vymazanie GO skolenia AAA
        cy.contains('label', 'Status').next().select('Neprevzaté')
        cy.get('[type="submit"]').contains('Hľadať').click()
        cy.get('.table-cell-data').contains('G školenie AAA').click();
        cy.wait(1000)
        cy.get('.btn').should('contain', 'Prevziať').should('be.visible');
        cy.get('.btn-delete').contains('Vymazať').click()    
        cy.get('.popover-auto').should('be.visible')    
        cy.get('.btn-sm').contains('Vymazať').click()   
          
        

    })
})
*/