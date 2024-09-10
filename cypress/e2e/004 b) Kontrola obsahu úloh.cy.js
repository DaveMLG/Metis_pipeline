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
cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
cy.get('@nastavenia').click();
cy.get('[href="/admin/elearning/training"]').click();
cy.wait(3000)
cy.get('[type="text"]').first().clear().type("G školenie AAA")
cy.get('[type="submit"]').click();
cy.get('tbody').contains('Neprevzaté').parent().parent().contains('G školenie AAA').click().wait(2000)
cy.wait(1000);
cy.get(':nth-child(5) > .nav-link').click();
cy.wait(1000);
    })

it('Samoštúdium', function () {
  cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {

const taskOrderSam = jsonData.Samostudium.find(obj => obj.taskOrder)?.taskOrder;
const useLessonNameSam = jsonData.Samostudium.find(obj => obj.useLessonName)?.useLessonName;
const languageSam = jsonData.Samostudium.find(obj => obj.language)?.language;
const LengthInTimeSam = jsonData.Samostudium.find(obj => obj.LengthInTime)?.LengthInTime;
const EstimateTimeForEvaluationInTimeSam = jsonData.Samostudium.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
const ExperiencePointsSam = jsonData.Samostudium.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
const difficultySam = jsonData.Samostudium.find(obj => obj.difficulty)?.difficulty;
const IsTimeLimitedTaskSam = jsonData.Samostudium.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
const NotMandatorySam = jsonData.Samostudium.find(obj => obj.NotMandatory)?.NotMandatory;
const GuarantorIdSam = jsonData.Samostudium.find(obj => obj.GuarantorId)?.GuarantorId;
const GuarantorsSam = jsonData.Samostudium.find(obj => obj.Guarantors)?.Guarantors;
const ContentAssistantsSam = jsonData.Samostudium.find(obj => obj.ContentAssistants)?.ContentAssistants;
const TrainingsSam = jsonData.Samostudium.find(obj => obj.Trainings)?.Trainings;
const guarantorInternalMaterialSam = jsonData.Samostudium.find(obj => obj.guarantorInternalMaterial)?.guarantorInternalMaterial;
const lecturerInstructionSam = jsonData.Samostudium.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
const lecturerInternalMaterialSam = jsonData.Samostudium.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
const studentInstructionSam = jsonData.Samostudium.find(obj => obj.studentInstruction)?.studentInstruction;
const DescriptionSam = jsonData.Samostudium.find(obj => obj.Description)?.Description;
const ContentSam = jsonData.Samostudium.find(obj => obj.Content)?.Content;

cy.get('tbody').find('tr').contains('Sam').then(edit => {
  cy.wrap(edit).parent().parent().parent().find('a').click();
  
  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', taskOrderSam) 
  });
  
  cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
    if (useLessonNameSam === 'yes') {
      cy.wrap(value).should('be.checked')
  } else {
      cy.wrap(value).should('not.be.checked')
  }
  }); 

  cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
    cy.wrap(value).should('eq', languageSam) 
  });
  
  cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
    cy.wrap(value).should('eq', LengthInTimeSam) 
  });
  
  cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
    cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeSam) 
  });
  
  cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', ExperiencePointsSam) 
  });
  
  cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
    cy.wrap(value).should('eq', difficultySam) 
  })
  
  cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
    if (IsTimeLimitedTaskSam === 'yes') {
      cy.wrap(value).should('be.checked')
  } else {
      cy.wrap(value).should('not.be.checked')
  }
  });
  
  cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
    if (NotMandatorySam === 'yes') {
      cy.wrap(value).should('be.checked')
  } else {
      cy.wrap(value).should('not.be.checked')
  }
  });

  cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', GuarantorIdSam) 
  });
  
  cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', GuarantorsSam) 
  });
  
 /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', ContentAssistantsSam) 
  });
  */
  cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', TrainingsSam) 
  });
  
  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.GuarantorInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', guarantorInternalMaterialSam) 
  })
  
  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
    cy.wrap(value).should('eq', lecturerInstructionSam) 
  });
  
  
 /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', lecturerInternalMaterialSam) 
  });*/
  
  
  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', lecturerInternalMaterialSam) 
  });

  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
    cy.wrap(value).should('eq', studentInstructionSam) 
  });
  
  
  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
    cy.wrap(value).should('eq', DescriptionSam) 
  });
  
  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Content"]').prev('div').invoke('text').then((value) => {
    cy.wrap(value).should('eq', ContentSam) 
  });
  
  cy.get('[onclick="history.back()"]').first().click().wait(1000)
})
})
})


