describe('Product owner', function() {
let values = [];
let values1 = [];
before(() => {
  cy.visit('https://dev.metis.academy/admin')
  cy.get('[class="btn btn-navigate btn-block"]').should('be.visible')
  cy.get('[class="btn btn-navigate btn-block"]').eq(0).click()
  cy.get('[type="submit"]').should('be.visible')
  cy.get('[type="submit"]').should('be.visible')
  cy.get('[name="userName"]').type('skorg1.vo')
  cy.get('[name="password"]').type('ML_heslo1')
  cy.get('[type="submit"]').click()
});

it('Nastavenie koeficientov hodnotenia v školení', function() {
  cy.viewport(1920, 937);
  cy.get('.icon-menu-elearning').click();
  cy.get('[href="/admin/elearning/training"]').click();
  cy.get('[placeholder="Kľúčové slovo"]').type('PO CY')
  cy.get('[type="submit"]').first().click()
  cy.wait(5000);
  cy.sortTableByColumn('Vytvorené');
  cy.contains('PO CY').click({timeout: 100000})
  cy.wait(3000);
  cy.get(':nth-child(3) > .nav-link').click();
  cy.contains('Koeficienty hodnotenia').find('.fa').click();

  //// Zmena koef. hodnotenia
  cy.get('#TestAutomatedLevelOfDegressiveAssesment').as('vdhau');
  cy.get('@vdhau').clear().type(3);
  cy.get('#TestOpenLevelOfDegressiveAssesment').as('vdhnu');
  cy.get('@vdhnu').clear().type(6);
  cy.get('[name="ImportanceCoefficientLevelLow"]').as('kdaun');
  cy.get('@kdaun').clear().type(2);
  cy.get('[name="ImportanceCoefficientLevelMedium"]').as('kdaus');
  cy.get('@kdaus').clear().type(2.5);
  cy.get('[name="ImportanceCoefficientLevelHigh"]').as('kdauv');
  cy.get('@kdauv').clear().type(3);
  cy.get('[type="submit"]').click();

  // Kontrola dát
  cy.reload();
  cy.contains('Koeficienty hodnotenia').find('.fa').click();
  cy.get('@vdhau').should((number) => {

    const nmbr = number.val();
    const numVal = parseFloat(nmbr);
    expect(numVal).to.equal(3);
  });

  cy.get('@vdhnu').should((number) => {

    const nmbr = number.val();
    const numVal = parseFloat(nmbr);
    expect(numVal).to.equal(6);
  });

  cy.get('@kdaun').should((number) => {

    const nmbr = number.val();
    const numVal = parseFloat(nmbr);
    expect(numVal).to.equal(2);
  });

  cy.get('@kdaus').should((number) => {

    const nmbr = number.val();
    const numVal = parseFloat(nmbr);
    expect(numVal).to.equal(2.5);
  });

  cy.get('@kdauv').should((number) => {

    const nmbr = number.val();
    const numVal = parseFloat(nmbr);
    expect(numVal).to.equal(3);
  });


  ////Nastavenie časových hodnôt pre odovzdanie/sprístupnenie/konanie úloh 
  cy.get('[name = "form"]').find('h3').eq(2).find('a').click();
  
  cy.get('[max = "23"]').then(hour_counter => {
    let counter = hour_counter;

    for (let x = 0; x < counter.length; x++) {
      cy.get('[max = "23"]').eq(x).clear();
      cy.get('[max = "23"]').eq(x).type(1);
      cy.wait(500);

      cy.get('[max="23"]').eq(x).invoke('val').then((value) => {
        values.push(value);
      });
    }
  });

  cy.get('[type="submit"]').last().click();

  values.forEach((value, index) => {
    cy.wrap(value).should('eq', '1')
  });

  ////Termíny lekcií pre nemoderované školenia
        cy.contains('Termíny lekcií pre nemoderované školenia').find('.fa-plus-square').click();
        cy.get('[max = "7"]').then(counter => {
      
          for (let x = 0; x < counter.length; x++) {
            const randNmbr = Math.floor(Math.random() * 20) + 1;
            cy.get('[max = "7"]').eq(x).clear({ force: true });
            cy.get('[max = "7"]').eq(x).type(randNmbr, { force: true });
            cy.wait(500);

            cy.get('[max="23"]').eq(x).invoke('val').then((value) => {
              values.push(value);
            });
          }
      
          cy.get('[max = "23"]').then(counter => {
          for (let x = 0; x < counter.length; x++) {
            const randNmbr = Math.floor(Math.random() * 20) + 1;
            cy.get('[max = "23"]').eq(x).clear({ force: true });
            cy.get('[max = "23"]').eq(x).type(randNmbr, { force: true });
            cy.wait(500);

            cy.get('[max="23"]').eq(x).invoke('val').then((value) => {
              values.push(value);
            });
          }
      
          cy.get('[max = "59"]').then(counter => {
          for (let x = 0; x < counter.length; x++) {
            const randNmbr = Math.floor(Math.random() * 20) + 1;
            cy.get('[max = "59"]').eq(x).clear({ force: true });
            cy.get('[max = "59"]').eq(x).type(randNmbr, { force: true });
            cy.wait(500);

            cy.get('[max="23"]').eq(x).invoke('val').then((value) => {
              values.push(value);
            });
          }
          cy.get('[type="submit"]').click();
      
          values1.forEach((value, index) => {
            cy.wrap(value).should('eq', '1');
          });
        });
      });
      ////Závislosť sprístupnenia úloh
      cy.wait(10000)
      cy.contains('Závislosť sprístupnenia úloh').find('.fa').click()
        cy.get('[type="radio"]').eq(1).check({force: true})
        cy.get('[type="submit"]').click()
        cy.wait(3000)
        //Kontrola nezávislého prístupu
        cy.contains('Závislosť sprístupnenia úloh').find('.fa').click()
        cy.get('[type="radio"]').invoke('val', '2')
        cy.wait(3000)

        //cy.contains('Závislosť sprístupnenia úloh').find('.fa').click()
        cy.get('[type="radio"]').eq(2).check({force: true})
        cy.get('[type="submit"]').click()
        cy.wait(3000)
        
        cy.contains('Závislosť sprístupnenia úloh').find('.fa').click()
        cy.get('[type="radio"]').eq(0).check({force: true})
        cy.get('[type="submit"]').click()

        ////Časovo limitované školenie
        cy.contains('Časovo limitované školenie - hodnoty pre odovzdanie úloh').find('.fa').click()
        cy.get('.form-control').clear().type(1.50)
        cy.get('[type="submit"]').click()

        ////Termíny na vyhodnotenie úloh
        cy.get('.nav-link').contains('Nastavenia').click()
        cy.contains('Termíny na vyhodnotenie úloh').find('a').click()
        cy.get('[name="EvaluationSoftDeadlineAt"]').as('ontime') 
        cy.get('@ontime').clear().type(5)
        cy.get('[name="EvaluationDeadlineAt"]').as('deadline') 
        cy.get('@deadline').clear().type(8)
        cy.get('[type="submit"]').click()
    
        //Kontrola dát
        cy.contains('Termíny na vyhodnotenie úloh').find('a').click()
        cy.get('@ontime').should('have.value', '5')
        cy.get('@deadline').should('have.value', '8')

        ////Limity pre opakované akcie
        cy.contains('Limity pre opakované akcie').find('.fa-plus-square').click()
        cy.get('[name="TestOpenRepeatLimit"]').as('repeat')  
        cy.get('@repeat').clear().type('6') //Default value = 5
        cy.get('[name="TestAutomatedRepeatLimit"]').as('repeatAuto')
        cy.get('@repeatAuto').clear().type('2') //Default value = 2
        cy.get('.offset-md-1 > .btn-update').click()

        //Kontrola dát
        cy.get('@repeat').should('have.value', '6')
        cy.get('@repeatAuto').should('have.value', '2')

        //Thresholdy inaktivity
        cy.contains('Thresholdy inaktivity').find('.fa').click()
        
        ////Zmena tresholdov
        cy.get('#InactiveLessonsThreshold').as('inactiveLessons') 
        cy.get('@inactiveLessons').clear().type(4) //Default value = 3
        cy.get('#InactivityNotificationInterval').as('inactivityNot') 
        cy.get('@inactivityNot').clear().type(8) //Default value = 7
        cy.get('#InactivityStudentNotificationThreshold').as('inactivityStudentTresh')
        cy.get('@inactivityStudentTresh').clear().type(8) //Default value = 7
        cy.get('#InactivityStudentNotificationInterval').as('inactivityStudentInter') 
        cy.get('@inactivityStudentInter').clear().type(4) //Default value = 3
        cy.get('[type="submit"]').click()

        //Kontrola dát
        cy.get('@inactiveLessons').should('have.value', '4')
        cy.get('@inactivityNot').should('have.value', '8')
        cy.get('@inactivityStudentTresh').should('have.value', '8')
        cy.get('@inactivityStudentInter').should('have.value', '4')
    });
  });
});