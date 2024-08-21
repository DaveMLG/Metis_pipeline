
// HODNOTENIE



//nove
let hodnotenieZoznam = [];
//aktualna array Hodnotenie
let currentHodnotenieZoznam = [];



//ziskanie dat y tabulky hodnotenie pred vypracovani ulohy
export const getHodnotenieZoznam = () => {
  return new Promise((resolve) => {
    cy.get('[title="Počet všetkých odovzdaných úloh ohodnotených uspokojivo"]').find('var').invoke('text').then((text) => {
        let uspokojivoNumberOfExercises = parseFloat(text);
        hodnotenieZoznam.push(uspokojivoNumberOfExercises);
      });
    
      cy.get('[title="Počet všetkých odovzdaných úloh ohodnotených dostatočne"]').find('var').invoke('text').then((text) => {
        let dostatocneNumberOfExercises = parseFloat(text);
        hodnotenieZoznam.push(dostatocneNumberOfExercises);
      });
    
      cy.get('[title="Počet všetkých odovzdaných úloh ohodnotených nedostatočne"]').find('var').invoke('text').then((text) => {
        let nedostatocneNumberOfExercises = parseFloat(text);
        hodnotenieZoznam.push(nedostatocneNumberOfExercises);
      });
      
      cy.then(() => resolve(hodnotenieZoznam));      
    });
     };




//ziskanie dat y tabulky hodnotenie po vypracovani ulohy
export const getCurrentHodnotenieZoznam = () => {
 //   cy.get('[title="PO predmet AAA_PT"]').parent().parent().find('img').click()
      cy.get('[title="Počet všetkých odovzdaných úloh ohodnotených uspokojivo"]').find('var').invoke('text').then((text) => {
          let uspokojivoNumberOfExercises = parseFloat(text);
          currentHodnotenieZoznam.push(uspokojivoNumberOfExercises);
        });
      
        cy.get('[title="Počet všetkých odovzdaných úloh ohodnotených dostatočne"]').find('var').invoke('text').then((text) => {
          let dostatocneNumberOfExercises = parseFloat(text);
          currentHodnotenieZoznam.push(dostatocneNumberOfExercises);
        });
      
        cy.get('[title="Počet všetkých odovzdaných úloh ohodnotených nedostatočne"]').find('var').invoke('text').then((text) => {
          let nedostatocneNumberOfExercises = parseFloat(text);
          currentHodnotenieZoznam.push(nedostatocneNumberOfExercises);
        });
        };
  



//porovna arrays v tabulke hodnotenie po vypracovani kazdej ulohy
export function compareHodnotenieZoznamAndCurrentHodnotenieZoznam(typUlohy) {
          cy.wait(1000)
            .then(() => {
              getCurrentHodnotenieZoznam();
            })
            .then(() => {
              cy.log('Predchadzajuce', hodnotenieZoznam);
              cy.log('Aktualne', currentHodnotenieZoznam);
        
              cy.get(typUlohy).parent().parent().parent().parent().then(($element) => {
                if ($element.find('.btn-hover').hasClass('green-bck')) {
                  expect(currentHodnotenieZoznam[0] > hodnotenieZoznam[0]).to.be.true;
                } else if ($element.find('.btn-hover').hasClass('orange-bck')) {
                  expect(currentHodnotenieZoznam[1] > hodnotenieZoznam[1]).to.be.true;
                } else if ($element.find('.btn-hover').hasClass('red-bck')) {
                  expect(currentHodnotenieZoznam[2] > hodnotenieZoznam[2]).to.be.true;
                } else {
                  cy.fail();
                }
              });

              cy.wait(500).then(() => {
                hodnotenieZoznam = [];
                currentHodnotenieZoznam = [];
              })

            });
        }
        







let jsonData = {};
let sucetMenovatelov = 0;
let sucetCitatelov = 0;
    

