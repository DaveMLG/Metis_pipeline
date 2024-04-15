describe('Product owner', function () {
    beforeEach(() => {
        cy.visit('https://dev.metis.academy/admin');
        cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
        cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
        cy.get('[type="submit"]').should('be.visible');
        cy.get('[type="submit"]').should('be.visible');
        cy.get('[name="userName"]').type('skorg1.svo');
        cy.get('[name="password"]').type('ML_heslo1');
        cy.get('[type="submit"]').click();
    });

    it('Skopírovanie dát zo šablóny', function () {
        // Uloží data z popisu
        let DataValues = [];
        let jsonData = {};

        cy.viewport(1920, 937);
        cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(5) > a').as('nastavenia');
        cy.get('@nastavenia').click();
        cy.get('[href="/admin/elearning/lesson-template"]').click();
        cy.wait(3000);
        cy.get('[placeholder="Kľúčové slovo"]').type('Šablóna na pretestovanie úloh');
        cy.get('[type="submit"]').first().click();
        cy.get('tbody').find('a').first().click();

        //Aktivita
        cy.get('el-lesson-template-table').find('td:first-child').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).find('select').invoke('val').then((dataVals) => {
                    if ((dataVals) === '31301') {
                        DataValues.push({ activity: 'Príprava' });
                    } else if ((dataVals) === '16617') {
                        DataValues.push({ activity: 'Seminár' });
                    } else if ((dataVals) === '33536') {
                        DataValues.push({ activity: 'Zadania' });
                    } else if ((dataVals) === '33663') {
                        DataValues.push({ activity: 'Cvičenie' });
                    }
                });
            }
        });
        
        //Poradie
        cy.get('el-lesson-template-table').find('td:nth-child(2)').find('input').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    DataValues.push({ order: dataVals });
                });
            }
        });

        //Poradie úloh v lekcií
        cy.get('el-lesson-template-table').find('td:nth-child(3)').find('span').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('text').then((dataVals) => {
                    DataValues.push({ taskOrder: dataVals });
                });
            }
        });

        //Typ úlohy
        cy.get('el-lesson-template-table').find('td:nth-child(4)').find('select').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    if ((dataVals) === '13') {
                        DataValues.push({ activity: 'Anketa' });
                    } else if ((dataVals) === '3') {
                        DataValues.push({ activity: 'Automaticky test' });
                    } else if ((dataVals) === '8') {
                        DataValues.push({ activity: 'Cvicenie' });
                    } else if ((dataVals) === '19') {
                        DataValues.push({ activity: 'Diskusia' });
                    } else if ((dataVals) === '7') {
                        DataValues.push({ activity: 'Doplnovacka' });
                    } else if ((dataVals) === '21') {
                        DataValues.push({ activity: 'Checklist' });
                    } else if ((dataVals) === '16') {
                        DataValues.push({ activity: 'IQ test' });
                    } else if ((dataVals) === '15') {
                        DataValues.push({ activity: 'Osobnostny test' });
                    } else if ((dataVals) === '4') {
                        DataValues.push({ activity: 'Otvoreny test' });
                    } else if ((dataVals) === '9') {
                        DataValues.push({ activity: 'Parovacka' });
                    } else if ((dataVals) === '20') {
                        DataValues.push({ activity: 'Potvrdenie absolvovania' });
                    } else if ((dataVals) === '10') {
                        DataValues.push({ activity: 'Preferenčný test' });
                    } else if ((dataVals) === '12') {
                        DataValues.push({ activity: 'Preklad' });
                    } else if ((dataVals) === '6') {
                        DataValues.push({ activity: 'Projekt' });
                    } else if ((dataVals) === '1') {
                        DataValues.push({ activity: 'Samostudium' });
                    } else if ((dataVals) === '14') {
                        DataValues.push({ activity: 'Spatna vazba' });
                    } else if ((dataVals) === '17') {
                        DataValues.push({ activity: 'Spoločná praca s lektorom' });
                    } else if ((dataVals) === '18') {
                        DataValues.push({ activity: 'Videosamostudium' });
                    } else if ((dataVals) === '2') {
                        DataValues.push({ activity: 'Webinar' });
                    } else if ((dataVals) === '5') {
                        DataValues.push({ activity: 'Zadanie' });
                    }
                });
            }
        });

        // Náročnosť
        cy.get('el-lesson-template-table').find('td:nth-child(5)').find('select').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    if (dataVals === '100') {
                        DataValues.push({ difficulty: 'Nízka' });
                    } else if (dataVals === '300') {
                        DataValues.push({ difficulty: 'Stredná' });
                    } else if (dataVals === '500') {
                        DataValues.push({ difficulty: 'Vysoká' });
                    }
                });
            }
        });

        // XP Body
        cy.get('el-lesson-template-table').find('td:nth-child(6)').find('span').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('text').then((dataVals) => {
                    DataValues.push({ taskOrder: dataVals });
                });
            }
        });
        //Odhadovaný čas na vypracovanie
        cy.get('el-lesson-template-table').find('td:nth-child(8)').find('input').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    DataValues.push({ estimatedTimeToComplete: dataVals });
                });
            }
        });
        //Odhadovaný čas na vyhodnotenie
        cy.get('el-lesson-template-table').find('td:nth-child(9)').find('input').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    DataValues.push({ estimatedTimeToEvaluate: dataVals });
                });
            }
        });
        cy.wait(1000).then(() => {
            console.log(DataValues)
        })
    });
});