it('Automatický test', function () {

//Automatický test

cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {

const taskOrderAT = jsonData.AutoTest.find(obj => obj.taskOrder)?.taskOrder;
const useLessonNameAT = jsonData.AutoTest.find(obj => obj.useLessonName)?.useLessonName;
const languageAT = jsonData.AutoTest.find(obj => obj.language)?.language;
const LengthInTimeAT = jsonData.AutoTest.find(obj => obj.LengthInTime)?.LengthInTime;
const EstimateTimeForEvaluationInTimeAT = jsonData.AutoTest.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
const ExperiencePointsAT = jsonData.AutoTest.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
const difficultyAT = jsonData.AutoTest.find(obj => obj.difficulty)?.difficulty;
const IsTimeLimitedTaskAT = jsonData.AutoTest.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
const NotMandatoryAT = jsonData.AutoTest.find(obj => obj.NotMandatory)?.NotMandatory;
const GuarantorIdAT = jsonData.AutoTest.find(obj => obj.GuarantorId)?.GuarantorId;
const GuarantorsAT = jsonData.AutoTest.find(obj => obj.Guarantors)?.Guarantors;
const ContentAssistantsAT = jsonData.AutoTest.find(obj => obj.ContentAssistants)?.ContentAssistants;
const TrainingsAT = jsonData.AutoTest.find(obj => obj.Trainings)?.Trainings;
const lecturerInstructionAT = jsonData.AutoTest.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
const lecturerInternalMaterialAT = jsonData.AutoTest.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
const studentInstructionAT = jsonData.AutoTest.find(obj => obj.studentInstruction)?.studentInstruction;
const DescriptionAT = jsonData.AutoTest.find(obj => obj.Description)?.Description;
const ContentAT = jsonData.AutoTest.find(obj => obj.Content)?.Content;

  cy.get('tbody').find('tr').contains('Aut').then(edit => {
    cy.wrap(edit).parent().parent().parent().find('a').click();
    
    cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
      cy.wrap(value).should('eq', taskOrderAT) 
    });
    
    cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
      if (useLessonNameAT === 'yes') {
        cy.wrap(value).should('be.checked')
    } else {
        cy.wrap(value).should('not.be.checked')
    }
    }); 
  
    cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
      cy.wrap(value).should('eq', languageAT) 
    });
    
    cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
      cy.wrap(value).should('eq', LengthInTimeAT) 
    });
    
    cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
      cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeAT) 
    });
    
    cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
      cy.wrap(value).should('eq', ExperiencePointsAT) 
    });
    
    cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
      cy.wrap(value).should('eq', difficultyAT) 
    })
    
    cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
      if (IsTimeLimitedTaskAT === 'yes') {
        cy.wrap(value).should('be.checked')
    } else {
        cy.wrap(value).should('not.be.checked')
    }
    });
    
    cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
      if (NotMandatoryAT === 'yes') {
        cy.wrap(value).should('be.checked')
    } else {
        cy.wrap(value).should('not.be.checked')
    }
    });
  
    cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
      cy.wrap(value).should('eq', GuarantorIdAT) 
    });
    
    cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
      cy.wrap(value).should('eq', GuarantorsAT) 
    });
    
   /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
      cy.wrap(value).should('eq', ContentAssistantsAT) 
    });
    */
    cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
      cy.wrap(value).should('eq', TrainingsAT) 
    });
    
    cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
      cy.wrap(value).should('eq', lecturerInstructionAT) 
    });
    
    
   /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
      cy.wrap(value).should('eq', lecturerInternalMaterialAT) 
    });*/
    
    
    cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
      cy.wrap(value).should('eq', lecturerInternalMaterialAT) 
    });
  
    cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
      cy.wrap(value).should('eq', studentInstructionAT) 
    });
    
    
    cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
      cy.wrap(value).should('eq', DescriptionAT) 
    });
    
    cy.get('[name="TestQuestionsText"]').invoke('val').then((value) => {
      cy.wrap(value).should('eq', ContentAT) 
    });
    
    cy.get('[onclick="history.back()"]').first().click().wait(1000)
  })
})
})

  it('Videosamoštúdium', function () {
    cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {

    
const taskOrderVS = jsonData.Videosamostudium.find(obj => obj.taskOrder)?.taskOrder;
const useLessonNameVS = jsonData.Videosamostudium.find(obj => obj.useLessonName)?.useLessonName;
const languageVS = jsonData.Videosamostudium.find(obj => obj.language)?.language;
const LengthInTimeVS = jsonData.Videosamostudium.find(obj => obj.LengthInTime)?.LengthInTime;
const EstimateTimeForEvaluationInTimeVS= jsonData.Videosamostudium.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
const ExperiencePointsVS = jsonData.Videosamostudium.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
const difficultyVS = jsonData.Videosamostudium.find(obj => obj.difficulty)?.difficulty;
const IsTimeLimitedTaskVS = jsonData.Videosamostudium.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
const NotMandatoryVS = jsonData.Videosamostudium.find(obj => obj.NotMandatory)?.NotMandatory;
const GuarantorIdVS = jsonData.Videosamostudium.find(obj => obj.GuarantorId)?.GuarantorId;
const GuarantorsVS = jsonData.Videosamostudium.find(obj => obj.Guarantors)?.Guarantors;
const ContentAssistantsVS = jsonData.Videosamostudium.find(obj => obj.ContentAssistants)?.ContentAssistants;
const TrainingsVS = jsonData.Videosamostudium.find(obj => obj.Trainings)?.Trainings;
const guarantorInternalMaterialVS = jsonData.Videosamostudium.find(obj => obj.guarantorInternalMaterial)?.guarantorInternalMaterial;
const lecturerInstructionVS = jsonData.Videosamostudium.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
const lecturerInternalMaterialVS = jsonData.Videosamostudium.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
const studentInstructionVS = jsonData.Videosamostudium.find(obj => obj.studentInstruction)?.studentInstruction;
const DescriptionVS = jsonData.Videosamostudium.find(obj => obj.Description)?.Description;
const ContentVS = jsonData.Videosamostudium.find(obj => obj.Content)?.Content;

    cy.get('tbody').find('tr').contains('Vid').then(edit => {
      cy.wrap(edit).parent().parent().parent().find('a').click();

      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', taskOrderVS) 
      });
      
      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        if (useLessonNameVS === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      }); 
    
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', languageVS) 
      });
      
      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', LengthInTimeVS) 
      });
      
      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeVS) 
      });
      
      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ExperiencePointsVS) 
      });
      
      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', difficultyVS) 
      })
      
      cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
        if (IsTimeLimitedTaskVS === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
      
      cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
        if (NotMandatoryVS === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
    
      cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorIdVS) 
      });
      
      cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorsVS) 
      });
      
     /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentAssistantsVS) 
      });
      */
      cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', TrainingsVS) 
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.GuarantorInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', guarantorInternalMaterialVS) 
      })
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInstructionVS) 
      });
      
      
     /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterialVS) 
      });*/
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterialVS) 
      });
    
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', studentInstructionVS) 
      });
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', DescriptionVS) 
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Content"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentVS) 
      });
      
      cy.get('[onclick="history.back()"]').first().click().wait(1000)
    })
  })
})

    it('Webinár', function () {
      cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {

      
const taskOrderW = jsonData.Webinar.find(obj => obj.taskOrder)?.taskOrder;
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
const TrainingsW = jsonData.Webinar.find(obj => obj.Trainings)?.Trainings;
const lecturerInstructionW = jsonData.Webinar.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
const lecturerInternalMaterialW = jsonData.Webinar.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
const studentInstructionW = jsonData.Webinar.find(obj => obj.studentInstruction)?.studentInstruction;
const DescriptionW = jsonData.Webinar.find(obj => obj.Description)?.Description;
const ContentW = jsonData.Webinar.find(obj => obj.Content)?.Content;

    cy.get('tbody').find('tr').contains('Web').then(edit => {
      cy.wrap(edit).parent().parent().parent().find('a').click();
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', taskOrderW) 
      });
      
      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        if (useLessonNameW === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      }); 
    
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', languageW) 
      });
      
      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', LengthInTimeW) 
      });
      
      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeW) 
      });
      
      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ExperiencePointsW) 
      });
      
      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', difficultyW) 
      })
      
      cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
        if (IsTimeLimitedTaskW === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
      
      cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
        if (NotMandatoryW === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
    
      cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorIdW) 
      });
      
      cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorsW) 
      });
      
     /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentAssistantsW) 
      });
      */
      cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', TrainingsW) 
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInstructionW) 
      });
      
      
     /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterialW) 
      });*/
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterialW) 
      });
    
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', studentInstructionW) 
      });
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', DescriptionW) 
      });

      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Content"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentW) 
      })
      cy.get('[onclick="history.back()"]').first().click().wait(1000)
    })
  })
})
    it('Doplňovačka', function () {
      cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {

        //Doplnovačka
const taskOrderD = jsonData.Doplnovacka.find(obj => obj.taskOrder)?.taskOrder;
const useLessonNameD = jsonData.Doplnovacka.find(obj => obj.useLessonName)?.useLessonName;
const languageD = jsonData.Doplnovacka.find(obj => obj.language)?.language;
const LengthInTimeD = jsonData.Doplnovacka.find(obj => obj.LengthInTime)?.LengthInTime;
const EstimateTimeForEvaluationInTimeD = jsonData.Doplnovacka.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
const ExperiencePointsD = jsonData.Doplnovacka.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
const difficultyD = jsonData.Doplnovacka.find(obj => obj.difficulty)?.difficulty;
const IsTimeLimitedTaskD = jsonData.Doplnovacka.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
const NotMandatoryD = jsonData.Doplnovacka.find(obj => obj.NotMandatory)?.NotMandatory;
const GuarantorIdD = jsonData.Doplnovacka.find(obj => obj.GuarantorId)?.GuarantorId;
const GuarantorsD = jsonData.Doplnovacka.find(obj => obj.Guarantors)?.Guarantors;
const ContentAssistantsD = jsonData.Doplnovacka.find(obj => obj.ContentAssistants)?.ContentAssistants;
const TrainingsD = jsonData.Doplnovacka.find(obj => obj.Trainings)?.Trainings;
const lecturerInstructionD = jsonData.Doplnovacka.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
const lecturerInternalMaterialD = jsonData.Doplnovacka.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
const studentInstructionD = jsonData.Doplnovacka.find(obj => obj.studentInstruction)?.studentInstruction;
const DescriptionD = jsonData.Doplnovacka.find(obj => obj.Description)?.Description;
const ContentD = jsonData.Doplnovacka.find(obj => obj.Content)?.Content;

    cy.get('tbody').find('tr').contains('Dop').then(edit => {
      cy.wrap(edit).parent().parent().parent().find('a').click();
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', taskOrderD) 
      });
      
      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        if (useLessonNameD === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      }); 
    
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', languageD) 
      });
      
      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', LengthInTimeD) 
      });
      
      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeD) 
      });
      
      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ExperiencePointsD) 
      });
      
      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', difficultyD) 
      })
      
      cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
        if (IsTimeLimitedTaskD === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
      
      cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
        if (NotMandatoryD === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
    
      cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorIdD) 
      });
      
      cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorsD) 
      });
      
     /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentAssistantsD) 
      });
      */
      cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', TrainingsD) 
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInstructionD) 
      });
      
      
     /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterialD) 
      });*/
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterialD) 
      });
    
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', studentInstructionD) 
      });
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', DescriptionD) 
      });

      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Content"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentD) 
      })
      cy.get('[onclick="history.back()"]').first().click().wait(1000)
    })
  })
})
    it('Párovačka', function () {
      cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {

const pairTask = jsonData.Parovacka;

const taskOrderP = jsonData.Parovacka.find(obj => obj.taskOrder)?.taskOrder;
const useLessonNameP = jsonData.Parovacka.find(obj => obj.useLessonName)?.useLessonName;
const languageP = jsonData.Parovacka.find(obj => obj.language)?.language;
const LengthInTimeP = jsonData.Parovacka.find(obj => obj.LengthInTime)?.LengthInTime;
const EstimateTimeForEvaluationInTimeP = jsonData.Parovacka.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
const ExperiencePointsP = jsonData.Parovacka.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
const difficultyP = jsonData.Parovacka.find(obj => obj.difficulty)?.difficulty;
const IsTimeLimitedTaskP = jsonData.Parovacka.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
const NotMandatoryP = jsonData.Parovacka.find(obj => obj.NotMandatory)?.NotMandatory;
const GuarantorIdP = jsonData.Parovacka.find(obj => obj.GuarantorId)?.GuarantorId;
const GuarantorsP = jsonData.Parovacka.find(obj => obj.Guarantors)?.Guarantors;
const ContentAssistantsP = jsonData.Parovacka.find(obj => obj.ContentAssistants)?.ContentAssistants;
const TrainingsP = jsonData.Parovacka.find(obj => obj.Trainings)?.Trainings;
const lecturerInstructionP = jsonData.Parovacka.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
const lecturerInternalMaterialP = jsonData.Parovacka.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
const DescriptionP = jsonData.Parovacka.find(obj => obj.Description)?.Description;
const studentInstructionP = jsonData.Parovacka.find(obj => obj.studentInstruction)?.studentInstruction;
const questCountP = jsonData.Parovacka.find(obj => obj.questCount)?.questCount;
const questSumP = jsonData.Parovacka.find(obj => obj.questSum)?.questSum;

const questVals = [];
      for (let x = 0; x < pairTask.length; x++) {
        questVals.push(pairTask[x].questVals);
      }
      const questValsFiltered = questVals.filter(item => item !== undefined);
    cy.get('tbody').find('tr').contains('Pár').then(edit => {
      cy.wrap(edit).parent().parent().parent().find('a').click();
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', taskOrderP) 
      });
      
      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        if (useLessonNameP === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      }); 
    
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', languageP) 
      });
      
      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', LengthInTimeP) 
      });
      
      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeP) 
      });
      
      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ExperiencePointsP) 
      });
      
      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', difficultyP) 
      })
      
      cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
        if (IsTimeLimitedTaskP === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
      
      cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
        if (NotMandatoryP === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
    
      cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorIdP) 
      });
      
      cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorsP) 
      });
      
     /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentAssistantsD) 
      });
      */
      cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', TrainingsP) 
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInstructionP) 
      });
      
      
     /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterialP) 
      });*/
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterialP) 
      });
    
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', studentInstructionP) 
      });
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', DescriptionP) 
      });

      cy.get('[name="TestQuestionsToAsk"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', questCountP) 
      })

      cy.get('[name="pairingOrTranslateForm"]').find('[type="text"]').then((value) => {
        for (let x = 1; x < value.length; x++) {
          cy.wrap(value).eq(x).invoke('val').should('eq', questValsFiltered[x]) 
        }
      })

      cy.get('[onclick="history.back()"]').first().click().wait(1000)
    })
  })
})
it('Spoločná práca s lektorom', function () {
  cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {

   
const taskOrderSPL = jsonData.SpolPracaLektor.find(obj => obj.taskOrder)?.taskOrder;
const useLessonNameSPL = jsonData.SpolPracaLektor.find(obj => obj.useLessonName)?.useLessonName;
const languageSPL = jsonData.SpolPracaLektor.find(obj => obj.language)?.language;
const LengthInTimeSPL = jsonData.SpolPracaLektor.find(obj => obj.LengthInTime)?.LengthInTime;
const EstimateTimeForEvaluationInTimeSPL = jsonData.SpolPracaLektor.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
const ExperiencePointsSPL = jsonData.SpolPracaLektor.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
const difficultySPL = jsonData.SpolPracaLektor.find(obj => obj.difficulty)?.difficulty;
const IsTimeLimitedTaskSPL = jsonData.SpolPracaLektor.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
const NotMandatorySPL = jsonData.SpolPracaLektor.find(obj => obj.NotMandatory)?.NotMandatory;
const GuarantorIdSPL = jsonData.SpolPracaLektor.find(obj => obj.GuarantorId)?.GuarantorId;
const GuarantorsSPL = jsonData.SpolPracaLektor.find(obj => obj.Guarantors)?.Guarantors;
const ContentAssistantsSPL = jsonData.SpolPracaLektor.find(obj => obj.ContentAssistants)?.ContentAssistants;
const TrainingsSPL = jsonData.SpolPracaLektor.find(obj => obj.Trainings)?.Trainings;
const lecturerInstructionSPL = jsonData.SpolPracaLektor.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
const assignmentDevelopmentProcedureSPL = jsonData.SpolPracaLektor.find(obj => obj.assignmentDevelopmentProcedure)?.assignmentDevelopmentProcedure;
const lecturerInternalMaterialSPL = jsonData.SpolPracaLektor.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
const DescriptionSPL = jsonData.SpolPracaLektor.find(obj => obj.Description)?.Description;
const studentInstructionSPL = jsonData.SpolPracaLektor.find(obj => obj.studentInstruction)?.studentInstruction;
const AssignmentSPL = jsonData.SpolPracaLektor.find(obj => obj.Assignment)?.Assignment;
const SampleSolutionSPL = jsonData.SpolPracaLektor.find(obj => obj.SampleSolution)?.SampleSolution;
const FileUploadIsMandatorySPL = jsonData.SpolPracaLektor.find(obj => obj.FileUploadIsMandatory)?.FileUploadIsMandatory;
const AnswerIsMandatorySPL = jsonData.SpolPracaLektor.find(obj => obj.AnswerIsMandatory)?.AnswerIsMandatory;
const IsExerciseTestAllowedSPL = jsonData.SpolPracaLektor.find(obj => obj.IsExerciseTestAllowed)?.IsExerciseTestAllowed;

cy.get('tbody').find('tr').contains('Spo').then(edit => {
  cy.wrap(edit).parent().parent().parent().find('a').click();
})

cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
  cy.wrap(value).should('eq', taskOrderSPL)
});

cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
  if (useLessonNameSPL === 'yes') {
    cy.wrap(value).should('be.checked')
} else {
    cy.wrap(value).should('not.be.checked')
}
});

cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
  cy.wrap(value).should('eq', languageSPL)
});

cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
  cy.wrap(value).should('eq', LengthInTimeSPL)
});

cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
  cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeSPL)
});

cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
  cy.wrap(value).should('eq', ExperiencePointsSPL)
});

cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
  cy.wrap(value).should('eq', difficultySPL)
})

cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
  if (IsTimeLimitedTaskSPL === 'yes') {
    cy.wrap(value).should('be.checked')
} else {
    cy.wrap(value).should('not.be.checked')
}
});

cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
  if (NotMandatorySPL === 'yes') {
    cy.wrap(value).should('be.checked')
} else {
    cy.wrap(value).should('not.be.checked')
}
});

cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
  cy.wrap(value).should('eq', GuarantorIdSPL)
});

cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
  cy.wrap(value).should('eq', GuarantorsSPL)
});

/* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
  cy.wrap(value).should('eq', ContentAssistantsD)
});
*/
cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
  cy.wrap(value).should('eq', TrainingsSPL)
});

cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
  cy.wrap(value).should('eq', lecturerInstructionSPL)
});

cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.AssignmentDevelopmentProcedure"]').next().next().find('span').invoke('text').then((value) => {
  cy.wrap(value).should('eq', assignmentDevelopmentProcedureSPL)
});


/* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
  cy.wrap(value).should('eq', lecturerInternalMaterialP)
});*/


cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
  cy.wrap(value).should('eq', lecturerInternalMaterialSPL)
});

cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
  cy.wrap(value).should('eq', studentInstructionSPL)
});


cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
  cy.wrap(value).should('eq', DescriptionSPL)
});

cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Content"]').prev('div').invoke('text').then((value) => {
  cy.wrap(value).should('eq', AssignmentSPL)
});

/*cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.SampleSolution"]').prev('div').invoke('text').then((value) => {
  cy.wrap(value).should('eq', SampleSolutionSPL)
});*/

cy.get('[name="FileUploadIsMandatory"]').find('[type="checkbox"]').then((value) => {
  if (FileUploadIsMandatorySPL === 'yes') {
    cy.wrap(value).should('be.checked')
} else {
    cy.wrap(value).should('not.be.checked')
}
});

cy.get('[name="AnswerIsMandatory"]').find('[type="checkbox"]').then((value) => {
  if (AnswerIsMandatorySPL === 'yes') {
    cy.wrap(value).should('be.checked')
} else {
    cy.wrap(value).should('not.be.checked')
}
});

cy.get('[name="IsExerciseTestAllowed"]').find('[type="checkbox"]').then((value) => {
  if (IsExerciseTestAllowedSPL === 'yes') {
    cy.wrap(value).should('be.checked')
} else {
    cy.wrap(value).should('not.be.checked')
}
});