//ziskanie dat uloh a vypocet percent hodnotenie 1 student 
export function retrieveHodnotenieDataAndPushToJson() {
  cy.get('dashboard-exercise-list-item')
            .find('.icon')
            .find('span')
            .filter((index, element) => {
              const text = Cypress.$(element).text();
              return text.includes('Automatický test') || 
                     text.includes('Doplňovačka') || 
                     text.includes('Párovačka') || 
                     text.includes('Preklad') || 
                     text.includes('Otvorený test') || 
                     text.includes('Zadanie') || 
                     text.includes('Projekt');
            })
      
            .parent().parent().parent().find('.green-bck, .orange-bck, .red-bck').then((percentoBtn) => {
      for (let x = 0; x < percentoBtn.length; x++) {
        cy.wrap(percentoBtn[x]).then(($button) => {
          const successRate = $button.attr('success-rate');
              const percentage = parseFloat(successRate.replace('%', ''));
              const taskData = { percentoVypracovaniaUlohy: percentage };

              const buttonClass = percentoBtn[x].classList.item(2);
              taskData.buttonClass = buttonClass; 


              cy.wrap(percentoBtn[x]).parent().parent().parent().find('ma-xp').each(($span) => {
                  const text = $span.text();
                  const xpNumber = parseInt(text.match(/\d+/)[0], 10);
                  taskData.pocetXpBodov = xpNumber;

                  cy.wrap(percentoBtn[x]).parent().parent().parent().find('ma-difficulty').each(($span) => {
                      const difficultytext = $span.text().trim();
                      let difficultyNumber;
                  
                      const trimmedDifficultyText = difficultytext.substring(difficultytext.indexOf('Náročnosť') + 10).trim();
                      console.log(trimmedDifficultyText);

                  
                      if (trimmedDifficultyText === '1/3') {
                          difficultyNumber = 1;
                      } else if (trimmedDifficultyText === '2/3') {
                          difficultyNumber = 1.5;
                      } else if (trimmedDifficultyText === '3/3') {
                          difficultyNumber = 2;
                      }
                  
                      taskData.narocnost = difficultyNumber;
                 
                      
                      const menovatel = xpNumber * difficultyNumber;
                      taskData.menovatel = menovatel;
                      sucetMenovatelov += menovatel;

                      const citatel = Math.round(percentage / 100 * difficultyNumber * xpNumber);
                      taskData.citatel = citatel;
                      sucetCitatelov += citatel;


                      // Update jsonData for each task
                      jsonData['student1 - uloha ' + x] = [taskData];
                  });
              });
          });
      }
  });    

  //zapis dat do json    
  cy.wait(1000).then(() => {
    cy.writeFile('cypress/fixtures/metriky_hodnotenie_graf.json', JSON.stringify(jsonData, null, 2));
    cy.writeFile('cypress/fixtures/metriky_hodnotenie_graf_obaja_studenti.json', JSON.stringify(jsonData, null, 2));
})

}


//porovna percento nad grafom a percenta v grafe 1 student
export function compareCalculatedHodnotenieDataWithDataOnPortalStudent() {
        //porovnanie percenta nad grafom hodnotenie 1 student 
        cy.get('[title="Hodnotenie (moje) - Odovzdané a ohodnotené úlohy - berie hodnotenie najlepšieho odovzdania. Toto percento je hodnotením úloh, ktoré si odovzdal (nie percento, ktoré budeš mať uvedené na certifikáte). Systémové hodnotenie sa vzťahuje na čiastkové úlohy, a teda je pre nás iba podporným ukazovateľom pri celkovom hodnotení."]').invoke('text').then(($percentoNadGrafomHodnotenieStudentPM) => {
          const percentoNadGrafomHodnotenieStudentPM = parseInt($percentoNadGrafomHodnotenieStudentPM.match(/\d+/)[0]);

          const percentoNadGrafomHodnotenieStudentVypocet = Math.round(sucetCitatelov / sucetMenovatelov * 100)
          console.log(percentoNadGrafomHodnotenieStudentVypocet)

          expect(percentoNadGrafomHodnotenieStudentVypocet).to.equal(percentoNadGrafomHodnotenieStudentPM);
      })


      //zelene percento v grafe hodnotenie 1 student 
      cy.get('.ma-vertical-percent-bar-wrap').eq(1).find('ma-vertical-percent-bar').eq(1).then((grafHodnotenieStudent) => {
          cy.get(grafHodnotenieStudent).find('.green').invoke('attr', 'style').then((styleAttribute) => {
              const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
              const heightGreenPercentageStudent = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
              
              let totalMenovatelGreen = 0;

              Object.values(jsonData).forEach(tasks => {
                  tasks.forEach(task => {
                      if (task.buttonClass === "green-bck") {
                          totalMenovatelGreen += task.menovatel || 0;
                      }
                  });
              });
          
          const percentoGreenHodnotenieStudentVypocet = Math.round(totalMenovatelGreen / sucetMenovatelov * 100)
  
          expect(heightGreenPercentageStudent).to.equal(percentoGreenHodnotenieStudentVypocet);
         
  })
  })


  //oranzove percento v grafe hodnotenie 1 student 
  cy.get('.ma-vertical-percent-bar-wrap').eq(1).find('ma-vertical-percent-bar').eq(1).then((grafHodnotenieStudent) => {
      cy.get(grafHodnotenieStudent).find('.orange').invoke('attr', 'style').then((styleAttribute) => {
          const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
          const heightOrangePercentageStudent = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
          
          let totalMenovatelOrange = 0;

          Object.values(jsonData).forEach(tasks => {
              tasks.forEach(task => {
                  if (task.buttonClass === "orange-bck") {
                      totalMenovatelOrange += task.menovatel || 0;
                  }
              });
          });
      
      const percentoOrangeHodnotenieStudentVypocet = Math.round(totalMenovatelOrange / sucetMenovatelov * 100)

      expect(heightOrangePercentageStudent).to.equal(percentoOrangeHodnotenieStudentVypocet);
     
})
})


  //cervene percento v grafe hodnotenie 1 student 
  cy.get('.ma-vertical-percent-bar-wrap').eq(1).find('ma-vertical-percent-bar').eq(1).then((grafHodnotenieStudent) => {
      cy.get(grafHodnotenieStudent).find('.red').invoke('attr', 'style').then((styleAttribute) => {
          const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
          const heightRedPercentageStudent = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
          
          let totalMenovatelRed = 0;

          Object.values(jsonData).forEach(tasks => {
              tasks.forEach(task => {
                  if (task.buttonClass === "red-bck") {
                      totalMenovatelRed += task.menovatel || 0;
                  }
              });
          });
      
      const percentoRedHodnotenieStudentVypocet = Math.round(totalMenovatelRed / sucetMenovatelov * 100)

      expect(heightRedPercentageStudent).to.equal(percentoRedHodnotenieStudentVypocet);
     
})
})

}



