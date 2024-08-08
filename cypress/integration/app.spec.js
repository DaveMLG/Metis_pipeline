describe('Product owner', function() {
    before(() => {
      cy.visit('https://dev.metis.academy/admin')
        cy.get('[class="btn btn-navigate btn-block"]').should('be.visible')
        cy.get('[class="btn btn-navigate btn-block"]').eq(0).click()
        cy.get('[type="submit"]').should('be.visible')
        cy.get('[type="submit"]').should('be.visible')
        cy.get('[name="userName"]').type('vsetky.roly')
        cy.get('[name="password"]').type('ML_heslo1')
        cy.get('[type="submit"]').click()
      })
    it('Order stlpcov AM', function() {
        cy.viewport(1920, 937)
        
        cy.get('.title').contains('Produkty').click()
        cy.get('[href="/admin/elearning/study"]').click()
        cy.wait(1000)
        cy.get('[type="button"]').contains('50').click()
        

        //kontrola + wait
        const sortByColumn = (columnHeaderText) => {
          cy.get('th').contains(columnHeaderText).click();
          cy.wait(2000);
          verifySorting();
          cy.get('th').contains(columnHeaderText).click();
          cy.wait(2000);
          verifySorting();
        };
        
        //zoznam stlpcov headerov
        const columnHeaders = ['Názov', 'Vytvorené', 'Editované', 'Posledný editor', 'Publikované'];
        columnHeaders.forEach((header) => sortByColumn(header));




        //samotna kontrola
        function verifySorting() {
          //najde ktory header je aktivny
          cy.get('.tableFloatingHeaderOriginal').find('.sort-desc, .sort-asc').as('chosenFilter');
        
          cy.get('@chosenFilter').invoke('text').then((chosenFilterText) => {
            //zisti ci ma kontrolovat abecedne alebo datum
            if (chosenFilterText.includes('Vytvorené') || chosenFilterText.includes('Editované')) {
              cy.get('@chosenFilter').then(($chosenFilter) => {
                //zisti index resp cislo stlpca
                const index = $chosenFilter.index();
                //zisti v ktorom stlpci ma kontrolovat udaje
                const selector = `tr td:nth-child(${index + 1})`;
                //zisti ci ma kontrolovat asc alebo desc
                if ($chosenFilter.parent().parent().find('.sort-desc').length > 0) {
                  cy.get(selector).verifyDateDescending();
                } else if ($chosenFilter.parent().parent().find('.sort-asc').length > 0) {
                  cy.get(selector).verifyDateAscending();
                } else {
                  cy.log('The filter is not working ATM or at all');
                }
              });
            //zisti ci ma kontrolovat abecedne alebo datum
            } else if (chosenFilterText.includes('Názov') || chosenFilterText.includes('Posledný editor')) {
              cy.get('@chosenFilter').then(($chosenFilter) => {
                //zisti index resp cislo stlpca
                const index = $chosenFilter.index();
                //zisti ci ma kontrolovat asc alebo desc
                const selector = `tr td:nth-child(${index + 1})`;
                //zisti ci ma kontrolovat asc alebo desc
                if ($chosenFilter.parent().parent().find('.sort-desc').length > 0) {
                  cy.get(selector).verifyAlphabeticalDescending();
                } else if ($chosenFilter.parent().parent().find('.sort-asc').length > 0) {
                  cy.get(selector).verifyAlphabeticalAscending();
                } else {
                  cy.log('The filter is not working ATM or at all');
                }
              });
            } else if (chosenFilterText.includes('Publikované')) {
              cy.get('@chosenFilter').then(($chosenFilter) => {
                //zisti index resp cislo stlpca
                const index = $chosenFilter.index();
                //zisti ci ma kontrolovat asc alebo desc
                const selector = `tr td:nth-child(${index + 1})`;
                //zisti ci ma kontrolovat asc alebo desc
                if ($chosenFilter.parent().parent().find('.sort-desc').length > 0) {
                  cy.get(selector).verifyCheckboxDescending();
                } else if ($chosenFilter.parent().parent().find('.sort-asc').length > 0) {
                  cy.get(selector).verifyCheckboxAscending();
                } else {
                  cy.log('The filter is not working ATM or at all');
                }
              });
            }
          });
        }
        



        //custom command c1 na zoradenie datumov
        Cypress.Commands.add('verifyDateAscending', { prevSubject: true }, (subject) => {
          const dateValues = [];
        
          subject.each((index, element) => {
            const dateStr = Cypress.$(element).text().trim();
            const parsedDate = dateStr ? parseDate(dateStr) : undefined;
            dateValues.push({ date: parsedDate, index });
          });
        
          dateValues.sort((a, b) => {
            if (a.date === undefined && b.date === undefined) return 0;
            if (a.date === undefined) return -1;
            if (b.date === undefined) return 1;
        
            return a.date - b.date;
          });
        
          const sortedIndexes = dateValues.map((item) => item.index);
        
          for (let i = 1; i < sortedIndexes.length; i++) {
            const currentIndex = sortedIndexes[i];
            const previousIndex = sortedIndexes[i - 1];
        
            if (currentIndex !== undefined && previousIndex !== undefined) {
              expect(currentIndex >= previousIndex).to.be.true;
            }
          }
        });
        
        //konvertuje format z text stringu na datum
        function parseDate(dateStr) {
          const [datePart, timePart] = dateStr.split(' ');
          const [day, month, year] = datePart.split('.');
          const [hours, minutes, seconds] = timePart.split(':');
        
          return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
        }
        
        
        

        //custom command c2 na zoradenie datumov
        Cypress.Commands.add('verifyDateDescending', { prevSubject: true }, (subject) => {
          for (let i = 1; i < subject.length; i++) {
            const currentDateStr = subject.eq(i).text().trim();
            const previousDateStr = subject.eq(i - 1).text().trim();
        
            const currentDate = parseDate(currentDateStr);
            const previousDate = parseDate(previousDateStr);
        
            expect(currentDate <= previousDate).to.be.true;
          }
        });
        
        

        
        


        //custom commandy na abecedne zoradenie
        Cypress.Commands.add('verifyAlphabeticalAscending', { prevSubject: true }, (subject) => {
          for (let i = 1; i < subject.length; i++) {
              const currentText = cleanText(subject.eq(i).text().trim());
              const previousText = cleanText(subject.eq(i - 1).text().trim());
              expect(currentText.localeCompare(previousText) >= 0).to.be.true;
          }
      });
      
      Cypress.Commands.add('verifyAlphabeticalDescending', { prevSubject: true }, (subject) => {
          for (let i = 1; i < subject.length; i++) {
              const currentText = cleanText(subject.eq(i).text().trim());
              const previousText = cleanText(subject.eq(i - 1).text().trim());
              expect(currentText.localeCompare(previousText) <= 0).to.be.true;
          }
      });
      
        // nahradi tieto symbols empty stringami pre lahsie porovnavanie
        function cleanText(text) {
           return text.replace(/[-*_+\/]/g, '').trim();
        }
      
  
  
          
          

           //custom commandy na zoradenie podla checkboxu
           Cypress.Commands.add('verifyCheckboxAscending', { prevSubject: true }, (subject) => {
            let previousCheckboxValue 
            
            subject.each((index, element) => {
              const currentCheckboxValue = Number(element.querySelector('[type="checkbox"]').checked);
              
              if (index > 0) {
                expect(currentCheckboxValue).to.be.gte(previousCheckboxValue);
              }
              
              previousCheckboxValue = currentCheckboxValue;
            });
          });
          
          
          
          

          Cypress.Commands.add('verifyCheckboxDescending', { prevSubject: true }, (subject) => {
            let previousCheckboxValue
            
            subject.each((index, element) => {
              const currentCheckboxValue = Number(element.querySelector('[type="checkbox"]').checked);
              
              if (index > 0) {
                expect(currentCheckboxValue).to.be.lte(previousCheckboxValue);
              }
              
              previousCheckboxValue = currentCheckboxValue;
            });
          });
          
          
          
    })  
})