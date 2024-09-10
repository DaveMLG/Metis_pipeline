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
    'Najmenej jedna otázka na opýtanie v teste je nutná.',
    'Najmenej jedna otázka v teste je nutná.',
    'Telo úlohy je povinné pole',
    'Zadanie je povinné',
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
      cy.viewport(1920, 937)
      cy.visit(Cypress.env('websiteUrl'))

        cy.get('.icon-menu-elearning').click()
        cy.get('[href="/admin/elearning/training"]').click()
        cy.get('.table-cell-data').contains('G školenie AAA').click();
        cy.wait(1000)
        cy.get('.nav-link').contains('Obsah').click()
        cy.get('tr[id^="exercise"]').should('be.visible');
        

      })

            
      

      it('Naplnanie ulohy typu samostudium obsahom', function() {
      cy.wait(1000)
        cy.get('tbody').find('tr').contains('Sam').then(edit => {
          cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
        })

        //instrukcie pre garanta - len sam a vid
        cy.get('[name="guarantorInternalMaterial"]').find('.note-editing-area').type('Inštrukcie pre garanta')
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').contains('Musi byť vyplnená inštrukcia pre študenta alebo popis úlohy').should('be.visible')    

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
        cy.wait(1000)
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').contains('OK!').should('be.visible')    

        //upload file
        cy.get('.af-file-button').find('input[type=file]').selectFile('cypress/fixtures/obrazky/logo1.png' , {force: true})
        cy.get('.checkmark__circle').should('be.visible')    

      })
      


      

      it('Naplnanie ulohy typu videosamostudium obsahom', function() {
        cy.wait(1000)
        cy.get('tbody').find('tr').contains('Vid').then(edit => {
          cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
        })

        //instrukcie pre garanta - len sam a vid
        cy.get('[name="guarantorInternalMaterial"]').find('.note-editing-area').type('Inštrukcie pre garanta')
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').contains('Musi byť vyplnená inštrukcia pre študenta alebo popis úlohy').should('be.visible')    

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
        cy.wait(1000)
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').contains('OK!').should('be.visible')    

        //upload file
        cy.get('.af-file-button').find('input[type=file]').selectFile('cypress/fixtures/obrazky/logo1.png' , {force: true})
        cy.get('.checkmark__circle').should('be.visible')    


      })




  
      it('Naplnanie ulohy typu AT obsahom', function() {
        cy.wait(1000)
        cy.get('tbody').find('tr').contains('Aut').then(edit => {
          cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
        })

        cy.wait(500).then(() => {
          fillAllInstructionsWithErrorToast()
        })

        //clear tela ulohy
        cy.get('#TestQuestionsText').clear()
        cy.get('#TestQuestionsToAsk').clear().type('3')
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').contains('Otázky a odpovede je povinné pole').should('be.visible')    
        cy.get('.toast').contains('Vložených otázok je menej ako určený počet otázok do testu.').should('be.visible')    
        cy.get('.toast').contains('Najmenej jedna otázka v teste je nutná.').should('be.visible')    


        //vyplnenie tela ulohy
        cy.get('#TestQuestionsText').clear().type('Preverenie vedomostí nadobudnutých počas samoštúdia \n*Ktoré z nasledujúcich zariadení je prvým počítacím zariadením? \n+Abacus \n-Kalkulačka \n-Turingov stroj \n-Pascalín \n\n*Ktoré z nasledujúcich zariadení je najnovšie? \n-Abacus \n+Kalkulačka \n-Turingov stroj \n-Pascalín \n\n*Ktoré z nižšie uvedených čísel je najmenšie? \n+3,14 \n-22/7 \n-π -Žiadna z uvedených možností nie je správna')
        cy.wait(1000)
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').contains('OK!').should('be.visible')    
      })

    




      it('Naplnanie ulohy typu webinar obsahom', function() {
        cy.wait(1000)
        cy.get('tbody').find('tr').contains('Web').then(edit => {
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
        cy.wait(1000)
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').contains('OK!').should('be.visible')    

        //upload file
        cy.get('.af-file-button').find('input[type=file]').selectFile('cypress/fixtures/obrazky/logo1.png' , {force: true})
        cy.get('.checkmark__circle').should('be.visible')    

  })




      it('Naplnanie ulohy typu Otvoreny test obsahom', function() {
          cy.wait(1000)
          cy.get('tbody').find('tr').contains('Otv').then(edit => {
            cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
          })

          cy.wait(500).then(() => {
            fillAllInstructionsWithErrorToast()
          })

          //clear tela ulohy
          cy.get('#TestQuestionsText').clear()
          cy.get('#TestQuestionsToAsk').clear().type('1')
          cy.get('[type="submit"]').last().click()
          cy.get('.toast').contains('Otázky a odpovede je povinné pole').should('be.visible')    
          cy.get('.toast').contains('Vložených otázok je menej ako určený počet otázok do testu.').should('be.visible')    
          cy.get('.toast').contains('Najmenej jedna otázka v teste je nutná.').should('be.visible')    


          //vyplnenie tela ulohy
          cy.get('#TestQuestionsText').type('Preverenie vedomostí otvoreným testom \n*Mesto je ku krajine tak, ako je motor k autu. Vysvetlite tento vzťah. \n*Tehla váži kilo a pol tehly. Koľko teda váži jedna tehla? Napíšte rovnicu pre výpočet výsledku. \n*V škatuľke vám zostáva posledná zápalka a potrebujete čo najrýchlejšie urobiť vatru. Čo zapálite ako prvé, ak máte k dispozícii: lieh, benzín, noviny, sviečku, koks, čierne uhlie, triesky a kus vaty? \n\n*Mesto je ku krajine tak, ako je motor k autu. Vysvetlite tento vzťah. \n\n*Tehla váži kilo a pol tehly. Koľko teda váži jedna tehla? Napíšte rovnicu pre výpočet výsledku. \n\n*V škatuľke vám zostáva posledná zápalka a potrebujete čo najrýchlejšie urobiť vatru. Čo zapálite ako prvé, ak máte k dispozícii: lieh, benzín, noviny, sviečku, koks, čierne uhlie, triesky a kus vaty? \nZdôvodnite svoju odpoveď.')
          cy.wait(1000)
          cy.get('[type="submit"]').last().click()
          cy.get('.toast').contains('OK!').should('be.visible')    
      })







      it('Naplnanie ulohy typu Zadanie obsahom', function() {
          cy.wait(1000)
          cy.get('tbody').find('tr').contains('Zad').then(edit => {
            cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
          })

          cy.wait(500).then(() => {
            fillAllInstructionsWithErrorToast()
          })

        //clear tela ulohy
        cy.get('[name="Assignment"]').find('.note-editing-area').clear()
        cy.wait(1000)
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').contains('Zadanie je povinné').should('be.visible')    

        //vyplnenie tela ulohy
        cy.get('[name="Assignment"]').find('.note-editing-area').clear().type('cypress telo ulohy')
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').contains('OK!').should('be.visible')    
      })







      it('Naplnanie ulohy typu Projekt obsahom', function() {
          cy.wait(1000)
          clickOnTextInTableCell('Pro')          

          cy.wait(500).then(() => {
            fillAllInstructionsWithErrorToast()
          })


        //zakliknutie vysokej narocnosti
        cy.get('[name="Assignment"]').find('.note-editing-area').clear()
        cy.contains(' Vysoká').parent().find('[type="radio"]').check({force: true})
        
        //clear tela ulohy
        cy.get('[name="Assignment"]').find('.note-editable').clear()
        cy.wait(1000)
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').contains('Zadanie je povinné').should('be.visible')    

        //vyplnenie tela ulohy
        cy.get('[name="Assignment"]').find('.note-editable').clear().type('Práca na skupinovom projekte. Vyberte si jedno vylepšenie z domácej úlohy a zamerajte sa naň v tejto projektovej úlohe. Vašou úlohou bude zostrojiť návrh vami vypichnutého nedostatku v tejto domácej úlohe.')
        cy.wait(1000)
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').contains('OK!').should('be.visible')    
      })






      it('Naplnanie ulohy typu Doplnovacka obsahom', function() {
        cy.wait(1000)
          cy.get('tbody').find('tr').contains('Dop').then(edit => {
            cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
          })

          cy.wait(500).then(() => {
            fillAllInstructionsWithoutErrorToast()
          })

          //clear tela ulohy
          cy.get('[name="Content"]').find('.note-editing-area').clear()
          cy.wait(1000)
          cy.get('[type="submit"]').last().click()
          cy.get('.toast').contains('Najmenej jedna otázka na opýtanie v teste je nutná.').should('be.visible')    
          cy.get('.toast').contains('Najmenej jedna otázka v teste je nutná.').should('be.visible') 


          //vyplnenie tela ulohy
          cy.get('[name="Content"]').find('.note-editing-area').clear().type('V škatuľke vám zostáva posledná zápalka a potrebujete čo najrýchlejšie urobiť vatru . Čo zapálite ako prvé, ak máte k dispozícii: lieh, benzín, noviny, sviečku, koks, čierne uhlie, triesky a kus vaty? \nAko prvé zapálim @@@zápalku/koks/triesky@@@, ako druhé zapálim @@@sviečku@@@, ako tretie zapálim @@@noviny@@@ a ako štvrté zapálim @@@triesky/kus vaty/benzín@@@')
          cy.wait(1000)
          cy.get('[type="submit"]').last().click()
          cy.get('.toast').contains('OK!').should('be.visible')    


          //chipset
          cy.get('.chip-element').contains('vatru').click()    
          cy.get('[name="Content"]').find('.note-editing-area').contains('@@@vatru@@@')
          cy.contains('Náhľad na študentskom dashboarde').parent().find('[type="text"]').eq(0).should('have.value', 'vatru')

          cy.get('.chip-element').contains('zostáva').trigger('contextmenu');
          cy.get('.btn').contains('Skryť okno').click()
          cy.get('.chip-element').contains('zostáva').trigger('contextmenu');
          cy.get('.context-menu-item').contains('Upraviť text').click();
          cy.get('.context-menu-item').find('.form-control').clear().type('zostala');
          cy.get('.btn').contains('Upraviť').click()
          cy.get('[name="Content"]').find('.note-editing-area').contains('zostala')

          cy.get('.chip-element').contains('zostala').trigger('contextmenu');
          cy.get('.context-menu-item').contains('Zmeniť na doplňovačku').click()
          cy.get('[name="Content"]').find('.note-editing-area').contains('@@@zostala@@@')
          cy.contains('Náhľad na študentskom dashboarde').parent().find('[type="text"]').eq(0).should('have.value', 'zostala')

          cy.get('.chip-element').contains('zostala').click()    
          cy.get('.chip-element').contains('zostala').trigger('contextmenu');
          cy.get('.context-menu-item').contains('Zmeniť na select').click()
          cy.get('[name="Content"]').find('.note-editing-area').contains('@@@zostala/@@@')

          cy.get('.mat-mdc-form-field-infix').eq(0).trigger('contextmenu');  
          cy.get('.context-menu-item').contains('Pridať ako dobrú odpoveď').click()
          cy.get('.context-menu-item').find('.form-control').clear().type('dobra odpoved');
          cy.get('.btn').contains('Pridať').click();
          cy.get('.mat-mdc-form-field-infix').eq(0).trigger('contextmenu');  
          cy.get('.context-menu-item').contains('Pridať zlú odpoveď').click()
          cy.get('.context-menu-item').find('.form-control').clear().type('zla odpoved');
          cy.get('.btn').contains('Pridať').click();


          cy.get('[type="submit"]').last().click()
          cy.get('.toast').contains('OK!').should('be.visible') 

      })







      it('Naplnanie ulohy typu Parovacka obsahom', function() {
          cy.wait(1000)
          cy.get('tbody').find('tr').contains('Pár').then(edit => {
            cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
          })

          cy.wait(500).then(() => {
            fillAllInstructionsWithErrorToast()
          })

          //vyplnenie tela ulohy
          cy.get('#ImportPairs').selectFile('cypress/fixtures/templates/parovacka.csv', {force: true})
          cy.wait(2000)
          cy.get('.green').contains('Vložiť záznam').click()    
          cy.get('.form-control').eq(-2).type('ahoj')    
          cy.get('.form-control').last().type('hello')    

          cy.get('[type="submit"]').last().click()
          cy.get('.toast').contains('OK!').should('be.visible')    
      })



      it('Naplnanie ulohy typu Preferencny test obsahom', function() {
        cy.wait(1000)
        //eq(0) pre preferencny test, eq(1) pre preklad (podla sablony)
        cy.get('td:contains("Pre")').eq(0).then(edit => {
          cy.wrap(edit).parent().contains('Editovať').click()
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
        cy.get('#TestQuestionsText').type('Preferečný test \n* Ako tráviš volný čas? \n+ sedím pred TV \n+ športujem \n+ vzdelávam sa \n+ hrá hry na PC')
        cy.get('[type="submit"]').last().click()
        cy.get('.toast').contains('OK!').should('be.visible')    
     
    })
  })