let combinedJsonData = []
export function retrieveHodnotenieDataAndPushToJsonStudent2() {
  cy.get('dashboard-exercise-list-item')
            .find('.icon')
            .find('span')
            .filter((index, element) => {
              const text = Cypress.$(element).text();
              return text.includes('Automatický test') || 
                     text.includes('Doplňovačka') || 
                     text.includes('Párovačka') || 
                     text.includes('Preklad') || 
                     text.includes('Otvorený test') || 
                     text.includes('Zadanie') || 
                     text.includes('Projekt');
            })

            .parent().parent().parent().find('.green-bck, .orange-bck, .red-bck').then((percentoBtn) => {
              
                for (let x = 0; x < percentoBtn.length; x++) {
                  cy.wrap(percentoBtn[x]).then(($button) => {
                    const successRate = $button.attr('success-rate');
                        const percentage = parseFloat(successRate.replace('%', ''));
                        const taskData = { percentoVypracovaniaUlohy: percentage };
          
                        const buttonClass = percentoBtn[x].classList.item(2);
                        taskData.buttonClass = buttonClass; 
        
    
                        cy.wrap(percentoBtn[x]).parent().parent().parent().find('ma-xp').each(($span) => {
                            const text = $span.text();
                            const xpNumber = parseInt(text.match(/\d+/)[0], 10);
                            taskData.pocetXpBodov = xpNumber;
    
                            cy.wrap(percentoBtn[x]).parent().parent().parent().find('ma-difficulty').each(($span) => {
                                const difficultytext = $span.text().trim();
                                let difficultyNumber;
                            
                                const trimmedDifficultyText = difficultytext.substring(difficultytext.indexOf('Náročnosť') + 10).trim();
                                console.log(trimmedDifficultyText);

                            
                                if (trimmedDifficultyText === '1/3') {
                                    difficultyNumber = 1;
                                } else if (trimmedDifficultyText === '2/3') {
                                    difficultyNumber = 1.5;
                                } else if (trimmedDifficultyText === '3/3') {
                                    difficultyNumber = 2;
                                }
                            
                                taskData.narocnost = difficultyNumber;
                           
                                
                                const menovatel = xpNumber * difficultyNumber;
                                taskData.menovatel = menovatel;
                                sucetMenovatelov += menovatel;
    
                                const citatel = Math.round(percentage / 100 * difficultyNumber * xpNumber);
                                taskData.citatel = citatel;
                                sucetCitatelov += citatel;
    

                                // Update jsonData for each task
                                jsonData['student2 - uloha ' + x] = [taskData];
                                cy.writeFile('cypress/fixtures/metriky_hodnotenie_graf_student2.json', JSON.stringify(jsonData, null, 2));


                            });
                        });
                        
                    });

                }
              
            });    


            
            cy.fixture('metriky_hodnotenie_graf').then((jsonData) => {
              cy.fixture('metriky_hodnotenie_graf_student2').then((jsonData2) => {
                  combinedJsonData.push(jsonData)
                  combinedJsonData.push(jsonData2)

                  cy.writeFile('cypress/fixtures/metriky_hodnotenie_graf_obaja_studenti.json', JSON.stringify(combinedJsonData, null, 2))
                  cy.wait(1000)

                })
          })



}



let sucetVsetkychMenovatelov = 0;
let sucetVsetkychCitatelov = 0;

