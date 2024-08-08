describe('Product owner', function() {
    beforeEach(() => {
        cy.loginAdmin('cy.vo', 'ML_heslo1');
        cy.viewport(1920, 937)
        cy.visit('https://dev.metis.academy/admin')

    })

      it('Vytvorenie nového semestra cez btn Pridať záznam', function() {
        cy.get('.icon-menu-ttt').click() 
        cy.get('[href="/admin/elearning/semester"]').click()
        cy.get('[type = "button"]').contains('Pridať záznam').click()
        
        //Nevyplní skrátený názov a názov na portáli a skúsi vložiť semester do systému, skontroluje či vyhodí error
        cy.get('#Title').type('PO semester AAA')
        cy.get('#PortalTitle').clear().type('PO semester AAA')
        cy.get('input#LogoUrl').attachFile('/obrazky/logo1.png')
        cy.get('[name="HoverDescription"]').find('.note-editable').type('Toto je popis pri prejdení myšou')
        // cy.get('.toast').should('contain.text','Skrátený názov je povinný údaj.')
        // cy.get('.toast').should('contain.text','Názov na portáli je povinný údaj.')
        // cy.wait(7000)
        //Vyplní všetky inputy ale nevyplní koordinatora a skontroluje či hodí error
        // cy.get('[type="submit"]').last().click()
        // cy.get('.toast').should('contain.text','Invalid form')
        cy.get('[type="radio"]').last().check({force: true})
        cy.get('[name = "selectedCoordinator"]').select('k, cy').next().click()
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').should('contain.text','OK!')
        
      })

      it('Pridávanie predmetov do semestra cez btn Vložiť záznam', function() {
        cy.get('.icon-menu-ttt').click() 
        cy.get('[href="/admin/elearning/semester"]').click()
        cy.wait(1000)
        cy.contains('PO semester').click()
        cy.get('.nav-link').contains('Obsah').click()

        cy.get('.table-cell-data').each(($cell) => {
            const cellText = $cell.text();
          
            if (cellText.includes("PO predmet AAA")) {
              cy.get('[type="checkbox"]', { withinSubject: $cell.closest('tr') }).first().check({ force: true });
              return false;
            } else if (cellText.includes("PO predmet BBB")) {
              cy.get('[type="checkbox"]', { withinSubject: $cell.closest('tr') }).first().check({ force: true });
              return false;
            } else if (cellText.includes("PO predmet CCC")) {
              cy.get('[type="checkbox"]', { withinSubject: $cell.closest('tr') }).first().check({ force: true });
              return false;
            }
          });
          
               
          cy.contains('Vložiť záznam').click()

        cy.get('[type="submit"]').last().click()
        cy.get('.toast').should('contain.text','OK!')
      })
    })