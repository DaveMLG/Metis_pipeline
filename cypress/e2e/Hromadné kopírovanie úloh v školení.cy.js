describe('Product owner', function () {
  beforeEach(() => {
      cy.visit(Cypress.env('websiteUrl'))
      cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
      cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
      cy.get('[type="submit"]').should('be.visible');
      cy.get('[type="submit"]').should('be.visible');
      cy.get('[name="userName"]').type(Cypress.env('loginGO'));
      cy.get('[name="password"]').type(Cypress.env('password'));
      cy.get('[type="submit"]').click();
      cy.viewport(1920, 937);
  });

  it('Skopírovanie dát zo školenia, ktoré budeme hromadne manažovať + kontrola bez checkboxov', function () {
      // Uloží data z popisu
      let DataValues = [];
      let jsonData = {};

      cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
      cy.get('@nastavenia').click();
      cy.get('[href="/admin/elearning/training"]').click();
      cy.wait(3000);
      cy.get('[placeholder="Kľúčové slovo"]').type('G Kopírovanie úloh_AAA');
      cy.get('[type="submit"]').first().click().wait(1000);
      cy.get('tbody').find('a').first().click().wait(1000);
      cy.get(':nth-child(5) > .nav-link').click();

      cy.get('tbody').find('tr').contains('Web').then(edit => {
          cy.wrap(edit).parent().parent().parent().contains('Editovať').click();
      });
        
      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
          const isChecked = value.prop('checked');
          if (isChecked) {
              DataValues.push({ useLessonName: 'yes' });
          } else {
              DataValues.push({ useLessonName: 'no' });
          }
      });
        
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
          DataValues.push({ language: value });
      });
        
      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
          DataValues.push({ LengthInTime: value });
      });
        
      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
          DataValues.push({ EstimateTimeForEvaluationInTime: value });
      });
        
      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({ ExperiencePoints: value });
      });
        
      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
          DataValues.push({ difficulty: value });
      });
        
      cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
          const isChecked = value.prop('checked');
          if (isChecked) {
              DataValues.push({ IsTimeLimitedTask: 'yes' });
          } else {
              DataValues.push({ IsTimeLimitedTask: 'no' });
          }
      });
        
      cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
          const isChecked = value.prop('checked');
          if (isChecked) {
              DataValues.push({ NotMandatory: 'yes' });
          } else {
              DataValues.push({ NotMandatory: 'no' });
          }
      });
        
      cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({ GuarantorId: value });
      });
        
      cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({ Guarantors: value });
      });
        
      cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({ ContentAssistants: value });
      });
        
      cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({ Trainings: value });
      });
        
      cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
          DataValues.push({ lecturerInstruction: value });
      });

      cy.get('[name="correctorInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
          DataValues.push({ correctorInstruction: value });
      });
        
      cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
          DataValues.push({ lecturerInternalMaterial: value });
      });
        
      cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
          DataValues.push({ studentInstruction: value });
      });

      cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').last().invoke('text').then((value) => {
          DataValues.push({ correctorInstruction: value });
      });
        
      cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
          DataValues.push({ Description: value });
      });
        
      cy.get('[name="Content"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
          DataValues.push({ Content: value });
      });

      cy.wait(1000).then(() => {
          jsonData['Webinar'] = DataValues;
          cy.writeFile('cypress/fixtures/content_copy_within_task.json', JSON.stringify(jsonData, null, 2));
      });

      cy.get('[onclick="history.back()"]').first().click();
      cy.get('[type="submit"]').last().click();

      cy.get('[type = radio]').last().check({ force: true });
      cy.get('[name="fromSelectedTheme"]').select('1. Téma_1').wait(1000);
      cy.get('[name="fromSelectedLesson"]').select('1. Lekcia_1').wait(1000);

      cy.get('[name="intoSelectTheme"]').select('2. Téma_2').wait(1000);
      cy.get('[name="intoSelectLesson"]').select('1. Lekcia_2').wait(1000);
      cy.get('[type = checkbox]').then((checkCount) => {
          for (let x = 0; x < checkCount.length; x++) {
              cy.wrap(checkCount[x]).check({ force: true });
          }
      });

      cy.get('[type="button"]').first().click();
      cy.wait(5000);
      cy.get('[type="submit"]').last().click();
      cy.wait(10000);

      //Kontrola všetkého obsahu aj lekcií
      cy.readFile('cypress/fixtures/content_copy_within_task.json', 'utf-8').then((jsonData) => {
          cy.get('tbody').last().find('tr').contains('2').then(edit => {
              cy.wrap(edit).parent().parent().parent().contains('Editovať').click();
          });
          cy.wait(5000);

          const useLessonNameW = jsonData.Webinar.find(obj => obj.useLessonName)?.useLessonName;
          const languageW = jsonData.Webinar.find(obj => obj.language)?.language;
          const LengthInTimeW = jsonData.Webinar.find(obj => obj.LengthInTime)?.LengthInTime;
          const EstimateTimeForEvaluationInTimeW = jsonData.Webinar.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
          const ExperiencePointsW = jsonData.Webinar.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
          const difficultyW = jsonData.Webinar.find(obj => obj.difficulty)?.difficulty;
          const IsTimeLimitedTaskW = jsonData.Webinar.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
          const NotMandatoryW = jsonData.Webinar.find(obj => obj.NotMandatory)?.NotMandatory;
          const GuarantorIdW = jsonData.Webinar.find(obj => obj.GuarantorId)?.GuarantorId;
          const GuarantorsW = jsonData.Webinar.find(obj => obj.Guarantors)?.Guarantors;
          const ContentAssistantsW = jsonData.Webinar.find(obj => obj.ContentAssistants)?.ContentAssistants;
          const correctorInstructionW = jsonData.Webinar.find(obj => obj.correctorInstruction)?.correctorInstruction;
          const lecturerInstructionW = jsonData.Webinar.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
          const lecturerInternalMaterialW = jsonData.Webinar.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
          const studentInstructionW = jsonData.Webinar.find(obj => obj.studentInstruction)?.studentInstruction;
          const DescriptionW = jsonData.Webinar.find(obj => obj.Description)?.Description;
          const ContentW = jsonData.Webinar.find(obj => obj.Content)?.Content;

          cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
              if (useLessonNameW === 'yes') {
                  cy.wrap(value).should('be.checked');
              } else {
                  cy.wrap(value).should('not.be.checked');
              }
          }); 
      
          cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
              cy.wrap(value).should('eq', languageW);
          });
        
          cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
              cy.wrap(value).should('eq', LengthInTimeW);
          });
        
          cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
              cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeW);
          });
        
          cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
              cy.wrap(value).should('eq', ExperiencePointsW);
          });
        
          cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
              cy.wrap(value).should('eq', difficultyW);
          });
        
          cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
              if (IsTimeLimitedTaskW === 'yes') {
                  cy.wrap(value).should('be.checked');
              } else {
                  cy.wrap(value).should('not.be.checked');
              }
          });
        
          cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
              if (NotMandatoryW === 'yes') {
                  cy.wrap(value).should('be.checked');
              } else {
                  cy.wrap(value).should('not.be.checked');
              }
          });
      
          cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
              cy.wrap(value).should('eq', GuarantorIdW);
          });
        
          cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
              cy.wrap(value).should('eq', GuarantorsW);
          });
        
          cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
              cy.wrap(value).should('eq', ContentAssistantsW);
          });
        
          cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
              cy.wrap(value).should('eq', lecturerInstructionW);
          });

          cy.get('[name="correctorInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
              cy.wrap(value).should('eq', correctorInstructionW);
          });
        
          cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
              cy.wrap(value).should('eq', lecturerInternalMaterialW);
          });
      
          cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
              cy.wrap(value).should('eq', studentInstructionW);
          });
        
          cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
              cy.wrap(value).should('eq', DescriptionW);
          });
        
          cy.get('[name="Content"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
              cy.wrap(value).should('eq', ContentW);
          });
        
          cy.get('[onclick="history.back()"]').first().click().wait(1000);
      });
  });

  it('Kopírovanie obsahu + overenie', function(){
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.wait(3000);
    cy.get('[placeholder="Kľúčové slovo"]').type('G Kopírovanie úloh_AAA');
    cy.get('[type="submit"]').first().click().wait(1000);
    cy.get('tbody').find('a').first().click().wait(1000);
    cy.get(':nth-child(5) > .nav-link').click();

    cy.get('[type = radio]').last().check({ force: true });
    cy.get('[name="fromSelectedTheme"]').select('1. Téma_1').wait(1000);
    cy.get('[name="fromSelectedLesson"]').select('1. Lekcia_1').wait(1000);

    cy.get('[name="intoSelectTheme"]').select('2. Téma_2').wait(1000);
    cy.get('[name="intoSelectLesson"]').select('1. Lekcia_2').wait(1000);

    cy.get('[type = checkbox]').then((checkCount) => {
        for (let x = 0; x < checkCount.length; x++) {
            cy.wrap(checkCount[x]).uncheck({ force: true });
        }
    });

    cy.get('[type = checkbox]').first().check({force: true})

    cy.get('[type="button"]').first().click();
    cy.wait(5000);
    cy.get('[type="submit"]').last().click();
    cy.wait(10000);

    //Kontrola všetkého obsahu aj lekcií
    cy.readFile('cypress/fixtures/content_copy_within_task.json', 'utf-8').then((jsonData) => {
        cy.get('tbody').last().find('tr').last().contains('2').then(edit => {
            cy.wrap(edit).parent().parent().parent().contains('Editovať').click();
        });
        cy.wait(5000);

        const useLessonNameW = jsonData.Webinar.find(obj => obj.useLessonName)?.useLessonName;
        const languageW = jsonData.Webinar.find(obj => obj.language)?.language;
        const LengthInTimeW = jsonData.Webinar.find(obj => obj.LengthInTime)?.LengthInTime;
        const EstimateTimeForEvaluationInTimeW = jsonData.Webinar.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
        const ExperiencePointsW = jsonData.Webinar.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
        const difficultyW = jsonData.Webinar.find(obj => obj.difficulty)?.difficulty;
        const IsTimeLimitedTaskW = jsonData.Webinar.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
        const NotMandatoryW = jsonData.Webinar.find(obj => obj.NotMandatory)?.NotMandatory;
        const GuarantorIdW = jsonData.Webinar.find(obj => obj.GuarantorId)?.GuarantorId;
        const GuarantorsW = jsonData.Webinar.find(obj => obj.Guarantors)?.Guarantors;
        const ContentAssistantsW = jsonData.Webinar.find(obj => obj.ContentAssistants)?.ContentAssistants;
        const correctorInstructionW = jsonData.Webinar.find(obj => obj.correctorInstruction)?.correctorInstruction;
        const lecturerInstructionW = jsonData.Webinar.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
        const lecturerInternalMaterialW = jsonData.Webinar.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
        const studentInstructionW = jsonData.Webinar.find(obj => obj.studentInstruction)?.studentInstruction;
        const DescriptionW = jsonData.Webinar.find(obj => obj.Description)?.Description;
        const ContentW = jsonData.Webinar.find(obj => obj.Content)?.Content;

        cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
            if (useLessonNameW === 'yes') {
                cy.wrap(value).should('be.checked');
            } else {
                cy.wrap(value).should('not.be.checked');
            }
        }); 
    
        cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', languageW);
        });
      
        cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', LengthInTimeW);
        });
      
        cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeW);
        });
      
        cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', ExperiencePointsW);
        });
      
        cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', difficultyW);
        });
      
        cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
            if (IsTimeLimitedTaskW === 'yes') {
                cy.wrap(value).should('be.checked');
            } else {
                cy.wrap(value).should('not.be.checked');
            }
        });
      
        cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
            if (NotMandatoryW === 'yes') {
                cy.wrap(value).should('be.checked');
            } else {
                cy.wrap(value).should('not.be.checked');
            }
        });
    
        cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', GuarantorIdW);
        });
      
        cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', GuarantorsW);
        });
      
        cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', ContentAssistantsW);
        });
      
        cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });

        cy.get('[name="correctorInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
      
        cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
    
        cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
      
        cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('eq', DescriptionW);
        });
      
        cy.get('[name="Content"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('eq', ContentW);
        });
      
        cy.get('[onclick="history.back()"]').first().click().wait(1000);
    });
});