cy.get('[onclick="history.back()"]').first().click().wait(1000)
})
})



    it('Preferenčný test', function () {
      cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {

       
const taskOrderPT = jsonData.PrefTest.find(obj => obj.taskOrder)?.taskOrder;
const useLessonNamePT = jsonData.PrefTest.find(obj => obj.useLessonName)?.useLessonName;
const languagePT = jsonData.PrefTest.find(obj => obj.language)?.language;
const LengthInTimePT = jsonData.PrefTest.find(obj => obj.LengthInTime)?.LengthInTime;
const EstimateTimeForEvaluationInTimePT = jsonData.PrefTest.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
const ExperiencePointsPT = jsonData.PrefTest.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
const difficultyPT = jsonData.PrefTest.find(obj => obj.difficulty)?.difficulty;
const IsTimeLimitedTaskPT = jsonData.PrefTest.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
const NotMandatoryPT = jsonData.PrefTest.find(obj => obj.NotMandatory)?.NotMandatory;
const GuarantorIdPT = jsonData.PrefTest.find(obj => obj.GuarantorId)?.GuarantorId;
const GuarantorsPT = jsonData.PrefTest.find(obj => obj.Guarantors)?.Guarantors;
const ContentAssistantsPT = jsonData.PrefTest.find(obj => obj.ContentAssistants)?.ContentAssistants;
const TrainingsPT = jsonData.PrefTest.find(obj => obj.Trainings)?.Trainings;
const lecturerInstructionPT = jsonData.PrefTest.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
const lecturerInternalMaterialPT = jsonData.PrefTest.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
const DescriptionPT = jsonData.PrefTest.find(obj => obj.Description)?.Description;
const studentInstructionPT = jsonData.PrefTest.find(obj => obj.studentInstruction)?.studentInstruction;
const ContentPT = jsonData.PrefTest.find(obj => obj.Content)?.Content;
const AnswerIsPrePT = jsonData.PrefTest.find(obj => obj.AnswerIsPre)?.AnswerIsPre;
  cy.get('tbody').find('tr').contains('Pre').then(edit => {
    cy.wrap(edit).parent().parent().parent().find('a').click();
  })

  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', taskOrderPT) 
  });
  
  cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
    if (useLessonNamePT === 'yes') {
      cy.wrap(value).should('be.checked')
  } else {
      cy.wrap(value).should('not.be.checked')
  }
  }); 

  cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
    cy.wrap(value).should('eq', languagePT) 
  });
  
  cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
    cy.wrap(value).should('eq', LengthInTimePT) 
  });
  
  cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
    cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimePT) 
  });
  
  cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', ExperiencePointsPT) 
  });
  
  cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
    cy.wrap(value).should('eq', difficultyPT) 
  })
  
  cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
    if (IsTimeLimitedTaskPT === 'yes') {
      cy.wrap(value).should('be.checked')
  } else {
      cy.wrap(value).should('not.be.checked')
  }
  });
  
  cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
    if (NotMandatoryPT === 'yes') {
      cy.wrap(value).should('be.checked')
  } else {
      cy.wrap(value).should('not.be.checked')
  }
  });

  cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', GuarantorIdPT) 
  });
  
  cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', GuarantorsPT) 
  });
  
 /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', ContentAssistantsD) 
  });
  */
  cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', TrainingsPT) 
  });
  
  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
    cy.wrap(value).should('eq', lecturerInstructionPT) 
  });
  
 /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', lecturerInternalMaterialPT) 
  });*/
  
  
  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
    cy.wrap(value).should('eq', lecturerInternalMaterialPT) 
  });

  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
    cy.wrap(value).should('eq', studentInstructionPT) 
  });
  
  
  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
    cy.wrap(value).should('eq', DescriptionPT) 
  });
cy.get('[id="TestQuestionsText"]').invoke('val').then((value) => {
  cy.wrap(value).should('eq', ContentPT) 
})

cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
  if (AnswerIsPrePT === 'yes') {
    cy.wrap(value).should('be.checked')
} else {
    cy.wrap(value).should('not.be.checked')
}

cy.get('[onclick="history.back()"]').first().click().wait(1000)
})
})
})

  it('Preklad', function () {
      cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {

const transTask = jsonData.Preklad

const taskOrderPr = jsonData.Preklad.find(obj => obj.taskOrder)?.taskOrder;
const useLessonNamePr = jsonData.Preklad.find(obj => obj.useLessonName)?.useLessonName;
const languagePr = jsonData.Preklad.find(obj => obj.language)?.language;
const LengthInTimePr = jsonData.Preklad.find(obj => obj.LengthInTime)?.LengthInTime;
const EstimateTimeForEvaluationInTimePr = jsonData.Preklad.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
const ExperiencePointsPr = jsonData.Preklad.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
const difficultyPr = jsonData.Preklad.find(obj => obj.difficulty)?.difficulty;
const IsTimeLimitedTaskPr = jsonData.Preklad.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
const NotMandatoryPr = jsonData.Preklad.find(obj => obj.NotMandatory)?.NotMandatory;
const GuarantorIdPr = jsonData.Preklad.find(obj => obj.GuarantorId)?.GuarantorId;
const GuarantorsPr = jsonData.Preklad.find(obj => obj.Guarantors)?.Guarantors;
const ContentAssistantsPr = jsonData.Preklad.find(obj => obj.ContentAssistants)?.ContentAssistants;
const TrainingsPr = jsonData.Preklad.find(obj => obj.Trainings)?.Trainings;
const lecturerInstructionPr = jsonData.Preklad.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
const lecturerInternalMaterialPr = jsonData.Preklad.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
const DescriptionPr = jsonData.Preklad.find(obj => obj.Description)?.Description;
const studentInstructionPr = jsonData.Preklad.find(obj => obj.studentInstruction)?.studentInstruction;
const questCountPr = jsonData.Preklad.find(obj => obj.questCount)?.questCount;
const questSumPr = jsonData.Preklad.find(obj => obj.questSum)?.questSum;

const questValsPr = [];
      for (let x = 0; x < transTask.length; x++) {
        questValsPr.push(transTask[x].questVals);
      }
      const questValsPrFiltered = questValsPr.filter(item => item !== undefined);

    cy.get('tbody').find('tr').contains('Pre').parents('tr').nextAll().contains('Pre').then(edit => {
      cy.wrap(edit).parent().parent().parent().find('a').click();

      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', taskOrderPr) 
      });
      
      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        if (useLessonNamePr === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      }); 
    
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', languagePr) 
      });
      
      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', LengthInTimePr) 
      });
      
      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimePr) 
      });
      
      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ExperiencePointsPr) 
      });
      
      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', difficultyPr) 
      })
      
      cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
        if (IsTimeLimitedTaskPr === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
      
      cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
        if (NotMandatoryPr === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
    
      cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorIdPr) 
      });
      
      cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorsPr) 
      });
      
     /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentAssistantsPr) 
      });
      */
      cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', TrainingsPr) 
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInstructionPr) 
      });
      
      
     /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterialPr) 
      });*/
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterialPr) 
      });
    
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', studentInstructionPr) 
      });
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', DescriptionPr) 
      });

      cy.get('[name="TestQuestionsToAsk"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', questCountPr) 
      })

      cy.get('[name="pairingOrTranslateForm"]').find('[type="text"]').then((value) => {
        for (let x = 1; x < value.length; x++) {
          cy.wrap(value).eq(x).invoke('val').should('eq', questValsPrFiltered[x]) 
        }
      })

      cy.get('[onclick="history.back()"]').first().click().wait(1000)
    })
});
})