export function compareCalculatedHodnotenieDataWithDataOnPortalSkupina() {
cy.then(() => {
    
  const data = require('/cypress/fixtures/metriky_hodnotenie_graf_obaja_studenti.json');
  
  data.forEach(studentData => {
      Object.values(studentData).forEach(taskData => {
          taskData.forEach(task => {
              sucetVsetkychMenovatelov += task.menovatel;
              sucetVsetkychCitatelov += task.citatel;
          });
      });
  });
  
  console.log("Total Menovatel:", sucetVsetkychMenovatelov);
  console.log("Total Citatel:", sucetVsetkychCitatelov);
  
})


//porovnanie percenta nad grafom hodnotenie skupina 
cy.get('[title="Hodnotenie (Skupina) - Odovzdané a ohodnotené úlohy - berie hodnotenie najlepšieho odovzdania"]').invoke('text').then(($percentoNadGrafomHodnotenieSkupinaPM) => {
  const percentoNadGrafomHodnotenieSkupinaPM = parseInt($percentoNadGrafomHodnotenieSkupinaPM.match(/\d+/)[0]);

  const percentoNadGrafomHodnotenieSkupinaVypocet = Math.round(sucetVsetkychCitatelov / sucetVsetkychMenovatelov * 100)

  expect(percentoNadGrafomHodnotenieSkupinaVypocet).to.equal(percentoNadGrafomHodnotenieSkupinaPM);
})
  


//zelene percento v grafe hodnotenie skupina
cy.get('.ma-vertical-percent-bar-wrap').eq(1).find('ma-vertical-percent-bar').eq(0).then((grafHodnotenieSkupina) => {
  cy.get(grafHodnotenieSkupina).find('.green').invoke('attr', 'style').then((styleAttribute) => {
      const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
      const heightGreenPercentageSkupina = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
      
      let totalMenovatelGreen = 0;

      const data = require('/cypress/fixtures/metriky_hodnotenie_graf_obaja_studenti.json');

      data.forEach(studentData => {
          Object.values(studentData).forEach(taskData => {
              taskData.forEach(task => {
                  if (task.buttonClass === "green-bck") {
                      totalMenovatelGreen += task.menovatel || 0;
                  }
              });
          });
      });

      
  
  const percentoGreenHodnotenieSkupinaVypocet = Math.round(totalMenovatelGreen / sucetVsetkychMenovatelov * 100)

  expect(heightGreenPercentageSkupina).to.equal(percentoGreenHodnotenieSkupinaVypocet);
 
})
})


//oranzove percento v grafe hodnotenie skupina
cy.get('.ma-vertical-percent-bar-wrap').eq(1).find('ma-vertical-percent-bar').eq(0).then((grafHodnotenieSkupina) => {
  cy.get(grafHodnotenieSkupina).find('.orange').invoke('attr', 'style').then((styleAttribute) => {
      const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
      const heightOrangePercentageSkupina = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
      
      let totalMenovatelOrange = 0;

      const data = require('/cypress/fixtures/metriky_hodnotenie_graf_obaja_studenti.json');

      data.forEach(studentData => {
          Object.values(studentData).forEach(taskData => {
              taskData.forEach(task => {
                  if (task.buttonClass === "orange-bck") {
                      totalMenovatelOrange += task.menovatel || 0;
                  }
              });
          });
      });

  const percentoOrangeHodnotenieSkupinaVypocet = Math.round(totalMenovatelOrange / sucetVsetkychMenovatelov * 100)

  expect(heightOrangePercentageSkupina).to.equal(percentoOrangeHodnotenieSkupinaVypocet);

})
})


//cervene percento v grafe hodnotenie skupina
cy.get('.ma-vertical-percent-bar-wrap').eq(1).find('ma-vertical-percent-bar').eq(0).then((grafHodnotenieSkupina) => {
  cy.get(grafHodnotenieSkupina).find('.red').invoke('attr', 'style').then((styleAttribute) => {
      const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
      const heightRedPercentageSkupina = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
      
      let totalMenovatelRed = 0;

      const data = require('/cypress/fixtures/metriky_hodnotenie_graf_obaja_studenti.json');

      data.forEach(studentData => {
          Object.values(studentData).forEach(taskData => {
              taskData.forEach(task => {
                  if (task.buttonClass === "red-bck") {
                      totalMenovatelRed += task.menovatel || 0;
                  }
              });
          });
      });
  
  const percentoRedHodnotenieSkupinaVypocet = Math.round(totalMenovatelRed / sucetVsetkychMenovatelov * 100)

  expect(heightRedPercentageSkupina).to.equal(percentoRedHodnotenieSkupinaVypocet);

})
})

}









//DISCIPLINA
//povodna array Disciplina
let disciplinaZoznam = [];
//aktualna array Disciplina
let currentDisciplinaZoznam = [];

//ZOZNAM PRED VYPRACOVANIM
export const getDisciplinaZoznam = () => {
  return new Promise((resolve) => {
    cy.get('[title="Počet úloh odovzdaných načas"]').find('var').invoke('text').then((text) => {
        let NacasNumberOfExercises = parseFloat(text);
        disciplinaZoznam.push(NacasNumberOfExercises);
      });
    
      cy.get('[title="Počet úloh odovzdaných v termíne"]').find('var').invoke('text').then((text) => {
        let vTermineNumberOfExercises = parseFloat(text);
        disciplinaZoznam.push(vTermineNumberOfExercises);
      });
    
      cy.get('[title="Počet úloh odovzdaných po termíne"]').find('var').invoke('text').then((text) => {
        let poTermineNumberOfExercises = parseFloat(text);
        disciplinaZoznam.push(poTermineNumberOfExercises);
      });
      
      cy.then(() => resolve(disciplinaZoznam));      
    });
     };





