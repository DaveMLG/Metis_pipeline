import { getHodnotenieZoznam } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import { getCurrentHodnotenieZoznam } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import { compareHodnotenieZoznamAndCurrentHodnotenieZoznam } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import { compareDisciplinaZoznamAndCurrentDisciplinaZoznamShouldBeTheSame } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';


import { getDisciplinaZoznam } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import { getCurrentDisciplinaZoznam } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import { compareDisciplinaZoznamAndCurrentDisciplinaZoznam } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import{ disciplinaZoznam } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import{ currentDisciplinaZoznam } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';


describe('Student', function() {
    beforeEach(() => {
      cy.loginStudent('cy.student1', 'ML_heslo1');
      //cy.viewport(1920, 937)
      cy.visit('https://dev.metis.academy/portal')
      cy.get('[title="PO predmet AAA_PT"]').parent().parent().find('img').click()
        
      })


    it('Absolvovanie Samostudium', function() {
      const typUlohy = '.nazov-fade:contains("Samoštúdium")';      
      getDisciplinaZoznam()

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)

      //Odošle úlohu bez zadaného inputu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Vyplňte strávený čas vo formáte \'hh:mm\'.').should('be.visible')    
      
      //Odošle úlohu so správne vyplneným inputom
      cy.get('[name="timeSpentOnQuestion"]').first().type('0010')
      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      cy.get('.btn').contains('Späť na predmet').click();

      compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)

    })


    it('Absolvovanie Videosamostudium', function() {
      const typUlohy = '.nazov-fade:contains("Videosamoštúdium")';      
      getDisciplinaZoznam()

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)

      //Odošle úlohu bez zadaného inputu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Vyplňte strávený čas vo formáte \'hh:mm\'.').should('be.visible')    
      
      //Odošle úlohu so správne vyplneným inputom
      cy.get('[name="timeSpentOnQuestion"]').first().type('0010')
      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      cy.get('.btn').contains('Späť na predmet').click();

      compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)

    })


    it('Absolvovanie AT', function() {
        getHodnotenieZoznam()
        getDisciplinaZoznam()

        const typUlohy = '.nazov-fade:contains("Automatický test")'

        cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
        cy.wait(1000)
        cy.get('.text-center > button.btn').click()

        //Nevyplní všetky odpovede a skontroluje, či vyhodí chybu
        cy.get('[type="submit"]').click()
        cy.get('.alert-danger', { timeout: 5000 }).contains('Zaškrtnite aspoň jednu odpoveď v každej otázke.').should('be.visible')    

        //Označí všetky odpovede a odošle test
        cy.get('.otazka').eq(0).find('label').first().click()
        cy.get('.otazka').eq(1).find('label').first().click()          
        cy.get('.otazka').eq(2).find('label').first().click()
        cy.get('[type="submit"]').click()
        cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')
        cy.get('.btn').contains('Späť na predmet').click();

        //hodnotenie kontrola
        cy.wait(1000).then(() => {
          compareHodnotenieZoznamAndCurrentHodnotenieZoznam(typUlohy); 
          compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)
        });
  
        
    })


    it('Absolvovanie Webinár', function() {
      const typUlohy = '.nazov-fade:contains("Webinár")';      
      getDisciplinaZoznam()
      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.btn').contains('Úlohu som absolvoval').click()
      cy.get('.btn').contains('Späť na predmet').click();
 
      compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)
 
    })


    it('Absolvovanie Doplňovačka', function() {
      getHodnotenieZoznam()
      getDisciplinaZoznam()

      const typUlohy = '.nazov-fade:contains("Doplňovačka")'

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      
      cy.get('.text-center > button.btn').click()

      //Nevyplní všetky odpovede a skontroluje, či vyhodí chybu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Vyplňte text v každej odpovedi.').should('be.visible')    

      //Označí všetky odpovede a odošle test
      cy.get('select').eq(0).select('dobra odpoved,zostala')
      cy.get('[type="text"]').eq(0).type('vatru')
      cy.get('select').eq(1).select('zápalku')
      cy.get('[type="text"]').eq(1).type('sviečku')
      cy.get('[type="text"]').eq(2).type('noviny')
      cy.get('select').eq(2).select('triesky')


      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      cy.get('.btn').contains('Späť na predmet').click();

      //hodnotenie kontrola
      cy.wait(1000).then(() => {
        compareHodnotenieZoznamAndCurrentHodnotenieZoznam(typUlohy); 
        compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)

      });

    })


    it('Absolvovanie Párovačka', function() {
      getHodnotenieZoznam()
      getDisciplinaZoznam()
 
      const typUlohy = '.nazov-fade:contains("Párovačka")'
 
      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.text-center > button.btn').click()
 
      //Nevyplní všetky odpovede a skontroluje, či vyhodí chybu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Vyplňte text v každej odpovedi.').should('be.visible')    
 
      //Označí všetky odpovede a odošle test
      cy.get('.pair_items').find('[type="button"]').contains('Auto').click()
      cy.get('.pair_items').find('[type="button"]').contains('Motor').click()
      cy.get('.pair_items').find('[type="button"]').contains('Krajina').click()
      cy.get('.pair_items').find('[type="button"]').contains('Mesto').click()
     
      cy.get('.pair_items').find('[type="button"]').contains('ahoj').click()
      cy.get('.pair_items').find('[type="button"]').contains('hello').click()
 
      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      cy.get('.btn').contains('Späť na predmet').click();
 
      //hodnotenie kontrola
      cy.wait(1000).then(() => {
        compareHodnotenieZoznamAndCurrentHodnotenieZoznam(typUlohy);
        compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)
 
      });
 
    })


    it('Absolvovanie Preferenčný test', function() {
      const typUlohy = '.nazov-fade:contains("Preferenčný test")';      
      getDisciplinaZoznam()

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.text-center > button.btn').first().click()

      //Nevyplní všetky odpovede a skontroluje, či vyhodí chybu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Zaškrtnite aspoň jednu odpoveď v každej otázke.').should('be.visible')    

      //Označí všetky odpovede a odošle test
      cy.get('[type="radio"]').first().check({force: true})

      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible') 
      cy.get('.btn').contains('Späť na predmet').click();

      compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)
   
      
    })


    it('Absolvovanie Preklad', function() {
      getHodnotenieZoznam()
      getDisciplinaZoznam()

      const typUlohy = '.nazov-fade:contains("Preklad")'

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.text-center > button.btn').click()

      //Nevyplní všetky odpovede a skontroluje, či vyhodí chybu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Vyplňte text v každej odpovedi.').should('be.visible')    

      //Označí všetky odpovede a odošle test
      cy.get('[type ="text"]').eq(1).type('I')
      cy.get('[type ="text"]').eq(3).type('You')
      cy.get('[type ="text"]').eq(5).type('He')
      cy.get('[type ="text"]').eq(7).type('She')
      cy.get('[type ="text"]').eq(9).type('it')
      cy.get('[type ="text"]').eq(11).type('we')
      cy.get('[type ="text"]').eq(13).type('you')

      cy.get('[type ="text"]').eq(15).type('hello')

      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      cy.get('.btn').contains('Späť na predmet').click();

      //hodnotenie kontrola
      cy.wait(1000).then(() => {
        compareHodnotenieZoznamAndCurrentHodnotenieZoznam(typUlohy);
        compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)
 
      });

    })


    it('Absolvovanie Anketa', function() {
      const typUlohy = '.nazov-fade:contains("Anketa")';      
      getDisciplinaZoznam()

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.text-center > button.btn').first().click()

      //Nevyplní všetky odpovede a skontroluje, či vyhodí chybu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Zaškrtnite aspoň jednu odpoveď v každej otázke.').should('be.visible')    

      //Označí všetky odpovede a odošle test
      cy.get('[type="radio"]').first().check({force: true})
      cy.get('[type="radio"]').last().check({force: true})

      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')
      cy.get('.btn').contains('Späť na predmet').click();

      compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)
    
      
    })


    it('Absolvovanie Spätná väzba', function() {
      const typUlohy = '.nazov-fade:contains("Spätná väzba")';      
      getDisciplinaZoznam()

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.text-center > button.btn').click()

      //Nevyplní všetky odpovede a skontroluje, či vyhodí chybu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Vyplňte text v každej odpovedi.').should('be.visible')    

      //Označí všetky odpovede a odošle test
      cy.get('[placeholder="Tvoja odpoveď"]').eq(0).clear().type('Toto je vypracovanie úlohy0')

      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')
      cy.get('.btn').contains('Späť na predmet').click();

      compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)

      
    })


    it('Absolvovanie Osobnostný test', function() {
      const typUlohy = '.nazov-fade:contains("Osobnostný test")';      
      getDisciplinaZoznam()

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.text-center > button.btn').click()

      //Nevyplní všetky odpovede a skontroluje, či vyhodí chybu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Zaškrtnite aspoň jednu odpoveď v každej otázke.').should('be.visible')    

      //Označí všetky odpovede a odošle test
      for (let i = 0; i < 10; i++) {
        cy.get('.otazka').eq(i).find('label').first().click();
      }
      
      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible') 
      cy.get('.btn').contains('Späť na predmet').click();

      compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)
   
      
    })


    it('Absolvovanie Diskusia', function() {
      const typUlohy = '.nazov-fade:contains("Diskusia")';      
      getDisciplinaZoznam()

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
     
      //Odošle úlohu so správne vyplneným inputom
      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      cy.get('.btn').contains('Späť na predmet').click();

      compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)

    })


    it('Absolvovanie Checklist', function() {
      const typUlohy = '.nazov-fade:contains("Checklist")';      
      getDisciplinaZoznam()
 
      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.text-center > button.btn').first().click()
     
      //ulozi checklist 1
      cy.get('[type="checkbox"]').last().check({force: true})
      cy.get('.btn').contains('Uložiť').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
 
      cy.reload()
      cy.get('.text-center > button.btn').first().click()
      cy.get('[type="checkbox"]').last().should('be.checked');
 
      //ulozi checklist vsetky
      cy.get('[type="checkbox"]').first().check({force: true})
      cy.get('.btn').contains('Uložiť').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
 
      cy.reload()
      cy.get('.text-center > button.btn').first().click()
      cy.get('[type="checkbox"]').not(':first').each(($checkbox) => {
        cy.wrap($checkbox).should('be.checked');
      });
 
      //odskrtne jeden checkbox
      cy.get('[type="checkbox"]').last().uncheck({force: true})
      cy.get('.btn').contains('Uložiť').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
 
      cy.reload()
      cy.get('.text-center > button.btn').first().click()
      cy.get('[type="checkbox"]').not(':first').not(':last').each(($checkbox) => {
        cy.wrap($checkbox).should('be.checked');
      });
 
           
      //Odošle úlohu so správne vyplneným inputom
      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      cy.get('.btn').contains('Späť na školenie').click();
 
      compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)
 
         
    })

    it('Absolvovanie IQ test', function() {
      const typUlohy = '.nazov-fade:contains("IQ test")';      
      getDisciplinaZoznam()

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.text-center > button.btn').click()

      //Nevyplní všetky odpovede a skontroluje, či vyhodí chybu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Zaškrtnite aspoň jednu odpoveď v každej otázke.').should('be.visible')    

      //Označí všetky odpovede a odošle test
      for (let i = 0; i < 5; i++) {
        cy.get('.otazka').eq(i).find('label').first().click();
      }
      
      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      cy.get('.btn').contains('Späť na predmet').click();

      compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)

    })


    it('Spoločná práca s lektorom', function() {
      cy.wait(1000)
      const typUlohy = '.nazov-fade:contains("Spoločná práca s lektorom")';      
      getDisciplinaZoznam()

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.text-center > button.btn').click()

      //Označí všetky odpovede a odošle test
      cy.get('input[type=file]').selectFile('cypress/fixtures/templates/vypracovanie1.csv', {force: true})
      cy.wait(3000)
      cy.get('[placeholder="Všetkému som porozumel/a a prípadné otázky som zaznamenal/a do FAQ formulára. "]').clear().type('Toto je vypracovanie úlohy')
      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      cy.get('.btn').contains('Späť na predmet').click();

      compareDisciplinaZoznamAndCurrentDisciplinaZoznamShouldBeTheSame(typUlohy)
  
     

    })


    it('Absolvovanie Potvrdenie absolvovania', function() {
      const typUlohy = '.nazov-fade:contains("Potvrdenie absolvovania")';      
      getDisciplinaZoznam()

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
     
      //Odošle úlohu so správne vyplneným inputom
      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      cy.get('.btn').contains('Späť na predmet').click();

      compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)

          
    })


    it('Absolvovanie Cvičenie', function() {
 
      const typUlohy = '.nazov-fade:contains("Cvičenie")';      
      getDisciplinaZoznam()
 
      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
     
      //Odošle úlohu so správne vyplneným inputom
      cy.get('.btn').contains('Úlohu som absolvoval').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      cy.get('.btn').contains('Späť na predmet').click();
      cy.wait(5000)
 
      compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)
    })


    it('Absolvovanie Otvorený test + Hodnotenie odovzdaných úloh v detaile úlohy na vyhodnotenie', function() {
      getHodnotenieZoznam()
      getDisciplinaZoznam()
  
      const typUlohy = '.nazov-fade:contains("Otvorený test")'
  
      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.text-center > button.btn').click()
  
      //Nevyplní všetky odpovede a skontroluje, či vyhodí chybu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Vyplňte strávený čas vo formáte \'hh:mm\'.').should('be.visible')    
      cy.get('.alert-danger', { timeout: 5000 }).contains('Vyplňte text v každej odpovedi.').should('be.visible')    
  
      //Vyplní všetky odpovede a odošle test
      cy.get('[placeholder="Tvoja odpoveď"]').each(($element) => {
        cy.wrap($element).clear().type('Toto je vypracovanie úlohy cypress');
      });
      
      cy.get('[name="timeSpentOnQuestion"]').first().type('0010')
      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')
  
      //odhlasi sa ako student
      cy.get('.noimg').click()
      cy.contains('Odhlásiť sa').click()
      cy.contains('Áno').click()
      
  
      //prihlasi sa ako corrector
      cy.visit('https://dev.metis.academy/admin/admin')        
      
      cy.get('body').eq(0).then(($body) => {
          if ($body.find('.btn.btn-navigate.btn-block').length > 0) {
              $body.find('.btn.btn-navigate.btn-block').click();
              cy.get('[name="userName"]').type('cy.co');
              cy.get('[name="password"]').type('ML_heslo1');
              cy.get('[type="submit"]').click();
              cy.wait(1000);
          } else {
              cy.get('[name="userName"]').type('cy.co');
              cy.get('[name="password"]').type('ML_heslo1');
              cy.get('[type="submit"]').click();
              cy.wait(5000);
          }
      });

      
      //vojde do TT na kartu ulohy na vyhodnotenie
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
  
      cy.get('.fa-search').last().click();
  
      cy.get('[afnumber="percent"]').each((ciselnaOdpoved) => {
          cy.wrap(ciselnaOdpoved).clear()
      })
  
      cy.get('.note-editable').each((slovnaOdpoved) => {
          cy.wrap(slovnaOdpoved).clear()
      })
  
      cy.wait(3000)
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
      
         
        
       
            
        //ulozenie hodnotenia
        cy.get('.btn:contains("Uložiť")').last().click()
        cy.get('.toast').should('contain.text','OK!')
  
    });
           
        //odhlasenie sa z AM ako corrector
        cy.get('.dropdown-toggle > .icon-user').click()
        cy.get('.dropdown-item:contains(" Odhlásenie ")').click()
        cy.wait(5000)
  
        //prihlasenie sa ako student
        cy.visit('https://dev.metis.academy/portal')
        cy.get('[name="userName"]').type('cy.student1')
        cy.get('[name="password"]').type('ML_heslo1')
        cy.get('[type="submit"]').click()
        cy.wait(1000)

  
        //hodnotenie kontrola
        cy.wait(1000).then(() => {
          compareHodnotenieZoznamAndCurrentHodnotenieZoznam(typUlohy); 
          compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)

        });
  
    })
  
  
    it('Absolvovanie Zadania + Hodnotenie odovzdaných úloh v zozname úloh na vyhodnotenie', function() {
      getHodnotenieZoznam()
      getDisciplinaZoznam()

  
      const typUlohy = '.nazov-fade:contains("Zadanie")'

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.text-center > button.btn').click()
  
      //Nevyplní všetky odpovede a skontroluje, či vyhodí chybu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Vyplňte strávený čas vo formáte \'hh:mm\'.').should('be.visible')    
  
      //Označí všetky odpovede a odošle test
      cy.get('input[type=file]').selectFile('cypress/fixtures/templates/vypracovanie2.csv', {force: true})
      cy.wait(2000)
  
      cy.get('[placeholder="Tvoja odpoveď"]').clear().type('Toto je vypracovanie úlohy')
      cy.get('[name="timeSpentOnQuestion"]').first().type('0010')
      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      
       //odhlasi sa ako student
       cy.get('.noimg').click()
       cy.contains('Odhlásiť sa').click()
       cy.contains('Áno').click()
       
  
       //prihlasi sa ako corrector
       cy.visit('https://dev.metis.academy/admin/admin')
        cy.get('[name="userName"]').type('cy.co')
        cy.get('[name="password"]').type('ML_heslo1')
        cy.get('[type="submit"]').click()
        cy.wait(1000)

       //vojde do TT na kartu ulohy na vyhodnotenie
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
  
       //odhlasenie sa z AM ako corrector
       cy.get('.dropdown-toggle > .icon-user').click()
       cy.get('.dropdown-item:contains(" Odhlásenie ")').click()
 
       //prihlasenie sa ako student
       cy.visit('https://dev.metis.academy/portal')
              cy.get('[name="userName"]').type('cy.student1')
              cy.get('[name="password"]').type('ML_heslo1')
              cy.get('[type="submit"]').click()
              cy.wait(1000)

       //hodnotenie kontrola
       cy.wait(1000).then(() => {
        compareHodnotenieZoznamAndCurrentHodnotenieZoznam(typUlohy); 
        compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)

       });
  
    })
  
  
    it('Absolvovanie Projekt + Hodnotenie odovzdaných úloh v zozname úloh na vyhodnotenie', function() {
      getHodnotenieZoznam()
      getDisciplinaZoznam()
  
      const typUlohy = '.nazov-fade:contains("Projekt")'

      cy.get(typUlohy).parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)
      cy.get('.text-center > button.btn').click()
  
      //Nevyplní všetky odpovede a skontroluje, či vyhodí chybu
      cy.get('[type="submit"]').click()
      cy.get('.alert-danger', { timeout: 5000 }).contains('Vyplňte strávený čas vo formáte \'hh:mm\'.').should('be.visible')    
  
      //Označí všetky odpovede a odošle test
      cy.get('input[type=file]').selectFile('cypress/fixtures/obrazky/logo1.png', {force: true})
      cy.wait(2000)
      cy.get('[placeholder="Tvoja odpoveď"]').clear().type('Toto je vypracovanie úlohy')
      cy.get('[name="timeSpentOnQuestion"]').first().type('0010')
      cy.get('[type="submit"]').click()
      cy.get('.toast', { timeout: 5000 }).contains('OK!').should('be.visible')    
      
       //odhlasi sa ako student
       cy.get('.noimg').click()
       cy.contains('Odhlásiť sa').click()
       cy.contains('Áno').click().wait(3000)
       
  
       //prihlasi sa ako corrector
       cy.visit('https://dev.metis.academy/admin/admin')
        cy.get('[name="userName"]').type('cy.co')
        cy.get('[name="password"]').type('ML_heslo1')
        cy.get('[type="submit"]').click()
        cy.wait(5000)
  
       //vojde do TT na kartu ulohy na vyhodnotenie
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
  
       //odovzdanie 0/2 a 1/2 odpovedi a error
       cy.get('.btn:contains("Uložiť")').last().click()
       cy.get('.toast', { timeout: 5000 }).contains('Slovné hodnotenie nesmie byť prázdne a hodnotenie musí byť medzi (0 - 100)').should('be.visible')    
  
       cy.get('[afnumber="percent"]').last().clear().type('55')
       cy.get('.btn:contains("Uložiť")').last().click()
       cy.get('.toast', { timeout: 5000 }).contains('Slovné hodnotenie nesmie byť prázdne a hodnotenie musí byť medzi (0 - 100)').should('be.visible')    
  
       cy.get('[afnumber="percent"]').last().clear()
       cy.get('.form-control').last().clear().type('Uloha je ok')
       cy.get('.btn:contains("Uložiť")').last().click()
       cy.get('.toast', { timeout: 5000 }).contains('Slovné hodnotenie nesmie byť prázdne a hodnotenie musí byť medzi (0 - 100)').should('be.visible')    
  
       //vyplnenie odpovedi    
       cy.get('[afnumber="percent"]').last().clear().type('55')
   
       cy.get('.btn:contains("Uložiť hodnotenia")').last().click()
       cy.get('.toast').should('contain.text','OK!')
  

       //odhlasenie sa z AM ako corrector
       cy.get('.dropdown-toggle > .icon-user').click()
       cy.get('.dropdown-item:contains(" Odhlásenie ")').click()
 
       //prihlasenie sa ako student
       cy.visit('https://dev.metis.academy/portal')
              cy.get('[name="userName"]').type('cy.student1')
              cy.get('[name="password"]').type('ML_heslo1')
              cy.get('[type="submit"]').click()
              cy.wait(1000)
    

 
       //hodnotenie kontrola
       cy.wait(1000).then(() => {
        compareHodnotenieZoznamAndCurrentHodnotenieZoznam(typUlohy); 
        compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy)

       });

    })





})