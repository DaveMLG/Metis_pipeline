const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

When('I navigate to "Content" and select "Trainings"', () => {
  cy.get('.icon-menu-elearning').click()
  cy.get('[href="/admin/elearning/training"]').click()
})

When('I search for the training and click on the training name "G training AAA"', () => {
  cy.get('.table-cell-data').contains('G training AAA').click();
  cy.wait(1000)

  cy.get('.nav-link').contains('Obsah').click()
  cy.get('tr[id^="exercise"]').should('be.visible');
})

When('I find the task "Webinar" and click "Edit"', () => {

  cy.wait(1000)
  cy.get('tbody').find('tr').contains('Web').then(edit => {
    cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
  })
})
When('I fill in "Title"', () =>{
  
  cy.get('#Title').clear().type('Webinár')
})

When('I click on "select a language"', () => {

  cy.get('span[class="custom-control-label"]').contains('Slovenčina').click()

})

When('I fill in "Instructions for lecturer"', () => {

  cy.get('[name="lecturerInstruction"]').find('.note-editing-area').type('{selectall}{backspace}').type('Inštrukcie pre lektora')
})
When('I fill in "Instructions for corrector"', () => {

  cy.get('[name="correctorInstruction"]').find('.note-editing-area').clear().type('Inštrukcie pre opravovača')

})
When('I fill in "Internal material for lecturer"', () => {

  cy.get('[name="lecturerInternalMaterial"]').find('.note-editing-area').clear().type('Interný materiál pre moderátora')
})

When('I fill in "Instructions for student"', () => {

  cy.get('[name="studentInstruction"]').find('.note-editing-area').clear().type('Inštrukcie pre študenta')

})

When('I fill in "Description"', () => {

  cy.get('[name="Description"]').find('.note-editing-area').clear().type('Popis ulohy')
})

When('I fill in "Content"', () => {
  cy.get('[name="Content"]').find('.note-editing-area').clear().type('cypress telo ulohy')
})

When('I click on button "Upload file"', () => {
  //upload file
  cy.get('.af-file-button').find('input[type=file]').selectFile('cypress/fixtures/obrazky/logo1.png', { force: true })
  
})


Then('I click on button "Save"', () => {

  cy.get('[type="submit"]').last().click()
  cy.get('.toast').contains('OK!').should('be.visible')
})