//ZOZNAM PO VYPRACOVANI
export const getCurrentDisciplinaZoznam = () => {
  cy.get('[title="Počet úloh odovzdaných načas"]').find('var').invoke('text').then((text) => {
      let NacasNumberOfExercises = parseFloat(text);
      currentDisciplinaZoznam.push(NacasNumberOfExercises);
    });
  
    cy.get('[title="Počet úloh odovzdaných v termíne"]').find('var').invoke('text').then((text) => {
      let vTermineNumberOfExercises = parseFloat(text);
      currentDisciplinaZoznam.push(vTermineNumberOfExercises);
    });
  
    cy.get('[title="Počet úloh odovzdaných po termíne"]').find('var').invoke('text').then((text) => {
      let poTermineNumberOfExercises = parseFloat(text);
      currentDisciplinaZoznam.push(poTermineNumberOfExercises);
    });
    };



//porovna arrays v tabulke disciplina po vypracovani kazdej ulohy
export function compareDisciplinaZoznamAndCurrentDisciplinaZoznam(typUlohy) {
  //const typUlohy = cy.get('.nazov').invoke(text)
  console.log(typUlohy);
  //cy.get('.btn').contains('Späť na predmet').click();
 
  cy.wait(1000)
    .then(() => {
      getCurrentDisciplinaZoznam();
    })
    .then(() => {
      cy.log('Predchadzajuce', disciplinaZoznam);
      cy.log('Aktualne', currentDisciplinaZoznam);
 
 
      //
      let dostupnaOd, nacas, termin;
 
cy.get(typUlohy).parent().parent().find('var:contains("Dostupná od")').find('time').invoke('attr', 'datetime').then((datetime) => {
      dostupnaOd = new Date(datetime);
    });
 
 
cy.get(typUlohy).parent().parent().find('var:contains("Načas")').find('time').invoke('attr', 'datetime').then((datetime) => {
      nacas = new Date(datetime);
    });
 
 
cy.get(typUlohy).parent().parent().find('var:contains("Termín")').find('time').invoke('attr', 'datetime').then((datetime) => {
      termin = new Date(datetime);
    });
 
 
cy.then(() => {
  const today = new Date();
  console.log(today);
 
  cy.wrap({ dostupnaOd, nacas, termin }).then(({ dostupnaOd, nacas, termin }) => {
  if (dostupnaOd && nacas && termin) {
    if (dostupnaOd < today && today < nacas) {
      expect(currentDisciplinaZoznam[0] > disciplinaZoznam[0]).to.be.true;
    }  else if (dostupnaOd > today && today < nacas) {
        expect(currentDisciplinaZoznam[0] > disciplinaZoznam[0]).to.be.true;
    } else if (nacas < today && today < termin) {
      expect(currentDisciplinaZoznam[1] > disciplinaZoznam[1]).to.be.true;
    } else if (termin < today) {
      expect(currentDisciplinaZoznam[2] > disciplinaZoznam[2]).to.be.true;
    } else {
      cy.fail();
    }
  };
})
.then(() => {
 
      cy.wait(500).then(() => {
        disciplinaZoznam = [];
        currentDisciplinaZoznam = [];
      });
 
    });
   
  });
});
}


export function compareDisciplinaZoznamAndCurrentDisciplinaZoznamShouldBeTheSame(typUlohy) {
  //const typUlohy = cy.get('.nazov').invoke(text)
  console.log(typUlohy)
  //cy.get('.btn').contains('Späť na predmet').click();

  cy.wait(1000)
    .then(() => {
      getCurrentDisciplinaZoznam();
    })
    .then(() => {
      console.log('Predchadzajuce', disciplinaZoznam);
      console.log('Aktualne', currentDisciplinaZoznam);


      expect(currentDisciplinaZoznam[0]).to.equal(disciplinaZoznam[0]);
      expect(currentDisciplinaZoznam[1]).to.equal(disciplinaZoznam[1])
      expect(currentDisciplinaZoznam[2]).to.equal(disciplinaZoznam[2])

      cy.wait(500).then(() => {
        disciplinaZoznam = [];
        currentDisciplinaZoznam = [];
      })
    })
    
    
}




let jsonDataDisciplina = {};

