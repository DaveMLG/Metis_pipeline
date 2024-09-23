describe('Product owner', function () {
before(() => {
cy.visit(Cypress.env('websiteUrl'))
cy.get('[class="btn btn-navigate btn-block"]').should('be.visible');
cy.get('[class="btn btn-navigate btn-block"]').eq(0).click();
cy.get('[type="submit"]').should('be.visible');
cy.get('[type="submit"]').should('be.visible');
cy.get('[name="userName"]').type(Cypress.env('loginGO'));
cy.get('[name="password"]').type(Cypress.env('password'));
cy.get('[type="submit"]').click();
});

//Poznamka
it('Odporúčenie šablón lekcie pre garanta', function () {
// Uloží data z popisu
let DataValues = [];
let jsonData = {};


cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
cy.get('@nastavenia').click();
cy.get('[href="/admin/elearning/training"]').click();
cy.wait(3000)
cy.get('[type = "text"]').first().clear().type("G školenie AAA");
cy.get('[type="submit"]').click();
cy.contains('G školenie AAA').click();
cy.wait(1000);
cy.get(':nth-child(5) > .nav-link').click();
cy.wait(1000);

////Samoštúdium
cy.get('tbody').find('tr').contains('Sam').then(edit => {
cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
DataValues.push({taskOrder: value})
});

cy.get('[name="useLessonName"]').find('[type="checkbox"]').then((value) => {
  const isChecked = value.prop('checked');
  if (isChecked) {
      DataValues.push({useLessonName: 'yes'});
  } else {
      DataValues.push({useLessonName: 'no'});
  }
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

cy.get('[name="guarantorInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
  DataValues.push({guarantorInternalMaterial: value})
})

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


cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
  DataValues.push({lecturerInternalMaterial: value})
});


cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
  DataValues.push({studentInstruction: value})
});


cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
  DataValues.push({Description: value})
});

cy.get('[id="TestQuestionsText"]').invoke('val').then((value) => {
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

cy.get('[name="guarantorInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
  DataValues.push({guarantorInternalMaterial: value})
})

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



////Webinar
cy.get('tbody').find('tr').contains('Web').then(edit => {
cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
  DataValues.push({taskOrder: value})
});

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
    cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
    DataValues = [];
  })
  cy.get('[onclick="history.back()"]').first().click().wait(1000)
})


//Doplovacka
cy.get('tbody').find('tr').contains('Dop').then(edit => {
cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
  DataValues.push({taskOrder: value})
});

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
//Párovačka
cy.get('tbody').find('tr').contains('Pár').then(edit => {
cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
  DataValues.push({taskOrder: value})
});

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

  cy.get('[id="TestQuestionsToAsk"]').invoke('val').then((value) => {
    DataValues.push({questCount: value})
  })

  cy.get('[for="TestQuestionsSum"]').next().invoke('text').then((value) => {
    DataValues.push({questSum: value})
  })

  cy.get('[name="pairingOrTranslateForm"]').find('[type="text"]').then((value) => {
    for (let x = 0; x < value.length; x++) {
      cy.wrap(value[x]).invoke('val').then((dataVal) => {
        DataValues.push({questVals: dataVal})
      })
    }
  })

  cy.wait(1000).then(() => {
    jsonData['Parovacka'] = DataValues;
    cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
    DataValues = [];
  })

  cy.get('[onclick="history.back()"]').first().click().wait(1000)
  })
}) 

////Spoločná práca s mentorom
cy.get('tbody').find('tr').contains('Spo').then(edit => {
cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
  DataValues.push({taskOrder: value})
});

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

  cy.get('[name="assignmentDevelopmentProcedure"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
    DataValues.push({assignmentDevelopmentProcedure: value})
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

  cy.get('[name="Assignment"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
    DataValues.push({Assignment: value})
  });

  cy.get('[name="SampleSolution"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
  DataValues.push({SampleSolution: value})
});

cy.get('[name="FileUploadIsMandatory"]').find('[type="checkbox"]').then((value) => {
const isChecked = value.prop('checked');
if (isChecked) {
    DataValues.push({FileUploadIsMandatory: 'yes'});
} else {
    DataValues.push({FileUploadIsMandatory: 'no'});
}
});

cy.get('[name="AnswerIsMandatory"]').find('[type="checkbox"]').then((value) => {
const isChecked = value.prop('checked');
if (isChecked) {
    DataValues.push({AnswerIsMandatory: 'yes'});
} else {
    DataValues.push({AnswerIsMandatory: 'no'});
}
});

