import { retrieveHodnotenieDataAndPushToJsonStudent2 } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import { compareCalculatedHodnotenieDataWithDataOnPortalStudent } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import { compareCalculatedHodnotenieDataWithDataOnPortalSkupina } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import { retrieveDisciplinaDataAndPushToJsonStudent2AndCompare } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import { compareCalculatedDisciplinaDataWithDataOnPortalSkupina } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';


describe('Student', function() {
  
    beforeEach(() => {
        cy.loginStudent('cy.student3', 'ML_heslo1');
        cy.viewport(1920, 937)
        cy.visit(Cypress.env('websiteUrl'))

    })

    
it('Metriky hodnotenie student', function() {
    //vypocet percenta nad grafom hodnotenie 1 student 
    retrieveHodnotenieDataAndPushToJsonStudent2()

    cy.wait(2000)
    compareCalculatedHodnotenieDataWithDataOnPortalStudent()
         

})


it('Metriky hodnotenie skupina', function() {
    
    
    cy.wait(1000)

    compareCalculatedHodnotenieDataWithDataOnPortalSkupina()

})


it('Metriky disciplina student', function() {
    
    cy.wait(1000)
    retrieveDisciplinaDataAndPushToJsonStudent2AndCompare()
})


it('Metriky disciplina skupina', function() {
    
    cy.wait(1000)


    compareCalculatedDisciplinaDataWithDataOnPortalSkupina()

})

    
})  