it('Kopírovanie inštrukcií pre lektora + overenie', function(){
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.wait(3000);
    cy.get('[placeholder="Kľúčové slovo"]').type('G Kopírovanie úloh_AAA');
    cy.get('[type="submit"]').first().click().wait(1000);
    cy.get('tbody').find('a').first().click().wait(1000);
    cy.get(':nth-child(5) > .nav-link').click();

    cy.get('[type = radio]').last().check({ force: true }).wait(5000)
    cy.get('[name="fromSelectedTheme"]').select('1. Téma_1').wait(1000);
    cy.get('[name="fromSelectedLesson"]').select('1. Lekcia_1').wait(1000);

    cy.get('[name="intoSelectTheme"]').select('2. Téma_2').wait(1000);
    cy.get('[name="intoSelectLesson"]').select('1. Lekcia_2').wait(1000);

    cy.get('[type = checkbox]').then((checkCount) => {
        for (let x = 0; x < checkCount.length; x++) {
            cy.wrap(checkCount[x]).uncheck({ force: true });
        }
    });

    cy.get('[type = checkbox]').eq(1).check({force: true})

    cy.get('[type="button"]').first().click();
    cy.wait(5000);
    cy.get('[type="submit"]').last().click();
    cy.wait(10000);

    cy.readFile('cypress/fixtures/content_copy_within_task.json', 'utf-8').then((jsonData) => {
        cy.get('tbody').last().find('tr').last().contains('2').then(edit => {
            cy.wrap(edit).parent().parent().parent().contains('Editovať').click();
        });
        cy.wait(5000);

        const useLessonNameW = jsonData.Webinar.find(obj => obj.useLessonName)?.useLessonName;
        const languageW = jsonData.Webinar.find(obj => obj.language)?.language;
        const LengthInTimeW = jsonData.Webinar.find(obj => obj.LengthInTime)?.LengthInTime;
        const EstimateTimeForEvaluationInTimeW = jsonData.Webinar.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
        const ExperiencePointsW = jsonData.Webinar.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
        const difficultyW = jsonData.Webinar.find(obj => obj.difficulty)?.difficulty;
        const IsTimeLimitedTaskW = jsonData.Webinar.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
        const NotMandatoryW = jsonData.Webinar.find(obj => obj.NotMandatory)?.NotMandatory;
        const GuarantorIdW = jsonData.Webinar.find(obj => obj.GuarantorId)?.GuarantorId;
        const GuarantorsW = jsonData.Webinar.find(obj => obj.Guarantors)?.Guarantors;
        const ContentAssistantsW = jsonData.Webinar.find(obj => obj.ContentAssistants)?.ContentAssistants;
        const correctorInstructionW = jsonData.Webinar.find(obj => obj.correctorInstruction)?.correctorInstruction;
        const lecturerInstructionW = jsonData.Webinar.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
        const lecturerInternalMaterialW = jsonData.Webinar.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
        const studentInstructionW = jsonData.Webinar.find(obj => obj.studentInstruction)?.studentInstruction;
        const DescriptionW = jsonData.Webinar.find(obj => obj.Description)?.Description;
        const ContentW = jsonData.Webinar.find(obj => obj.Content)?.Content;

        cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
            if (useLessonNameW === 'yes') {
                cy.wrap(value).should('be.checked');
            } else {
                cy.wrap(value).should('not.be.checked');
            }
        }); 
    
        cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', languageW);
        });
      
        cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', LengthInTimeW);
        });
      
        cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeW);
        });
      
        cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', ExperiencePointsW);
        });
      
        cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', difficultyW);
        });
      
        cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
            if (IsTimeLimitedTaskW === 'yes') {
                cy.wrap(value).should('be.checked');
            } else {
                cy.wrap(value).should('not.be.checked');
            }
        });
      
        cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
            if (NotMandatoryW === 'yes') {
                cy.wrap(value).should('be.checked');
            } else {
                cy.wrap(value).should('not.be.checked');
            }
        });
    
        cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', GuarantorIdW);
        });
      
        cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', GuarantorsW);
        });
      
        cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', ContentAssistantsW);
        });
      
        cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('eq', lecturerInstructionW);
        });

        cy.get('[name="correctorInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
      
        cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
    
        cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
      
        cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
      
        cy.get('[name="Content"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('eq', ContentW);
        });
      
        cy.get('[onclick="history.back()"]').first().click().wait(1000);
    });
});