it('Anketa', function () {

  //Anketa
  
  cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {
  
  const taskOrder = jsonData.Anketa.find(obj => obj.taskOrder)?.taskOrder;
  const useLessonName = jsonData.Anketa.find(obj => obj.useLessonName)?.useLessonName;
  const language = jsonData.Anketa.find(obj => obj.language)?.language;
  const LengthInTime = jsonData.Anketa.find(obj => obj.LengthInTime)?.LengthInTime;
  const EstimateTimeForEvaluationInTime = jsonData.Anketa.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
  const ExperiencePoints = jsonData.Anketa.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
  const difficulty = jsonData.Anketa.find(obj => obj.difficulty)?.difficulty;
  const IsTimeLimitedTask = jsonData.Anketa.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
  const NotMandatory = jsonData.Anketa.find(obj => obj.NotMandatory)?.NotMandatory;
  const GuarantorId = jsonData.Anketa.find(obj => obj.GuarantorId)?.GuarantorId;
  const Guarantors = jsonData.Anketa.find(obj => obj.Guarantors)?.Guarantors;
  const ContentAssistants = jsonData.Anketa.find(obj => obj.ContentAssistants)?.ContentAssistants;
  const Trainings = jsonData.Anketa.find(obj => obj.Trainings)?.Trainings;
  const lecturerInstruction = jsonData.Anketa.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
  const lecturerInternalMaterial = jsonData.Anketa.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
  const studentInstruction = jsonData.Anketa.find(obj => obj.studentInstruction)?.studentInstruction;
  const Description = jsonData.Anketa.find(obj => obj.Description)?.Description;
  const Content = jsonData.Anketa.find(obj => obj.Content)?.Content;
  
    cy.get('tbody').find('tr').contains('Ank').then(edit => {
      cy.wrap(edit).parent().parent().parent().find('a').click();
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', taskOrder) 
      });
      
      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        if (useLessonName === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      }); 
    
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', language) 
      });
      
      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', LengthInTime) 
      });
      
      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimateTimeForEvaluationInTime) 
      });
      
      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ExperiencePoints) 
      });
      
      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', difficulty) 
      })
      
      cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
        if (IsTimeLimitedTask === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
      
      cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
        if (NotMandatory === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
    
      cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorId) 
      });
      
      cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Guarantors) 
      });
      
     /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentAssistantsAT) 
      });
      */
      cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Trainings) 
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInstruction) 
      });
      
      
     /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterial) 
      });*/
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterial) 
      });
    
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', studentInstruction) 
      });
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Description) 
        console.log(Description)
      });
      
      cy.get('[name="TestQuestionsText"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', Content) 
      });
      
      cy.get('[onclick="history.back()"]').first().click().wait(1000)
    })
  })
})

  it('Spätná väzba', function () {
    
    cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {

    const taskOrder = jsonData.SpatVazba.find(obj => obj.taskOrder)?.taskOrder;
    const useLessonName = jsonData.SpatVazba.find(obj => obj.useLessonName)?.useLessonName;
    const language = jsonData.SpatVazba.find(obj => obj.language)?.language;
    const LengthInTime = jsonData.SpatVazba.find(obj => obj.LengthInTime)?.LengthInTime;
    const EstimateTimeForEvaluationInTime = jsonData.SpatVazba.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
    const ExperiencePoints = jsonData.SpatVazba.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
    const difficulty = jsonData.SpatVazba.find(obj => obj.difficulty)?.difficulty;
    const IsTimeLimitedTask = jsonData.SpatVazba.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
    const NotMandatory = jsonData.SpatVazba.find(obj => obj.NotMandatory)?.NotMandatory;
    const GuarantorId = jsonData.SpatVazba.find(obj => obj.GuarantorId)?.GuarantorId;
    const Guarantors = jsonData.SpatVazba.find(obj => obj.Guarantors)?.Guarantors;
    const ContentAssistants = jsonData.SpatVazba.find(obj => obj.ContentAssistants)?.ContentAssistants;
    const Trainings = jsonData.SpatVazba.find(obj => obj.Trainings)?.Trainings;
    const lecturerInstruction = jsonData.SpatVazba.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
    const lecturerInternalMaterial = jsonData.SpatVazba.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
    const studentInstruction = jsonData.SpatVazba.find(obj => obj.studentInstruction)?.studentInstruction;
    const Description = jsonData.SpatVazba.find(obj => obj.Description)?.Description;
    const Content = jsonData.SpatVazba.find(obj => obj.Content)?.Content;
    
      cy.get('tbody').find('tr').contains('Spä').then(edit => {
        cy.wrap(edit).parent().parent().parent().find('a').click();
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', taskOrder) 
        });
        
        cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
          if (useLessonName === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        }); 
      
        cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', language) 
        });
        
        cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', LengthInTime) 
        });
        
        cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', EstimateTimeForEvaluationInTime) 
        });
        
        cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', ExperiencePoints) 
        });
        
        cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', difficulty) 
        })
        
        cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
          if (IsTimeLimitedTask === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        });
        
        cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
          if (NotMandatory === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        });
      
        cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', GuarantorId) 
        });
        
        cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', Guarantors) 
        });
        
       /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', ContentAssistantsAT) 
        });
        */
        cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', Trainings) 
        });
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
          cy.wrap(value).should('eq', lecturerInstruction) 
        });
        
        
       /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', lecturerInternalMaterial) 
        });*/
        
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', lecturerInternalMaterial) 
        });
      
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
          cy.wrap(value).should('eq', studentInstruction) 
        });
        
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
          cy.wrap(value).should('eq', Description) 
          console.log(Description)
        });
      
        cy.get('[onclick="history.back()"]').first().click().wait(1000)
      })
    })
  })

  it('Osobnostný test', function () {
    
    cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {

      const persVal = jsonData.OsobTest
    
    const taskOrder = jsonData.OsobTest.find(obj => obj.taskOrder)?.taskOrder;
    const useLessonName = jsonData.OsobTest.find(obj => obj.useLessonName)?.useLessonName;
    const language = jsonData.OsobTest.find(obj => obj.language)?.language;
    const LengthInTime = jsonData.OsobTest.find(obj => obj.LengthInTime)?.LengthInTime;
    const EstimateTimeForEvaluationInTime = jsonData.OsobTest.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
    const ExperiencePoints = jsonData.OsobTest.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
    const difficulty = jsonData.OsobTest.find(obj => obj.difficulty)?.difficulty;
    const IsTimeLimitedTask = jsonData.OsobTest.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
    const NotMandatory = jsonData.OsobTest.find(obj => obj.NotMandatory)?.NotMandatory;
    const GuarantorId = jsonData.OsobTest.find(obj => obj.GuarantorId)?.GuarantorId;
    const Guarantors = jsonData.OsobTest.find(obj => obj.Guarantors)?.Guarantors;
    const ContentAssistants = jsonData.OsobTest.find(obj => obj.ContentAssistants)?.ContentAssistants;
    const Trainings = jsonData.OsobTest.find(obj => obj.Trainings)?.Trainings;
    const lecturerInstruction = jsonData.OsobTest.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
    const lecturerInternalMaterial = jsonData.OsobTest.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
    const studentInstruction = jsonData.OsobTest.find(obj => obj.studentInstruction)?.studentInstruction;
    const Description = jsonData.OsobTest.find(obj => obj.Description)?.Description;
    const Content = jsonData.OsobTest.find(obj => obj.Content)?.Content;

    const persVals = [];
      for (let x = 0; x < persVal.length; x++) {
        persVals.push(persVal[x].characteristicForm);
      }
      const persValsFiltered = persVals.filter(item => item !== undefined);

    const persValsQnA = [];
      for (let x = 0; x < persVal.length; x++) {
        persValsQnA.push(persVal[x].characteristicFormQnA);
      }
      const persValsQnAFiltered = persValsQnA.filter(item => item !== undefined);

      const characteristic = [];
      for (let x = 0; x < persVal.length; x++) {
        if (persVal[x].personalityTestFormSel) {
          const category = persVal[x].personalityTestFormSel.replace(/^\d+: /, '');
          characteristic.push(category);
        }
      }
      const characteristicFiltered = characteristic.filter(item => item !== undefined);

    
      cy.get('tbody').find('tr').contains('Oso').then(edit => {
        cy.wrap(edit).parent().parent().parent().find('a').click();
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', taskOrder) 
        });
        
        cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
          if (useLessonName === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        }); 
      
        cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', language) 
        });
        
        cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', LengthInTime) 
        });
        
        cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', EstimateTimeForEvaluationInTime) 
        });
        
        cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', ExperiencePoints) 
        });
        
        cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', difficulty) 
        })
        
        cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
          if (IsTimeLimitedTask === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        });
        
        cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
          if (NotMandatory === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        });
      
        cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', GuarantorId) 
        });
        
        cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', Guarantors) 
        });
        
       /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', ContentAssistantsAT) 
        });
        */
        cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', Trainings) 
        });
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
          cy.wrap(value).should('eq', lecturerInstruction) 
        });
        
        
       /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', lecturerInternalMaterial) 
        });*/
        
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', lecturerInternalMaterial) 
        });
      
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
          cy.wrap(value).should('eq', studentInstruction) 
        });
        
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
          cy.wrap(value).should('eq', Description) 
        });

        cy.get('[name="characteristicForm"]').find('td:eq(1)').then((value) => {
          for (let x = 0; x < value.length; x++) {
            cy.wrap(value[x]).invoke('text').should('eq', persValsFiltered[x])
          }
        })        

        cy.get('[name="personalityTestForm"]').find('td:eq(1)').then((value) => {
          for (let x = 0; x < value.length; x++) {
            cy.wrap(value[x]).invoke('text').should('eq', persValsQnAFiltered[x])
          }
        })        
        cy.get('[name="personalityTestForm"]').find('td:eq(2)').then((value) => {
          for (let x = 0; x < value.length; x++) {
            cy.wrap(value[x]).invoke('text').should('eq', characteristicFiltered[x])
          }
        })        
       cy.get('[onclick="history.back()"]').first().click().wait(1000)
      })
    })
  })
      it('Otvorený test', function () {
    
        cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {
        
        const taskOrder = jsonData.OtvTest.find(obj => obj.taskOrder)?.taskOrder;
        const useLessonName = jsonData.OtvTest.find(obj => obj.useLessonName)?.useLessonName;
        const language = jsonData.OtvTest.find(obj => obj.language)?.language;
        const LengthInTime = jsonData.OtvTest.find(obj => obj.LengthInTime)?.LengthInTime;
        const EstimateTimeForEvaluationInTime = jsonData.OtvTest.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
        const ExperiencePoints = jsonData.OtvTest.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
        const difficulty = jsonData.OtvTest.find(obj => obj.difficulty)?.difficulty;
        const IsTimeLimitedTask = jsonData.OtvTest.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
        const NotMandatory = jsonData.OtvTest.find(obj => obj.NotMandatory)?.NotMandatory;
        const GuarantorId = jsonData.OtvTest.find(obj => obj.GuarantorId)?.GuarantorId;
        const Guarantors = jsonData.OtvTest.find(obj => obj.Guarantors)?.Guarantors;
        const ContentAssistants = jsonData.OtvTest.find(obj => obj.ContentAssistants)?.ContentAssistants;
        const Trainings = jsonData.OtvTest.find(obj => obj.Trainings)?.Trainings;
        const lecturerInstruction = jsonData.OtvTest.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
        const lecturerInternalMaterial = jsonData.OtvTest.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
        const studentInstruction = jsonData.OtvTest.find(obj => obj.studentInstruction)?.studentInstruction;
        const Description = jsonData.OtvTest.find(obj => obj.Description)?.Description;
        const Content = jsonData.OtvTest.find(obj => obj.Content)?.Content;
        
          cy.get('tbody').find('tr').contains('Otv').then(edit => {
            cy.wrap(edit).parent().parent().parent().find('a').click();
            
            cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
              cy.wrap(value).should('eq', taskOrder) 
            });
            
            cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
              if (useLessonName === 'yes') {
                cy.wrap(value).should('be.checked')
            } else {
                cy.wrap(value).should('not.be.checked')
            }
            }); 
          
            cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
              cy.wrap(value).should('eq', language) 
            });
            
            cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
              cy.wrap(value).should('eq', LengthInTime) 
            });
            
            cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
              cy.wrap(value).should('eq', EstimateTimeForEvaluationInTime) 
            });
            
            cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
              cy.wrap(value).should('eq', ExperiencePoints) 
            });
            
            cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
              cy.wrap(value).should('eq', difficulty) 
            })
            
            cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
              if (IsTimeLimitedTask === 'yes') {
                cy.wrap(value).should('be.checked')
            } else {
                cy.wrap(value).should('not.be.checked')
            }
            });
            
            cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
              if (NotMandatory === 'yes') {
                cy.wrap(value).should('be.checked')
            } else {
                cy.wrap(value).should('not.be.checked')
            }
            });
          
            cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
              cy.wrap(value).should('eq', GuarantorId) 
            });
            
            cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
              cy.wrap(value).should('eq', Guarantors) 
            });
            
           /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
              cy.wrap(value).should('eq', ContentAssistantsAT) 
            });
            */
            cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
              cy.wrap(value).should('eq', Trainings) 
            });
            
            cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
              cy.wrap(value).should('eq', lecturerInstruction) 
            });
            
            
           /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
              cy.wrap(value).should('eq', lecturerInternalMaterial) 
            });*/
            
            
            cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
              cy.wrap(value).should('eq', lecturerInternalMaterial) 
            });
          
            cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
              cy.wrap(value).should('eq', studentInstruction) 
            });
            
            
            cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
              cy.wrap(value).should('eq', Description) 
              console.log(Description)
            });

            cy.get('[id="TestQuestionsText"]').invoke('val').then((value) => {
              cy.wrap(value).should('eq', Content) 
            });
            
          
            cy.get('[onclick="history.back()"]').first().click().wait(1000)
          })
        })
      })
   
        it('Zadanie', function () {
          cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {
    
           
    const taskOrderSPL = jsonData.Zadanie.find(obj => obj.taskOrder)?.taskOrder;
    const useLessonNameSPL = jsonData.Zadanie.find(obj => obj.useLessonName)?.useLessonName;
    const languageSPL = jsonData.Zadanie.find(obj => obj.language)?.language;
    const LengthInTimeSPL = jsonData.Zadanie.find(obj => obj.LengthInTime)?.LengthInTime;
    const EstimateTimeForEvaluationInTimeSPL = jsonData.Zadanie.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
    const ExperiencePointsSPL = jsonData.Zadanie.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
    const difficultySPL = jsonData.Zadanie.find(obj => obj.difficulty)?.difficulty;
    const IsTimeLimitedTaskSPL = jsonData.Zadanie.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
    const NotMandatorySPL = jsonData.Zadanie.find(obj => obj.NotMandatory)?.NotMandatory;
    const GuarantorIdSPL = jsonData.Zadanie.find(obj => obj.GuarantorId)?.GuarantorId;
    const GuarantorsSPL = jsonData.Zadanie.find(obj => obj.Guarantors)?.Guarantors;
    const ContentAssistantsSPL = jsonData.Zadanie.find(obj => obj.ContentAssistants)?.ContentAssistants;
    const TrainingsSPL = jsonData.Zadanie.find(obj => obj.Trainings)?.Trainings;
    const lecturerInstructionSPL = jsonData.Zadanie.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
    const lecturerInternalMaterialSPL = jsonData.Zadanie.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
    const DescriptionSPL = jsonData.Zadanie.find(obj => obj.Description)?.Description;
    const studentInstructionSPL = jsonData.Zadanie.find(obj => obj.studentInstruction)?.studentInstruction;
    const AssignmentSPL = jsonData.Zadanie.find(obj => obj.Assignment)?.Assignment;
    const SampleSolutionSPL = jsonData.Zadanie.find(obj => obj.SampleSolution)?.SampleSolution;
    const FileUploadIsMandatorySPL = jsonData.Zadanie.find(obj => obj.FileUploadIsMandatory)?.FileUploadIsMandatory;
    const AnswerIsMandatorySPL = jsonData.Zadanie.find(obj => obj.AnswerIsMandatory)?.AnswerIsMandatory;
    const IsExerciseTestAllowedSPL = jsonData.Zadanie.find(obj => obj.IsExerciseTestAllowed)?.IsExerciseTestAllowed;
    
        cy.get('tbody').find('tr').contains('Zad').then(edit => {
          cy.wrap(edit).parent().parent().parent().find('a').click();
        })
    
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', taskOrderSPL) 
        });
        
        cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
          if (useLessonNameSPL === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        }); 
      
        cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', languageSPL) 
        });
        
        cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', LengthInTimeSPL) 
        });
        
        cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', EstimateTimeForEvaluationInTimeSPL) 
        });
        
        cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', ExperiencePointsSPL) 
        });
        
        cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', difficultySPL) 
        })
        
        cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
          if (IsTimeLimitedTaskSPL === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        });
        
        cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
          if (NotMandatorySPL === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        });
      
        cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', GuarantorIdSPL) 
        });
        
        cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', GuarantorsSPL) 
        });
        
       /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', ContentAssistantsD) 
        });
        */
        cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', TrainingsSPL) 
        });
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
          cy.wrap(value).should('eq', lecturerInstructionSPL) 
        });
  
        
       /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', lecturerInternalMaterialP) 
        });*/
        
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', lecturerInternalMaterialSPL) 
        });
      
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
          cy.wrap(value).should('eq', studentInstructionSPL) 
        });
        
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
          cy.wrap(value).should('eq', DescriptionSPL) 
        });
    
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Content"]').prev('div').invoke('text').then((value) => {
          cy.wrap(value).should('eq', AssignmentSPL) 
        });
    
        /*cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.SampleSolution"]').prev('div').invoke('text').then((value) => {
          cy.wrap(value).should('eq', SampleSolutionSPL) 
        });*/
    
        cy.get('[name="FileUploadIsMandatory"]').find('[type="checkbox"]').then((value) => {
          if (FileUploadIsMandatorySPL === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        });
    
        cy.get('[name="FileUploadIsMandatory"]').find('[type="checkbox"]').then((value) => {
          if (AnswerIsMandatorySPL === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        });
    
        cy.get('[name="FileUploadIsMandatory"]').find('[type="checkbox"]').then((value) => {
          if (IsExerciseTestAllowedSPL === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        });
    
        cy.get('[onclick="history.back()"]').first().click().wait(1000)
      })
})
it('Potvrdenie Absolvovania', function () {

  cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {
  
  const taskOrder = jsonData.PotvrdenieAbsolvovania.find(obj => obj.taskOrder)?.taskOrder;
  const useLessonName = jsonData.PotvrdenieAbsolvovania.find(obj => obj.useLessonName)?.useLessonName;
  const language = jsonData.PotvrdenieAbsolvovania.find(obj => obj.language)?.language;
  const LengthInTime = jsonData.PotvrdenieAbsolvovania.find(obj => obj.LengthInTime)?.LengthInTime;
  const EstimateTimeForEvaluationInTime = jsonData.PotvrdenieAbsolvovania.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
  const ExperiencePoints = jsonData.PotvrdenieAbsolvovania.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
  const difficulty = jsonData.PotvrdenieAbsolvovania.find(obj => obj.difficulty)?.difficulty;
  const IsTimeLimitedTask = jsonData.PotvrdenieAbsolvovania.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
  const NotMandatory = jsonData.PotvrdenieAbsolvovania.find(obj => obj.NotMandatory)?.NotMandatory;
  const GuarantorId = jsonData.PotvrdenieAbsolvovania.find(obj => obj.GuarantorId)?.GuarantorId;
  const Guarantors = jsonData.PotvrdenieAbsolvovania.find(obj => obj.Guarantors)?.Guarantors;
  const ContentAssistants = jsonData.PotvrdenieAbsolvovania.find(obj => obj.ContentAssistants)?.ContentAssistants;
  const Trainings = jsonData.PotvrdenieAbsolvovania.find(obj => obj.Trainings)?.Trainings;
  const lecturerInstruction = jsonData.PotvrdenieAbsolvovania.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
  const lecturerInternalMaterial = jsonData.PotvrdenieAbsolvovania.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
  const studentInstruction = jsonData.PotvrdenieAbsolvovania.find(obj => obj.studentInstruction)?.studentInstruction;
  const Description = jsonData.PotvrdenieAbsolvovania.find(obj => obj.Description)?.Description;
  const Content = jsonData.PotvrdenieAbsolvovania.find(obj => obj.Content)?.Content;
  
    cy.get('tbody').find('tr').contains('Pot').then(edit => {
      cy.wrap(edit).parent().parent().parent().find('a').click();
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', taskOrder) 
      });
      
      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        if (useLessonName === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      }); 
    
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', language) 
      });
      
      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', LengthInTime) 
      });
      
      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimateTimeForEvaluationInTime) 
      });
      
      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ExperiencePoints) 
      });
      
      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', difficulty) 
      })
      
      cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
        if (IsTimeLimitedTask === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
      
      cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
        if (NotMandatory === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
    
      cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorId) 
      });
      
      cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Guarantors) 
      });
      
     /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentAssistants) 
      });
      */
      cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Trainings) 
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInstruction) 
      });
      
      
     /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterial) 
      });*/
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterial) 
      });
    
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', studentInstruction) 
      });
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Description) 
        console.log(Description)
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Content"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Content) 
      });
      
      cy.get('[onclick="history.back()"]').first().click().wait(1000)
    })
  })
  })

  it('Diskusia', function () {

    cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {
    
    const taskOrder = jsonData.Diskusia.find(obj => obj.taskOrder)?.taskOrder;
    const useLessonName = jsonData.Diskusia.find(obj => obj.useLessonName)?.useLessonName;
    const language = jsonData.Diskusia.find(obj => obj.language)?.language;
    const LengthInTime = jsonData.Diskusia.find(obj => obj.LengthInTime)?.LengthInTime;
    const EstimateTimeForEvaluationInTime = jsonData.Diskusia.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
    const ExperiencePoints = jsonData.Diskusia.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
    const difficulty = jsonData.Diskusia.find(obj => obj.difficulty)?.difficulty;
    const IsTimeLimitedTask = jsonData.Diskusia.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
    const NotMandatory = jsonData.Diskusia.find(obj => obj.NotMandatory)?.NotMandatory;
    const GuarantorId = jsonData.Diskusia.find(obj => obj.GuarantorId)?.GuarantorId;
    const Guarantors = jsonData.Diskusia.find(obj => obj.Guarantors)?.Guarantors;
    const ContentAssistants = jsonData.Diskusia.find(obj => obj.ContentAssistants)?.ContentAssistants;
    const Trainings = jsonData.Diskusia.find(obj => obj.Trainings)?.Trainings;
    const lecturerInstruction = jsonData.Diskusia.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
    const lecturerInternalMaterial = jsonData.Diskusia.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
    const studentInstruction = jsonData.Diskusia.find(obj => obj.studentInstruction)?.studentInstruction;
    const Description = jsonData.Diskusia.find(obj => obj.Description)?.Description;
    const Content = jsonData.Diskusia.find(obj => obj.Content)?.Content;
    
      cy.get('tbody').find('tr').contains('Dis').then(edit => {
        cy.wrap(edit).parent().parent().parent().find('a').click();
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', taskOrder) 
        });
        
        cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
          if (useLessonName === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        }); 
      
        cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', language) 
        });
        
        cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', LengthInTime) 
        });
        
        cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', EstimateTimeForEvaluationInTime) 
        });
        
        cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', ExperiencePoints) 
        });
        
        cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
          cy.wrap(value).should('eq', difficulty) 
        })
        
        cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
          if (IsTimeLimitedTask === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        });
        
        cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
          if (NotMandatory === 'yes') {
            cy.wrap(value).should('be.checked')
        } else {
            cy.wrap(value).should('not.be.checked')
        }
        });
      
        cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', GuarantorId) 
        });
        
        cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', Guarantors) 
        });
        
       /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', ContentAssistants) 
        });
        */
        cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', Trainings) 
        });
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
          cy.wrap(value).should('eq', lecturerInstruction) 
        });
        
        
       /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', lecturerInternalMaterial) 
        });*/
        
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
          cy.wrap(value).should('eq', lecturerInternalMaterial) 
        });
      
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
          cy.wrap(value).should('eq', studentInstruction) 
        });
        
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
          cy.wrap(value).should('eq', Description) 
          console.log(Description)
        });
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Content"]').prev('div').invoke('text').then((value) => {
          cy.wrap(value).should('eq', Content) 
        });
        
        cy.get('[onclick="history.back()"]').first().click().wait(1000)
      })
  

})
})

