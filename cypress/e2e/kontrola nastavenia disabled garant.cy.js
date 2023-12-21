describe('Garant obsahu', function() {
    before(() => {
      cy.visit('https://dev.metis.academy/admin')
        cy.get('[class="btn btn-navigate btn-block"]').should('be.visible')
        cy.get('[class="btn btn-navigate btn-block"]').eq(0).click()
        cy.get('[type="submit"]').should('be.visible')
        cy.get('[type="submit"]').should('be.visible')
        cy.get('[name="userName"]').type('skorg1.go')
        cy.get('[name="password"]').type('ML_heslo1')
        cy.get('[type="submit"]').click()

        cy.viewport(1920, 937)
        cy.get('.icon-menu-elearning').click()
        cy.get('[href="/admin/elearning/training"]').click()
        cy.get('[placeholder="Kľúčové slovo"]').type('vsetky typy uloh TEST')
        cy.get('[type="submit"]').contains('Hľadať').click()
        cy.contains('vsetky typy uloh TEST').click()
        cy.wait(1000)

        cy.get('.nav-link').contains('Nastavenia').click()



    })

    it('Kontrola nastavenia disabled pre garanta', function() {
        cy.wait(1000)
       
        cy.get('.fa-plus-square').each(($el) => {
          cy.wrap($el).click();
        });
    
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
        

        

        for (let i = 1; i <= 4; i++) {
          cy.get('th').contains('Kategória').parent().parent().parent().find('td').eq(i).find('.form-control').should('be.disabled');
        }



        

        for (let i = 1; i <= 6; i++) {
          cy.contains('1. Dostupnosť úloh v aktivite:').parent().parent().find('td').eq(i).find('.form-control').should('be.disabled');
        }

        
        for (let i = 1; i <= 6; i++) {
          cy.contains('2. Časové hodnoty pre vypracovanie úloh načas:').parent().parent().find('td').eq(i).find('.form-control').should('be.disabled');
        }


        
        for (let i = 1; i <= 6; i++) {
          cy.contains('3. Časové hodnoty pre vypracovanie úloh v termíne:').parent().parent().find('td').eq(i).find('.form-control').should('be.disabled');
        }




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
        


        cy.get('[name="exerciseAccessDependency1"]').should('be.disabled')
        cy.get('[name="exerciseAccessDependency2"]').should('be.disabled')
        cy.get('[name="exerciseAccessDependency3"]').should('be.disabled')

        cy.get('[name="TimeLimitedCoefficient"]').should('be.disabled')


        cy.get('[name="EvaluationSoftDeadlineAt"]').should('be.disabled')
        cy.get('[name="EvaluationDeadlineAt"]').should('be.disabled')


        cy.get('[name="TestAutomatedRepeatLimit"]').should('be.disabled')
        cy.get('[name="TestOpenRepeatLimit"]').should('be.disabled')


        cy.get('[name="InactiveLessonsThreshold"]').should('be.disabled')
        cy.get('[name="InactivityNotificationInterval"]').should('be.disabled')
        cy.get('[name="InactivityStudentNotificationThreshold"]').should('be.disabled')
        cy.get('[name="InactivityStudentNotificationInterval"]').should('be.disabled')



        cy.get('[name="EstimatedTimeForLessonEvaluation"]').should('be.disabled')    
        cy.get('[name="EstimatedLessonDurationForLecturerInTime"]').should('be.disabled')
        cy.get('[name="EstimatedTimeForLessonDevelopment"]').should('be.disabled')


        cy.get('[name="ExerciseOrderType"]').should('be.disabled')
        cy.get('[name="IsTestAllowed"]').find('[type="checkbox"]').should('be.disabled')
        cy.get('[name="TakingTestAfterDeadlinePassedIsBlocked"]').find('[type="checkbox"]').should('be.disabled')
        cy.get('[name="TimeLimitedAllAutomatedTasks"]').find('[type="checkbox"]').should('be.disabled')
        cy.get('[name="TimeToCreateCalendarEventsInHours"]').should('be.disabled')
        cy.get('[name="TimeToCreateCalendarEventsInMinutes"]').should('be.disabled')






        
      })

  
})
