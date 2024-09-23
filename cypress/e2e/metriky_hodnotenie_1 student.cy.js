import { retrieveHodnotenieDataAndPushToJson } from '/cypress/e2e/metriky_funkcie_file.cy.js';
import { compareCalculatedHodnotenieDataWithDataOnPortalStudent } from '/cypress/e2e/metriky_funkcie_file.cy.js';
import { retrieveDisciplinaDataAndPushToJsonStudentAndCompare } from '/cypress/e2e/metriky_funkcie_file.cy.js';

describe('Student', function() {
  
    beforeEach(() => {
        cy.loginStudent(Cypress.env('loginStudent1'), Cypress.env('password'));
        
        cy.visit(Cypress.env('websiteUrl'))
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