cy.get('[name="IsExerciseTestAllowed"]').find('[type="checkbox"]').then((value) => {
const isChecked = value.prop('checked');
if (isChecked) {
    DataValues.push({IsExerciseTestAllowed: 'yes'});
} else {
    DataValues.push({IsExerciseTestAllowed: 'no'});
}
});

cy.wait(1000).then(() => {
jsonData['SpolPracaLektor'] = DataValues;
cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
DataValues = [];
})

cy.get('[onclick="history.back()"]').first().click().wait(1000)

})
})

////Preferenčný test
cy.get('tbody').find('tr').contains('Pre').then(edit => {
cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

  cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
    DataValues.push({taskOrder: value})
  });

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

    
    cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
        DataValues.push({lecturerInternalMaterial: value})
    });

    
    cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
        DataValues.push({studentInstruction: value})
    });

    
    cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
        DataValues.push({Description: value})
    });

    cy.get('[id="TestQuestionsText"]').invoke('val').then((value) => {
        DataValues.push({Content: value})
    });

    cy.get('[name="AnswerIsPre"]').find('[type="checkbox"]').then((value) => {
      const isChecked = value.prop('checked');
      if (isChecked) {
          DataValues.push({AnswerIsPre: 'yes'});
      } else {
          DataValues.push({AnswerIsPre: 'no'});
      }
    })
  })
  cy.wait(1000).then(() => {
jsonData['PrefTest'] = DataValues;
cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
DataValues = [];
})

cy.get('[onclick="history.back()"]').first().click().wait(1000)


