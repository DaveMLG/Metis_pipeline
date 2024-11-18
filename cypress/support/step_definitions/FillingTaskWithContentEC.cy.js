const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");


When('I verify that {string} and page title is the same', (title) => {
  cy.get('#Title').should('be.visible').and('not.be.disabled');
  cy.wait(2000);
  cy.get('#Title').clear().type(title).should('have.value', title);
  cy.get('.page-title').invoke('text').then((text) => {
    cy.wrap(text.trim()).should('equal', title);
  });
});

When('I verify that Checkbox Use lesson Name is clickable', () => {

  cy.get("af-checkbox[name='useLessonName']")
    .should('be.visible')
    .should('not.be.disabled')

})

When('I verify that Type is not empty', () => {

  cy.get('form[name="basicParamForm"] div[class="col-md-10"] span').should('be.visible').and('not.be.empty')

})

When('I verify that each language option is clickable', () => {
  const languages = ['Čeština', 'English', 'Slovenčina'];
  languages.forEach((language) => {
    cy.get('af-radio span.custom-control-label').contains(language).should('be.visible').click();
  });
});


When('I verify that Duration of student is enabled', () => {

  cy.get('#LengthInTime').should('be.visible').and('be.enabled').and('not.equal', '0:00')
})

When('I verify that Duration of corrector is disabled', () => {

  cy.get('#EstimateTimeForEvaluationInTime').should('be.visible').and('be.disabled').and('not.equal', '0:00')
})


When('I verify that XP points are not empty', () => {

  cy.get('form[name="otherParamForm"] div[class="col-md-10"] span')
    .should('be.visible').and('not.be.empty').and('not.equal', 'null')
})

When('I verify that Radio button DifficultyLevel is clickable', () => {

  cy.get('span[class="custom-control-label"]').contains('Nízka').should('be.visible').and('not.be.disabled')
  cy.get('span[class="custom-control-label"]').contains('Stredná').should('be.visible').and('not.be.disabled')
  cy.get('span[class="custom-control-label"]').contains('Vysoká').should('be.visible').and('not.be.disabled')

})

When('I verify that Select box Metric category is enabled', () => {

  cy.get('select[class="form-control ng-untouched ng-pristine ng-valid"]').find('option').each(($option) => {
    cy.wrap($option).should('not.be.disabled')
  })

})
When('I verify that Checkbox Is Time Limited Task is clickable', () => {

  cy.get("af-checkbox[name='IsTimeLimitedTask']")
    .should('be.visible')
    .should('not.be.disabled')

})

When('I verify that Checkbox Not mandatory is clickable', () => {

  cy.get("af-checkbox[name='NotMandatory']")
    .should('be.visible')
    .should('not.be.disabled')

})
When('I verify that Author, Content guarantors and Content assistants are not empty', () => {

  cy.get('span.inline-list-item').eq(0).should('be.visible').and('not.be.empty')
  cy.get('span.inline-list-item').eq(1).should('be.visible').and('not.be.empty')
  cy.get('span.inline-list-item').eq(2).should('be.visible').and('not.be.empty')

})
When('I verify that Present in trainings is not empty', () => {
  cy.get('span.inline-list-item').eq(3).should('be.visible').and('not.be.empty')
})


When('I verify that Instructions for student or Description must be filled in', () => {

  //clear instrukcia pre studenta a popis
  cy.get('[name="studentInstruction"]').find('.note-editing-area').type('{selectall}{backspace}')
  cy.get('[name="Description"]').find('.note-editing-area').type('{selectall}{backspace}')
  cy.wait(3000)
  cy.get('[type="submit"]').last().click()
  cy.get('.toast').contains('Musi byť vyplnená inštrukcia pre študenta alebo popis úlohy').should('be.visible')
})

When('I verify that Lecturers internal material is required', () => {
  //clear interny material pre moderátora
  cy.get('[name="lecturerInternalMaterial"]').find('.note-editing-area').type('{selectall}{backspace}')
  cy.get('[type="submit"]').last().click()
  cy.get('.toast').should('be.visible').and('contain', 'Interný materiál pre lektora je povinný')
})

