<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
describe('Student', function() {
let subjectUrlPortal;

    beforeEach(() => {
      cy.loginStudent(Cypress.env('loginStudent1'), Cypress.env('password'));

      cy.visit('https://dev.metis.academy/portal/welcome/subject?type=subject')
      cy.get('[title="PO predmet AAA_PT"]').parent().parent().find('img').click()
          
      })


    it('Iteracia ulohami cez btn dalsia uloha', function() {
      cy.get('.nazov-fade').contains('Samoštúdium').parent().parent().parent().parent().contains('Absolvovať').click()
      cy.wait(1000)

      let previousNumber = null;

      function performActions() {
        cy.get('.nazov').first().invoke('text').then((exerciseNumber) => {
          const trimmedNumber = exerciseNumber.split(' - ')[0].trim();
          console.log(trimmedNumber);
      
          if (previousNumber !== null) {
            const currentNumbers = trimmedNumber.split('.');
            const prevNumbers = previousNumber.split('.');
      
            let incremented = true;
      
            console.log("Current Numbers:", currentNumbers);
            console.log("Previous Numbers:", prevNumbers);
      
            for (let i = 0; i < currentNumbers.length; i++) {
              if (parseInt(currentNumbers[i]) < parseInt(prevNumbers[i])) {
                incremented = false;
                break;
              } else if (parseInt(currentNumbers[i]) > parseInt(prevNumbers[i])) {
                break;
              }
            }
      
            expect(incremented).to.be.true;
          }
      
          previousNumber = trimmedNumber;
        });
      
        cy.get('.btn').contains('Ďalšia úloha').click();
        cy.wait(500);
      }
                                          
      

        for (let i = 0; i < 19; i++) {
          cy.wait(200);
          performActions();
        }
          
    })


    it('Iteracia ulohami a navrat do predmetu cez btn spat na predmet', function() {
      cy.wait(500)
      cy.url().then((url) => {
        subjectUrlPortal = url;
      
        for (let i = 0; i < 20; i++) {
          cy.get('.btn:contains("Absolvovať")').eq(i).click(); 
          cy.wait(500);
          cy.get('.btn').contains('Späť na predmet').click();
        }
      });
        
      
      

      
      
          
    })
})