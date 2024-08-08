import { retrieveHodnotenieDataAndPushToJson } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import { compareCalculatedHodnotenieDataWithDataOnPortalStudent } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';
import { retrieveDisciplinaDataAndPushToJsonStudentAndCompare } from '/cypress/e2e/MAROS/metriky_funkcie_file.cy.js';

describe('Student', function() {
  
    beforeEach(() => {
        cy.loginStudent('cy.student1', 'ML_heslo1');
        cy.viewport(1920, 937)
        cy.visit('https://dev.metis.academy/portal')
        cy.get('[title="PO predmet AAA_PT"]').parent().parent().find('img').click()

    })

    
    it('Metriky Hodnotenie 1 student', function() {
        //vypocet percent hodnotenie 1 student 
        retrieveHodnotenieDataAndPushToJson()
    
        //porovna percento nad grafom a percenta v grafe 1 student
        compareCalculatedHodnotenieDataWithDataOnPortalStudent()

    });


    

    it('Metriky Disciplina 1 student', function() {
        //vypocet percent disciplina 1 student 
        cy.wait(1000)
        retrieveDisciplinaDataAndPushToJsonStudentAndCompare()

    });




})  