When('I verify that Content is a required field', () => {

  // zadáme interný materiál pre lektora
  cy.get('[name="lecturerInternalMaterial"]').find('.note-editing-area').clear().type('Interný materiál pre moderátora')
  cy.get('[type="submit"]').last().click()
  cy.get('.toast').contains('Musi byť vyplnená inštrukcia pre študenta alebo popis úlohy').should('be.visible')
  // zadáme inštrukciu pre študenta
  cy.get('[name="studentInstruction"]').find('.note-editing-area').clear().type('Inštrukcie pre študenta')
  cy.get('[type="submit"]').last().click()
  cy.get('.toast').contains('OK!').should('be.visible')
  //clear tela ulohy
  cy.get('[name="Content"]').find('.note-editing-area').clear()
  cy.wait(1000)
  cy.get('[type="submit"]').last().click()
  cy.get('.toast').contains('Telo úlohy je povinné pole').should('be.visible')

})

When('I verify that all required fields have been filled', () => {

  //vyplnenie tela ulohy
  cy.get('[name="Content"]').find('.note-editing-area').type('{selectall}{backspace}').type('cypress telo ulohy')
  cy.wait(1000)
  cy.get('[type="submit"]').last().click()
  cy.get('.toast').contains('OK!').should('be.visible')


  //popis ulohy + vymazanie instrukcie pre studenta
  cy.get('[name="studentInstruction"]').find('.note-editing-area').type('{selectall}{backspace}')
  cy.get('[name="Description"]').find('.note-editing-area').clear().type('Popis ulohy')
  cy.get('[type="submit"]').last().click()
  cy.get('.toast').contains('OK!').should('be.visible')
})

When('I verify button Upload file', () => {
  //upload file
  cy.get('.af-file-button').find('input[type=file]').selectFile('cypress/fixtures/obrazky/logo1.png', { force: true })
  cy.get('.checkmark__circle').should('be.visible')
  // dokončiť overenie že zobrazuje nahratú prílohu po fixnutí bugu
  //  cy.get('.mat-mdc-card-content').should

})


//samoštúdium

//automatický test


When('I verify each toast notification message', () => {
  const toastMessages = ['Otázky a odpovede je povinné pole',
    'Najmenej jedna otázka na opýtanie v teste je nutná.',
    'Najmenej jedna otázka v teste je nutná.'];
  toastMessages.forEach((toastMessage) => {
    cy.get('#TestQuestionsText').clear()
    cy.get('[type="submit"]').last().click()
    cy.get('.toast').contains(toastMessage).should('be.visible');
  });
});

When('I fill number of questions in the test', () => {
  cy.get('#TestQuestionsToAsk').type('3')
  cy.get('[type="submit"]').last().click()
  cy.get('.toast').contains('OK!').should('be.visible')

});

When('I verify that Checkbox Answer is Pre is clickable', () => {

  cy.get("af-checkbox[name='AnswerIsPre']")
    .should('be.visible')
    .should('not.be.disabled')
});
When('I verify that Checkbox Is shuffling task enabled is clickable', () => {
  cy.get("af-checkbox[name='IsShufflingTaskEnabled'] ")
    .should('be.visible')
    .should('not.be.disabled')
});
When('I verify that Checkbox Is shuffling answer enabled is clickable', () => {
  cy.get("af-checkbox[name='IsShufflingAnswerEnabled']")
    .should('be.visible')
    .should('not.be.disabled')
});

//Preferenčný test

When('I verify each toast notification message Preference test', () => {
  const toastMessages = [
    'Najmenej jedna otázka na opýtanie v teste je nutná.',
    'Otázky a odpovede je povinné pole'];
  toastMessages.forEach((toastMessage) => {
    cy.get('#TestQuestionsText').clear()
    cy.get('[type="submit"]').last().click()
    cy.get('.toast').contains(toastMessage).should('be.visible');
  });
});