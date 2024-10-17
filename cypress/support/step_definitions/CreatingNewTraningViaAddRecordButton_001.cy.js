const { Given, When } = require("@badeball/cypress-cucumber-preprocessor");

describe('Garant obsahu', function() {
  Given('Visit the landing page & Log in', () => {
    cy.visit(Cypress.env('websiteUrl'));
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type(Cypress.env('loginGO'));
    cy.get('[name="password"]').type(Cypress.env('password'));
    cy.get('[type="submit"]').click();
  })

  When('Navigate to settings of G školenie AAA training', () => {
    cy.wait(1000)
      cy.get('.icon-menu-elearning').click()
      cy.get('[href="/admin/elearning/training"]').click()
      
      cy.get('.table-cell-data').each(($cell) => {
        const cellText = $cell.text();
      
        if (cellText.includes("G školenie AAA")) {
          cy.wrap($cell).click();
          return false; 
        } else if (cellText.includes("G školenie BBB")) {
          cy.wrap($cell).click();
          return false; 
        }
      });
      cy.get('.nav-link').contains('Nastavenia').click()

  })

  When('Expand all menu items', () => {
    cy.get('.fa-plus-square').each(($el) => {
      cy.wrap($el).click();
    });
  })

  When('Name: Rating coefficients -> Six inputs are visible and analytical table is available', () => {
    cy.get('#TestAutomatedLevelOfDegressiveAssesment').should('be.disabled')
    cy.get('#TestOpenLevelOfDegressiveAssesment').should('be.disabled')
    cy.get('[name="ImportanceCoefficientLevelLow"]').should('be.disabled')
    cy.get('[name="ImportanceCoefficientLevelMedium"]').should('be.disabled')
    cy.get('[name="ImportanceCoefficientLevelHigh"]').should('be.disabled')
    cy.get('[name="ManualTaskMultiplicator"]').should('be.disabled')

    for (let i = 0; i <= 6; i++) {
      cy.get('th').contains('Prefix').parent().parent().parent().find('td').eq(i).then(($cell) => {
          if ($cell.find('.form-control').length > 0) {
            cy.wrap($cell).find('.form-control').should('be.disabled');
          } else if ($cell.find('[type="checkbox"]').length > 0) {
            cy.wrap($cell).find('[type="checkbox"]').should('be.disabled');
          }
        });
    }
  })

  When('Name: Metrics', () => {
    for (let i = 1; i <= 4; i++) {
      cy.get('th').contains('Kategória').parents('table').find('input').eq(i).should('be.disabled');
    }
  })

  
  When('Name: Time values for accessing - executing - submitting tasks', () => {
    for (let i = 1; i <= 6; i++) {
      cy.contains('1. Dostupnosť úloh v aktivite:').parent().parent().find('td').eq(i).find('.form-control').should('be.disabled');
    }

    for (let i = 1; i <= 6; i++) {
      cy.contains('2. Časové hodnoty pre vypracovanie úloh načas:').parent().parent().find('td').eq(i).find('.form-control').should('be.disabled');
    }

    for (let i = 1; i <= 6; i++) {
      cy.contains('3. Časové hodnoty pre vypracovanie úloh v termíne:').parent().parent().find('td').eq(i).find('.form-control').should('be.disabled');
    }
  })

  When('Name: Lesson dates for unmoderated training', () => {
    cy.get('[name="byCoordiantorWithoutEvaluation"]').first().click()

    for (let i = 0; i <= 5; i++) {
      cy.contains('1. Nemoderované bez opravovania úloh:').parent().parent().find('td').eq(i).then(($cell) => {
          if ($cell.find('.form-control').length > 0) {
            cy.wrap($cell).find('.form-control').should('be.disabled');
          } else if ($cell.find('[type="checkbox"]').length > 0) {
            cy.wrap($cell).find('[type="checkbox"]').should('be.disabled');
          }
        });
    }

    cy.get('[name="byStudentWithoutEvaluation"]').first().click()

    for (let i = 0; i <= 5; i++) {
      cy.contains('1. Nemoderované bez opravovania úloh:').parent().parent().find('td').eq(i).then(($cell) => {
          if ($cell.find('.form-control').length > 0) {
            cy.wrap($cell).find('.form-control').should('be.disabled');
          } else if ($cell.find('[type="checkbox"]').length > 0) {
            cy.wrap($cell).find('[type="checkbox"]').should('be.disabled');
          }
        });
    }

    for (let i = 0; i <= 5; i++) {
      cy.contains('2. Nemoderované s opravovaním úloh:').parent().parent().find('td').eq(i).then(($cell) => {
          if ($cell.find('.form-control').length > 0) {
            cy.wrap($cell).find('.form-control').should('be.disabled');
          } else if ($cell.find('[type="checkbox"]').length > 0) {
            cy.wrap($cell).find('[type="checkbox"]').should('be.disabled');
          }
        });
    }
  })

  When('Name: Task availability dependency', () => {
    cy.get('[name="exerciseAccessDependency1"]').should('be.disabled')
    cy.get('[name="exerciseAccessDependency2"]').should('be.disabled')
    cy.get('[name="exerciseAccessDependency3"]').should('be.disabled')
  })

  When('Name: Time-limited training - values for submitting tasks', () => {
    cy.get('[name="TimeLimitedCoefficient"]').should('be.disabled')
  })

  When('Name: Deadlines for evaluating tasks', () => {
    cy.get('[name="EvaluationSoftDeadlineAt"]').should('be.disabled')
    cy.get('[name="EvaluationDeadlineAt"]').should('be.disabled')
  })

  When('Name: Limits for repeat actions', () => {
    cy.get('[name="TestAutomatedRepeatLimit"]').should('be.disabled')
    cy.get('[name="TestOpenRepeatLimit"]').should('be.disabled')
  })

  When('Name: Thresholdy inaktivity', () => {
    cy.get('[name="InactiveLessonsThreshold"]').should('be.disabled')
    cy.get('[name="InactivityNotificationInterval"]').should('be.disabled')
    cy.get('[name="InactivityStudentNotificationThreshold"]').should('be.disabled')
    cy.get('[name="InactivityStudentNotificationInterval"]').should('be.disabled')
  })

  When('Name: Thresholds for lesson duration', () => {
    cy.get('[name="EstimatedTimeForLessonEvaluation"]').should('be.disabled')    
    cy.get('[name="EstimatedLessonDurationForLecturerInTime"]').should('be.disabled')
    cy.get('[name="EstimatedTimeForLessonDevelopment"]').should('be.disabled')
  })

  When('Name: The rest', () => {
    cy.get('[name="ExerciseOrderType"]').should('be.disabled')
    cy.get('[name="IsTestAllowed"]').find('[type="checkbox"]').should('be.disabled')
    cy.get('[name="TakingTestAfterDeadlinePassedIsBlocked"]').find('[type="checkbox"]').should('be.disabled')
    cy.get('[name="TimeLimitedAllAutomatedTasks"]').find('[type="checkbox"]').should('be.disabled')
    cy.get('[name="TimeToCreateCalendarEventsInHours"]').should('be.disabled')
    cy.get('[name="TimeToCreateCalendarEventsInMinutes"]').should('be.disabled')
  })
})

    it.skip('Vytvorenie nového školenia cez btn Pridať záznam', function() {
        cy.wait(500)
        cy.get('.icon-menu-elearning').click()
        cy.get('[href="/admin/elearning/training"]').click()
        cy.get('[type="button"]').contains('Pridať záznam').click()
        cy.wait(1000)

        //Pokúsi sa vytvoriť školenie bez toho, aby bol garant obsahu vyplnený, jazyk zvolený a bez loga

        cy.get('[type="submit"]').click()
        cy.get('.toast').contains('Názov školenia je povinný údaj.').should('be.visible')    
        cy.get('.toast').contains('Názov na portáli je povinný údaj.').should('be.visible')    
        cy.get('.toast').contains('Jazyk nie je vyplnený.').should('be.visible')    
        cy.get('.toast').contains('Popis pri prejdení myšou je povinný údaj.').should('be.visible')    

        //doplnenie udajov a zobrazenie dalsich toast
        //cz0 en1 sk2 eq
        //CCC kontrola line 45
        cy.get('#Title').type('G školenie AAA')
        cy.wait(1000)
        cy.get('#PortalTitle').type('G školenie AAA') 
        cy.wait(1000)
        cy.get('[name^="languageId"]').parent().eq(2).click()
        cy.get('[name="HoverDescription"]').find('.note-editable').type('Toto je popis pri prejdení myšou')
        cy.get('[type="submit"]').click()

        cy.get('.toast').contains('Typ školenia nemá správnu hodnotu.').should('be.visible')    
        cy.get('.toast').contains('Logo je povinný údaj.').should('be.visible')    

        
        //doplnenie udajov
        cy.wait(5000)
        cy.get('[name^="trainingType"]').parent().eq(0).click()
        cy.get('input#LogoUrl').attachFile('/obrazky/logo1.png')
        cy.wait(1000)
        cy.get('.checkmark__circle').should('be.visible') 
        cy.get('[type="submit"]').click()
        cy.get('[name = "selectedProductOwner"]').select(Cypress.env('vocy')).next().click()

        cy.get('[type="submit"]').click()
        cy.get('.toast').contains('Školenie s týmto názvom už existuje!').should('be.visible')    
        cy.get('#Title').clear().type('G školenie AAA')
        
        cy.get('[type="submit"]').click()


    })  

   
