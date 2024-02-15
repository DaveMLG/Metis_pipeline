describe('Product owner', function () {

    before(() => {
      cy.visit('https://dev.metis.academy/admin');
      cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
      cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
      cy.get('[type="submit"]').should('be.visible');
      cy.get('[type="submit"]').should('be.visible');
      cy.get('[name="userName"]').type('skorg1.vo');
      cy.get('[name="password"]').type('ML_heslo1');
      cy.get('[type="submit"]').click();
    });
  
    it('Vytvorenie nového školenia', function () {
  
      cy.readFile('cypress/fixtures/vo_settings_checker.json', 'utf-8').then((jsonData) => {
        // Nahrá všety dáta pre for loopy
        const valuesArray = jsonData.Values;
  
        // Obsah
        const guarantorName = jsonData.Values[0].guaratorName;
        const type = jsonData.Values.find(obj => obj.type)?.type;
        const Title = jsonData.Values.find(obj => obj.Title)?.Title;
        const PortalTitle = jsonData.Values.find(obj => obj.PortalTitle)?.PortalTitle;
        const languages = jsonData.Values.find(obj => obj.languages)?.languages;
        const HoverDescription = jsonData.Values.find(obj => obj.HoverDescription)?.HoverDescription;
        const LecturerInstruction = jsonData.Values.find(obj => obj.LecturerInstruction)?.LecturerInstruction;
        const StudentInstruction = jsonData.Values.find(obj => obj.StudentInstruction)?.StudentInstruction;
        const productOwner = jsonData.Values.find(obj => obj.productOwner)?.productOwner;
  
        // Nastavenia
        const TestAutomatedLevelOfDegressiveAssesment = jsonData.Values.find(obj => obj.TestAutomatedLevelOfDegressiveAssesment)?.TestAutomatedLevelOfDegressiveAssesment;
        const TestOpenLevelOfDegressiveAssesment = jsonData.Values.find(obj => obj.TestOpenLevelOfDegressiveAssesment)?.TestOpenLevelOfDegressiveAssesment;
        const ImportanceCoefficientLevelLow = jsonData.Values.find(obj => obj.ImportanceCoefficientLevelLow)?.ImportanceCoefficientLevelLow;
        const ImportanceCoefficientLevelMedium = jsonData.Values.find(obj => obj.ImportanceCoefficientLevelMedium)?.ImportanceCoefficientLevelMedium;
        const ImportanceCoefficientLevelHigh = jsonData.Values.find(obj => obj.ImportanceCoefficientLevelHigh)?.ImportanceCoefficientLevelHigh;
        const ManualTaskMultiplicator = jsonData.Values.find(obj => obj.ManualTaskMultiplicator)?.ManualTaskMultiplicator;
        const ActivityLanguageId = jsonData.Values.find(obj => obj.ActivityLanguageId)?.ActivityLanguageId;
  
        const ActivityInputData = [];
        for (let x = 0; x < valuesArray.length; x++) {
          ActivityInputData.push(valuesArray[x].ActivityInput);
        }
        const ActivityInputDataFiltered = ActivityInputData.filter(item => item !== undefined);
  
        const ActivityInputDataChecbox = [];
        for (let x = 0; x < valuesArray.length; x++) {
          ActivityInputDataChecbox.push(valuesArray[x].ActivityCheckbox);
        }
        const ActivityInputDataChecboxFiltered = ActivityInputDataChecbox.filter(item => item !== undefined);
  
        const MetricCategoryLanguageId = jsonData.Values.find(obj => obj.MetricCategoryLanguageId)?.MetricCategoryLanguageId;

  
        const MetricCategories = [];
        for (let x = 0; x < valuesArray.length; x++) {
          MetricCategories.push(valuesArray[x].MetricCategories);
        }
        const MetricCategoriesFiltered = MetricCategories.filter(item => item !== undefined);
  
        const availableTasks = [];
        for (let x = 0; x < valuesArray.length; x++) {
          availableTasks.push(valuesArray[x].availableTasks);
        }
        const availableTasksFiltered = availableTasks.filter(item => item !== undefined);
  
        const timeValuesTasksOnTime = [];
        for (let x = 0; x < valuesArray.length; x++) {
          timeValuesTasksOnTime.push(valuesArray[x].timeValuesTasksOnTime);
        }
        const timeValuesTasksOnTimeFiltered = timeValuesTasksOnTime.filter(item => item !== undefined);
  
        const timeValuesPastTime = [];
        for (let x = 0; x < valuesArray.length; x++) {
          timeValuesPastTime.push(valuesArray[x].timeValuesPastTime);
        }
        const timeValuesPastTimeFiltered = timeValuesPastTime.filter(item => item !== undefined);
  
        const UnmoderatedWithEvaluation = [];
        for (let x = 0; x < valuesArray.length; x++) {
          UnmoderatedWithEvaluation.push(valuesArray[x].UnmoderatedWithEvaluation);
        }
        const UnmoderatedWithEvaluationFiltered = UnmoderatedWithEvaluation.filter(item => item !== undefined);
  
        const UnmoretatedInputs = [];
        for (let x = 0; x < valuesArray.length; x++) {
          UnmoretatedInputs.push(valuesArray[x].UnmoretatedInputs);
        }
        const UnmoretatedInputsFiltered = UnmoretatedInputs.filter(item => item !== undefined);
  
        const TimeLimitedTrainings = jsonData.Values.find(obj => obj.TimeLimitedTrainings)?.TimeLimitedTrainings;
        const TimeLimitedCoefficient = jsonData.Values.find(obj => obj.TimeLimitedCoefficient)?.TimeLimitedCoefficient;
        const EvaluationSoftDeadlineAt = jsonData.Values.find(obj => obj.EvaluationSoftDeadlineAt)?.EvaluationSoftDeadlineAt;
        const EvaluationDeadlineAt = jsonData.Values.find(obj => obj.EvaluationDeadlineAt)?.EvaluationDeadlineAt;
        const TestAutomatedRepeatLimit = jsonData.Values.find(obj => obj.TestAutomatedRepeatLimit)?.TestAutomatedRepeatLimit;
        const TestOpenRepeatLimit = jsonData.Values.find(obj => obj.TestOpenRepeatLimit)?.TestOpenRepeatLimit;
        const InactiveLessonsThreshold = jsonData.Values.find(obj => obj.InactiveLessonsThreshold)?.InactiveLessonsThreshold;
        const InactivityNotificationInterval = jsonData.Values.find(obj => obj.InactivityNotificationInterval)?.InactivityNotificationInterval;
        const InactivityStudentNotificationThreshold = jsonData.Values.find(obj => obj.InactivityStudentNotificationThreshold)?.InactivityStudentNotificationThreshold;
        const InactivityStudentNotificationInterval = jsonData.Values.find(obj => obj.InactivityStudentNotificationInterval)?.InactivityStudentNotificationInterval;

        const ConsideredExercisesList = []
        for (let x = 0; x < valuesArray.length; x++) {
            ConsideredExercisesList.push(valuesArray[x].ConsideredExercisesList);
          }
        const ConsideredExercisesListFilterd = ConsideredExercisesList.filter(item => item !== undefined);

        const EstimatedTimeForLessonEvaluation = jsonData.Values.find(obj => obj.EstimatedTimeForLessonEvaluation)?.EstimatedTimeForLessonEvaluation;
        const EstimatedLessonDurationForLecturerInTime = jsonData.Values.find(obj => obj.EstimatedLessonDurationForLecturerInTime)?.EstimatedLessonDurationForLecturerInTime;
        const EstimatedTimeForLessonDevelopment = jsonData.Values.find(obj => obj.EstimatedTimeForLessonDevelopment)?.EstimatedTimeForLessonDevelopment;
        const ExerciseOrderType = jsonData.Values.find(obj => obj.ExerciseOrderType)?.ExerciseOrderType;
        const IsTestAllowed = jsonData.Values.find(obj => obj.IsTestAllowed)?.IsTestAllowed;
        const TakingTestAfterDeadlinePassedIsBlocked = jsonData.Values.find(obj => obj.TakingTestAfterDeadlinePassedIsBlocked)?.TakingTestAfterDeadlinePassedIsBlocked;
        const TimeLimitedAllAutomatedTasks = jsonData.Values.find(obj => obj.TimeLimitedAllAutomatedTasks)?.TimeLimitedAllAutomatedTasks;
        const TimeToCreateCalendarEventsInHours = jsonData.Values.find(obj => obj.TimeToCreateCalendarEventsInHours)?.TimeToCreateCalendarEventsInHours;
        const TimeToCreateCalendarEventsInMinutes = jsonData.Values.find(obj => obj.TimeToCreateCalendarEventsInMinutes)?.TimeToCreateCalendarEventsInMinutes;

        cy.viewport(1920, 937);
        cy.get('.icon-menu-elearning').click();
        cy.get('[href="/admin/elearning/training"]').click();
        cy.wait(3000)
        cy.get('[type = "text"]').first().clear().type('PO CY')
        cy.get('[type="submit"]').first().click()
        cy.wait(5000);
        cy.sortTableByColumn('Vytvorené');
        cy.contains('PO CY').click()
        cy.wait(5000)

/*cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.TrainingEditViewModel.ListOfGuarantorsLabel"]').prev().invoke('text').then((value) => {
          cy.wrap(value).should('eq', guarantorName)*/

        /*cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.TrainingEditViewModel.TrainingType"]').prev().invoke('text').then((value) => {
          cy.wrap(value).should('eq', type) 
        })*/
        cy.get('[name="Title"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', Title) 
        })
        cy.get('[name="PortalTitle"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', PortalTitle) 
        })
        cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', languages) 
        })
        cy.get('[for="HoverDescription"]').parentsUntil('.row').find('.note-editing-area').children().invoke('text').then((value) => {
          cy.wrap(value).should('eq', HoverDescription) 
        })
        cy.get('[for="LecturerInstruction"]').parentsUntil('.row').find('.note-editing-area').children().invoke('text').then((value) => {
          cy.wrap(value).should('eq', LecturerInstruction) 
        })
        cy.get('[for="StudentInstruction"]').parentsUntil('.row').find('.note-editing-area').children().invoke('text').then((value) => {
          cy.wrap(value).should('eq', StudentInstruction) 
        })
        cy.contains('Vlastníci obsahu').parentsUntil('.row').find('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', productOwner) 

        //Preklikne sa na Nastavenia
        cy.get('af-tabs').find('li').eq(2).click()
        cy.wait(1000)
        //Rozklikne Koeficienty hodnotenia
        cy.contains('Koeficienty hodnotenia').find('i').click({timeout: 100000})

        cy.get('[id="TestAutomatedLevelOfDegressiveAssesment"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', TestAutomatedLevelOfDegressiveAssesment) 
        })

        cy.get('[id="TestOpenLevelOfDegressiveAssesment"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', TestOpenLevelOfDegressiveAssesment)   
        })

        cy.get('[name="ImportanceCoefficientLevelLow"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', ImportanceCoefficientLevelLow) 
        })

        cy.get('[name="ImportanceCoefficientLevelMedium"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', ImportanceCoefficientLevelMedium) 
        })

        cy.get('[name="ImportanceCoefficientLevelHigh"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', ImportanceCoefficientLevelHigh) 
        })

        cy.get('[name="ManualTaskMultiplicator"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', ManualTaskMultiplicator) 
        })
        
        cy.get('[id="ActivityLanguageId"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', ActivityLanguageId) 

        cy.get('.tableFloatingHeaderOriginal').next().next().find('input:not([type="checkbox"])').then((values) => {
          for (let x = 0; x < values.length; x++) {
            cy.wrap(values).eq(x).invoke('val').then((vals) => {
              cy.wrap(vals).should('eq', ActivityInputDataFiltered[x]);
              })
          }})
        
          cy.get('.tableFloatingHeaderOriginal').next().next().find('input[type="checkbox"]').then((values) => {
            for (let x = 0; x < values.length; x++) {
              if (ActivityInputDataChecboxFiltered[x] === 'yes') {
                cy.wrap(values).eq(x).should('be.checked')
            } else {
                cy.wrap(values).eq(x).should('not.be.checked')
            }
          }
        })

        //Rozklikne Metriky
        cy.contains('Koeficienty hodnotenia').find('i').click({timeout: 100000})
        cy.contains('Metriky').find('i').click({timeout: 100000})

        cy.get('[id="MetricCategoryLanguageId"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', MetricCategoryLanguageId) 
        })

        cy.get('.tableFloatingHeaderOriginal').next().next().find('input').then((values) => {
          for (let x = 0; x < values.length; x++) {
            cy.wrap(values).eq(x).invoke('val').then((vals) => {
              cy.wrap(vals).should('eq', MetricCategoriesFiltered[x]);
              })
          }})

        //Časové hodnoty pre sprístupnenie/konanie/odovzdanie úloh
        cy.contains('Metriky').find('i').click({timeout: 100000})
        /*cy.contains('Časové hodnoty pre sprístupnenie/konanie/odovzdanie úloh').find('i').click({timeout: 100000})

        cy.get('.tableFloatingHeaderOriginal').first().next().next().find('input, select').then((inpValue) => {
          for (let x = 0; x < inpValue.length; x++) {
            cy.wrap(inpValue).eq(x).invoke('val').then((vals) => {
              cy.wrap(vals).should('eq', availableTasksFiltered[x])
            })
          }
        })
        cy.get('.tableFloatingHeaderOriginal').eq(1).next().next().find('input, select').then((inpValue) => {
          for (let x = 0; x < inpValue.length; x++) {
            cy.wrap(inpValue).eq(x).invoke('val').then((vals) => {
              cy.wrap(vals).should('eq', timeValuesTasksOnTimeFiltered[x])
            })
          }
          cy.get('.tableFloatingHeaderOriginal').eq(2).next().next().find('input, select').then((inpValue) => {
            for (let x = 0; x < inpValue.length; x++) {
              cy.wrap(inpValue).eq(x).invoke('val').then((vals) => {
                cy.wrap(vals).should('eq', timeValuesPastTimeFiltered[x])
              })
            }

        //Rozklikne Termíny lekcií pre nemoderované školenia
        cy.contains('Časové hodnoty pre sprístupnenie/konanie/odovzdanie úloh').find('i').click({timeout: 100000})
        cy.contains('Termíny lekcií pre nemoderované školenia').find('i').click({timeout: 100000})
        cy.get('.tableFloatingHeaderOriginal').next().next().find('input:not([type="checkbox"])').then((values) => {
          for (let x = 0; x < values.length; x++) {
            cy.wrap(values).eq(x).invoke('val').then((vals) => {
              cy.wrap(vals).should('eq', UnmoretatedInputsFiltered[x]);
              })
            }   
            
            cy.get('.tableFloatingHeaderOriginal').next().next().find('input[type="checkbox"]').then((values) => {
              for (let x = 0; x < values.length; x++) {
                if (UnmoderatedWithEvaluationFiltered[x] === 'yes') {
                  cy.wrap(values).eq(x).should('be.checked')
              } else {
                  cy.wrap(values).eq(x).should('not.be.checked')
              }
              }
            })
          })*/
          
        //Závislosť sprístupnenia úloh
        //cy.contains('Termíny lekcií pre nemoderované školenia').find('i').click({timeout: 100000})
        cy.contains('Závislosť sprístupnenia úloh').find('i').click({timeout: 100000})

        cy.get('.radio-button-active').invoke('val').then((value) => {
          cy.wrap(value).should('eq', TimeLimitedTrainings) 
        })

        //Časovo limitované školenie - hodnoty pre odovzdanie úloh
        cy.contains('Závislosť sprístupnenia úloh').find('i').click({timeout: 100000})
        cy.contains('Časovo limitované školenie - hodnoty pre odovzdanie úloh').find('i').click({timeout: 100000})
        
        cy.get('[name="TimeLimitedCoefficient"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', TimeLimitedCoefficient) 
        })

        cy.contains('Časovo limitované školenie - hodnoty pre odovzdanie úloh').find('i').click({timeout: 100000})
        cy.contains('Termíny na vyhodnotenie úloh').find('i').click({timeout: 100000})

        cy.get('[name="EvaluationSoftDeadlineAt"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', EvaluationSoftDeadlineAt)
      })

      cy.get('[name="EvaluationDeadlineAt"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EvaluationDeadlineAt)
    })

      cy.contains('Termíny na vyhodnotenie úloh').find('i').click({timeout: 100000})
      cy.contains('Limity pre opakované akcie').find('i').click({timeout: 100000})

      cy.get('[name="TestAutomatedRepeatLimit"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', TestAutomatedRepeatLimit)
    })

      cy.get('[name="TestOpenRepeatLimit"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', TestOpenRepeatLimit)
    })

      cy.contains('Limity pre opakované akcie').find('i').click({timeout: 100000})
      cy.contains('Thresholdy inaktivity').find('i').click({timeout: 100000})

      cy.get('[name="InactiveLessonsThreshold"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', InactiveLessonsThreshold)
    })

      cy.get('[name="InactivityNotificationInterval"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', InactivityNotificationInterval)
      })

      cy.get('[name="InactivityStudentNotificationThreshold"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', InactivityStudentNotificationThreshold)
      })

     /* cy.get('[for="ConsideredExercisesList"]').next().then((valList) => {
        for (let x = 0; x < valList.length; x++) {
          cy.wrap(valList[x]).invoke('text').then((vals) => {
            cy.wrap(vals).should('eq', ConsideredExercisesList[x]);
            })
        }
      })*/

      cy.get('[name="InactivityStudentNotificationInterval"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', InactivityStudentNotificationInterval)
      })

      cy.contains('Thresholdy inaktivity').find('i').click({timeout: 100000})
      cy.contains('Thresholdy pre trvanie lekcie').find('i').click({timeout: 100000})

      cy.get('[name="EstimatedTimeForLessonEvaluation"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimatedTimeForLessonEvaluation)
      })

      cy.get('[name="EstimatedLessonDurationForLecturerInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimatedLessonDurationForLecturerInTime)
      })

      cy.get('[name="EstimatedTimeForLessonDevelopment"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimatedTimeForLessonDevelopment)
      })

      cy.contains('Thresholdy pre trvanie lekcie').find('i').click({timeout: 100000})
      cy.contains('Ostatné').find('i').click({timeout: 100000})

      cy.get('[name="ExerciseOrderType"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', ExerciseOrderType)
      })

      cy.get('[name="IsTestAllowed"]').find('[type="checkbox"]').then((values) => {
        if (IsTestAllowed=== 'yes') {
          cy.wrap(values).should('be.checked')
      } else {
          cy.wrap(values).should('not.be.checked')
      }
      });

      cy.get('[name="TakingTestAfterDeadlinePassedIsBlocked"]').find('[type="checkbox"]').then((values) => {
        if (TakingTestAfterDeadlinePassedIsBlocked=== 'yes') {
          cy.wrap(values).should('be.checked')
      } else {
          cy.wrap(values).should('not.be.checked')
      }
      });

      cy.get('[name="TimeLimitedAllAutomatedTasks"]').find('[type="checkbox"]').then((values) => {
        if (TimeLimitedAllAutomatedTasks=== 'yes') {
          cy.wrap(values).should('be.checked')
      } else {
          cy.wrap(values).should('not.be.checked')
      }
      });

      cy.get('[name="TimeToCreateCalendarEventsInHours"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', TimeToCreateCalendarEventsInHours)
      })

      cy.get('[name="TimeToCreateCalendarEventsInMinutes"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', TimeToCreateCalendarEventsInMinutes)
      })

      })
  })
})
})
})
//})
///});

