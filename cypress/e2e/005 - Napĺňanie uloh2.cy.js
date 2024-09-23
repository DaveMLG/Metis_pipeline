//FUNKCIE A PREMENNE (koniec line 90)
function clickOnTextInTableCell(textToFind) {
    cy.get('td').filter((index, element) => {
      return Cypress.$(element).text().trim() === textToFind;
    }).then(filteredElements => {
      if (filteredElements.length > 0) {
        cy.wrap(filteredElements).parent().contains('Editovať').click();
      } else {
        // Handle case when text is not found in any td element
        cy.log(`Text '${textToFind}' not found in any table cell.`);
      }
    });
  }
  
  
  
  function fillAllInstructionsWithoutErrorToast() {
    //prazdna uloha
    cy.wait(3000)
    cy.get('[type="submit"]').last().click()
    cy.get('.toast').contains('Musi byť vyplnená inštrukcia pre študenta alebo popis úlohy').should('be.visible')    
  
    //instrukcie pre moderatora
    cy.get('[name="lecturerInstruction"]').find('.note-editing-area').clear().type('Inštrukcie pre moderátora')
    cy.get('[type="submit"]').last().click()
    cy.get('.toast').contains('Musi byť vyplnená inštrukcia pre študenta alebo popis úlohy').should('be.visible')    
  
    //interny material pre moderátora
    cy.get('[name="lecturerInternalMaterial"]').find('.note-editing-area').clear().type('Interný materiál pre moderátora')
    cy.get('[type="submit"]').last().click()
    cy.get('.toast').contains('Musi byť vyplnená inštrukcia pre študenta alebo popis úlohy').should('be.visible')    
  
    //instrukcie pre studenta
    cy.get('[name="studentInstruction"]').find('.note-editing-area').clear().type('Inštrukcie pre študenta')
    cy.get('[type="submit"]').last().click()
    cy.get('.toast').contains('OK!').should('be.visible')    
  
    //popis ulohy + vymazanie instrukcie pre studenta
    cy.get('[name="studentInstruction"]').find('.note-editing-area').clear()
    cy.get('[name="Description"]').find('.note-editing-area').clear().type('Popis ulohy')
    cy.get('[type="submit"]').last().click()
    cy.get('.toast').contains('OK!').should('be.visible')  
  }
  
  
  function fillAllInstructionsWithErrorToast() {
    const approvedToastMessages = [
      'Telo úlohy je povinné pole',
      'Zadanie je povinné',
      'Najmenej jedna otázka v teste je nutná',
      'OK!'
    ];
  
  let isVisible = false; 
  
    //prazdna uloha
    cy.wait(3000)
    cy.get('[type="submit"]').last().click()
    cy.get('.toast').contains('Musi byť vyplnená inštrukcia pre študenta alebo popis úlohy').should('be.visible')    
  
    //instrukcie pre moderatora
    cy.get('[name="lecturerInstruction"]').find('.note-editing-area').clear().type('Inštrukcie pre moderátora')
    cy.get('[type="submit"]').last().click()
    cy.get('.toast').contains('Musi byť vyplnená inštrukcia pre študenta alebo popis úlohy').should('be.visible')    
  
    //interny material pre moderátora
    cy.get('[name="lecturerInternalMaterial"]').find('.note-editing-area').clear().type('Interný materiál pre moderátora')
    cy.get('[type="submit"]').last().click()
    cy.get('.toast').contains('Musi byť vyplnená inštrukcia pre študenta alebo popis úlohy').should('be.visible')    
  
    //instrukcie pre studenta
    cy.get('[name="studentInstruction"]').find('.note-editing-area').clear().type('Inštrukcie pre študenta')
    cy.wait(7000)
    cy.get('[type="submit"]').last().click()
    cy.get('.toast').each(toast => {
      approvedToastMessages.forEach(message => {
        if (toast.text().includes(message)) {
          isVisible = true;
          return false; 
        }
      });
    }).then(() => {
      expect(isVisible).to.be.true; 
    });
  
    //popis ulohy + vymazanie instrukcie pre studenta
    cy.get('[name="studentInstruction"]').find('.note-editing-area').clear()
    cy.get('[name="Description"]').find('.note-editing-area').clear().type('Popis ulohy')
    cy.wait(7000)
    cy.get('[type="submit"]').last().click()
    cy.get('.toast').each(toast => {
      approvedToastMessages.forEach(message => {
        if (toast.text().includes(message)) {
          isVisible = true;
          return false; 
        }
      });
    }).then(() => {
      expect(isVisible).to.be.true; 
    });
  }
  
  
  
  //TEST
  
  describe('Garant obsahu', function() {
      beforeEach(() => {
        cy.loginAdmin(Cypress.env('loginGO'), Cypress.env('password'));
        
        cy.visit(Cypress.env('websiteUrl'))

          cy.get('.icon-menu-elearning').click()
          cy.get('[href="/admin/elearning/training"]').click()
          cy.get('.table-cell-data').contains('G školenie AAA').click();
          cy.wait(1000)
          cy.get('.nav-link').contains('Obsah').click()
          cy.get('tr[id^="exercise"]').should('be.visible');
    
        })
  
              
        
  
  
  
        it('Naplnanie ulohy typu Preklad obsahom', function() {
            cy.wait(1000)
            //eq(0) pre preferencny test, eq(1) pre preklad (podla sablony)
            cy.get('td:contains("Pre")').eq(1).then(edit => {
              cy.wrap(edit).parent().contains('Editovať').click({force: true})
            })
  
            cy.wait(500).then(() => {
              fillAllInstructionsWithErrorToast()
            })
  
            //vyplnenie tela ulohy
            cy.get('#ImportPairs').selectFile('cypress/fixtures/templates/preklad.csv', {force: true})
            cy.wait(2000)
            cy.get('.green').contains('Vložiť záznam').click()    
            cy.get('.form-control').eq(-2).type('ahoj')    
            cy.get('.form-control').last().type('hello')    

            cy.get('[type="submit"]').last().click()
            cy.get('.toast').contains('OK!').should('be.visible')    
        })
  
  
  
        it('Naplnanie ulohy typu Anketa obsahom', function() {
            cy.wait(1000)
            cy.get('td:contains("Ank")').then(edit => {
              cy.wrap(edit).parent().contains('Editovať').click({force: true})
            })
  
            cy.wait(500).then(() => {
              fillAllInstructionsWithoutErrorToast()
            })
  
            //clear tela ulohy
            cy.get('#TestQuestionsText').clear()
            cy.wait(1000)
            cy.get('[type="submit"]').last().click()
            cy.get('.toast').contains('Otázky a odpovede je povinné pole').should('be.visible')    
            cy.get('.toast').contains('Najmenej jedna otázka na opýtanie v teste je nutná.').should('be.visible')    
  
            //vyplnenie tela ulohy
            cy.get('#TestQuestionsText').type('*Ako tráviš volný čas? \n+ sedím pred TV  \n+ športujem \n+ vzdelávam sa \n+ hrá hry na PC \n\n* Keď sa dostanem do nového kolektívu \n+ ticho počúvam \n+ zapájam sa do rozhovorov \n+ tvárim sa, že tam nie som \n+ potrebujem na seba upútať pozornosť')
            cy.wait(1000)
            cy.get('[type="submit"]').last().click()
            cy.get('.toast').contains('OK!').should('be.visible')    
  
        })
  
  
        it('Naplnanie ulohy typu Spatna vazba obsahom', function() {
            cy.wait(1000)
            cy.get('td:contains("Spä")').then(edit => {
              cy.wrap(edit).parent().contains('Editovať').click({force: true})
            })
  
            cy.wait(500).then(() => {
              fillAllInstructionsWithoutErrorToast()
            })
  
            //clear tela ulohy
            cy.get('#TestQuestionsText').clear()
            cy.wait(1000)
            cy.get('[type="submit"]').last().click()
            cy.get('.toast').contains('Otázky a odpovede je povinné pole').should('be.visible')    
            cy.get('.toast').contains('Najmenej jedna otázka na opýtanie v teste je nutná.').should('be.visible')       
  
            //vyplnenie tela ulohy
            cy.get('#TestQuestionsText').type('*Čo by sme mohli zlepšiť?')
            cy.get('[type="submit"]').last().click()
            cy.get('.toast').contains('OK!').should('be.visible')    
  
        })
  
  
  
  
        it('Naplnanie ulohy typu Osobnostný test obsahom', function() {
            cy.wait(1000)
            //eq(0) pre preferencny test, eq(1) pre preklad (podla sablony)
            cy.get('td:contains("Oso")').then(edit => {
              cy.wrap(edit).parent().contains('Editovať').click({force: true})
            })
  
            cy.wait(500).then(() => {
              fillAllInstructionsWithErrorToast()
            })
  
            //vyplnenie tela ulohy
            cy.get('#Import').selectFile('cypress/fixtures/templates/osobnostny_test.csv', {force: true})
            cy.wait(10000)
            cy.get('[type="submit"]').last().click()
            cy.get('.toast').contains('OK!').should('be.visible')    
        })
  
  
  
        it('Naplnanie ulohy typu Diskusia obsahom', function() {
          cy.wait(1000)
            cy.get('tbody').find('tr').contains('Dis').then(edit => {
              cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
            })
  
            cy.wait(500).then(() => {
              fillAllInstructionsWithoutErrorToast()
            })
  
            //clear tela ulohy
            cy.wait(10000)
            cy.get('[name="Content"]').find('.note-editing-area').clear()
            cy.wait(1000)
            cy.get('[type="submit"]').last().click()
            cy.get('.toast').contains('Telo úlohy je povinné pole').should('be.visible')    
  
            //vyplnenie tela ulohy
            cy.get('[name="Content"]').find('.note-editing-area').clear().type('cypress telo ulohy')
            cy.get('[type="submit"]').last().click()
            cy.get('.toast').contains('OK!').should('be.visible')    
  
          })
  
  
        it('Naplnanie ulohy typu Checklist obsahom', function() {
            cy.wait(1000)
            cy.get('td:contains("Che")').then(edit => {
              cy.wrap(edit).parent().contains('Editovať').click()
            })

               //vyplnenie otazok a odpovedi ulohy
               cy.get('#TestQuestionsText').clear().type('* Toto je otázka na ktorú sú tri odpovede \n+Toto je prvá odpoveď \n+Toto je druhá odpoveď \n+Toto je tretia odpoveď')
            cy.wait(500).then(() => {
              fillAllInstructionsWithoutErrorToast()
            })   
  
        })
  
  
        it('Naplnanie ulohy typu IQ test obsahom', function() {
              cy.wait(1000)
              cy.get('tbody').find('tr').contains('IQ').then(edit => {
                cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
              })
  
              cy.wait(500).then(() => {
                fillAllInstructionsWithErrorToast()
              })
  
              //pridanie charakteristiky
              cy.get('.btn').contains('Pridať').click()
              cy.get('[name="characteristicForm"]').find('.table').find('tr').eq(6).find('td').eq(1).find('.form-control').clear().type('Cypress')
  
              //vyplenie otazok a odpovedi
              cy.get('.btn').contains('Vložiť otázku').click()
              cy.get('[name="exerciseTypeIQTestForm"]').find('.row').eq(0).find('.note-editing-area').clear().type('Otazka cypress')
              cy.get('[name="exerciseTypeIQTestForm"]').find('.row').eq(0).find('.table').eq(0).find('tr').eq(6).find('td').eq(2).find('.form-control').clear().type('100')
              cy.wait(1000)
              cy.get(':nth-child(3) > .col-md-8 > .btn-primary').last().click()
              cy.get('[name="exerciseTypeIQTestForm"]').find('.row').eq(0).find('.table').eq(1).find('tr').eq(1).find('td').eq(1).find('.form-control').clear().type('Odpoved1')
              cy.get('[name="exerciseTypeIQTestForm"]').find('.row').eq(0).find('.table').eq(1).find('tr').eq(1).find('td').eq(2).find('.form-control').select('true')
              cy.get('[name="exerciseTypeIQTestForm"]').find('.row').eq(0).find('.table').eq(1).find('tr').eq(2).find('td').eq(1).find('.form-control').clear().type('Odpoved2')
              cy.get('[name="exerciseTypeIQTestForm"]').find('.row').eq(0).find('.table').eq(1).find('tr').eq(2).find('td').eq(2).find('.form-control').select('false')
              cy.get('[type="submit"]').last().click()
              cy.wait(3000)
              cy.get('.toast').contains('OK!').should('be.visible')    
  
  
        })
  
  
  
  
  
  
        it('Naplnanie ulohy typu Spolocna praca s mentorom obsahom', function() {
            cy.wait(1000)
            cy.get('tbody').find('tr').contains('Spo').then(edit => {
              cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
            })
  
            cy.wait(500).then(() => {
              fillAllInstructionsWithErrorToast()
            })
  
          //clear tela ulohy
          cy.get('[name="Assignment"]').find('.note-editing-area').clear()
          cy.wait(1000)
          cy.get('[type="submit"]').last().click()
          cy.get('.toast').contains('Telo úlohy je povinné pole').should('be.visible')    
  
          //vyplnenie tela ulohy
          cy.get('[name="Assignment"]').find('.note-editing-area').clear().type('cypress telo ulohy')
          cy.get('[type="submit"]').last().click()
          cy.get('.toast').contains('OK!').should('be.visible')    
        })
  
  
        it('Naplnanie ulohy typu Potvrdenie absolvovania obsahom', function() {
            cy.wait(1000)
            cy.get('td:contains("Pot")').eq(0).then(edit => {
              cy.wrap(edit).parent().contains('Editovať').click({force: true})
            })
  
              cy.wait(500).then(() => {
                fillAllInstructionsWithErrorToast()
              })
  
              //clear tela ulohy
              cy.get('[name="Content"]').find('.note-editing-area').clear()
              cy.wait(1000)
              cy.get('[type="submit"]').last().click()
              cy.get('.toast').contains('Telo úlohy je povinné pole').should('be.visible')    
  
              //vyplnenie tela ulohy
              cy.get('[name="Content"]').find('.note-editing-area').clear().type('cypress telo ulohy')
              cy.get('[type="submit"]').last().click()
              cy.get('.toast').contains('OK!').should('be.visible')    
  


              cy.get('[href="/admin/elearning/training"]').last().click()
              cy.get('.table-cell-data').contains('G školenie AAA').click();
              cy.wait(1000)
              cy.get('.nav-link').contains('Obsah').click()
              cy.get('tr[id^="exercise"]').should('be.visible');

              cy.get('td:contains("Pot")').eq(0).then(edit => {
                cy.wrap(edit).parent().contains('Editovať').click({force: true})
              })
        })

        
        it('Naplnanie ulohy typu Cvicenie obsahom', function() {
              cy.wait(1000)
              cy.get('tbody').find('tr').contains('Cvi').then(edit => {
                cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
              })
  
              cy.wait(500).then(() => {
                fillAllInstructionsWithoutErrorToast()
              })
  
              //clear tela ulohy
              cy.get('[name="Content"]').find('.note-editing-area').clear()
              cy.wait(1000)
              cy.get('[type="submit"]').last().click()
              cy.get('.toast').contains('Telo úlohy je povinné pole').should('be.visible')    
  
              //vyplnenie tela ulohy
              cy.get('[name="Content"]').find('.note-editing-area').clear().type('cypress telo ulohy')
              cy.get('[type="submit"]').last().click()
              cy.get('.toast').contains('OK!').should('be.visible')    
  
  
        })
  
  
  
  
  })