export function retrieveDisciplinaDataAndPushToJsonStudentAndCompare() {
  let NacasNumberOfExercises, vTermineNumberOfExercises, poTermineNumberOfExercises;

  cy.get('[title="Počet úloh odovzdaných načas"]').find('var').invoke('text').then((text) => {
    NacasNumberOfExercises = parseFloat(text);
  });

  cy.get('[title="Počet úloh odovzdaných v termíne"]').find('var').invoke('text').then((text) => {
    vTermineNumberOfExercises = parseFloat(text);
  });

  cy.get('[title="Počet úloh odovzdaných po termíne"]').find('var').invoke('text').then((text) => {
    poTermineNumberOfExercises = parseFloat(text);
  }).then(() => {
    const sucetNumberOfExercises = NacasNumberOfExercises + vTermineNumberOfExercises + poTermineNumberOfExercises;
    console.log(sucetNumberOfExercises);
    
    let sucinNacasNumberOfExercises = NacasNumberOfExercises * 1
    let sucinvTermineNumberOfExercises = vTermineNumberOfExercises * 0.5
    let sucinpoTermineNumberOfExercises = poTermineNumberOfExercises * 0
    let sucetSucinNumberOfExercises = sucinNacasNumberOfExercises + sucinvTermineNumberOfExercises + sucinpoTermineNumberOfExercises
  
    let percentoNadGrafomDisciplinaStudent = Math.round(sucetSucinNumberOfExercises / sucetNumberOfExercises * 100)
  
    //vypocet percenta nad grafom disciplina student
    cy.get('[title="Termín (Ja) - Odovzdané úlohy - berie termín posledného odovzdania"]').invoke('text').then(($percentoNadGrafomDisciplinaStudentPM) => {
      const percentoNadGrafomDisciplinaStudentPM = parseInt($percentoNadGrafomDisciplinaStudentPM.match(/\d+/)[0]);
  
    cy.wait(1000).then(() => {
          
    expect(percentoNadGrafomDisciplinaStudent).to.equal(percentoNadGrafomDisciplinaStudentPM);

  

  })
    })


    //zelene percento v grafe disciplina 1 student
    cy.get('.ma-vertical-percent-bar-wrap').eq(0).find('ma-vertical-percent-bar').eq(0).then((grafDisciplinaSkupina) => {
      cy.get(grafDisciplinaSkupina).find('.green').invoke('attr', 'style').then((styleAttribute) => {
          const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
          const heightGreenPercentageStudent = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
          expect(heightGreenPercentageStudent).to.equal(Math.round(NacasNumberOfExercises / sucetNumberOfExercises * 100));
        }); 
      });



    //oranzove percento v grafe disciplina 1 student
    cy.get('.ma-vertical-percent-bar-wrap').eq(0).find('ma-vertical-percent-bar').eq(0).then((grafDisciplinaSkupina) => {
      cy.get(grafDisciplinaSkupina).find('.orange').invoke('attr', 'style').then((styleAttribute) => {
          const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
          const heightOrangePercentageStudent = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
          expect(heightOrangePercentageStudent).to.equal(Math.round(vTermineNumberOfExercises / sucetNumberOfExercises * 100));
        }); 
      });

    //cervene percento v grafe disciplina 1 student
    cy.get('.ma-vertical-percent-bar-wrap').eq(0).find('ma-vertical-percent-bar').eq(0).then((grafDisciplinaSkupina) => {
      cy.get(grafDisciplinaSkupina).find('.red').invoke('attr', 'style').then((styleAttribute) => {
          const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
          const heightRedPercentageStudent = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
          expect(heightRedPercentageStudent).to.equal(Math.round(poTermineNumberOfExercises / sucetNumberOfExercises * 100));
        }); 
      });


    cy.wait(500).then(() => {
    const taskData = { NacasNumberOfExercises: NacasNumberOfExercises };
    taskData.vTermineNumberOfExercises = vTermineNumberOfExercises
    taskData.poTermineNumberOfExercises = poTermineNumberOfExercises

    // Update jsonData for each task
    jsonDataDisciplina['student1'] = [taskData];
    cy.writeFile('cypress/fixtures/metriky_disciplina_graf.json', JSON.stringify(jsonDataDisciplina, null, 2));
    })


    });
    
}


let combinedJsonDataDisciplina = []

