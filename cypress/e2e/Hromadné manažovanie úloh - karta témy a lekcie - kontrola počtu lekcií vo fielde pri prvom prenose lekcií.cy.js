describe('GARANT', function () {
    beforeEach(() => {
        cy.visit('https://dev.metis.academy/admin');
        cy.viewport(1920, 937);
        cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
        cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
        cy.get('[type="submit"]').should('be.visible');
        cy.get('[type="submit"]').should('be.visible');
        cy.get('[name="userName"]').type('cy.go');
        cy.get('[name="password"]').type('ML_heslo1');
        cy.get('[type="submit"]').click();
    });

    it("Hromadné manažovanie úloh - karta témy a lekcie - kontrola počtu lekcií vo fielde pri prvom prenose lekcií", function () {
        let values = [];
        let finalValue

        cy.get('.page-sidebar-wrapper').find('li').find('i').eq(1).click();
        cy.get('li.open > af-sub-menu > .sub-menu > :nth-child(5) > a').click();
        cy.get('.af-table-pager-counts > :nth-child(3)').click();
        cy.wait(3000);
        cy.get('[type = "text"]').first().clear().type('G Manažovanie úloh AAA');
        cy.get('[type="submit"]').first().click();
        cy.contains('G Manažovanie úloh AAA').click();
        cy.wait(3000);
        cy.get(':nth-child(5) > .nav-link').click().wait(2000);

        cy.get('[type="radio"]').eq(2).check({ force: true });
        cy.get('[name="addExercisesSelectedTraining"]').select('G Manažovanie úloh AAA_2')
        cy.get('[type="button"]').first().click()

        cy.get('[class="btn btn-update btn-primary"]').last().click().wait(2000)
        cy.get('[class="btn btn-update btn-primary"]').last().click()
        cy.get('[type="submit"]').last().click().wait(3000)

        cy.get('tbody').last().find('td:nth-child(5)').each(($el, index, $list) => {
            cy.wrap($el).invoke('text').then((text) => {
                values.push(parseInt(text));
            });
        }).then(() => {
            cy.wait(500).then(() => {
                let maxValue = Math.max(...values);
                finalValue = maxValue
            });
           

        });
        cy.get(':nth-child(2) > .nav-link').click().wait(2000);
        cy.get('[type="number"]').then((checker) => {
            cy.wrap(checker).invoke('val').should('eq', String(finalValue)) 
        })
    });
});