it('Kopírovať inštrukcie pre opravovača + overenie', function(){
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.wait(3000);
    cy.get('[placeholder="Kľúčové slovo"]').type('G Kopírovanie úloh_AAA');
    cy.get('[type="submit"]').first().click().wait(1000);
    cy.get('tbody').find('a').first().click().wait(1000);
    cy.get(':nth-child(5) > .nav-link').click();

    cy.get('[type = radio]').last().check({ force: true });
    cy.get('[name="fromSelectedTheme"]').select('1. Téma_1').wait(1000);
    cy.get('[name="fromSelectedLesson"]').select('1. Lekcia_1').wait(1000);

    cy.get('[name="intoSelectTheme"]').select('2. Téma_2').wait(1000);
    cy.get('[name="intoSelectLesson"]').select('1. Lekcia_2').wait(1000);

    cy.get('[type = checkbox]').then((checkCount) => {
        for (let x = 0; x < checkCount.length; x++) {
            cy.wrap(checkCount[x]).uncheck({ force: true });
        }
    });

    cy.get('[type = checkbox]').eq(2).check({force: true})

    cy.get('[type="button"]').first().click();
    cy.wait(5000);
    cy.get('[type="submit"]').last().click();
    cy.wait(10000);

    cy.readFile('cypress/fixtures/content_copy_within_task.json', 'utf-8').then((jsonData) => {
        cy.get('tbody').last().find('tr').last().contains('2').then(edit => {
            cy.wrap(edit).parent().parent().parent().contains('Editovať').click();
        });
        cy.wait(5000);

        const useLessonNameW = jsonData.Webinar.find(obj => obj.useLessonName)?.useLessonName;
        const languageW = jsonData.Webinar.find(obj => obj.language)?.language;
        const LengthInTimeW = jsonData.Webinar.find(obj => obj.LengthInTime)?.LengthInTime;
        const EstimateTimeForEvaluationInTimeW = jsonData.Webinar.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
        const ExperiencePointsW = jsonData.Webinar.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
        const difficultyW = jsonData.Webinar.find(obj => obj.difficulty)?.difficulty;
        const IsTimeLimitedTaskW = jsonData.Webinar.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
        const NotMandatoryW = jsonData.Webinar.find(obj => obj.NotMandatory)?.NotMandatory;
        const GuarantorIdW = jsonData.Webinar.find(obj => obj.GuarantorId)?.GuarantorId;
        const GuarantorsW = jsonData.Webinar.find(obj => obj.Guarantors)?.Guarantors;
        const ContentAssistantsW = jsonData.Webinar.find(obj => obj.ContentAssistants)?.ContentAssistants;
        const correctorInstructionW = jsonData.Webinar.find(obj => obj.correctorInstruction)?.correctorInstruction;
        const lecturerInstructionW = jsonData.Webinar.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
        const lecturerInternalMaterialW = jsonData.Webinar.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
        const studentInstructionW = jsonData.Webinar.find(obj => obj.studentInstruction)?.studentInstruction;
        const DescriptionW = jsonData.Webinar.find(obj => obj.Description)?.Description;
        const ContentW = jsonData.Webinar.find(obj => obj.Content)?.Content;

        cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
            if (useLessonNameW === 'yes') {
                cy.wrap(value).should('be.checked');
            } else {
                cy.wrap(value).should('not.be.checked');
            }
        }); 
    
        cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', languageW);
        });
      
        cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', LengthInTimeW);
        });
      
        cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeW);
        });
      
        cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', ExperiencePointsW);
        });
      
        cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', difficultyW);
        });
      
        cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
            if (IsTimeLimitedTaskW === 'yes') {
                cy.wrap(value).should('be.checked');
            } else {
                cy.wrap(value).should('not.be.checked');
            }
        });
      
        cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
            if (NotMandatoryW === 'yes') {
                cy.wrap(value).should('be.checked');
            } else {
                cy.wrap(value).should('not.be.checked');
            }
        });
    
        cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', GuarantorIdW);
        });
      
        cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', GuarantorsW);
        });
      
        cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', ContentAssistantsW);
        });
      
        cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });

        cy.get('[name="correctorInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('eq', correctorInstructionW);
        });
      
        cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
    
        cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
      
        cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
      
        cy.get('[name="Content"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('eq', ContentW);
        });
      
        cy.get('[onclick="history.back()"]').first().click().wait(1000);
    });
});