export function retrieveDisciplinaDataAndPushToJsonStudent2AndCompare() {
  let NacasNumberOfExercises, vTermineNumberOfExercises, poTermineNumberOfExercises;

  cy.get('[title="Počet úloh odovzdaných načas"]').find('var').invoke('text').then((text) => {
    NacasNumberOfExercises = parseFloat(text);
  });

  cy.get('[title="Počet úloh odovzdaných v termíne"]').find('var').invoke('text').then((text) => {
    vTermineNumberOfExercises = parseFloat(text);
  });

  cy.get('[title="Počet úloh odovzdaných po termíne"]').find('var').invoke('text').then((text) => {
    poTermineNumberOfExercises = parseFloat(text);
  }).then(() => {
    const sucetNumberOfExercises = NacasNumberOfExercises + vTermineNumberOfExercises + poTermineNumberOfExercises;
    console.log(sucetNumberOfExercises);
    
    let sucinNacasNumberOfExercises = NacasNumberOfExercises * 1
    let sucinvTermineNumberOfExercises = vTermineNumberOfExercises * 0.5
    let sucinpoTermineNumberOfExercises = poTermineNumberOfExercises * 0
    let sucetSucinNumberOfExercises = sucinNacasNumberOfExercises + sucinvTermineNumberOfExercises + sucinpoTermineNumberOfExercises
  
    let percentoNadGrafomDisciplinaStudent = Math.round(sucetSucinNumberOfExercises / sucetNumberOfExercises * 100)
  
    //vypocet percenta nad grafom disciplina student
    cy.get('[title="Termín (Ja) - Odovzdané úlohy - berie termín posledného odovzdania"]').invoke('text').then(($percentoNadGrafomDisciplinaStudentPM) => {
      const percentoNadGrafomDisciplinaStudentPM = parseInt($percentoNadGrafomDisciplinaStudentPM.match(/\d+/)[0]);
  
    cy.wait(1000).then(() => {
          
    expect(percentoNadGrafomDisciplinaStudent).to.equal(Math.round(percentoNadGrafomDisciplinaStudentPM));

  

  })
    })


    //zelene percento v grafe disciplina 1 student
    cy.get('.ma-vertical-percent-bar-wrap').eq(0).find('ma-vertical-percent-bar').eq(0).then((grafDisciplinaSkupina) => {
      cy.get(grafDisciplinaSkupina).find('.green').invoke('attr', 'style').then((styleAttribute) => {
          const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
          const heightGreenPercentageStudent = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
          expect(heightGreenPercentageStudent).to.equal(Math.round(NacasNumberOfExercises / sucetNumberOfExercises * 100));
        }); 
      });



    //oranzove percento v grafe disciplina 1 student
    cy.get('.ma-vertical-percent-bar-wrap').eq(0).find('ma-vertical-percent-bar').eq(0).then((grafDisciplinaSkupina) => {
      cy.get(grafDisciplinaSkupina).find('.orange').invoke('attr', 'style').then((styleAttribute) => {
          const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
          const heightOrangePercentageStudent = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
          expect(heightOrangePercentageStudent).to.equal(Math.round(vTermineNumberOfExercises / sucetNumberOfExercises * 100));
        }); 
      });

    //cervene percento v grafe disciplina 1 student
    cy.get('.ma-vertical-percent-bar-wrap').eq(0).find('ma-vertical-percent-bar').eq(0).then((grafDisciplinaSkupina) => {
      cy.get(grafDisciplinaSkupina).find('.red').invoke('attr', 'style').then((styleAttribute) => {
          const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
          const heightRedPercentageStudent = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
          expect(heightRedPercentageStudent).to.equal(Math.round(poTermineNumberOfExercises / sucetNumberOfExercises * 100));
        }); 
      });


    cy.wait(500).then(() => {
    const taskData = { NacasNumberOfExercises: NacasNumberOfExercises };
    taskData.vTermineNumberOfExercises = vTermineNumberOfExercises
    taskData.poTermineNumberOfExercises = poTermineNumberOfExercises

    // Update jsonData for each task
    jsonDataDisciplina['student2'] = [taskData];
    cy.writeFile('cypress/fixtures/metriky_disciplina_graf_student2.json', JSON.stringify(jsonDataDisciplina, null, 2));
    })

    });


    cy.fixture('metriky_disciplina_graf').then((jsonDataDisciplina) => {
      cy.fixture('metriky_disciplina_graf_student2').then((jsonDataDisciplina2) => {
        combinedJsonDataDisciplina.push(jsonDataDisciplina)
        combinedJsonDataDisciplina.push(jsonDataDisciplina2)

          cy.writeFile('cypress/fixtures/metriky_disciplina_graf_obaja_studenti.json', JSON.stringify(combinedJsonDataDisciplina, null, 2))
          cy.wait(1000)

        })
  })




    
}



