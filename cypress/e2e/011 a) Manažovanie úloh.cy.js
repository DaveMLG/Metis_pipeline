describe('Product owner', function () {
  beforeEach(() => {
      cy.visit('https://dev.metis.academy/admin');
      cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
      cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
      cy.get('[type="submit"]').should('be.visible');
      cy.get('[type="submit"]').should('be.visible');
      cy.get('[name="userName"]').type('skorg1.go');
      cy.get('[name="password"]').type('ML_heslo1');
      cy.get('[type="submit"]').click();
      cy.viewport(1920, 937);
  });

  it('Skopírovanie dát zo školenia, ktoré budeme hromadne manažovať', function () {
      // Uloží data z popisu
      let DataValues = [];
      let jsonData = {};

      cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
      cy.get('@nastavenia').click();
      cy.get('[href="/admin/elearning/training"]').click();
      cy.wait(3000);
      cy.get('[placeholder="Kľúčové slovo"]').type('PO CY Hromadné manažovanie úloh');
      cy.get('[type="submit"]').first().click().wait(1000);
      cy.get('tbody').find('a').first().click().wait(1000)
      cy.get(':nth-child(5) > .nav-link').click();

      ////Potvrdenie absolvovania
      cy.get('tbody').find('tr').contains('Pot').then(edit => {
          cy.wrap(edit).parent().parent().parent().contains('Editovať').click();
    
          cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
            const isChecked = value.prop('checked');
            if (isChecked) {
                DataValues.push({useLessonName: 'yes'});
            } else {
                DataValues.push({useLessonName: 'no'});
            }
            });
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
          })
    
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

            cy.get('[name="correctorInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
              DataValues.push({correctorInstruction: value})
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
              jsonData['PotvrdenieAbsolvovania'] = DataValues;
              cy.writeFile('cypress/fixtures/insert_from_another_training.json', JSON.stringify(jsonData, null, 2))
              DataValues = [];
            })
    
            cy.get('[onclick="history.back()"]').first().click().wait(1000)
          })

          ////Webinar
  cy.get('tbody').find('tr').contains('Web').then(edit => {
  cy.wrap(edit).parent().parent().parent().contains('Editovať').click();
  
  cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
    const isChecked = value.prop('checked');
    if (isChecked) {
        DataValues.push({useLessonName: 'yes'});
    } else {
        DataValues.push({useLessonName: 'no'});
    }
    });
  
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
  })
  
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

    cy.get('[name="correctorInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
      DataValues.push({correctorInstruction: value})
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
      jsonData['Webinar'] = DataValues;
      cy.writeFile('cypress/fixtures/insert_from_another_training.json', JSON.stringify(jsonData, null, 2))
      DataValues = [];
    })
    cy.get('[onclick="history.back()"]').first().click().wait(1000)
  })


  ////Cvičenie
      cy.get('tbody').find('tr').contains('Cvi').then(edit => {
      cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

      cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
        const isChecked = value.prop('checked');
        if (isChecked) {
            DataValues.push({useLessonName: 'yes'});
        } else {
            DataValues.push({useLessonName: 'no'});
        }
        });
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
      })

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

        cy.get('[name="correctorInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
          DataValues.push({correctorInstruction: value})
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
          jsonData['Cvicenie'] = DataValues;
          cy.writeFile('cypress/fixtures/insert_from_another_training.json', JSON.stringify(jsonData, null, 2))
          DataValues = [];

          cy.get('[onclick="history.back()"]').first().click().wait(1000)
        })
      })
    })
  
  it('Hromadné presunutie úloh bez checkboxov + overenie', function() {
      cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
      cy.get('@nastavenia').click();
      cy.get('[href="/admin/elearning/training"]').click();
      cy.wait(3000);
      cy.get('[placeholder="Kľúčové slovo"]').type('PO CY');
      cy.get('[type="submit"]').first().click().wait(1000);
      cy.get('tbody').find('a').first().click().wait(1000)
      cy.get(':nth-child(5) > .nav-link').click().wait(1000);

      cy.get('[type = "radio"]').eq(2).check({force: true})
      cy.wait(1000)
      cy.get('[type = "checkbox"]').then((checkbox) => {
          for (let x = 0; x < checkbox.length; x++) {
              cy.wrap(checkbox[x]).uncheck({force: true})
          }
      })

      cy.wait(1000).then(() => {
        cy.get('tbody').last().find('i').then((xbtn) => {
            for (let x = 0; x < xbtn.length; x++) {
                cy.wrap(xbtn[0]).click()
            }
            cy.get('[type="submit"]').last().click().wait(5000)
            cy.contains('Áno').click()
        })
      })

              cy.get('[name="addExercisesSelectedTraining"]').select('PO CY Hromadné manažovanie úloh')
              cy.get('[name="addExercisesSelectedTheme"]').select(0)
              cy.get('[name="addExercisesSelectedLesson"]').select(0)
              cy.get('[type="button"]').first().click().wait(1000)
              cy.get('[type="button"]').last().click().wait(1000)
              cy.get('[type="submit"]').last().click().wait(1000)
              //cy.contains('Áno').click()

              //Overenie úloh - bez checkboxov
              cy.readFile('cypress/fixtures/insert_from_another_training.json', 'utf-8').then((jsonData) => {

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
                      
                      cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
                        cy.wrap(value).should('eq', ContentAssistants) 
                      });
                      
                      cy.get('[name="lecturerInstruction"]').nextUntil('span').invoke('text').then((value) => {
                        cy.wrap(value).should('be.empty') 
                      });
                      
                      
                      cy.get('[name="lecturerInternalMaterial"]').nextUntil('span').invoke('text').then((value) => {
                        cy.wrap(value).should('be.empty') 
                      });
                    
                      cy.get('[name="studentInstruction"]').nextUntil('span').invoke('text').then((value) => {
                        cy.wrap(value).should('be.empty') 
                      });
                      
                      
                      cy.get('[name="Description"]').nextUntil('span').invoke('text').then((value) => {
                        cy.wrap(value).should('be.empty') 
                      });
                      
                      cy.get('[name="Content"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                        cy.wrap(value).should('eq', Content) 
                      });
                      
                      cy.get('[onclick="history.back()"]').first().click().wait(1000)
                    })
               })
            })
          
   //Overenie úloh s obsahom
   it('Hromadné presunutie úloh s inštrukciami pre lektora + overenie', function() {
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click();
    cy.wait(3000);
    cy.get('[placeholder="Kľúčové slovo"]').type('PO CY');
    cy.get('[type="submit"]').first().click().wait(1000);
    cy.get('tbody').find('a').first().click().wait(1000)
    cy.get(':nth-child(5) > .nav-link').click().wait(1000);

    cy.get('[type = "radio"]').eq(2).check({force: true})
    cy.wait(1000)
    cy.get('[type = "checkbox"]').then((checkbox) => {
        for (let x = 0; x < checkbox.length; x++) {
            cy.wrap(checkbox[x]).uncheck({force: true})
        }
        cy.wrap(checkbox).eq(1).check({force: true})
    })

    cy.wait(1000).then(() => {
        cy.get('tbody').last().find('i').then((xbtn) => {
            for (let x = 0; x < xbtn.length; x++) {
                cy.wrap(xbtn[0]).click()
            }
            cy.get('[type="submit"]').last().click().wait(5000)
            cy.contains('Áno').click()

            cy.get('[name="addExercisesSelectedTraining"]').select('PO CY Hromadné manažovanie úloh')
            cy.get('[name="addExercisesSelectedTheme"]').select(0)
            cy.get('[name="addExercisesSelectedLesson"]').select(0)
            cy.get('[type="button"]').first().click().wait(1000)
            cy.get('[type="button"]').last().click().wait(1000)
            cy.get('[type="submit"]').last().click().wait(1000)
            //cy.contains('Áno').click()


            //Overenie úloh s obsahom
            cy.readFile('cypress/fixtures/insert_from_another_training.json', 'utf-8').then((jsonData) => {

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
                const correctorInstruction  = jsonData.PotvrdenieAbsolvovania.find(obj => obj.correctorInstruction)?.correctorInstruction;
                const studentInstruction = jsonData.PotvrdenieAbsolvovania.find(obj => obj.studentInstruction)?.studentInstruction;
                const Description = jsonData.PotvrdenieAbsolvovania.find(obj => obj.Description)?.Description;
                const Content = jsonData.PotvrdenieAbsolvovania.find(obj => obj.Content)?.Content;

                cy.get('tbody').find('tr').contains('Pot').then(edit => {
                  cy.wrap(edit).parent().parent().parent().find('a').click();
                  
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
                  
                  cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
                    cy.wrap(value).should('eq', ContentAssistants) 
                  });
                  
                  cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                    cy.wrap(value).should('eq', lecturerInstruction) 
                  });

                  cy.get('[name="correctorInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                    cy.wrap(value).should('be.empty') 
                  });
                  
                  
                  cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                    cy.wrap(value).should('be.empty',) 
                  });
                
                  cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                    cy.wrap(value).should('be.empty') 
                  });
                  
                  
                  cy.get('[name="Description"]').nextUntil('span').invoke('text').then((value) => {
                    cy.wrap(value).should('be.empty') 
                  });
                  
                  cy.get('[name="Content"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                    cy.wrap(value).should('eq', Content) 
                  });
                  
                  cy.get('[onclick="history.back()"]').first().click().wait(1000)
                })
           })
        })
            })
        })

        it('Hromadné presunutie úloh s inštrukciami pre opravovača + overenie', function() {
          cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
          cy.get('@nastavenia').click();
          cy.get('[href="/admin/elearning/training"]').click();
          cy.wait(3000);
          cy.get('[placeholder="Kľúčové slovo"]').type('PO CY');
          cy.get('[type="submit"]').first().click().wait(1000);
          cy.get('tbody').find('a').first().click().wait(1000)
          cy.get(':nth-child(5) > .nav-link').click().wait(1000);
      
          cy.get('[type = "radio"]').eq(2).check({force: true})
          cy.wait(1000)
          cy.get('[type = "checkbox"]').then((checkbox) => {
              for (let x = 0; x < checkbox.length; x++) {
                  cy.wrap(checkbox[x]).uncheck({force: true})
              }
              cy.wrap(checkbox).eq(2).check({force: true})
          })
      
          cy.wait(1000).then(() => {
              cy.get('tbody').last().find('i').then((xbtn) => {
                  for (let x = 0; x < xbtn.length; x++) {
                      cy.wrap(xbtn[0]).click()
                  }
                  cy.get('[type="submit"]').last().click().wait(5000)
                  cy.contains('Áno').click()
      
                  cy.get('[name="addExercisesSelectedTraining"]').select('PO CY Hromadné manažovanie úloh')
                  cy.get('[name="addExercisesSelectedTheme"]').select(0)
                  cy.get('[name="addExercisesSelectedLesson"]').select(0)
                  cy.get('[type="button"]').first().click().wait(1000)
                  cy.get('[type="button"]').last().click().wait(1000)
                  //cy.get('[type="button"]').contains('Pridať').click().wait(1000)
                  cy.get('[type="submit"]').last().click().wait(1000)
                  cy.contains('Áno').click()
      
      
                  //Overenie úloh s obsahom
                  cy.readFile('cypress/fixtures/insert_from_another_training.json', 'utf-8').then((jsonData) => {
      
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
                      const correctorInstruction  = jsonData.PotvrdenieAbsolvovania.find(obj => obj.correctorInstruction)?.correctorInstruction;
                      const studentInstruction = jsonData.PotvrdenieAbsolvovania.find(obj => obj.studentInstruction)?.studentInstruction;
                      const Description = jsonData.PotvrdenieAbsolvovania.find(obj => obj.Description)?.Description;
                      const Content = jsonData.PotvrdenieAbsolvovania.find(obj => obj.Content)?.Content;
      
                      cy.get('tbody').find('tr').contains('Pot').then(edit => {
                        cy.wrap(edit).parent().parent().parent().find('a').click();
                        
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
                        
                        cy.get('[for="ContentAssistants"]').nextUntil('span').invoke('text').then((value) => {
                          cy.wrap(value).should('eq', ContentAssistants) 
                        });
                        
                        cy.get('[name="lecturerInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                          cy.wrap(value).should('be.empty') 
                        });
      
                        cy.get('[name="correctorInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                          cy.wrap(value).should('eq', correctorInstruction) 
                        });
                        
                        
                        cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                          cy.wrap(value).should('be.empty',) 
                        });
                      
                        cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                          cy.wrap(value).should('be.empty') 
                        });
                        
                        
                        cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                          cy.wrap(value).should('be.empty') 
                        });
                        
                        cy.get('[name="Content"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                          cy.wrap(value).should('eq', Content) 
                        });
                        
                        cy.get('[onclick="history.back()"]').first().click().wait(1000)
                      })
                 })
              })
                  })
              })
    })

  