it('Cvičenie', function () {

  cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {
  
  
  const taskOrder = jsonData.Cvicenie.find(obj => obj.taskOrder)?.taskOrder;
  const useLessonName = jsonData.Cvicenie.find(obj => obj.useLessonName)?.useLessonName;
  const language = jsonData.Cvicenie.find(obj => obj.language)?.language;
  const LengthInTime = jsonData.Cvicenie.find(obj => obj.LengthInTime)?.LengthInTime;
  const EstimateTimeForEvaluationInTime = jsonData.Cvicenie.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
  const ExperiencePoints = jsonData.Cvicenie.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
  const difficulty = jsonData.Cvicenie.find(obj => obj.difficulty)?.difficulty;
  const IsTimeLimitedTask = jsonData.Cvicenie.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
  const NotMandatory = jsonData.Cvicenie.find(obj => obj.NotMandatory)?.NotMandatory;
  const GuarantorId = jsonData.Cvicenie.find(obj => obj.GuarantorId)?.GuarantorId;
  const Guarantors = jsonData.Cvicenie.find(obj => obj.Guarantors)?.Guarantors;
  const ContentAssistants = jsonData.Cvicenie.find(obj => obj.ContentAssistants)?.ContentAssistants;
  const Trainings = jsonData.Cvicenie.find(obj => obj.Trainings)?.Trainings;
  const lecturerInstruction = jsonData.Cvicenie.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
  const lecturerInternalMaterial = jsonData.Cvicenie.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
  const studentInstruction = jsonData.Cvicenie.find(obj => obj.studentInstruction)?.studentInstruction;
  const Description = jsonData.Cvicenie.find(obj => obj.Description)?.Description;
  const Content = jsonData.Cvicenie.find(obj => obj.Content)?.Content;
  
    cy.get('tbody').find('tr').contains('Cvi').then(edit => {
      cy.wrap(edit).parent().parent().parent().find('a').click();
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', taskOrder) 
      });
      
      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        if (useLessonName === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      }); 
    
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', language) 
      });
      
      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', LengthInTime) 
      });
      
      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimateTimeForEvaluationInTime) 
      });
      
      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ExperiencePoints) 
      });
      
      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', difficulty) 
      })
      
      cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
        if (IsTimeLimitedTask === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
      
      cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
        if (NotMandatory === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
    
      cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorId) 
      });
      
      cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Guarantors) 
      });
      
     /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentAssistants) 
      });
      */
      cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Trainings) 
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInstruction) 
      });
      
      
     /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterial) 
      });*/
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterial) 
      });
    
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', studentInstruction) 
      });
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Description) 
        console.log(Description)
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Content"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Content) 
      });
      
      cy.get('[onclick="history.back()"]').first().click().wait(1000)
    })
  })
})

