describe('GARANT', function () {
    beforeEach(() => {
        cy.visit('https://dev.metis.academy/admin');
        cy.viewport(1920, 937);
        cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
        cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
        cy.get('[type="submit"]').should('be.visible');
        cy.get('[type="submit"]').should('be.visible');
        cy.get('[name="userName"]').type('skorg1.go');
        cy.get('[name="password"]').type('ML_heslo1');
        cy.get('[type="submit"]').click();
    });

    it("Editovať šablónu v karte obsah + pridať úlohy", function () {

        // Uloží data z popisu
        let DataValues = [];
        let jsonData = {};

        cy.get('.page-sidebar-wrapper').find('li').find('i').eq(1).click();
        cy.get('li.open > af-sub-menu > .sub-menu > :nth-child(5) > a').click();
        cy.get('.af-table-pager-counts > :nth-child(3)').click();
        cy.wait(3000);
        cy.get('[type = "text"]').first().clear().type('CY editovaná šablóna');
        cy.get('[type="submit"]').first().click();
        cy.contains('CY editovaná šablóna').click();
        cy.wait(3000);
        cy.get(':nth-child(5) > .nav-link').click().wait(2000);
        cy.get('[type="radio"]').first().check({ force: true });
        cy.get('[name="selectLessonTemplate"]').select('Šablóna na pretestovanie úloh');
        cy.get('[name="selectTheme"]').select(1);
        cy.get('[name="selectLesson"]').select(1);
        cy.contains('Vložiť záznam').click();

        cy.get('tbody').eq(1).find('tr').last().find('td').find('select').eq(1).select(1);
        cy.get('tbody').eq(1).find('tr').last().find('td').find('select').eq(0).select(1);
        cy.contains('Generovať úlohy').click().wait(2000);
        cy.get('[type="submit"]').last().click()
        cy.wait(10000)

        //Skopírovanie dát
        //Aktivita
        cy.get('tbody').eq(1).find('td:nth-child(2)').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).find('select').invoke('val').then((dataVals) => {
                    console.log(dataVals)
                    if ((dataVals) === '1') {
                        DataValues.push({ activity: '1' });
                    } else if ((dataVals) === '2') {
                        DataValues.push({ activity: '2' });
                    } else if ((dataVals) === '3') {
                        DataValues.push({ activity: '3' });
                    } else if ((dataVals) === '4') {
                        DataValues.push({ activity: '4' });
                    }
                });
            }
            console.log(DataValues)
        });
        //Poradie
        cy.get('tbody').eq(1).find('td:nth-child(4)').find('input').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    DataValues.push({ order: dataVals });
                });
            }
        });

        //Poradie úloh v lekcií
        cy.get('tbody').eq(1).find('td:nth-child(5)').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('text').then((dataVals) => {
                    DataValues.push({ taskOrder: dataVals });
                });
            }
        });

        //Typ úlohy
        cy.get('tbody').eq(1).find('td:nth-child(3)').find('select').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    if ((dataVals) === '13') {
                        DataValues.push({ task: 'Anketa' });
                    } else if ((dataVals) === '3') {
                        DataValues.push({ task: 'Automatický test' });
                    } else if ((dataVals) === '8') {
                        DataValues.push({ task: 'Cvičenie' });
                    } else if ((dataVals) === '19') {
                        DataValues.push({ task: 'Diskusia' });
                    } else if ((dataVals) === '7') {
                        DataValues.push({ task: 'Doplňovačka' });
                    } else if ((dataVals) === '21') {
                        DataValues.push({ task: 'Checklist' });
                    } else if ((dataVals) === '16') {
                        DataValues.push({ task: 'IQ test' });
                    } else if ((dataVals) === '15') {
                        DataValues.push({ task: 'Osobnostný test' });
                    } else if ((dataVals) === '4') {
                        DataValues.push({ task: 'Otvorený test' });
                    } else if ((dataVals) === '9') {
                        DataValues.push({ task: 'Párovačka' });
                    } else if ((dataVals) === '20') {
                        DataValues.push({ task: 'Potvrdenie absolvovania' });
                    } else if ((dataVals) === '10') {
                        DataValues.push({ task: 'Preferenčný test' });
                    } else if ((dataVals) === '12') {
                        DataValues.push({ task: 'Preklad' });
                    } else if ((dataVals) === '6') {
                        DataValues.push({ task: 'Projekt' });
                    } else if ((dataVals) === '1') {
                        DataValues.push({ task: 'Samoštúdium' });
                    } else if ((dataVals) === '14') {
                        DataValues.push({ task: 'Spätná väzba' });
                    } else if ((dataVals) === '17') {
                        DataValues.push({ task: 'Spoločná práca s lektorom' });
                    } else if ((dataVals) === '18') {
                        DataValues.push({ task: 'Videosamoštúdium' });
                    } else if ((dataVals) === '2') {
                        DataValues.push({ task: 'Webinár' });
                    } else if ((dataVals) === '5') {
                        DataValues.push({ task: 'Zadanie' });
                    }
                });
            }
        });

        // Náročnosť
        cy.get('tbody').eq(1).find('td:nth-child(6)').find('select').then((content) => {
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
        cy.get('tbody').eq(1).find('td:nth-child(9)').find('span').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('text').then((dataVals) => {
                    DataValues.push({ xpPoints: dataVals });
                });
            }
        });
        //Odhadovaný čas na vypracovanie
        cy.get('tbody').eq(1).find('td:nth-child(7)').find('input').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    if (dataVals.startsWith('0')) {
                        dataVals = dataVals.substring(1);
                    }
                    DataValues.push({ estimatedTimeToComplete: dataVals });
                });
            }
        });
        
        //Odhadovaný čas na vyhodnotenie
        cy.get('tbody').eq(1).find('td:nth-child(8)').find('input').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    if (dataVals.startsWith('0')) {
                        dataVals = dataVals.substring(1);
                    }
                    DataValues.push({ estimatedTimeToEvaluate: dataVals });
                });
            }
        });

        cy.wait(1000).then(() => {
            jsonData['Values'] = DataValues;
            cy.writeFile('cypress/fixtures/content_template_edited.json', JSON.stringify(jsonData, null, 2));
        });
    });

    it.only('Overenie dát', function () {

        cy.readFile('cypress/fixtures/content_template_edited.json', 'utf-8').then((jsonData) => {
            const valuesArray = jsonData.Values;

            const activity = [];
            for (let x = 0; x < valuesArray.length; x++) {
                activity.push(valuesArray[x].activity);
            }
            const activityFiltered = activity.filter(item => item !== undefined);

            const order = [];
            for (let x = 0; x < valuesArray.length; x++) {
                order.push(valuesArray[x].order);
            }
            const orderFiltered = order.filter(item => item !== undefined);

            const taskOrder = [];
            for (let x = 0; x < valuesArray.length; x++) {
                taskOrder.push(valuesArray[x].taskOrder);
            }
            const taskOrderFiltered = taskOrder.filter(item => item !== undefined);

            const task = [];
            for (let x = 0; x < valuesArray.length; x++) {
                task.push(valuesArray[x].task);
            }
            const taskFiltered = task.filter(item => item !== undefined);

            const difficulty = [];
            for (let x = 0; x < valuesArray.length; x++) {
                difficulty.push(valuesArray[x].difficulty);
            }
            const difficultyFiltered = difficulty.filter(item => item !== undefined);

            const estimatedTimeToComplete = [];
            for (let x = 0; x < valuesArray.length; x++) {
                estimatedTimeToComplete.push(valuesArray[x].estimatedTimeToComplete);
            }
            const estimatedTimeToCompleteFiltered = estimatedTimeToComplete.filter(item => item !== undefined);

            const estimatedTimeToEvaluate = [];
            for (let x = 0; x < valuesArray.length; x++) {
                estimatedTimeToEvaluate.push(valuesArray[x].estimatedTimeToEvaluate);
            }
            const estimatedTimeToEvaluateFiltered = estimatedTimeToEvaluate.filter(item => item !== undefined);

            const genericValsData = [];
            for (let x = 0; x < valuesArray.length; x++) {
                genericValsData.push(valuesArray[x].genericVals);
            }
            const genericValsDataFiltered = genericValsData.filter(item => item !== undefined);

            const xpPoints = []
            for (let x = 0; x < valuesArray.length; x++) {
                xpPoints.push(valuesArray[x].xpPoints);
            }
            const xpPointsFiltered = xpPoints.filter(item => item !== undefined);



            cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
            cy.get('@nastavenia').click();
            cy.get('[href="/admin/elearning/training"]').click();
            cy.wait(3000);
            cy.get('[placeholder="Kľúčové slovo"]').type('CY editovaná šablóna');
            cy.get('[type="submit"]').first().click().wait(2000);
            cy.get('tbody').find('a').first().click().wait(2000);
            cy.get(':nth-child(5) > .nav-link').click().wait(2000);

            //Overenie aktivít
            cy.get('tbody').eq(3).find('td [exercise-activity-order]').then((value) => {
                for (let x = 0; x < value.length; x++) {
                    cy.wrap(value[x]).invoke('text').then((dataVals) => {
                        if ((dataVals) === '1') {
                            expect(activityFiltered[x]).to.equal('1');
                        } else if ((dataVals) === '2') {
                            expect(activityFiltered[x]).to.equal('2');
                        } else if ((dataVals) === '3') {
                            expect(activityFiltered[x]).to.equal('3');
                        } else if ((dataVals) === '4') {
                            expect(activityFiltered[x]).to.equal('4');
                        }
                    })
                }
            })
       

            cy.get('tbody').eq(3).find('td [exercise-title]').then(value => {
                for (let x = 0; x < value.length; x++) {
                    cy.wrap(value[x]).invoke('val').then(dataVals => {
                    cy.wrap(dataVals).should('eq', taskFiltered[x]);
                  });
                }
              });

              cy.get('tbody').eq(3).find('td [exercise-activity-order]').then(value => {
                for (let x = 0; x < value.length; x++) {
                     cy.wrap(value[x]).invoke('text').then((dataVals) => {
                        cy.wrap(dataVals).should('eq', activityFiltered[x])
                    })
                }
              })

              cy.get('tbody').eq(3).find('td [exercise-order]').then(value => {
                for (let x = 0; x < value.length; x++) {
                    cy.wrap(value[x]).invoke('val').then((dataVals) => {
                     cy.wrap(dataVals).should('eq', orderFiltered[x]);
                    });
                }
            })
            cy.get('tbody').eq(3).find('td [exercise-experience-points]').then(value => {
                for (let x = 0; x < value.length; x++) {
                    cy.wrap(value[x]).invoke('text').then((dataVals) => {
                        cy.wrap(dataVals).should('eq', xpPointsFiltered[x])
                    })
                }
              })

              cy.get('tbody').eq(3).find('td [exercise-difficulty-level]').then(value => {
                for (let x = 0; x < value.length; x++) {
                    cy.wrap(value[x]).invoke('val').then((dataVals) => {
                        if (dataVals === '100') {
                            expect(difficultyFiltered[x]).to.equal('Nízka');
                        } else if (dataVals === '300') {
                            expect(difficultyFiltered[x]).to.equal('Stredná');
                        } else if (dataVals === '500') {
                            expect(difficultyFiltered[x]).to.equal('Vysoká');
                        }
                    });
                }
            });  

            cy.get('tbody').eq(3).find('td [exercise-length-in-time]').then(value => {
                for (let x = 0; x < value.length; x++) {
                    cy.wrap(value[x]).invoke('val').then((dataVals) => {
                        cy.wrap(dataVals).should('eq', estimatedTimeToCompleteFiltered[x])
                    })
                }
              })

              cy.get('tbody').eq(3).find('td [exercise-estimate-time-for-evaluation]').first().then(value => {
                for (let x = 0; x < value.length; x++) {
                    cy.wrap(value[x]).invoke('val').then((dataVals) => {
                        cy.wrap(dataVals).should('eq', estimatedTimeToEvaluateFiltered[x])
                    })
                }
              })
            
        })
    })
})