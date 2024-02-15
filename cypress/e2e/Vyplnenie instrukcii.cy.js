/*describe('Product owner', function() {
  
  before(() => {
    cy.visit('https://dev.metis.academy/admin');
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type('skorg1.go');
    cy.get('[name="password"]').type('ML_heslo1');
    cy.get('[type="submit"]').click();
  });

  it('click on pridať', function() {
    cy.viewport(1920, 937);
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click(); 
    cy.get('[href="/admin/elearning/training"]').click();
    cy.get('[placeholder="Kľúčové slovo"]').type("CY pridanie inštrukcií");
    cy.get('[type="submit"]').click();
    cy.contains('CY pridanie inštrukcií').click();
    cy.get('.nav-link').contains('Inštrukcie').click();
  

cy.get('.tableFloatingHeaderOriginal > tr').each(($row, rowIndex) => {

  cy.get(`:nth-child(${rowIndex + 1}) > .text-center > .btn`).click();

  cy.get(':nth-child(2) > .ng-untouched > .note-editor > .note-editing-area > .note-editable').type('moderator' + (rowIndex + 1));
  cy.get(':nth-child(4) > .ng-untouched > .note-editor > .note-editing-area > .note-editable').type('student' + (rowIndex + 1));
  cy.get(':nth-child(7) > .ng-untouched > .note-editor > .note-editing-area > .note-editable').type('instructor' + (rowIndex + 1));

  cy.get('.offset-md-1 > .btn-insert').click();
  cy.wait(2000);
  cy.get('.toast').contains('OK!').should('be.visible');

  cy.get('.offset-md-1 > .btn-back').click();

  cy.get(`.tableFloatingHeaderOriginal > tr`).eq(rowIndex + 1).then(($nextRow) => {
      if ($nextRow.length > 0) {
          cy.go(-1);
      }
  });
});


     
});});
*/

describe('Product owner', function() {
  
  before(() => {
    cy.visit('https://dev.metis.academy/admin');
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type('skorg1.go');
    cy.get('[name="password"]').type('ML_heslo1');
    cy.get('[type="submit"]').click();
  });

  it('malo by to kilknuť "Pridať" ', function() {
    cy.viewport(1920, 937);
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click(); 
    cy.get('[href="/admin/elearning/training"]').click();
    cy.get('[placeholder="Kľúčové slovo"]').type("CY pridanie inštrukcií");
    cy.get('[type="submit"]').click();
    cy.contains('CY pridanie inštrukcií').click();
    cy.get('.nav-link').contains('Inštrukcie').click();
  
    let rowIndex = 1;

    const findAndClickButton = () => {
      cy.get(`:nth-child(${rowIndex}) > .text-center > .btn`).then(($button) => {
          if ($button.length > 0) {
              cy.wrap($button).click({force: true});
          
              cy.get(':nth-child(2) > .ng-untouched > .note-editor > .note-editing-area > .note-editable').type('moderator' + (rowIndex));
              cy.get(':nth-child(4) > .ng-untouched > .note-editor > .note-editing-area > .note-editable').type('student' + (rowIndex));
              cy.get(':nth-child(7) > .ng-untouched > .note-editor > .note-editing-area > .note-editable').type('instructor' + (rowIndex));


              cy.get('.offset-md-1 > .btn-insert').click();
              cy.wait(2000);
              cy.get('.toast').contains('OK!').should('be.visible');
              cy.get('.offset-md-1 > .btn-back').click();
          }
      });
    };

    const findAndClickNextButton = () => {
      rowIndex++;
      findAndClickButton(); 
    };

    const findButtonCount = () => {
      cy.get('.text-center > .btn').then(($buttons) => {
          const buttonCount = $buttons.length;
          const upperLimit = buttonCount + 1; 
         
          for (let i = 1; i < upperLimit; i++) {
              findAndClickNextButton();
          }
      });
    };

    findAndClickButton();
    findButtonCount(); 
  }); 
});