export function compareCalculatedDisciplinaDataWithDataOnPortalSkupina() {
  let NacasNumberOfExercisesGroup = 0;
  let vTermineNumberOfExercisesGroup = 0;
  let poTermineNumberOfExercisesGroup = 0;
  let sucetNumberOfExercisesGroup 

  cy.then(() => {
    const data = require('/cypress/fixtures/metriky_disciplina_graf_obaja_studenti.json');

    data.forEach(studentData => {
      Object.values(studentData).forEach(taskData => {
        taskData.forEach(task => {
          NacasNumberOfExercisesGroup += task.NacasNumberOfExercises;
          vTermineNumberOfExercisesGroup += task.vTermineNumberOfExercises;
          poTermineNumberOfExercisesGroup += task.poTermineNumberOfExercises;
        });
      });
    });

    sucetNumberOfExercisesGroup = NacasNumberOfExercisesGroup + vTermineNumberOfExercisesGroup + poTermineNumberOfExercisesGroup;
    
    let sucinNacasNumberOfExercisesGroup = NacasNumberOfExercisesGroup * 1
    let sucinvTermineNumberOfExercisesGroup = vTermineNumberOfExercisesGroup * 0.5
    let sucinpoTermineNumberOfExercisesGroup = poTermineNumberOfExercisesGroup * 0
    let sucetSucinNumberOfExercisesGroup = sucinNacasNumberOfExercisesGroup + sucinvTermineNumberOfExercisesGroup + sucinpoTermineNumberOfExercisesGroup

    console.log(sucetSucinNumberOfExercisesGroup)

    console.log(sucetNumberOfExercisesGroup)

    let percentoNadGrafomDisciplinaSkupina = Math.round((sucetSucinNumberOfExercisesGroup / sucetNumberOfExercisesGroup) * 100)


    //vypocet percenta nad grafom disciplina skupina
    cy.get('[title="Termín (Skupinový priemer) - Odovzdané úlohy - berie termín posledného odovzdania"]').invoke('text').then(($percentoNadGrafomDisciplinaSkupinaPM) => {
      const percentoNadGrafomDisciplinaSkupinaPM = parseInt($percentoNadGrafomDisciplinaSkupinaPM.match(/\d+/)[0]);
    
    cy.wait(1000).then(() => {
          
    expect(percentoNadGrafomDisciplinaSkupina).to.equal(percentoNadGrafomDisciplinaSkupinaPM);
  });
  });
  });

  
    
  //zelene percento v grafe disciplina skupina
  cy.get('.ma-vertical-percent-bar-wrap').eq(0).find('ma-vertical-percent-bar').eq(1).then((grafDisciplinaSkupina) => {
    cy.get(grafDisciplinaSkupina).find('.green').invoke('attr', 'style').then((styleAttribute) => {
        const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
        const heightGreenPercentageSkupina = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
     
        let totalMenovatelGreen = 0;
          const data = require('/cypress/fixtures/metriky_disciplina_graf_obaja_studenti.json');
          data.forEach(studentData => {
            Object.values(studentData).forEach(taskData => {
                taskData.forEach(task => {
                    totalMenovatelGreen += task.NacasNumberOfExercises || 0;
                });
            });
        });
       
  
    const percentoGreenDisciplinaSkupinaVypocet = Math.round(totalMenovatelGreen / sucetNumberOfExercisesGroup * 100)
      expect(heightGreenPercentageSkupina).to.equal(percentoGreenDisciplinaSkupinaVypocet);
  
  })
  })
  
  
  //oranzove percento v grafe disciplina skupina
  cy.get('.ma-vertical-percent-bar-wrap').eq(0).find('ma-vertical-percent-bar').eq(1).then((grafDisciplinaSkupina) => {
    cy.get(grafDisciplinaSkupina).find('.orange').invoke('attr', 'style').then((styleAttribute) => {
        const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
        const heightOrangePercentageSkupina = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
     
        let totalMenovatelOrange = 0;
          const data = require('/cypress/fixtures/metriky_disciplina_graf_obaja_studenti.json');
          data.forEach(studentData => {
            Object.values(studentData).forEach(taskData => {
                taskData.forEach(task => {
                    totalMenovatelOrange += task.vTermineNumberOfExercises || 0;
                });
            });
        });
       
  
    const percentoOrangeDisciplinaSkupinaVypocet = Math.round(totalMenovatelOrange / sucetNumberOfExercisesGroup * 100)
      expect(heightOrangePercentageSkupina).to.equal(percentoOrangeDisciplinaSkupinaVypocet);
  
  })
  })
    
  //cervene percento v grafe hodnotenie skupina
  cy.get('.ma-vertical-percent-bar-wrap').eq(0).find('ma-vertical-percent-bar').eq(1).then((grafDisciplinaSkupina) => {
    cy.get(grafDisciplinaSkupina).find('.red').invoke('attr', 'style').then((styleAttribute) => {
        const heightMatch = /height:\s*([\d.]+)%/.exec(styleAttribute);
        const heightRedPercentageSkupina = heightMatch ? Math.round(parseFloat(heightMatch[1])) : null;
     
        let totalMenovatelRed = 0;
          const data = require('/cypress/fixtures/metriky_disciplina_graf_obaja_studenti.json');
          data.forEach(studentData => {
            Object.values(studentData).forEach(taskData => {
                taskData.forEach(task => {
                    totalMenovatelRed += task.poTermineNumberOfExercises || 0;
                });
            });
        });
       
  
    const percentoRedDisciplinaSkupinaVypocet = Math.round(totalMenovatelRed / sucetNumberOfExercisesGroup * 100)
      expect(heightRedPercentageSkupina).to.equal(percentoRedDisciplinaSkupinaVypocet);
  
  })
  })
  
  }
  
