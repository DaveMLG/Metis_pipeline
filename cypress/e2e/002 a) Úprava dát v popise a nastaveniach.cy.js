describe('Product owner', function () {

  before(() => {
      cy.visit(Cypress.env('websiteUrl'))
      cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
      cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
      cy.get('[type="submit"]').should('be.visible');
      cy.get('[type="submit"]').should('be.visible');
      cy.get('[name="userName"]').type(Cypress.env('loginVO'));
      cy.get('[name="password"]').type(Cypress.env('password'));
      cy.get('[type="submit"]').click();
  });

  it('Vytvorenie nového školenia', function () {

          ////Uloží data z popisu
          let 
            DataValues = [],
             jsonData = {}

          ////Uloží data z nastavenia
          cy.viewport(1920, 937);
          cy.get('.icon-menu-elearning').click();
          cy.get('[href="/admin/elearning/training"]').click();
          cy.wait(2000)
          cy.get('[type = "text"]').first().clear().type('G školenie AAA')
          cy.get('[type="submit"]').first().click()
          cy.wait(2000)
          cy.sortTableByColumn('Vytvorené');
          cy.get('tbody').contains('Neprevzaté').parent().parent().contains('G školenie AAA').click().wait(2000)

          /*cy.get('[for="Guarantors"]').parentsUntil('.row').find('span').invoke('text').then((value) => {
            DataValues.push({guaratorName: value}) 
          })*/

         

          cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.TrainingEditViewModel.TrainingType"]').prev().invoke('text').then((value) => {
            DataValues.push({type: value}) 
          })

          cy.get('[name="Title"]').clear().type('G školenie AAA')
          cy.get('[name="Title"]').invoke('val').then((value) => {
              DataValues.push({Title: value}) 
          })

          cy.get('[name="PortalTitle"]').clear().type('Portal title edit')
          cy.get('[name="PortalTitle"]').invoke('val').then((value) => {
            DataValues.push({PortalTitle: value}) 
          })

          cy.get('[type="radio"]').first().click({force: true})
          cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            DataValues.push({languages: value}) 
          })

          cy.get('[for="HoverDescription"]').parentsUntil('.row').find('.note-editable').clear().type('Mouser hover edit')
          cy.get('[for="HoverDescription"]').parentsUntil('.row').find('.note-editing-area').children().invoke('text').then((value) => {
            DataValues.push({HoverDescription: value}) 
          })

          cy.get('[for="LecturerInstruction"]').parentsUntil('.row').find('.note-editable').clear().type('Lecturer edit')
          cy.get('[for="LecturerInstruction"]').parentsUntil('.row').find('.note-editing-area').children().invoke('text').then((value) => {
            DataValues.push({LecturerInstruction: value}) 
          })

          cy.get('[for="StudentInstruction"]').parentsUntil('.row').find('.note-editable').clear().type('Student edit')
          cy.get('[for="StudentInstruction"]').parentsUntil('.row').find('.note-editing-area').children().invoke('text').then((value) => {
            DataValues.push({StudentInstruction: value}) 
          })

          cy.contains('Vlastníci obsahu').parentsUntil('.row').find('span').invoke('text').then((value) => {
            DataValues.push({productOwner: value}) 
          })
      
          ////Preklikne sa na Nastavenia
          cy.get('af-tabs').find('li').eq(2).click()
          cy.wait(1000)

          ////Rozklikne Koeficienty hodnotenia
          cy.contains('Koeficienty hodnotenia').find('i').click({timeout: 100000})

          cy.get('[id="TestAutomatedLevelOfDegressiveAssesment"]').clear().type(5)
          cy.get('[id="TestAutomatedLevelOfDegressiveAssesment"]').invoke('val').then((value) => {
            DataValues.push({TestAutomatedLevelOfDegressiveAssesment: value})
          })

          cy.get('[id="TestOpenLevelOfDegressiveAssesment"]').clear().type(8)
          cy.get('[id="TestOpenLevelOfDegressiveAssesment"]').invoke('val').then((value) => {
            DataValues.push({TestOpenLevelOfDegressiveAssesment: value})
          })

          cy.get('[name="ImportanceCoefficientLevelLow"]').clear().type(3)
          cy.get('[name="ImportanceCoefficientLevelLow"]').invoke('val').then((value) => {
            DataValues.push({ImportanceCoefficientLevelLow: value})
          })

          cy.get('[name="ImportanceCoefficientLevelMedium"]').clear().type(4)
          cy.get('[name="ImportanceCoefficientLevelMedium"]').invoke('val').then((value) => {
            DataValues.push({ImportanceCoefficientLevelMedium: value})
          })

          cy.get('[name="ImportanceCoefficientLevelHigh"]').clear().type(5)
          cy.get('[name="ImportanceCoefficientLevelHigh"]').invoke('val').then((value) => {
            DataValues.push({ImportanceCoefficientLevelHigh: value})
          })

          cy.get('[name="ManualTaskMultiplicator"]').clear().type(6)
          cy.get('[name="ManualTaskMultiplicator"]').invoke('val').then((value) => {
            DataValues.push({ManualTaskMultiplicator: value})
          })
          
          cy.get('[id="ActivityLanguageId"]').select('English')
          cy.get('[id="ActivityLanguageId"]').invoke('val').then((value) => {
            DataValues.push({ActivityLanguageId: value})
          })

          cy.get('.tableFloatingHeaderOriginal').next().next().find('input:not([type="number"]):not([type="checkbox"])').then((edit) => {
            let a = 0,
                b = 1,
                c = 2;


            for (let x = 0; x < edit.length / 3; x++) {
              cy.wrap(edit).eq(a).clear({force: true}).type('Zadanie_edit_' + x)
              cy.wrap(edit).eq(b).clear({force: true}).type(2 + x)
              a += 3
              b += 3
              c += 3
            }
            })
          cy.get('.tableFloatingHeaderOriginal').next().next().find('input').then((tableValues) => {
              for (let x = 0; x < tableValues.length; x++) {
                if (!Cypress.$(tableValues[x]).is('[type="checkbox"]')) {
                  cy.wrap(tableValues[x]).invoke('val').then((pushVals) => {
                    DataValues.push({ActivityInput: pushVals})
                  });
                }
              }
            });

            cy.get('.tableFloatingHeaderOriginal').next().next().find('input[type="checkbox"]').then((tableValues) => {
              for (let x = 0; x < tableValues.length; x++) {
                cy.wrap(tableValues[x]).then((tableValuesData) => {
                  if (tableValuesData.is(':checked')) {
                    DataValues.push({ ActivityCheckbox: 'yes' });
                  } else {
                    DataValues.push({ ActivityCheckbox: 'no' });
                  }
                });
              }
            })

            

          ////Rozklikne Metriky
          cy.wait(1000)
          cy.contains('Koeficienty hodnotenia').find('i').click({timeout: 100000})
          cy.contains('Metriky').find('i').click({timeout: 100000})

          cy.get('[id="MetricCategoryLanguageId"]').select('English')
          cy.get('[id="MetricCategoryLanguageId"]').invoke('val').then((value) => {
            DataValues.push({MetricCategoryLanguageId: value})
          })

          cy.get('.tableFloatingHeaderOriginal').next().next().find('input').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).invoke('val').then((value) => {
                DataValues.push({MetricCategories: value})
              })
            }
          })

          ////Rozklikne Časové hodnoty pre sprístupnenie/konanie/odovzdanie úloh
          cy.contains('Metriky').find('i').click({timeout: 100000})
          cy.contains('Časové hodnoty pre sprístupnenie/konanie/odovzdanie úloh').find('i').click({timeout: 100000})

          //Zmení niektoré selecty
          cy.get('.tableFloatingHeaderOriginal').first().next().next().find('select').then((inpValue) => {
            for (let x = 0; x < 4; x++) {
              cy.wrap(inpValue[x]).select(1, {force: true})
            }
          }) 

          //Zmení všetky hodnoty v dňoch, hodinách a minutach
          cy.get('.tableFloatingHeaderOriginal').first().next().next().find('[max="7"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(3)
            }
          })
          cy.get('.tableFloatingHeaderOriginal').first().next().next().find('[max="23"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(4)
            }
          })

          cy.get('.tableFloatingHeaderOriginal').first().next().next().find('[max="59"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(5)
            }
          })

          cy.get('.tableFloatingHeaderOriginal').eq(1).next().next().find('[max="7"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(3)
            }
          })
          cy.get('.tableFloatingHeaderOriginal').eq(1).next().next().find('[max="23"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(4)
            }
          })

          cy.get('.tableFloatingHeaderOriginal').eq(1).next().next().find('[max="59"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(5)
            }
          })

          cy.get('.tableFloatingHeaderOriginal').eq(2).next().next().find('[max="7"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(3)
            }
          })
          cy.get('.tableFloatingHeaderOriginal').eq(2).next().next().find('[max="23"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(4)
            }
          })

          cy.get('.tableFloatingHeaderOriginal').eq(2).next().next().find('[max="59"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(5)
            }
          })

           

          //1. Uloží dáta - dostupnosť úloh v aktivite
          cy.get('.tableFloatingHeaderOriginal').first().next().next().find('input, select').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).invoke('val').then((value) => {
                DataValues.push({availableTasks: value})
                console.log(value)
              })
            }
          })

          //2. Časové hodnoty pre vypracovanie úloh načas
          cy.get('.tableFloatingHeaderOriginal').eq(1).next().next().find('input, select').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).invoke('val').then((value) => {
                DataValues.push({timeValuesTasksOnTime: value})
                console.log(value)
              })
            }
          })

          //3. Časové hodnoty pre vypracovanie úloh v termíne
          cy.get('.tableFloatingHeaderOriginal').eq(2).next().next().find('input, select').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).invoke('val').then((value) => {
                DataValues.push({timeValuesPastTime: value})
                console.log(value)
              })
            }
          })

          ////Rozklikne Termíny lekcií pre nemoderované školenia
          cy.contains('Časové hodnoty pre sprístupnenie/konanie/odovzdanie úloh').find('i').click({timeout: 100000})
          cy.contains('Termíny lekcií pre nemoderované školenia').find('i').click({timeout: 100000})

          //Zmení všetky hodnoty v dňoch, hodinách a minutach
          cy.get('.tableFloatingHeaderOriginal').first().next().next().find('[max="7"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(3)
            }
          })
          cy.get('.tableFloatingHeaderOriginal').first().next().next().find('[max="23"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(4)
            }
          })

          cy.get('.tableFloatingHeaderOriginal').first().next().next().find('[max="59"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(5)
            }
          })

          cy.get('.tableFloatingHeaderOriginal').eq(1).next().next().find('[max="7"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(3)
            }
          })
          cy.get('.tableFloatingHeaderOriginal').eq(1).next().next().find('[max="23"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(4)
            }
          })

          cy.get('.tableFloatingHeaderOriginal').eq(1).next().next().find('[max="59"]').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue[x]).clear({force: true}).type(5)
            }
          })


          cy.get('.tableFloatingHeaderOriginal').next().next().find('input[type="checkbox"]').then((tableValues) => {
            for (let x = 0; x < tableValues.length; x++) {
                cy.wrap(tableValues[x]).then((tableValuesData) => {
                    if (tableValuesData.is(':checked')) {
                      DataValues.push({UnmoderatedWithEvaluation: 'yes'})
                    } else {
                      DataValues.push({UnmoderatedWithEvaluation: 'no'})
                    }
                });
            }
        });
        
        cy.get('.tableFloatingHeaderOriginal').next().next().find('input:not([type="checkbox"])').then((tableValues) => {
            for (let x = 0; x < tableValues.length; x++) {
                cy.wrap(tableValues[x]).then((tableValuesData) => {
                    if (!Cypress.$(tableValuesData[x]).is('[type="checkbox"]')) {
                        cy.wrap(tableValues[x]).invoke('val').then((pushVals) => {
                          DataValues.push({UnmoretatedInputs: pushVals})
                        });
                    }
                });
            }
        });

        ////Rozklikne Závislosť sprístupnenia úloh
        cy.contains('Termíny lekcií pre nemoderované školenia').find('i').click({timeout: 100000})
        cy.contains('Závislosť sprístupnenia úloh').find('i').click({timeout: 100000})

        cy.get('[type="radio"]').eq(1).check({force: true});

        cy.wait(10000)
        cy.get('.radio-button-active').invoke('val').then((value) => {
          DataValues.push({TimeLimitedTrainings: value})
        })

        ////Časovo limitované školenie - hodnoty pre odovzdanie úloh
        cy.contains('Závislosť sprístupnenia úloh').find('i').click({timeout: 100000})
        cy.contains('Časovo limitované školenie - hodnoty pre odovzdanie úloh').find('i').click({timeout: 100000})

        cy.get('[name="TimeLimitedCoefficient"]').clear().type(3)
        cy.get('[name="TimeLimitedCoefficient"]').invoke('val').then((value) => {
          DataValues.push({TimeLimitedCoefficient: value})
        })

        ////Termíny na vyhodnotenie úloh
        cy.contains('Časovo limitované školenie - hodnoty pre odovzdanie úloh').find('i').click({timeout: 100000})
        cy.contains('Termíny na vyhodnotenie úloh').find('i').click({timeout: 100000})

        cy.get('[name="EvaluationSoftDeadlineAt"]').clear().type(7)
        cy.get('[name="EvaluationSoftDeadlineAt"]').invoke('val').then((value) => {
          DataValues.push({EvaluationSoftDeadlineAt: value})
        })

        cy.get('[name="EvaluationDeadlineAt"]').clear().type(10)
        cy.get('[name="EvaluationDeadlineAt"]').invoke('val').then((value) => {
          DataValues.push({EvaluationDeadlineAt: value})
        })

        ////Limity pre opakované akcie
        cy.contains('Termíny na vyhodnotenie úloh').find('i').click({timeout: 100000})
        cy.contains('Limity pre opakované akcie').find('i').click({timeout: 100000})

        cy.get('[id="TestAutomatedRepeatLimit"]').clear().type(6)
        cy.get('[id="TestAutomatedRepeatLimit"]').invoke('val').then((value) => {
          DataValues.push({TestAutomatedRepeatLimit: value})
        })

        cy.get('[id="TestOpenRepeatLimit"]').clear().type(4)
        cy.get('[id="TestOpenRepeatLimit"]').invoke('val').then((value) => {
          DataValues.push({TestOpenRepeatLimit: value})
        })

        ////Thresholdy inaktivity

        cy.contains('Limity pre opakované akcie').find('i').click({timeout: 100000})
        cy.contains('Thresholdy inaktivity').find('i').click({timeout: 100000})
        
        cy.get('[id="InactiveLessonsThreshold"]').clear().type(4)
        cy.get('[id="InactiveLessonsThreshold"]').invoke('val').then((value) => {
          DataValues.push({InactiveLessonsThreshold: value})
        })

        cy.get('[id="InactivityNotificationInterval"]').clear().type(8)
        cy.get('[id="InactivityNotificationInterval"]').invoke('val').then((value) => {
          DataValues.push({InactivityNotificationInterval: value})
        })

        cy.get('[id="InactivityStudentNotificationThreshold"]').clear().type(8)
        cy.get('[id="InactivityStudentNotificationThreshold"]').invoke('val').then((value) => {
          DataValues.push({InactivityStudentNotificationThreshold: value})
        })

        cy.get('[id="InactivityStudentNotificationInterval"]').clear().type(4)
        cy.get('[id="InactivityStudentNotificationInterval"]').invoke('val').then((value) => {
          DataValues.push({InactivityStudentNotificationInterval: value})
        })

        cy.get('[for="ConsideredExercisesList"]').next().find('.inline-list-item').then((itemVal) => {
          for (let x = 0; x < itemVal.length; x++) {
            cy.wrap(itemVal[x]).invoke('text').then((value) => {
              DataValues.push({ConsideredExercisesList: value})
            })
          }
        })

        ////Tresholdy pre trvanie lekcie
        cy.contains('Thresholdy inaktivity').find('i').click({timeout: 100000})
        cy.contains('Thresholdy pre trvanie lekcie').find('i').click({timeout: 100000})

        cy.get('[id="EstimatedTimeForLessonEvaluation"]').clear().type(15)
        cy.get('[id="EstimatedTimeForLessonEvaluation"]').invoke('val').then((value) => {
          DataValues.push({EstimatedTimeForLessonEvaluation: value})
        })

        cy.get('[id="EstimatedLessonDurationForLecturerInTime"]').clear().type('4:40')
        cy.get('[id="EstimatedLessonDurationForLecturerInTime"]').invoke('val').then((value) => {
          DataValues.push({EstimatedLessonDurationForLecturerInTime: value})
        })
        
        cy.get('[id="EstimatedTimeForLessonDevelopment"]').clear().type(10)
        cy.get('[id="EstimatedTimeForLessonDevelopment"]').invoke('val').then((value) => {
          DataValues.push({EstimatedTimeForLessonDevelopment: value})
        })

        ////Ostatné
        cy.contains('Thresholdy pre trvanie lekcie').find('i').click({timeout: 100000})
        cy.contains('Ostatné').find('i').click({timeout: 100000})

        cy.get('[id="ExerciseOrderType"]').select(2)
        cy.get('[id="ExerciseOrderType"]').invoke('val').then((value) => {
          DataValues.push({ExerciseOrderType: value})
        })
        
        cy.get('[name="IsTestAllowed"]').find('[type="checkbox"]').check({force: true})
        cy.get('[id="TrainingTestIdentifier"]').clear().type('Testovací identifikátor')
        cy.get('[name="IsTestAllowed"]').find('[type="checkbox"]').then((value) => {
          const isChecked = value.prop('checked');
          if (isChecked) {
            DataValues.push({IsTestAllowed: "yes"});
          } else {
            DataValues.push({IsTestAllowed: "no"});
          }
        });

        cy.get('[name="TakingTestAfterDeadlinePassedIsBlocked"]').find('[type="checkbox"]').check({force: true})
        cy.get('[name="TakingTestAfterDeadlinePassedIsBlocked"]').find('[type="checkbox"]').then((value) => {
          const isChecked = value.prop('checked');
          if (isChecked) {
            DataValues.push({TakingTestAfterDeadlinePassedIsBlocked: "yes"});
          } else {
            DataValues.push({TakingTestAfterDeadlinePassedIsBlocked: "no"});
          }
        })

        cy.get('[name="TimeLimitedAllAutomatedTasks"]').find('[type="checkbox"]').check({force:true })
        cy.get('[name="TimeLimitedAllAutomatedTasks"]').find('[type="checkbox"]').then((value) => {
          const isChecked = value.prop('checked');
          if (isChecked) {
            DataValues.push({TimeLimitedAllAutomatedTasks: "yes"});
          } else {
            DataValues.push({TimeLimitedAllAutomatedTasks: "no"});
          }
        })

        cy.get('[id="TimeToCreateCalendarEventsInHours"]').invoke('val').then((value) => {
          DataValues.push({TimeToCreateCalendarEventsInHours: value})
        })
        cy.get('[id="TimeToCreateCalendarEventsInMinutes"]').invoke('val').then((value) => {
          DataValues.push({TimeToCreateCalendarEventsInMinutes: value})
        })

        cy.wait(1000).then(() => {
          jsonData['Values'] = DataValues;
          cy.writeFile('cypress/fixtures/vo_settings_checker.json', JSON.stringify(jsonData, null, 2))
        })
        
        cy.get('[type="submit"]').click()

        cy.wait(10000)
        cy.get('af-tabs').find('li').first().click()
        cy.get('[type="button"]').first().click()
      })
    })