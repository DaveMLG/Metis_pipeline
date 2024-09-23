describe('Vlastník obsahu', function() {
    beforeEach(() => {
        cy.loginAdmin('cy.vo', 'ML_heslo1');
       
        cy.visit(Cypress.env('websiteUrl'))
        cy.wait(500);
        cy.get('.icon-menu-elearning').click();
        cy.get('[href="/admin/elearning/training"]').click();
        cy.get('[training-keyword="keyword"]').type('CY testing_AAA');
        cy.get('[global-search="search"]').click();
        cy.wait(1000);
        cy.get('[class="af-table table table-striped table-bordered table-hover table-component"]').contains('Neprevzaté').parent().parent().contains('CY testing_AAA').click();
        cy.get('[class="nav nav-tabs"]').find('li').last().click();
    });

    it('Hromadné vypĺňanie inštrukcií', function() {
        // Vypĺnenie inštrukcie pre lektora (hromadné)
        cy.get('[name="instruction"]').select(1);
        cy.get('[global-search="search"]').click();
        cy.contains('Hromadne pridať inštrukciu').click();
        cy.get('[class="note-editable panel-body"]').type('Inštrukcia pre lektora (hromadná)').wait(1000);
        cy.get('[type="submit"]').contains('Vložiť').click().wait(3000);

        // Kontrola inštrukcií
        cy.get('table').find('tr').then((value) => {
            for (let x = 1; x < value.length; x++) {
                cy.wrap(value).eq(x).find('td').eq(8).invoke('text').then((textVal) => {
                    expect(textVal).to.equal('Inštrukcia pre lektora (hromadná)');
                });
            }
        });

        // Vypĺnanie inštrukcií pre opravovača (hromadné)
        cy.get('[name="instruction"]').select(2);
        cy.get('[global-search="search"]').click();
        cy.contains('Hromadne pridať inštrukciu').click();
        cy.get('[class="note-editable panel-body"]').type('Inštrukcia pre opravovača (hromadná)').wait(1000);
        cy.get('[type="submit"]').contains('Vložiť').click().wait(3000);

        // Kontrola inštrukcií
        cy.get('table').find('tr').then((value) => {
            for (let x = 1; x < value.length; x++) {
                cy.wrap(value).eq(x).find('td').eq(9).invoke('text').then((textVal) => {
                    expect(textVal).to.equal('Inštrukcia pre opravovača (hromadná)');
                });
            }
        });

        // Vypĺnanie inštrukcií pre študenta (hromadné)
        cy.get('[name="instruction"]').select(3);
        cy.get('[global-search="search"]').click();
        cy.contains('Hromadne pridať inštrukciu').click();
        cy.get('[class="note-editable panel-body"]').type('Inštrukcia pre študenta (hromadná)').wait(1000);
        cy.get('[type="submit"]').contains('Vložiť').click().wait(3000);

        // Kontrola inštrukcií
        cy.get('table').find('tr').then((value) => {
            for (let x = 1; x < value.length; x++) {
                cy.wrap(value).eq(x).find('td').eq(10).invoke('text').then((textVal) => {
                    expect(textVal).to.equal('Inštrukcia pre študenta (hromadná)');
                });
            }
        });

        // Hromadné editovanie inštrukcií pre lektora (hromadné)
        cy.get('[name="instruction"]').select(1);
        cy.get('[global-search="search"]').click();
        cy.contains('Hromadne editovať inštrukciu').click();
        cy.get('[class="note-editable panel-body"]').clear().type('Editovaná inštrukcia pre lektora (hromadná)').wait(1000);
        cy.get('[type="submit"]').contains('Uložiť').click().wait(3000);

        // Kontrola inštrukcií
        cy.get('table').find('tr').then((value) => {
            for (let x = 1; x < value.length; x++) {
                cy.wrap(value).eq(x).find('td').eq(8).invoke('text').then((textVal) => {
                    expect(textVal).to.equal('Editovaná inštrukcia pre lektora (hromadná)');
                });
            }
        });

        // Hromadné editovanie inštrukcií pre opravovača (hromadné)
        cy.get('[name="instruction"]').select(2);
        cy.get('[global-search="search"]').click();
        cy.contains('Hromadne editovať inštrukciu').click();
        cy.get('[class="note-editable panel-body"]').clear().type('Editovaná inštrukcia pre opravovača (hromadná)').wait(1000);
        cy.get('[type="submit"]').contains('Uložiť').click().wait(3000);

        // Kontrola inštrukcií
        cy.get('table').find('tr').then((value) => {
            for (let x = 1; x < value.length; x++) {
                cy.wrap(value).eq(x).find('td').eq(9).invoke('text').then((textVal) => {
                    expect(textVal).to.equal('Editovaná inštrukcia pre opravovača (hromadná)');
                });
            }
        });

        // Hromadné editovanie inštrukcií pre študenta (hromadné)
        cy.get('[name="instruction"]').select(3);
        cy.get('[global-search="search"]').click();
        cy.contains('Hromadne editovať inštrukciu').click();
        cy.get('[class="note-editable panel-body"]').clear().type('Editovaná inštrukcia pre študenta (hromadná)').wait(1000);
        cy.get('[type="submit"]').contains('Uložiť').click().wait(3000);

        // Kontrola inštrukcií
        cy.get('table').find('tr').then((value) => {
            for (let x = 1; x < value.length; x++) {
                cy.wrap(value).eq(x).find('td').eq(10).invoke('text').then((textVal) => {
                    expect(textVal).to.equal('Editovaná inštrukcia pre študenta (hromadná)');
                });
            }
        });

        // Hromadné zmazávanie inštrukcií pre lektora
        cy.get('[name="instruction"]').select(1);
        cy.get('[global-search="search"]').click();
        cy.contains('Hromadne vymazať inštrukciu').click();
        cy.contains('Vymazať').click();
        cy.wait(1000);

        // Hromadné zmazávanie inštrukcií pre opravovača
        cy.get('[name="instruction"]').select(2);
        cy.get('[global-search="search"]').click();
        cy.contains('Hromadne vymazať inštrukciu').click();
        cy.contains('Vymazať').click();
        cy.wait(1000);

        // Hromadné zmazávanie inštrukcií pre študenta
        cy.get('[name="instruction"]').select(3);
        cy.get('[global-search="search"]').click();
        cy.contains('Hromadne vymazať inštrukciu').click();
        cy.contains('Vymazať').click();

        // Vyplnenie inštrukcií pre lektora do konkrétnej témy, lekcie, aktivity, typu úlohy a úlohy
        cy.get('[name="instruction"]').select(1);
        cy.get('select').eq(1).select(1);
        cy.get('select').eq(2).select(1);
        cy.get('select').eq(3).select(1);
        cy.get('select').eq(4).select(1);
        cy.get('select').eq(5).select(1);
        cy.get('[global-search="search"]').click();
        cy.contains('Hromadne pridať inštrukciu').click();
        cy.get('[class="note-editable panel-body"]').type('Inštrukcia pre lektora (konkrétny výber)').wait(1000);
        cy.get('[type="submit"]').contains('Vložiť').click().wait(3000);

        // Kontrola inštrukcií
        cy.get('table').find('tr').then((value) => {
            for (let x = 1; x < value.length; x++) {
                cy.wrap(value).eq(x).find('td').eq(8).invoke('text').then((textVal) => {
                    expect(textVal).to.equal('Inštrukcia pre lektora (konkrétny výber)');
                });
            }
        });
    });

    it.only('Kontrola správneho vypĺňania inštrukcií', function() {
        cy.get('[type="radio"]').first().check({force: true})
        cy.get('select').first().select(1)
        cy.get('select').eq(2).select(1)
    });
});