////Preklad
cy.get('tbody').find('tr').contains('Pre').parents('tr').nextAll().contains('Pre').then(edit => {
cy.wrap(edit).parent().parent().parent().contains('Editovať').click({force: true})

cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
  DataValues.push({taskOrder: value})
});

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

  
  cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
      DataValues.push({lecturerInternalMaterial: value})
  });

  
  cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
      DataValues.push({studentInstruction: value})
  });

  
  cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
      DataValues.push({Description: value})
  });

  cy.get('[id="TestQuestionsToAsk"]').invoke('val').then((value) => {
    DataValues.push({questCount: value})
  })

  cy.get('[for="TestQuestionsSum"]').next().invoke('text').then((value) => {
    DataValues.push({questSum: value})
  })

  cy.get('[name="pairingOrTranslateForm"]').find('[type="text"]').then((value) => {
    for (let x = 0; x < value.length; x++) {
      cy.wrap(value[x]).invoke('val').then((dataVal) => {
        DataValues.push({questVals: dataVal})
      })
    }
  })
  cy.wait(1000).then(() => {
    jsonData['Preklad'] = DataValues;
    cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
    DataValues = [];
  })

  cy.get('[onclick="history.back()"]').first().click().wait(1000)

  ////Anketa
  cy.get('tbody').find('tr').contains('Ank').then(edit => {
    cy.wrap(edit).parent().parent().parent().contains('Editovať').click({force: true});

      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        DataValues.push({taskOrder: value})
      });

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

        
        cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            DataValues.push({lecturerInternalMaterial: value})
        });

        
        cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            DataValues.push({studentInstruction: value})
        });

        
        cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            DataValues.push({Description: value})
        });

        cy.get('[id="TestQuestionsText"]').invoke('val').then((value) => {
            DataValues.push({Content: value})
        });

        cy.wait(1000).then(() => {
          jsonData['Anketa'] = DataValues;
          cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
          DataValues = [];
        })

        cy.get('[onclick="history.back()"]').first().click().wait(1000)


        ////Spätná väzba
  cy.get('tbody').find('tr').contains('Spä').then(edit => {
    cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

    cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
      DataValues.push({taskOrder: value})
    });

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

      cy.get('[name="IsShufflingTaskEnabled"]').find('[type="checkbox"]').then((value) => {
        const isChecked = value.prop('checked');
        if (isChecked) {
            DataValues.push({IsShufflingTaskEnabled: 'yes'});
        } else {
            DataValues.push({IsShufflingTaskEnabled: 'no'});
        }
      });

      cy.wait(1000).then(() => {
        jsonData['SpatVazba'] = DataValues;
        cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
        DataValues = [];
      })

      ////Osobnostný test
      cy.get('[onclick="history.back()"]').first().click().wait(1000)

      cy.get('tbody').find('tr').contains('Oso').then(edit => {
        cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
          DataValues.push({taskOrder: value})
        });
  
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
  
          
          cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
              DataValues.push({lecturerInternalMaterial: value})
          });
  
          
          cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
              DataValues.push({studentInstruction: value})
          });
  
          
          cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
              DataValues.push({Description: value})
          });

          cy.get('[name="characteristicForm"]').find('input').then((value) => {
            for (let x = 0; x < value.length; x++) {
              cy.wrap(value[x]).invoke('val').then((dataVAL) => {
                DataValues.push({characteristicForm: dataVAL})
              })
            }
          });

          cy.get('[name="personalityTestForm"]').find('tr').find('input').then((value) => {
            for (let x = 0; x < value.length; x++) {
              cy.wrap(value[x]).invoke('val').then((dataVAL) => {
                DataValues.push({characteristicFormQnA: dataVAL})
              })
            }
          });

          cy.get('[name="personalityTestForm"]').find('tr').find('select').then((value) => {
            for (let x = 0; x < value.length; x++) {
              cy.wrap(value[x]).invoke('val').then((dataVAL) => {
                DataValues.push({personalityTestFormSel: dataVAL})
              })
            }
          })

            cy.wait(1000).then(() => {
        jsonData['OsobTest'] = DataValues;
        cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
        DataValues = [];
      })

      cy.get('[onclick="history.back()"]').first().click().wait(1000)

      ////Otvorený test
      cy.get('tbody').find('tr').contains('Otv').then(edit => {
        cy.wrap(edit).parent().parent().parent().contains('Editovať').click();
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        DataValues.push({taskOrder: value})
        });
        
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
        
        
        cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
          DataValues.push({lecturerInternalMaterial: value})
        });
        
        
        cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
          DataValues.push({studentInstruction: value})
        });
        
        
        cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
          DataValues.push({Description: value})
        });
        
        cy.get('[id="TestQuestionsText"]').invoke('val').then((value) => {
          DataValues.push({Content: value})
        });
        
        cy.wait(1000).then(() => {
        jsonData['OtvTest'] = DataValues;
        cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
        DataValues = [];
        })
        cy.get('[onclick="history.back()"]').first().click().wait(1000)
      })

      ////Zadanie
      cy.get('tbody').find('tr').contains('Zad').then(edit => {
        cy.wrap(edit).parent().parent().parent().contains('Editovať').click();
        
        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
          DataValues.push({taskOrder: value})
        });
        
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
        
          cy.get('[name="Assignment"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
            DataValues.push({Assignment: value})
          });
        
          cy.get('[name="SampleSolution"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
          DataValues.push({SampleSolution: value})
        });
        
        cy.get('[name="FileUploadIsMandatory"]').find('[type="checkbox"]').then((value) => {
        const isChecked = value.prop('checked');
        if (isChecked) {
            DataValues.push({FileUploadIsMandatory: 'yes'});
        } else {
            DataValues.push({FileUploadIsMandatory: 'no'});
        }
        });
        
        cy.get('[name="AnswerIsMandatory"]').find('[type="checkbox"]').then((value) => {
        const isChecked = value.prop('checked');
        if (isChecked) {
            DataValues.push({AnswerIsMandatory: 'yes'});
        } else {
            DataValues.push({AnswerIsMandatory: 'no'});
        }
        });
        
        cy.get('[name="IsExerciseTestAllowed"]').find('[type="checkbox"]').then((value) => {
        const isChecked = value.prop('checked');
        if (isChecked) {
            DataValues.push({IsExerciseTestAllowed: 'yes'});
        } else {
            DataValues.push({IsExerciseTestAllowed: 'no'});
        }
        });
        
        cy.wait(1000).then(() => {
        jsonData['Zadanie'] = DataValues;
        cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
        DataValues = [];
        })
        
        cy.get('[onclick="history.back()"]').first().click().wait(1000)
      })
    })

     ////Projekt
     /*cy.get('tbody').find('tr').contains('Pro').then(edit => {
            cy.wrap(edit).parent().parent().parent().contains('Editovať').click()
        
      
      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        DataValues.push({taskOrder: value})
      });
      
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
      
        cy.get('[name="Assignment"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
          DataValues.push({Assignment: value})
        });
      
        cy.get('[name="SampleSolution"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
        DataValues.push({SampleSolution: value})
      });
      
      cy.get('[name="FileUploadIsMandatory"]').find('[type="checkbox"]').then((value) => {
      const isChecked = value.prop('checked');
      if (isChecked) {
          DataValues.push({FileUploadIsMandatory: 'yes'});
      } else {
          DataValues.push({FileUploadIsMandatory: 'no'});
      }
      });
      
      cy.get('[name="AnswerIsMandatory"]').find('[type="checkbox"]').then((value) => {
      const isChecked = value.prop('checked');
      if (isChecked) {
          DataValues.push({AnswerIsMandatory: 'yes'});
      } else {
          DataValues.push({AnswerIsMandatory: 'no'});
      }
      });
      
      cy.get('[name="IsExerciseTestAllowed"]').find('[type="checkbox"]').then((value) => {
      const isChecked = value.prop('checked');
      if (isChecked) {
          DataValues.push({IsExerciseTestAllowed: 'yes'});
      } else {
          DataValues.push({IsExerciseTestAllowed: 'no'});
      }
      });
      
      cy.wait(1000).then(() => {
      jsonData['Zadanie'] = DataValues;
      cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
      DataValues = [];
      })
      
      cy.get('[onclick="history.back()"]').first().click().wait(1000)
    })
  })*/


      ////Potvrdenie absolvovania
      cy.get('tbody').find('tr').contains('Pot').then(edit => {
        cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
          DataValues.push({taskOrder: value})
        });
  
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
            cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
            DataValues = [];
          })
  
          cy.get('[onclick="history.back()"]').first().click().wait(1000)

      ////Diskusia
      cy.get('tbody').find('tr').contains('Dis').then(edit => {
        cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

        cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
          DataValues.push({taskOrder: value})
        });
  
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
            jsonData['Diskusia'] = DataValues;
            cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
            DataValues = [];

            cy.get('[onclick="history.back()"]').first().click().wait(1000)
          })

      ////Cvičenie
    cy.get('tbody').find('tr').contains('Cvi').then(edit => {
      cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

      cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
        DataValues.push({taskOrder: value})
      });

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
          cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
          DataValues = [];

          cy.get('[onclick="history.back()"]').first().click().wait(1000)
        })

        //Checklist
        cy.get('tbody').find('tr').contains('Che').then(edit => {
          cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

          cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
            DataValues.push({taskOrder: value})
          });
    
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
    
            
            cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                DataValues.push({lecturerInternalMaterial: value})
            });
    
            
            cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                DataValues.push({studentInstruction: value})
            });
    
            
            cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                DataValues.push({Description: value})
            });
    
            cy.get('[id="TestQuestionsText"]').invoke('val').then((value) => {
                DataValues.push({Content: value})

                cy.wait(1000).then(() => {
          jsonData['Checklist'] = DataValues;
          cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
          DataValues = [];

          cy.get('[onclick="history.back()"]').first().click().wait(1000)
            })

        ////IQ test
            cy.get('tbody').find('tr').contains('IQ').then(edit => {
              cy.wrap(edit).parent().parent().parent().contains('Editovať').click();

              cy.get('[helpid="MetisAcademy.Core.Elearning.ViewModels.ExerciseEditViewModel.ExerciseOrder"]').next('span').invoke('text').then((value) => {
                DataValues.push({taskOrder: value})
              });
        
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
        
                
                cy.get('[name="lecturerInternalMaterial"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                    DataValues.push({lecturerInternalMaterial: value})
                });
        
                
                cy.get('[name="studentInstruction"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                    DataValues.push({studentInstruction: value})
                });
        
                
                cy.get('[name="Description"]').find('[class="note-editing-area"]').invoke('text').then((value) => {
                    DataValues.push({Description: value})
                });

                cy.get('[name="characteristicForm"]').find('input').then((value) => {
                  for (let x = 0; x < value.length; x++) {
                    cy.wrap(value[x]).invoke('val').then((dataVAL) => {
                      DataValues.push({characteristicForm: dataVAL})
                    })
                  }
                });

                cy.get('[name="exerciseTypeIQTestForm"]').find('tr').find('input').then((value) => {
                  for (let x = 0; x < value.length; x++) {
                    cy.wrap(value[x]).invoke('val').then((dataVAL) => {
                      DataValues.push({characteristicForm: dataVAL})
                    })
                  }
                });

                cy.get('[class="af-table table table-striped table-bordered table-hover"]').find('tr').find('input').then((value) => {
                  for (let x = 0; x < value.length; x++) {
                    cy.wrap(value[x]).invoke('val').then((dataVAL) => {
                      DataValues.push({characteristicFormA: dataVAL})
                    })
                  }
                });

                
                cy.get('[name="exerciseTypeIQTestForm"]').find('tr').find('select').then((value) => {
                  for (let x = 0; x < value.length; x++) {
                    cy.wrap(value).eq(x).invoke('val').then((dataVAL) => {
                      DataValues.push({personalityTestFormSel: dataVAL})
                    })
                  }
                })

                cy.wait(1000).then(() => {
                  jsonData['IQtest'] = DataValues;
                  cy.writeFile('cypress/fixtures/guarantor_content_checker.json', JSON.stringify(jsonData, null, 2))
            })
        })
      })
      
    })
  })
})
      })
    })
  })
})
})
})
})
