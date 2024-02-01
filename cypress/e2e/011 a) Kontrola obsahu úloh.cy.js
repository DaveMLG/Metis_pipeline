describe('Product owner', function () {
  before(() => {
    cy.visit('https://dev.metis.academy/admin');
    cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
    cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[type="submit"]').should('be.visible');
    cy.get('[name="userName"]').type('skorg1.go');
    cy.get('[name="password"]').type('ML_heslo1');
    cy.get('[type="submit"]').click();
  });

  it('Odporúčenie šablón lekcie pre garanta', function () {
    // Uloží data z popisu
    let DataValues = [];
    let jsonData = {};

    cy.viewport(1920, 937);
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.get('[placeholder="Kľúčové slovo"]').type("PO CY_edit");
    cy.get('[type="submit"]').click();
    cy.contains('PO CY_edit').click();
    cy.wait(3000);
    cy.get(':nth-child(5) > .nav-link').click();
    cy.wait(3000);

    ////Samoštúdium
    cy.get('tbody').find('tr').contains('Sam').then(edit => {
      cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        DataValues.push({taskOrder: value})
      });

      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        cy.wrap(value).invoke('val').then((pushVals) => {
          DataValues.push({ActivityInput: pushVals})
      });
    })
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        DataValues.push({language: value})
      });

      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        DataValues.push({LengthInTime: value})
      });

      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        DataValues.push({EstimateTimeForEvaluationInTime: value})
      });

      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        DataValues.push({ExperiencePoints: value})
      });

      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        DataValues.push({difficulty: value})

        cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
          const isChecked = value.prop('checked');
          if (isChecked) {
             DataValues.push({IsTimeLimitedTask: 'yes'});
          } else {
             DataValues.push({IsTimeLimitedTask: 'no'});
          }
        });

        cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
          const isChecked = value.prop('checked');
          if (isChecked) {
             DataValues.push({NotMandatory: 'yes'});
          } else {
             DataValues.push({NotMandatory: 'no'});
          }
        });
        cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({GuarantorId: value})
        });

        cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({Guarantors: value})
        });

        cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({ContentAssistants: value})
        });

        cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
           DataValues.push({Trainings: value})
        });

        cy.get('[name="guarantorInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({guarantorInternalMaterial: value})

        cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({lecturerInstruction: value})
        });

        
        cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({lecturerInternalMaterial: value})
        });

        
        cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({studentInstruction: value})
        });

        
        cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({Description: value})
        });

        cy.get('[name="Content"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({Content: value})
        });

        cy.wait(1000).then(() => {
          jsonData['Samostudium'] = DataValues;
          cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
          DataValues = [];
        })

        cy.get('[onclick="history.back()"]').first().click().wait(1000)


         ////Automaticky test
    cy.get('tbody').find('tr').contains('Aut').then(edit => {
      cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        DataValues.push({taskOrder: value})
      });

      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        cy.wrap(value).invoke('val').then((pushVals) => {
          DataValues.push({ActivityInput: pushVals})
      });
    })
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        DataValues.push({language: value})
      });

      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        DataValues.push({LengthInTime: value})
      });

      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        DataValues.push({EstimateTimeForEvaluationInTime: value})
      });

      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        DataValues.push({ExperiencePoints: value})
      });

      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        DataValues.push({difficulty: value})

        cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
          const isChecked = value.prop('checked');
          if (isChecked) {
             DataValues.push({IsTimeLimitedTask: 'yes'});
          } else {
             DataValues.push({IsTimeLimitedTask: 'no'});
          }
        });

        cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
          const isChecked = value.prop('checked');
          if (isChecked) {
             DataValues.push({NotMandatory: 'yes'});
          } else {
             DataValues.push({NotMandatory: 'no'});
          }
        });
        cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({GuarantorId: value})
        });

        cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({Guarantors: value})
        });

        cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({ContentAssistants: value})
        });

        cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
           DataValues.push({Trainings: value})
        });


        cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({lecturerInstruction: value})
        });

        
        cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({lecturerInternalMaterial: value})
        });

        
        cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({studentInstruction: value})
        });

        
        cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({Description: value})
        });

        cy.get('[id="TestQuestionsText"]').invoke('text').then((value) => {
           DataValues.push({Content: value})
        });

        cy.wait(1000).then(() => {
          jsonData['AutoTest'] = DataValues;
          cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
          DataValues = [];
        })
        cy.get('[onclick="history.back()"]').first().click().wait(1000)
        
      ////Videoamoštúdium
    cy.get('tbody').find('tr').contains('Vid').then(edit => {
      cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        DataValues.push({taskOrder: value})
      });

      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        cy.wrap(value).invoke('val').then((pushVals) => {
          DataValues.push({ActivityInput: pushVals})
      });
    })
      cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        DataValues.push({language: value})
      });

      cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
        DataValues.push({LengthInTime: value})
      });

      cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
        DataValues.push({EstimateTimeForEvaluationInTime: value})
      });

      cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
        DataValues.push({ExperiencePoints: value})
      });

      cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
        DataValues.push({difficulty: value})

        cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
          const isChecked = value.prop('checked');
          if (isChecked) {
             DataValues.push({IsTimeLimitedTask: 'yes'});
          } else {
             DataValues.push({IsTimeLimitedTask: 'no'});
          }
        });

        cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
          const isChecked = value.prop('checked');
          if (isChecked) {
             DataValues.push({NotMandatory: 'yes'});
          } else {
             DataValues.push({NotMandatory: 'no'});
          }
        });
        cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({GuarantorId: value})
        });

        cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({Guarantors: value})
        });

        cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
          DataValues.push({ContentAssistants: value})
        });

        cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
           DataValues.push({Trainings: value})
        });

        cy.get('[name="guarantorInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({guarantorInternalMaterial: value})

        cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({lecturerInstruction: value})
        });

        
        cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({lecturerInternalMaterial: value})
        });

        
        cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({studentInstruction: value})
        });

        
        cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({Description: value})
        });

        cy.get('[name="Content"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
           DataValues.push({Content: value})
        });

        cy.wait(1000).then(() => {
          jsonData['Videosamostudium'] = DataValues;
          cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
          DataValues = [];
        })

        cy.get('[onclick="history.back()"]').first().click().wait(1000)
      })
    })
  })

  
         ////Webinar
         cy.get('tbody').find('tr').contains('Web').then(edit => {
          cy.wrap(edit).parent().parent().parent().contains('Editovať').click();
    
          cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
            DataValues.push({taskOrder: value})
          });
    
          cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
            cy.wrap(value).invoke('val').then((pushVals) => {
              DataValues.push({ActivityInput: pushVals})
          });
        })
          cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            DataValues.push({language: value})
          });
    
          cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
            DataValues.push({LengthInTime: value})
          });
    
          cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
            DataValues.push({EstimateTimeForEvaluationInTime: value})
          });
    
          cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
            DataValues.push({ExperiencePoints: value})
          });
    
          cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            DataValues.push({difficulty: value})
    
            cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
              const isChecked = value.prop('checked');
              if (isChecked) {
                 DataValues.push({IsTimeLimitedTask: 'yes'});
              } else {
                 DataValues.push({IsTimeLimitedTask: 'no'});
              }
            });
    
            cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
              const isChecked = value.prop('checked');
              if (isChecked) {
                 DataValues.push({NotMandatory: 'yes'});
              } else {
                 DataValues.push({NotMandatory: 'no'});
              }
            });
            cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
              DataValues.push({GuarantorId: value})
            });
    
            cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
              DataValues.push({Guarantors: value})
            });
    
            cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
              DataValues.push({ContentAssistants: value})
            });
    
            cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
               DataValues.push({Trainings: value})
            });
    
    
            cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
               DataValues.push({lecturerInstruction: value})
            });
    
            
            cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
               DataValues.push({lecturerInternalMaterial: value})
            });
    
            
            cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
               DataValues.push({studentInstruction: value})
            });
    
            
            cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
               DataValues.push({Description: value})
            });
    
            cy.get('[name="Content"]').invoke('text').then((value) => {
               DataValues.push({Content: value})
            });
    
            cy.wait(1000).then(() => {
              jsonData['Webinar'] = DataValues;
              cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
              DataValues = [];
            })
            cy.get('[onclick="history.back()"]').first().click().wait(1000)
          })
        })
      
        //Doplovacka
        cy.get('tbody').find('tr').contains('Dop').then(edit => {
          cy.wrap(edit).parent().parent().parent().contains('Editovať').click();
    
          cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
            DataValues.push({taskOrder: value})
          });
    
          cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
            cy.wrap(value).invoke('val').then((pushVals) => {
              DataValues.push({ActivityInput: pushVals})
          });
        })
          cy.contains('Slovenčina').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            DataValues.push({language: value})
          });
    
          cy.get('[id="LengthInTime"]').invoke('val').then((value) => {
            DataValues.push({LengthInTime: value})
          });
    
          cy.get('[id="EstimateTimeForEvaluationInTime"]').invoke('val').then((value) => {
            DataValues.push({EstimateTimeForEvaluationInTime: value})
          });
    
          cy.get('[for="ExperiencePoints"]').nextUntil('span').invoke('text').then((value) => {
            DataValues.push({ExperiencePoints: value})
          });
    
          cy.contains('Nízka').parentsUntil('.row').find('[class="custom-control-input radio-button-active"]').invoke('val').then((value) => {
            DataValues.push({difficulty: value})
    
            cy.get('[name="IsTimeLimitedTask"]').find('[type="checkbox"]').then((value) => {
              const isChecked = value.prop('checked');
              if (isChecked) {
                 DataValues.push({IsTimeLimitedTask: 'yes'});
              } else {
                 DataValues.push({IsTimeLimitedTask: 'no'});
              }
            });
    
            cy.get('[name="NotMandatory"]').find('[type="checkbox"]').then((value) => {
              const isChecked = value.prop('checked');
              if (isChecked) {
                 DataValues.push({NotMandatory: 'yes'});
              } else {
                 DataValues.push({NotMandatory: 'no'});
              }
            });
            cy.get('[for="GuarantorId"]').nextUntil('span').invoke('text').then((value) => {
              DataValues.push({GuarantorId: value})
            });
    
            cy.get('[for="Guarantors"]').nextUntil('span').invoke('text').then((value) => {
              DataValues.push({Guarantors: value})
            });
    
            cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
              DataValues.push({ContentAssistants: value})
            });
    
            cy.get('[for="Trainings"]').nextUntil('span').invoke('text').then((value) => {
               DataValues.push({Trainings: value})
            });
    
            cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
               DataValues.push({lecturerInstruction: value})
            });
    
            
            cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
               DataValues.push({lecturerInternalMaterial: value})
            });
    
            
            cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
               DataValues.push({studentInstruction: value})
            });
    
            
            cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
               DataValues.push({Description: value})
            });
    
            cy.get('[name="Content"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
               DataValues.push({Content: value})
            });
    
            cy.wait(1000).then(() => {
              jsonData['Doplnovacka'] = DataValues;
              cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
              DataValues = [];
            })
    
            cy.get('[onclick="history.back()"]').first().click().wait(1000)
          })
        })
      })
      });
    });
  });
});
})
    })
