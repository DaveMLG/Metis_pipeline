describe('Product owner', function () {
    beforeEach(() => {
        cy.visit('https://dev.metis.academy/admin');
        cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
        cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
        cy.get('[type="submit"]').should('be.visible');
        cy.get('[type="submit"]').should('be.visible');
        cy.get('[name="userName"]').type('skorg1.go');
        cy.get('[name="password"]').type('ML_heslo1');
        cy.get('[type="submit"]').click();
        cy.viewport(1920, 937);
    });
  
    it('Skopírovanie dát zo školenia, ktoré budeme hromadne manažovať', function () {
        // Uloží data z popisu
       let topic = [],
           lesson = []
  
        cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
        cy.get('@nastavenia').click();
        cy.get('[href="/admin/elearning/training"]').click();
        cy.wait(3000);
        cy.get('[placeholder="Kľúčové slovo"]').type('CY presun úloh v rámci školenia');
        cy.get('[type="submit"]').first().click().wait(1000);
        cy.get('tbody').find('a').first().click().wait(1000)
        cy.get(':nth-child(5) > .nav-link').click();
        
        cy.get('tbody').eq(3).find('tr').then((rows) => {
            for (let x = 0; x < rows.length; x++) {
                cy.wrap(rows[x]).find('td:nth-child(3)').invoke('text').then((value) => {
                    topic.push(value);
                });
            }
        });

        cy.get('tbody').eq(3).find('tr').then((rows) => {
            for (let x = 0; x < rows.length; x++) {
                cy.wrap(rows[x]).find('td:nth-child(4)').invoke('text').then((value) => {
                    lesson.push(value);
                });
            }
        });

        cy.get('[type = radio]').eq(3).check({force: true})
        cy.get('[name="addExercisesSelectedTheme"]').select('1. Téma_1')
        cy.get('[name="addExercisesSelectedLesson"]').select('1. Lekcia_1')
        cy.get('[name="intoSelectTheme"]').select('2. Téma_2')
        cy.get('[type="button"]').first().click()
        cy.get('[type="button"]').last().click()

        //Overenie či test téma a lekcia sa zmenila na hodnotu 2
        cy.get('tbody').last().find('tr').then((rows) => {
            for (let x = 0; x < rows.length; x++) {
                cy.wrap(rows[x]).find('td:nth-child(3)').invoke('text').then((value) => {
                    cy.wrap(value).should('eq', '2')
                });
            }
        });

        cy.get('tbody').last().find('tr').then((rows) => {
            for (let x = 0; x < rows.length; x++) {
                cy.wrap(rows[x]).find('td:nth-child(4)').invoke('text').then((value) => {
                    cy.wrap(value).should('eq', '2')
                });
            }
        });

        //Overenie, či dáta sa nerovnajú s dátami v premenných
        cy.get('tbody').last().find('tr').then((rows) => {
            for (let x = 0; x < rows.length; x++) {
                cy.wrap(rows[x]).find('td:nth-child(3)').invoke('text').then((value) => {
                    cy.wrap(value).should('not.eq', topic[x])
                });
            }
        });

        cy.get('tbody').last().find('tr').then((rows) => {
            for (let x = 0; x < rows.length; x++) {
                cy.wrap(rows[x]).find('td:nth-child(4)').invoke('text').then((value) => {
                    cy.wrap(value).should('not.eq', topic[x])
                });
            }
        });
    })
})