it('Kopírovať inštrukcie pre študenta + overenie', function(){
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.wait(3000);
    cy.get('[placeholder="Kľúčové slovo"]').type('G Kopírovanie úloh_AAA');
    cy.get('[type="submit"]').first().click().wait(1000);
    cy.get('tbody').find('a').first().click().wait(1000);
    cy.get(':nth-child(5) > .nav-link').click();

    cy.get('[type = radio]').last().check({ force: true });
    cy.get('[name="fromSelectedTheme"]').select('1. Téma_1').wait(1000);
    cy.get('[name="fromSelectedLesson"]').select('1. Lekcia_1').wait(1000);

    cy.get('[name="intoSelectTheme"]').select('2. Téma_2').wait(1000);
    cy.get('[name="intoSelectLesson"]').select('1. Lekcia_2').wait(1000);

    cy.get('[type = checkbox]').then((checkCount) => {
        for (let x = 0; x < checkCount.length; x++) {
            cy.wrap(checkCount[x]).uncheck({ force: true });
        }
    });

    cy.get('[type = checkbox]').eq(3).check({force: true})

    cy.get('[type="button"]').first().click();
    cy.wait(5000);
    cy.get('[type="submit"]').last().click();
    cy.wait(10000);

    cy.get('div.modal-footer').find('[type="button"]').click();
    cy.wait(3000);

    cy.readFile('cypress/fixtures/content_copy_within_task.json', 'utf-8').then((jsonData) => {
        cy.get('tbody').last().find('tr').last().contains('2').then(edit => {
            cy.wrap(edit).parent().parent().parent().contains('Editovať').click();
        });
        cy.wait(5000);

        const useLessonNameW = jsonData.Webinar.find(obj => obj.useLessonName)?.useLessonName;
        const languageW = jsonData.Webinar.find(obj => obj.language)?.language;
        const LengthInTimeW = jsonData.Webinar.find(obj => obj.LengthInTime)?.LengthInTime;
        const EstimateTimeForEvaluationInTimeW = jsonData.Webinar.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
        const ExperiencePointsW = jsonData.Webinar.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
        const difficultyW = jsonData.Webinar.find(obj => obj.difficulty)?.difficulty;
        const IsTimeLimitedTaskW = jsonData.Webinar.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
        const NotMandatoryW = jsonData.Webinar.find(obj => obj.NotMandatory)?.NotMandatory;
        const GuarantorIdW = jsonData.Webinar.find(obj => obj.GuarantorId)?.GuarantorId;
        const GuarantorsW = jsonData.Webinar.find(obj => obj.Guarantors)?.Guarantors;
        const ContentAssistantsW = jsonData.Webinar.find(obj => obj.ContentAssistants)?.ContentAssistants;
        const correctorInstructionW = jsonData.Webinar.find(obj => obj.correctorInstruction)?.correctorInstruction;
        const lecturerInstructionW = jsonData.Webinar.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
        const lecturerInternalMaterialW = jsonData.Webinar.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
        const studentInstructionW = jsonData.Webinar.find(obj => obj.studentInstruction)?.studentInstruction;
        const DescriptionW = jsonData.Webinar.find(obj => obj.Description)?.Description;
        const ContentW = jsonData.Webinar.find(obj => obj.Content)?.Content;

        cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
            if (useLessonNameW === 'yes') {
                cy.wrap(value).should('be.checked');
            } else {
                cy.wrap(value).should('not.be.checked');
            }
        }); 
    
        cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', languageW);
        });
      
        cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', LengthInTimeW);
        });
      
        cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeW);
        });
      
        cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', ExperiencePointsW);
        });
      
        cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            cy.wrap(value).should('eq', difficultyW);
        });
      
        cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
            if (IsTimeLimitedTaskW === 'yes') {
                cy.wrap(value).should('be.checked');
            } else {
                cy.wrap(value).should('not.be.checked');
            }
        });
      
        cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
            if (NotMandatoryW === 'yes') {
                cy.wrap(value).should('be.checked');
            } else {
                cy.wrap(value).should('not.be.checked');
            }
        });
    
        cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', GuarantorIdW);
        });
      
        cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', GuarantorsW);
        });
      
        cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
            cy.wrap(value).should('eq', ContentAssistantsW);
        });
      
        cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });

        cy.get('[name="correctorInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
      
        cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
    
        cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('eq', studentInstructionW);
        });
      
        cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('be.empty');
        });
      
        cy.get('[name="Content"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            cy.wrap(value).should('eq', ContentW);
        });

     
        cy.get('[onclick="history.back()"]').first().click().wait(1000);
    });
});



});
