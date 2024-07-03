describe('Product owner', function () {
    before(() => {
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
        cy.get('el-lesson-template-table').find('td:nth-child(2)').then((content) => {
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
        cy.get('el-lesson-template-table').find('td:nth-child(3)').find('input').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    DataValues.push({ order: dataVals });
                });
            }
        });

        //Poradie úloh v lekcií
        cy.get('el-lesson-template-table').find('td:nth-child(4)').find('span').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('text').then((dataVals) => {
                    DataValues.push({ taskOrder: dataVals });
                });
            }
        });

        //Typ úlohy
        cy.get('el-lesson-template-table').find('td:nth-child(5)').find('select').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    if ((dataVals) === '13') {
                        DataValues.push({ task: 'Anketa' });
                    } else if ((dataVals) === '3') {
                        DataValues.push({ task: 'Automaticky test' });
                    } else if ((dataVals) === '8') {
                        DataValues.push({ task: 'Cvicenie' });
                    } else if ((dataVals) === '19') {
                        DataValues.push({ task: 'Diskusia' });
                    } else if ((dataVals) === '7') {
                        DataValues.push({ task: 'Doplnovacka' });
                    } else if ((dataVals) === '21') {
                        DataValues.push({ task: 'Checklist' });
                    } else if ((dataVals) === '16') {
                        DataValues.push({ task: 'IQ test' });
                    } else if ((dataVals) === '15') {
                        DataValues.push({ task: 'Osobnostny test' });
                    } else if ((dataVals) === '4') {
                        DataValues.push({ task: 'Otvoreny test' });
                    } else if ((dataVals) === '9') {
                        DataValues.push({ task: 'Parovacka' });
                    } else if ((dataVals) === '20') {
                        DataValues.push({ task: 'Potvrdenie absolvovania' });
                    } else if ((dataVals) === '10') {
                        DataValues.push({ task: 'Preferencny test' });
                    } else if ((dataVals) === '12') {
                        DataValues.push({ task: 'Preklad' });
                    } else if ((dataVals) === '6') {
                        DataValues.push({ task: 'Projekt' });
                    } else if ((dataVals) === '1') {
                        DataValues.push({ task: 'Samostudium' });
                    } else if ((dataVals) === '14') {
                        DataValues.push({ task: 'Spatna vazba' });
                    } else if ((dataVals) === '17') {
                        DataValues.push({ task: 'Spolocna praca s lektorom' });
                    } else if ((dataVals) === '18') {
                        DataValues.push({ task: 'Videosamostudium' });
                    } else if ((dataVals) === '2') {
                        DataValues.push({ task: 'Webinar' });
                    } else if ((dataVals) === '5') {
                        DataValues.push({ task: 'Zadanie' });
                    }
                });
            }
        });

        // Náročnosť
        cy.get('el-lesson-template-table').find('td:nth-child(6)').find('select').then((content) => {
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
        cy.get('el-lesson-template-table').find('td:nth-child(7)').find('span').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('text').then((dataVals) => {
                    DataValues.push({ taskOrder: dataVals });
                });
            }
        });
        //Odhadovaný čas na vypracovanie
        cy.get('el-lesson-template-table').find('td:nth-child(9)').find('input').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    DataValues.push({ estimatedTimeToComplete: dataVals });
                });
            }
        });
        //Odhadovaný čas na vyhodnotenie
        cy.get('el-lesson-template-table').find('td:nth-child(10)').find('input').then((content) => {
            for (let x = 0; x < content.length; x++) {
                cy.wrap(content[x]).invoke('val').then((dataVals) => {
                    DataValues.push({ estimatedTimeToEvaluate: dataVals });
                });
            }
        });
        cy.wait(1000).then(() => {
            jsonData['Values'] = DataValues;
            cy.writeFile('cypress/fixtures/content_template.json', JSON.stringify(jsonData, null, 2))
        })
    });

    it('Overenie dát zo šablóny', function () {

        cy.readFile('cypress/fixtures/content_template.json', 'utf-8').then((jsonData) => {
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





        cy.wait(500).then(() => {
            cy.readFile('cypress/fixtures/template_instructions.json', 'utf-8').then((jsonData) => {
                cy.visit('https://dev.metis.academy/admin');
                cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
                cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
                cy.get('[type="submit"]').should('be.visible');
                cy.get('[type="submit"]').should('be.visible');
                cy.get('[name="userName"]').type('skorg1.go');
                cy.get('[name="password"]').type('ML_heslo1');
                cy.get('[type="submit"]').click();

                cy.viewport(1920, 937);
                cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
                cy.get('@nastavenia').click();
                cy.get('[href="/admin/elearning/training"]').click();
                cy.wait(3000);
                cy.get('[placeholder="Kľúčové slovo"]').type('PO CY');
                cy.get('[type="submit"]').first().click().wait(2000);
                cy.get('tbody').find('a').first().click().wait(2000);
                cy.get(':nth-child(5) > .nav-link').click().wait(2000);
                cy.get('[type="radio"]').first().check({force: true})
                cy.get('[name="selectLessonTemplate"]').select('Šablóna na pretestovanie úloh')
                cy.get('[name="selectTheme"]').select(1)
                cy.get('[name="selectLesson"]').select(1)

                //Overenie aktivít
                cy.get('tbody').eq(1).find('td:nth-child(2)').then((value) => {
                    for (let x = 0; x < value.length; x++) {
                        cy.wrap(value[x]).find('select').invoke('val').then((dataVals) => {
                            if ((dataVals) === '1') {
                                expect(activityFiltered[x]).to.equal('Príprava');
                            } else if((dataVals) === '2') {
                                expect(activityFiltered[x]).to.equal('Seminár');
                            } else if((dataVals) === '3') {
                                expect(activityFiltered[x]).to.equal('Zadania');
                            } else if((dataVals) === '4') {
                                expect(activityFiltered[x]).to.equal('Cvičenie');
                            }
                        })
                    }
                })

                cy.get('tbody').eq(1).find('td:nth-child(3)').then((value) => {
                    for (let x = 0; x < value.length; x++) {
                        cy.wrap(value[x]).find('select').invoke('val').then((dataVals) => {
                            if (dataVals === '13') {
                                 expect(taskFiltered[x]).to.equal('Anketa');
                            } else if (dataVals === '3') {
                                expect(taskFiltered[x]).to.equal('Automaticky test');
                            } else if (dataVals === '8') {
                                expect(taskFiltered[x]).to.equal('Cvicenie');
                            } else if (dataVals === '19') {
                                expect(taskFiltered[x]).to.equal('Diskusia');
                            } else if (dataVals === '7') {
                                expect(taskFiltered[x]).to.equal('Doplnovacka');
                            } else if (dataVals === '21') {
                                expect(taskFiltered[x]).to.equal('Checklist');
                            } else if (dataVals === '16') {
                                expect(taskFiltered[x]).to.equal('IQ test');
                            } else if (dataVals === '15') {
                                expect(taskFiltered[x]).to.equal('Osobnostny test');
                            } else if (dataVals === '4') {
                                expect(taskFiltered[x]).to.equal('Otvoreny test');
                            } else if (dataVals === '9') {
                                expect(taskFiltered[x]).to.equal('Parovacka');
                            } else if (dataVals === '20') {
                                expect(taskFiltered[x]).to.equal('Potvrdenie absolvovania');
                            } else if (dataVals === '10') {
                                expect(taskFiltered[x]).to.equal('Preferencny test');
                            } else if (dataVals === '12') {
                                expect(taskFiltered[x]).to.equal('Preklad');
                            } else if (dataVals === '6') {
                                expect(taskFiltered[x]).to.equal('Projekt');
                            } else if (dataVals === '1') {
                                expect(taskFiltered[x]).to.equal('Samostudium');
                            } else if (dataVals === '14') {
                                expect(taskFiltered[x]).to.equal('Spatna vazba');
                            } else if (dataVals === '17') {
                                expect(taskFiltered[x]).to.equal('Spolocna praca s lektorom');
                            } else if (dataVals === '18') {
                                expect(taskFiltered[x]).to.equal('Videosamostudium');
                            } else if (dataVals === '2') {
                                expect(taskFiltered[x]).to.equal('Webinar');
                            } else if (dataVals === '5') {
                                expect(taskFiltered[x]).to.equal('Zadanie');
                            }
                        });
                    }
                });

                cy.get('tbody').eq(1).find('td:nth-child(4)').then((value) => {
                    for (let x = 0; x < value.length; x++) {
                        cy.wrap(value[x]).find('input').then((dataVals) => {
                            cy.wrap(dataVals).invoke('val').should('eq', orderFiltered[x])
                        })
                    }
                })

                cy.get('tbody').eq(1).find('td:nth-child(5)').then((value) => {
                    for (let x = 0; x < value.length; x++) {
                        cy.wrap(value[x]).then((dataVals) => {
                            cy.wrap(dataVals).invoke('text').then((text) => {
                                const trimmedText = text.trim();
                                cy.wrap(trimmedText).should('eq', taskOrderFiltered[x])
                            })
                        })
                    }
                })
                

                cy.get('tbody').eq(1).find('td:nth-child(6)').then((value) => {
                    for (let x = 0; x < value.length; x++) {
                    cy.wrap(value[x]).find('select').invoke('val').then((dataVals) => {
                        if (dataVals === '100') {
                            expect(difficultyFiltered[x]).to.equal('Nízka');
                        } else if (dataVals === '300') {
                            expect(difficultyFiltered[x]).to.equal('Stredná');
                        } else if (dataVals === '500') {
                            expect(difficultyFiltered[x]).to.equal('Vysoká');
                        }
                    })}
                });
                
                
                cy.get('tbody').eq(1).find('td:nth-child(7)').then((value) => {
                    for (let x = 0; x < value.length; x++) {
                        cy.wrap(value[x]).find('input').then((dataVals) => {
                            cy.wrap(dataVals).invoke('val').should('eq', estimatedTimeToCompleteFiltered[x])
                        })
                    }
                })

                
                cy.get('tbody').eq(1).find('td:nth-child(8)').then((value) => {
                    for (let x = 0; x < value.length; x++) {
                        cy.wrap(value[x]).find('input').then((dataVals) => {
                            cy.wrap(dataVals).invoke('val').should('eq', estimatedTimeToEvaluateFiltered[x])
                        })
                    }
                })
            })
        });
    });
});
})