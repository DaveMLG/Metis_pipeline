describe('Product owner', function () {

    beforeEach(() => {
        cy.visit('https://dev.metis.academy/admin');
        cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
        cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
        cy.get('[type="submit"]').should('be.visible');
        cy.get('[name="userName"]').type('cy.k');
        cy.get('[name="password"]').type('ML_heslo1');
        cy.get('[type="submit"]').click();
    });

    it('Vytvorenie nového ST s jedným školením', function () {
        // Uloží data z popisu
        let DataValues = {};

        // Uloží data z nastavenia
        cy.viewport(1920, 937);
        cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
        cy.get('@nastavenia').click();
        cy.get('[href="/admin/elearning/subject"]').click();
        cy.get('[placeholder="Kľúčové slovo"]').type('PO predmet AAA');
        cy.get('[global-search="search"]').click();
        
        cy.get('tbody').find('a').first().click().wait(3000);

       /* cy.get('[name="IsOnlineEducationMethod"]').find('[type="radio"]:checked').invoke('val').then((eduMethod) => {
            DataValues.Educational_method = eduMethod;
        });

        cy.get('[name="IsDailyEducationIntensity"]').find('[type="radio"]:checked').invoke('val').then((intMethod) => {
            DataValues.Intensity_method = intMethod;
        });

        
        cy.get('[for="Coordinators"]').parent().parent().find('span').last().invoke('text').then((coordinators) => {
            DataValues.coordinator = coordinators.trim();
        });

        cy.get('[for="AcademicAdministrators"]').parent().parent().find('span').last().invoke('text').then((acad_admins) => {
            DataValues.acad_admin = acad_admins.trim();
        });
        */

        cy.get('[class="nav-item"]').last().click();

        cy.get('table').first().find('[type="number"]').each(($el, index) => {
            cy.wrap($el).invoke('val').then((gradeValue) => {
                DataValues[`gradeValue_${index}`] = gradeValue;
            });
        });

        cy.wait(3000)
        cy.get('[class="nav-item"]').first().click();

        cy.get('[class="fa fa-plus margin-icon"]').click().wait(3000);
        cy.get('[tabindex="0"]').first().click().wait(5000);

        cy.get('[class="chip-container"]').invoke('text').then((timeZoneChipset) => {
            cy.get('[display="displayName"]').next().invoke('text').then((timeZone) => {
                const cleanTimeZoneChipset = timeZoneChipset.replace(/\u00a0/g, ' ').trim();
                const cleanTimeZone = timeZone.replace(/\u00a0/g, ' ').trim();
                cy.wrap(cleanTimeZoneChipset).should('eq', cleanTimeZone);
            });
        });

        cy.get('[name="Title"]').clear().type('G ST s jedným školením AAA');

        cy.get('[class="input-group-append"]').first().click().wait(1000);
        cy.get('[class="mat-calendar-body-cell-content mat-focus-indicator mat-calendar-body-today"]').click();

        cy.get('[class="icons-d1"]').last().click().wait(1000);
        cy.get('[class="mat-calendar-body-cell-content mat-focus-indicator mat-calendar-body-today"]').click();

        cy.get('[id="Capacity"]').clear().type(10);

        cy.get('[name="selectedLecturer"]').select('l, cy').next().click();
        cy.get('[name="selectedAdmin"]').select('av, cy').next().click();
        cy.get('[name="selectedEditor"]').select('et, cy').next().click();
        cy.get('[name="selectCorrector"]').select('co, cy').next().click();

        cy.get('[type="submit"]').first().click().wait(5000);

        //Kontrola dát
        cy.get('[href="/admin/training-term/subject-term"]').click().wait(5000)
        cy.get('[placeholder="Kľúčové slovo"]').type('G ST s jedným školením AAA');
        cy.get('[global-search="search"]').click().wait(3000)
        cy.get('tbody').find('a').first().click().wait(3000);
            
       /* cy.get('[name="IsOnlineEducationMethod"]').find('[type="radio"]:checked').invoke('val').then((eduMethod) => {
            expect(eduMethod).to.equal(DataValues.Educational_method);
        });

        cy.get('[name="IsDailyEducationIntensity"]').find('[type="radio"]:checked').invoke('val').then((intMethod) => {
            expect(intMethod).to.equal(DataValues.Intensity_method);
        });

        
        cy.get('[for="Coordinators"]').parent().parent().find('span').last().invoke('text').then((coordinators) => {
            expect(coordinators.trim()).to.equal(DataValues.coordinator);
        });

        cy.get('[for="AcademicAdministrators"]').parent().parent().find('span').last().invoke('text').then((acad_admins) => {
            expect(acad_admins.trim()).to.equal(DataValues.acad_admin);
        });
        */

        cy.get('[class="nav nav-tabs ng-star-inserted"]').find('li').last().click().wait(3000);

        //Treba doplniť do tabulky number
        /*
        cy.get('table').last().find('[type="number"]').each(($el, index) => {
            cy.wrap($el).invoke('val').then((gradeValue) => {
                expect(gradeValue).to.equal(DataValues[`gradeValue_${index}`]);
            });
        });
        */
    });

   /* it('Vytvorenie nového ST s s viacerými školeniami', function () {

        // Uloží data z popisu
        let DataValues = []

        // Uloží data z nastavenia
        cy.viewport(1920, 937);
        cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
        cy.get('@nastavenia').click();
        cy.get('[href="/admin/elearning/subject"]').click();
        cy.get('[placeholder="Kľúčové slovo"]').type('PO CY Predmet s viacerými školeniami');
        cy.get('[global-search="search"]').click()    
        cy.get('tbody').find('a').first().click().wait(3000)


        cy.get('[class="form-group"]').find('[type=radio]')

        cy.get('[name="IsOnlineEducationMethod"]').find('[type="radio"]:checked').invoke('val').then((eduMethod) => {
            DataValues.Educational_method = eduMethod;
        });

        cy.get('[name="IsDailyEducationIntensity"]').find('[type="radio"]:checked').invoke('val').then((intMethod) => {
            DataValues.Intensity_method = intMethod;
        });

         /*
        cy.get('[for="Coordinators"]').parent().parent().find('span').last().invoke('text').then((coordinators) => {
            DataValues.coordinator = coordinators.trim();
        });

        cy.get('[for="AcademicAdministrators"]').parent().parent().find('span').last().invoke('text').then((acad_admins) => {
            DataValues.acad_admin = acad_admins.trim();
        });

        cy.get('[class="nav-item"]').last().click();

        cy.get('table').first().find('[type="number"]').each(($el, index) => {
            cy.wrap($el).invoke('val').then((gradeValue) => {
                DataValues[`gradeValue_${index}`] = gradeValue;
            });
        });

        cy.get('[class="nav-item"]').first().click()

        cy.get('[class="fa fa-plus margin-icon"]').click().wait(3000);
        cy.get('[id="Title"]').clear().type('PO CY TT s viacerými školeniami');

        cy.get('[type="submit"]').first().click();


        //Kontrola dát
        cy.get('[name="IsOnlineEducationMethod"]').find('[type="radio"]:checked').invoke('val').then((eduMethod) => {
            expect(eduMethod).to.equal(DataValues.Educational_method);
        });

        cy.get('[name="IsDailyEducationIntensity"]').find('[type="radio"]:checked').invoke('val').then((intMethod) => {
            expect(intMethod).to.equal(DataValues.Intensity_method);
        });

        /*
        cy.get('[for="Coordinators"]').parent().parent().find('span').last().invoke('text').then((coordinators) => {
            expect(coordinators.trim()).to.equal(DataValues.coordinator);
        });

        cy.get('[for="AcademicAdministrators"]').parent().parent().find('span').last().invoke('text').then((acad_admins) => {
            expect(acad_admins.trim()).to.equal(DataValues.acad_admin);
        });
        /*

        cy.get('[class="nav nav-tabs ng-star-inserted"]').find('li').last().click().wait(3000);

        //Treba doplniť do tabulky number
        /*
        cy.get('table').last().find('[type="number"]').each(($el, index) => {
            cy.wrap($el).invoke('val').then((gradeValue) => {
                expect(gradeValue).to.equal(DataValues[`gradeValue_${index}`]);
            });
        });
        
  });*/
})
