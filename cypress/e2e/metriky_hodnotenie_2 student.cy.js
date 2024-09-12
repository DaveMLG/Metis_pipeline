import { retrieveHodnotenieDataAndPushToJsonStudent2 } from '/cypress/e2e/metriky_funkcie_file.cy.js';
import { compareCalculatedHodnotenieDataWithDataOnPortalStudent } from '/cypress/e2e/metriky_funkcie_file.cy.js';
import { compareCalculatedHodnotenieDataWithDataOnPortalSkupina } from '/cypress/e2e/metriky_funkcie_file.cy.js';
import { retrieveDisciplinaDataAndPushToJsonStudent2AndCompare } from '/cypress/e2e/metriky_funkcie_file.cy.js';
import { compareCalculatedDisciplinaDataWithDataOnPortalSkupina } from '/cypress/e2e/metriky_funkcie_file.cy.js';


describe('Student2', function() {
  
    beforeEach(() => {
        cy.loginStudent('cy.student2', 'ML_heslo1');
        cy.viewport(1920, 937)
        cy.visit('https://dev.metis.academy/portal/subject/1934')
        //cy.get('[title="PO predmet AAA_PT"]').parent().parent().find('img').click()

    })
    

    
it('Metriky hodnotenie student2', function() {
    //vypocet percenta nad grafom hodnotenie 1 student 
    retrieveHodnotenieDataAndPushToJsonStudent2()

    cy.wait(2000)
    compareCalculatedHodnotenieDataWithDataOnPortalStudent()
         

})


it('Metriky hodnotenie skupina', function() {
    
    
    cy.wait(5000)

    compareCalculatedHodnotenieDataWithDataOnPortalSkupina()

})


it('Metriky disciplina student2', function() {
    
    cy.wait(1000)
    retrieveDisciplinaDataAndPushToJsonStudent2AndCompare()
})


it('Metriky disciplina skupina', function() {
    
    cy.wait(1000)


    compareCalculatedDisciplinaDataWithDataOnPortalSkupina()

})

})
