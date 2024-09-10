//const path = require("path");
describe('Corrector', function() {

    beforeEach(() => {
    
        cy.loginAdmin(Cypress.env('loginCO'), Cypress.env('password'));
        cy.viewport(1920, 937)
        cy.visit('https://dev.metis.academy/admin')
        
    cy.get('.icon-menu-training-terms-top-menu').click()
    cy.get('[href="/admin/training-term/training-term"]').click()
    cy.wait(1000)

    
    cy.task('load').then((url) => {
        if (url && url !== null) {
            cy.visit(url)
        } else {
            // Fallback mechanism: Finding TrainingTerm by name
            cy.contains('G školenie').click();
        }
    });
       



    cy.wait(2000)
    cy.get('.nav-link').contains('Úlohy na vyhodnotenie').click()  
    cy.wait(2000)    

    })
    

    it('Stiahnutie súborov všetkých úloh', function() {
        cy.get('.green:contains("Stiahnuť súbory všetkých úloh")').click()
        cy.wait(3000)
        /*
        const downloadsFolder = Cypress.config("downloadsFolder");
        cy.readFile(path.join(downloadsFolder, "fileName.zip")).should("exist");
        */

    })


    it('Stiahnutie súborov označených úloh', function() {
        cy.get('[type="checkbox"]').last().uncheck({force: true})
        cy.get('.green:contains("Stiahnuť súbory označených úloh")').click()
        cy.wait(3000)

    })


    it('Stiahnutie súborov cez stlpec Prílohy', function() {
        cy.get('.fa-download').first().click()
        cy.wait(3000)

    })


    it('Stiahnutie súborov v detaile uloh', function() {
        cy.get('.fa-search').last().click()
        cy.get('.control-label:contains("Priložený súbor")').next().click()
        cy.wait(3000)

    })

// zakomentovane z dovodu ze tieto kontroly sa vykonavaju ihned po absolvovani uloh zadanie projekt a otvoreny test

/*

    it('Hodnotenie odovzdaných úloh v zozname úloh na vyhodnotenie', function() {
        //odovzdanie 0/2 a 1/2 odpovedi a error
        cy.get('.btn:contains("Uložiť")').last().click()
        cy.get('.toast', { timeout: 5000 }).contains('Slovné hodnotenie nesmie byť prázdne a hodnotenie musí byť medzi (0 - 100)').should('be.visible')    

        cy.get('[afnumber="percent"]').last().clear().type('11')
        cy.get('.btn:contains("Uložiť")').last().click()
        cy.get('.toast', { timeout: 5000 }).contains('Slovné hodnotenie nesmie byť prázdne a hodnotenie musí byť medzi (0 - 100)').should('be.visible')    

        cy.get('[afnumber="percent"]').last().clear()
        cy.get('.form-control').last().clear().type('Uloha je ok')
        cy.get('.btn:contains("Uložiť")').last().click()
        cy.get('.toast', { timeout: 5000 }).contains('Slovné hodnotenie nesmie byť prázdne a hodnotenie musí byť medzi (0 - 100)').should('be.visible')    

        //vyplnenie odpovedi    
        cy.get('[afnumber="percent"]').last().clear().type('11')
    
        cy.get('.btn:contains("Uložiť hodnotenia")').last().click()
        cy.get('.toast').should('contain.text','OK!')
    

    })




    it('Hodnotenie odovzdaných úloh v detaile úlohy na vyhodnotenie', function() {
        cy.get('.fa-search').last().click();

        cy.get('[afnumber="percent"]').each((ciselnaOdpoved) => {
            cy.wrap(ciselnaOdpoved).clear()
        })

        cy.get('.note-editable').each((slovnaOdpoved) => {
            cy.wrap(slovnaOdpoved).clear()
        })


        cy.get('.btn:contains("Uložiť")').last().click()
        cy.get('.field-validation-error').contains('Slovné hodnotenie nesmie byť prázdne.').should('be.visible')    
        cy.get('.field-validation-error').contains('Hodnotenie je povinné.').should('be.visible')    



        //vyplnit odpovede
        cy.get('.note-editable').each((slovnaOdpoved) => {
            const exampleAnswers = ["OK", "Je to ok", "Je tam priestor na zlepsenie :)", "Vyborne", "Som spokojny", "A+"];
            const randomAnswer = exampleAnswers[Math.floor(Math.random() * exampleAnswers.length)];
            cy.wrap(slovnaOdpoved).clear().type(randomAnswer);
        })


        //vypocet priemerneho percenta
        let arrayOfNumbers = []
        
        cy.get('[afnumber="percent"]').each((ciselnaOdpoved) => {
            const randomNumber = Math.floor(Math.random() * 60) + 1;
            cy.wrap(ciselnaOdpoved).clear().type(randomNumber).then(() =>
            arrayOfNumbers.push(randomNumber)
            )
        })
        

        //porovnanie vypocitaneho priemerneho percenta a percenta na FE
      cy.wait(500).then(() => {
        console.log(arrayOfNumbers);
        let sucetOfNumbers = parseFloat(arrayOfNumbers.reduce((acc, num) => acc + num, 0));
        let delitelOfNumbers = parseFloat(arrayOfNumbers.length);
        let averageOfPercentage = sucetOfNumbers / delitelOfNumbers;
        let expectedValue = parseFloat(averageOfPercentage.toFixed(2)); // Calculate expected value to two decimal places without rounding
        cy.log(expectedValue);
    
        cy.get('.form-section').contains('Odpoveď študenta').click();
    
        cy.contains('Celkové vypočítané hodnotenie').next().invoke('text').then((percentoNaAdmine) => {
          const percentoNaAdmineDecimal = parseFloat(percentoNaAdmine.replace(',', '.').replace('%', ''));
          const expectedValue = parseFloat((sucetOfNumbers / delitelOfNumbers).toFixed(2));
          console.log("Expected value:", expectedValue);
          console.log("Actual value:", percentoNaAdmineDecimal);
          expect(expectedValue).to.equal(percentoNaAdmineDecimal);
            });
        });
        
                
          //
        /*
        cy.get('.btn:contains("Uložiť")').last().click()
        cy.get('.toast').should('contain.text','OK!')
        cy.get('.nav-link').contains('Úlohy na vyhodnotenie').click()  
        cy.wait(1000)


        //pre OT AGAIN
        cy.get('.fa-search').last().click();

        cy.get('[afnumber="percent"]').each((ciselnaOdpoved) => {
            cy.wrap(ciselnaOdpoved).clear()
        })

        cy.get('.note-editable').each((slovnaOdpoved) => {
            cy.wrap(slovnaOdpoved).clear()
        })


        cy.get('.btn:contains("Uložiť")').last().click()
        cy.get('.field-validation-error').contains('Slovné hodnotenie nesmie byť prázdne.').should('be.visible')    
        cy.get('.field-validation-error').contains('Hodnotenie je povinné.').should('be.visible')    



        //vyplnit odpovede
        cy.get('.note-editable').each((slovnaOdpoved) => {
            const exampleAnswers = ["OK", "Je to ok", "Je tam priestor na zlepsenie :)", "Vyborne", "Som spokojny", "A+"];
            const randomAnswer = exampleAnswers[Math.floor(Math.random() * exampleAnswers.length)];
            cy.wrap(slovnaOdpoved).clear().type(randomAnswer);
        })

        
        cy.get('[afnumber="percent"]').each((ciselnaOdpoved) => {
            const randomNumber = Math.floor(Math.random() * 60) + 1;
            cy.wrap(ciselnaOdpoved).clear().type(randomNumber);
        })
        
        cy.get('.btn:contains("Uložiť")').last().click()
        cy.get('.toast').should('contain.text','OK!')

        

    })

  
*/





    it('Kontrola filter stav ulohy - vyhodnotene', function() {
        cy.get('[name="selectedStatus"]').select('Vyhodnotené')
        cy.get('[type="submit"]').last().click()
        cy.get('.table').find('tr').not(':first').should('have.length', 3);
        
      


    })


})
