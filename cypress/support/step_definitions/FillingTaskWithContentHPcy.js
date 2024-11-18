const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given('I navigate to the admin page', () => {
  cy.visit(Cypress.env('websiteUrl'));
});

When('I visit the landing page and log in as a content guarantor', () => {
  cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
  cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
  cy.get('[type="submit"]').should('be.visible');
  cy.get('[type="submit"]').should('be.visible');
  cy.get('[name="userName"]').type(Cypress.env('loginGO'));
  cy.get('[name="password"]').type(Cypress.env('password'));
  cy.get('[type="submit"]').click();

})

When('I navigate to Content and select Trainings', () => {
  cy.get('.icon-menu-elearning').click()
  cy.get('[href="/admin/elearning/training"]').click()
})

When('I search for the training and click on the training name {string}', (trainingName) => {
  cy.get('.table-cell-data').contains(trainingName).click();
  cy.wait(1000)

  cy.get('.nav-link').contains('Obsah').click()
  cy.get('tr[id^="exercise"]').should('be.visible');
})


When('I find the task {string} and click Edit', (exerciseName) => {
  cy.wait(1000);
  cy.get(`input[exercise-title="${exerciseName}"]`).then(edit => {
    cy.wrap(edit).parents('tr').contains('Editovať').click({force: true});
  });
});

When('I fill in Title {string}', (exerciseName) =>{
  
  cy.get('#Title').clear().type(exerciseName)
})

When('I click on select a language', () => {

  cy.get('span[class="custom-control-label"]').contains('Slovenčina').click()

})

When('I fill in Instructions for lecturer', () => {

  cy.get('[name="lecturerInstruction"]').find('.note-editing-area').type('{selectall}{backspace}').type('Inštrukcie pre lektora')
})
When('I fill in Instructions for corrector', () => {

  cy.get('[name="correctorInstruction"]').find('.note-editing-area').clear().type('Inštrukcie pre opravovača')

})
When('I fill in Internal material for lecturer', () => {

  cy.get('[name="lecturerInternalMaterial"]').find('.note-editing-area').clear().type('Interný materiál pre moderátora')
})

When('I fill in Instructions for student', () => {

  cy.get('[name="studentInstruction"]').find('.note-editing-area').clear().type('Inštrukcie pre študenta')

})

When('I fill in Description', () => {

  cy.get('[name="Description"]').find('.note-editing-area').clear().type('Popis ulohy')
})

When('I fill in Content', () => {
  cy.get('[name="Content"]').find('.note-editing-area').clear().type('cypress telo ulohy')
})

When('I click on button Upload file', () => {
  //upload file
  cy.get('.af-file-button').find('input[type=file]').selectFile('cypress/fixtures/obrazky/logo1.png', { force: true })
  
})


Then('I click on button Save', () => {

  cy.get('[type="submit"]').last().click()
  cy.get('.toast').contains('OK!').should('be.visible')
})

//Samoštúdium


 

  When('I fill in Internal material for Content guarantor', () => {

    cy.get('[name="guarantorInternalMaterial"]').find('.note-editing-area').type('{selectall}{backspace}').type('Interný materiál pre garanta')
  })

//automaticky test



 When('I fill in Questions and answers Automated test', () => {
  cy.get('#TestQuestionsText').clear().type('Preverenie vedomostí nadobudnutých počas samoštúdia \n*Ktoré z nasledujúcich zariadení je prvým počítacím zariadením? \n+Abacus \n-Kalkulačka \n-Turingov stroj \n-Pascalín \n\n*Ktoré z nasledujúcich zariadení je najnovšie? \n-Abacus \n+Kalkulačka \n-Turingov stroj \n-Pascalín \n\n*Ktoré z nižšie uvedených čísel je najmenšie? \n+3,14 \n-22/7 \n-π -Žiadna z uvedených možností nie je správna')
  cy.wait(1000)
 })

 When('I fill the number of questions in the test', () => {
  cy.get('#TestQuestionsToAsk').clear().type('3')
 })

// párovačka

  //vyplnenie tela ulohy
  
  
  When( 'I fill in Matching', () => {
  cy.get('#ImportPairs').selectFile('cypress/fixtures/templates/parovacka.csv', {force: true})
  cy.wait(2000)
  cy.get('.green').contains('Vložiť záznam').click()    
  cy.get('.form-control').eq(-2).type('ahoj')    
  cy.get('.form-control').last().type('hello')    

 
  
})

//Preferenčný test

When('I fill in Questions and answers Preference test', () => {
  cy.get('#TestQuestionsText').clear().type('Preferečný test \n* Ako tráviš volný čas? \n+ sedím pred TV \n+ športujem \n+ vzdelávam sa \n+ hrá hry na PC')
        cy.wait(1000)
 })

//Preklad

When( 'I fill in Matching Translate', () => {
  cy.get('#ImportPairs').selectFile('cypress/fixtures/templates/preklad.csv', {force: true})
cy.wait(2000)
cy.get('.green').contains('Vložiť záznam').click()    
cy.get('.form-control').eq(-2).type('ahoj')    
cy.get('.form-control').last().type('hello')    



})