it('Checklist', function () {

  cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {
  
  const taskOrder = jsonData.Checklist.find(obj => obj.taskOrder)?.taskOrder;
  const useLessonName = jsonData.Checklist.find(obj => obj.useLessonName)?.useLessonName;
  const language = jsonData.Checklist.find(obj => obj.language)?.language;
  const LengthInTime = jsonData.Checklist.find(obj => obj.LengthInTime)?.LengthInTime;
  const EstimateTimeForEvaluationInTime = jsonData.Checklist.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
  const ExperiencePoints = jsonData.Checklist.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
  const difficulty = jsonData.Checklist.find(obj => obj.difficulty)?.difficulty;
  const IsTimeLimitedTask = jsonData.Checklist.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
  const NotMandatory = jsonData.Checklist.find(obj => obj.NotMandatory)?.NotMandatory;
  const GuarantorId = jsonData.Checklist.find(obj => obj.GuarantorId)?.GuarantorId;
  const Guarantors = jsonData.Checklist.find(obj => obj.Guarantors)?.Guarantors;
  const ContentAssistants = jsonData.Checklist.find(obj => obj.ContentAssistants)?.ContentAssistants;
  const Trainings = jsonData.Checklist.find(obj => obj.Trainings)?.Trainings;
  const lecturerInstruction = jsonData.Checklist.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
  const lecturerInternalMaterial = jsonData.Checklist.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
  const studentInstruction = jsonData.Checklist.find(obj => obj.studentInstruction)?.studentInstruction;
  const Description = jsonData.Checklist.find(obj => obj.Description)?.Description;
  const Content = jsonData.Checklist.find(obj => obj.Content)?.Content;
  
    cy.get('tbody').find('tr').contains('Che').then(edit => {
      cy.wrap(edit).parent().parent().parent().find('a').click();
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', taskOrder) 
      });
      
      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        if (useLessonName === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      }); 
    
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', language) 
      });
      
      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', LengthInTime) 
      });
      
      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimateTimeForEvaluationInTime) 
      });
      
      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ExperiencePoints) 
      });
      
      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', difficulty) 
      })
      
      cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
        if (IsTimeLimitedTask === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
      
      cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
        if (NotMandatory === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
    
      cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorId) 
      });
      
      cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Guarantors) 
      });
      
     /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentAssistants) 
      });
      */
      cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Trainings) 
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInstruction) 
      });
      
      
     /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterial) 
      });*/
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterial) 
      });
    
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', studentInstruction) 
      });
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Description) 
        console.log(Description)
      });
      
      cy.get('[name="TestQuestionsText"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', Content) 
      });
      
      cy.get('[onclick="history.back()"]').first().click().wait(1000)
    })
  })
})
it('IQ test', function () {
    
  cy.readFile('cypress/fixtures/guarantor_content_checker.json', 'utf-8').then((jsonData) => {

    const persVal = jsonData.IQtest
 
      
   
  const taskOrder = jsonData.IQtest.find(obj => obj.taskOrder)?.taskOrder;
  const useLessonName = jsonData.IQtest.find(obj => obj.useLessonName)?.useLessonName;
  const language = jsonData.IQtest.find(obj => obj.language)?.language;
  const LengthInTime = jsonData.IQtest.find(obj => obj.LengthInTime)?.LengthInTime;
  const EstimateTimeForEvaluationInTime = jsonData.IQtest.find(obj => obj.EstimateTimeForEvaluationInTime)?.EstimateTimeForEvaluationInTime;
  const ExperiencePoints = jsonData.IQtest.find(obj => obj.ExperiencePoints)?.ExperiencePoints;
  const difficulty = jsonData.IQtest.find(obj => obj.difficulty)?.difficulty;
  const IsTimeLimitedTask = jsonData.IQtest.find(obj => obj.IsTimeLimitedTask)?.IsTimeLimitedTask;
  const NotMandatory = jsonData.IQtest.find(obj => obj.NotMandatory)?.NotMandatory;
  const GuarantorId = jsonData.IQtest.find(obj => obj.GuarantorId)?.GuarantorId;
  const Guarantors = jsonData.IQtest.find(obj => obj.Guarantors)?.Guarantors;
  const ContentAssistants = jsonData.IQtest.find(obj => obj.ContentAssistants)?.ContentAssistants;
  const Trainings = jsonData.IQtest.find(obj => obj.Trainings)?.Trainings;
  const lecturerInstruction = jsonData.IQtest.find(obj => obj.lecturerInstruction)?.lecturerInstruction;
  const lecturerInternalMaterial = jsonData.IQtest.find(obj => obj.lecturerInternalMaterial)?.lecturerInternalMaterial;
  const studentInstruction = jsonData.IQtest.find(obj => obj.studentInstruction)?.studentInstruction;
  const Description = jsonData.IQtest.find(obj => obj.Description)?.Description;
  const Content = jsonData.IQtest.find(obj => obj.Content)?.Content;

  const persVals = [];
    for (let x = 0; x < persVal.length; x++) {
      persVals.push(persVal[x].characteristicForm);
    }
    const persValsFiltered = persVals.filter(item => item !== undefined);

  const persValsQnA = [];
    for (let x = 0; x < persVal.length; x++) {
      persValsQnA.push(persVal[x].characteristicFormA);
    }
    const persValsQnAFiltered = persValsQnA.filter(item => item !== undefined);

    const characteristic = [];
    for (let x = 0; x < persVal.length; x++) {
      if (persVal[x].personalityTestFormSel) {
        const category = persVal[x].personalityTestFormSel.replace(/^\d+: /, '');
        characteristic.push(category);
      }
    }
    const characteristicFiltered = characteristic.filter(item => item !== undefined);

  
    cy.get('tbody').find('tr').contains('IQ').then(edit => {
      cy.wrap(edit).parent().parent().parent().find('a').click();
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', taskOrder) 
      });
      
      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        if (useLessonName === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      }); 
    
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', language) 
      });
      
      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', LengthInTime) 
      });
      
      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', EstimateTimeForEvaluationInTime) 
      });
      
      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ExperiencePoints) 
      });
      
      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        cy.wrap(value).should('eq', difficulty) 
      })
      
      cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
        if (IsTimeLimitedTask === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
      
      cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
        if (NotMandatory === 'yes') {
          cy.wrap(value).should('be.checked')
      } else {
          cy.wrap(value).should('not.be.checked')
      }
      });
    
      cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', GuarantorId) 
      });
      
      cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Guarantors) 
      });
      
     /* cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', ContentAssistantsAT) 
      });
      */
      cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Trainings) 
      });
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInstruction"]').next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInstruction) 
      });
      
      
     /* cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.CorrectorInstruction"]').next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterial) 
      });*/
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.LecturerInternalMaterial"]').next().next().find('span').invoke('text').then((value) => {
        cy.wrap(value).should('eq', lecturerInternalMaterial) 
      });
    
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.StudentInstruction"]').next().next().invoke('text').then((value) => {
        cy.wrap(value).should('eq', studentInstruction) 
      });
      
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.Description"]').prev('div').invoke('text').then((value) => {
        cy.wrap(value).should('eq', Description) 
      });

      cy.get('[name="characteristicForm"]').find('td:nth-child(2)').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('text').should('eq', persValsFiltered[x])
        }
      })        

      cy.get('[class="af-table table table-striped table-bordered table-hover"]').first().find('td:nth-child(2)').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('text').should('eq', persValsQnAFiltered[x])
        }
      })        
      cy.get('[class="af-table table table-striped table-bordered table-hover"]').last().find('td:eq(2)').then((value) => {
        for (let x = 0; x < value.length; x++) {
          cy.wrap(value[x]).invoke('text').then((dataVals) => {
        cy.wait(4000)
            
            if (dataVals === 'Nesprávne') { 
              expect(characteristicFiltered[x]).to.equal('false');
            } else if (dataVals === 'Správne') { 
              expect(characteristicFiltered[x]).to.equal('true')
            
            }
          });
        }
     cy.get('[onclick="history.back()"]').first().click().wait(1000)
      })
    })
  })
})
});