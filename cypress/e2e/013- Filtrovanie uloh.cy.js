describe('Student', function() {

  beforeEach(() => {
  
  cy.loginStudent(Cypress.env('loginStudent1'), Cypress.env('password'));
  cy.viewport(1920, 937)
  cy.visit('https://dev.metis.academy/portal/welcome/subject?type=subject')
  cy.get('[title="PO predmet AAA_PT"]').parent().parent().find('img').click()


  
  })
  




it('Filtrovanie úloh podľa filtra Typ úlohy', function() {
  cy.wait(1000)
  cy.get('.icon').find('[title="Typ úlohy"]').click()

  

  function verifyExercise(title) {
      cy.get('.icon').find(`[title="${title}"]`).click();
      cy.get('.ulohy').then((kontrola1) => {
      if (kontrola1.find('dashboard-exercise-list-item').length > 0) {
          cy.get('.col-sm-1').each(($span) => {
          const text = $span.text();
          expect(text).to.contain(title);
          });
      } else {
          cy.log('Skipping code block as no exercises were found');
      }
      });
      cy.get('.icon').find(`[title="${title}"]`).click();
  }

  

  const exercises = ["Samoštúdium","Projekt","Webinár","Automatický test","Doplňovačka","Otvorený test","Zadanie",
      "Cvičenie","Párovačka","Preferenčný test","Preklad","Anketa","Spätná väzba","Osobnostný test","IQ test",
      "Spoločná práca s lektorom","Videosamoštúdium","Diskusia","Potvrdenie absolvovania","Checklist"];
   
      
    for (let i = 0; i < exercises.length; i++) {
      verifyExercise(exercises[i]);
    }

  
    cy.wait(2000)


    function randomVerifyExercise(title) {
      cy.get('.icon').find(`[title="${title}"]`).click();
      cy.get('.ulohy').then((kontrola1) => {
          if (kontrola1.find('dashboard-exercise-list-item').length > 0) {
              cy.get('.col-sm-1').each(($span) => {
                  const text = $span.text();
                  expect(text).to.satisfy((value) => selectedTitles.includes(value));
              });
              cy.wait(500)
          } else {
              cy.log('Skipping code block as no exercises were found');
          }
      });
  }

      const selectedTitles = [];

      while (selectedTitles.length < 3) {
          const randomIndex = Math.floor(Math.random() * exercises.length);
          const randomTitle = exercises[randomIndex];
          console.log(selectedTitles)

          if (!selectedTitles.includes(randomTitle)) {
              selectedTitles.push(randomTitle);
          }
      }

      cy.wrap(selectedTitles).each((title) => {
          randomVerifyExercise(title);
      }).then(() => {
          cy.get('.col-sm-1').each(($span) => {
              const text = $span.text();
              expect(text).to.satisfy((value) => selectedTitles.includes(value));
          });
      });

});


it('Filtrovanie úloh podľa filtra Náročnosť', function() {
  cy.wait(1000)
  cy.get('.icon').find('[title="Náročnosť"]').click()
  
  //filtruje a skontroluje Nízku náročnosť
  cy.get('.icon').find('[title="Nízka náročnosť"]').click()
  cy.get('.ulohy').then((kontrola1) => {
      if (kontrola1.find('dashboard-exercise-list-item').length > 0) {
          cy.get('ma-difficulty').each(($span) => {
          const text = $span.text();
          expect(text).to.contain("1/3");
        });
      } else {
        cy.log('Skipping code block as no ma-difficulty elements found');
      }
    });

    
  //filtruje a skontroluje Strednú náročnosť
  cy.get('.icon').find('[title="Nízka náročnosť"]').click()
  cy.get('.icon').find('[title="Stredná náročnosť"]').click()
  cy.get('.ulohy').then((kontrola2) => {
      if (kontrola2.find('dashboard-exercise-list-item').length > 0) {
          cy.get('ma-difficulty').each(($span) => {
          const text = $span.text();
          expect(text).to.contain("2/3");
        });
      } else {
        cy.log('Skipping code block as no ma-difficulty elements found');
      }
    });
    
    
    
    
  
  //filtruje a skontroluje Vysokú náročnosť
  cy.get('.icon').find('[title="Stredná náročnosť"]').click()
  cy.get('.icon').find('[title="Vysoká náročnosť"]').click()
  cy.get('.ulohy').then((kontrola3) => {
      if (kontrola3.find('dashboard-exercise-list-item').length > 0) {
          cy.get('ma-difficulty').each(($span) => {
          const text = $span.text();
          expect(text).to.contain("3/3");
        });
      } else {
        cy.log('Skipping code block as no ma-difficulty elements found');
      }
    });
    

  //filtruje a skontroluje 2 filtre - vysoku (line 59) a strednu
  cy.get('.icon').find('[title="Stredná náročnosť"]').click()
    cy.get('.ulohy').then((kontrola1) => {
        if (kontrola1.find('dashboard-exercise-list-item').length > 0) {
            cy.get('ma-difficulty').each(($span) => {
            const text = $span.text();
            expect(text).to.satisfy((content) => {
              return content.includes("2/3") || content.includes("3/3")
            });
          });
        } else {
          cy.log('Skipping code block as no ma-difficulty elements found');
        }
      });


})



it('Filtrovanie úloh podľa filtra Trvanie v minútach', function() {
  
  cy.wait(1000)
  cy.get('.icon').find('[title="Trvanie v minútach"]').click()
  
  for (let i = 0; i < 5; i++) {
      cy.get('.ngx-slider-pointer-max').type('{rightarrow}'); 
    } 

  for (let i = 0; i < 10; i++) {
      cy.get('.ngx-slider-pointer-min').type('{leftarrow}'); 
    }
  
  cy.wait(1000)

         
      
   //kontrola funkcie filtru   
  function kontrola1(numberOd) {
    cy.get('.ulohy').then((kontrola1) => {
      if (kontrola1.children().find('dashboard-exercise-list-item').length > 0) {
        cy.get('ma-length').each(($span) => {
          const text = $span.text();
          const totalMinutes = calculateTotalMinutes(text);
          console.log(`Time: ${text}, Total Minutes: ${totalMinutes}`);
          expect(totalMinutes).to.be.gte(numberOd);
        });
      } else {
        cy.log('Skipping code block as no ma-length elements found');
      }
    });
  }
  //ziskanie poctu minut
  cy.get('.ngx-slider-model-value').then((element1) => {
    const textOd = element1.text();
    const numberOd = parseInt(textOd.match(/\d+/)[0], 10);
    console.log(numberOd);
    kontrola1(numberOd);
  });
  
  // casovy format
  function calculateTotalMinutes(timeString) {
    const timeRegex = /(\d+)h\s?(\d+)m/; 
    const matches = timeString.match(timeRegex);
  
    let hours = 0;
    let minutes = 0;
  
    if (matches) {
      hours = parseInt(matches[1], 10);
      minutes = parseInt(matches[2], 10);
    }
  
    const totalMinutes = hours * 60 + minutes;
    return totalMinutes;
  }
  
      // DRUHE CISLO
      //kontrola funkcie filtru   
      function kontrola2(numberDo) {
        cy.get('.ulohy').then((kontrola2) => {
          if (kontrola2.children().find('dashboard-exercise-list-item').length > 0) {
            cy.get('ma-length').each(($span) => {
              const text = $span.text();
              const totalMinutes = calculateTotalMinutes(text);
              console.log(`Time: ${text}, Total Minutes: ${totalMinutes}`);
              expect(totalMinutes).to.be.lte(numberDo);
            });
          } else {
            cy.log('Skipping code block as no ma-length elements found');
          }
        });
      }

      //ziskanie poctu minut
        cy.get('.ngx-slider-model-high').then((element2) => {
        const textDo = element2.text();
        const numberDo = parseInt(textDo.match(/\d+/)[0], 10);
        console.log(numberDo);
        kontrola2(numberDo);
      });
      


      
});



it('Filtrovanie úloh podľa filtra XP body', function() {
  
  cy.wait(1000)
  cy.get('.icon').find('[title="XP body"]').click()
  cy.wait(500)
  


  //toto funguje ale treba lepsie riesnie z dovodu ze slider ma vacsie min-max values
  for (let i = 0; i < 10; i++) {
      cy.get('.ngx-slider-pointer-max').type('{rightarrow}'); 
    } 

  for (let i = 0; i < 10; i++) {
      cy.get('.ngx-slider-pointer-min').type('{rightarrow}'); 
    }

  

    //kontrola funkcie filtru   
    function kontrola1(numberOd) {
      cy.get('.ulohy').then((kontrola1) => {
        if (kontrola1.children().find('dashboard-exercise-list-item').length > 0) {
          cy.get('ma-xp').each(($span) => {
            const text = $span.text();
            const xpNumber = parseInt(text.match(/\d+/)[0], 10); 
            expect(xpNumber).to.be.gte(numberOd);
          });
        } else {
          cy.log('Skipping code block as no ma-xp elements found');
        }
      });
    }
    
    //ziskanie poctu XP bodov
    cy.get('.ngx-slider-model-value').then((element1) => {
      const textOd = element1.text();
      const numberOd = parseInt(textOd.match(/\d+/)[0], 10); 
      console.log(numberOd);
      kontrola1(numberOd);
    });
    
  
  
  
      // DRUHE CISLO
      //kontrola funkcie filtru   
      function kontrola2(numberDo) {
        cy.get('.ulohy').then((kontrola2) => {
          if (kontrola2.children().find('dashboard-exercise-list-item').length > 0) {
            cy.get('ma-xp').each(($span) => {
              const text = $span.text();
              const xpNumber = parseInt(text.match(/\d+/)[0], 10); 
              expect(xpNumber).to.be.lte(numberDo);
            });
          } else {
            cy.log('Skipping code block as no ma-xp elements found');
          }
        });
      }

      //ziskanie  poctu XP bodov
        cy.get('.ngx-slider-model-high').then((element2) => {
        const textDo = element2.text();
        const numberDo = parseInt(textDo.match(/\d+/)[0], 10);
        console.log(numberDo);
        kontrola2(numberDo);
      });
});


it('Filtrovanie úloh podľa filtra Dostupný od', function() {
  
  cy.wait(1000)
  cy.get('.icon').find('[title="Dostupný od"]').click()
  
  cy.get('.ngx-slider-pointer-min').type('{rightarrow}'); 
  cy.wait(1000)
  cy.get('.ngx-slider-pointer-max').type('{pagedown}'); 
  


  verifyExercises()
                   
  function verifyExercises() {
    let numberOd;
    let numberDo;
  
    cy.get('.ulohy').then((kontrola1) => {
      if (kontrola1.find('dashboard-exercise-list-item').length > 0) {
        //ziskanie poctu minut MIN
        cy.get('.ngx-slider-model-value').then((element1) => {
          const textOd = element1.text().replace('Od:', '').trim();
          numberOd = convertToNewFormat(textOd);
          console.log(numberOd);
        });
  
        //ziskanie poctu minut MAX 
        cy.get('.ngx-slider-model-high').then((element2) => {
          const textDo = element2.text().replace('Do:', '').trim();
          numberDo = convertToNewFormat(textDo);
          console.log(numberDo);
        });
  
        cy.get(kontrola1).find('dashboard-exercise-list-item').each((element) => {
          cy.wrap(element).find('.nazov-fade[title]').invoke('text').then((nazovText) => {
            cy.log(nazovText);
          });
  
          cy.wrap(element).find('var:contains("Dostupná od")').find('time').then((casElement3) => {
            cy.wrap(casElement3)
              .invoke('attr', 'datetime')
              .then((exerciseAvailability) => {
                if (exerciseAvailability) {
                  const convertedNumberOd = new Date(numberOd);
                  const convertedNumberDo = new Date(numberDo);
                  console.log(exerciseAvailability);
                  expect(new Date(exerciseAvailability)).to.be.greaterThan(convertedNumberOd);
                  expect(new Date(exerciseAvailability)).to.be.lessThan(convertedNumberDo);
                } else {
                  cy.log('Exercise availability datetime attribute is not found');
                  console.log(exerciseAvailability);

                }
              });
          
            cy.wait(500);
          });
          
        });
  
      } else {
        cy.log('Skipping code block as no exercises were found');
      }
    });
  }
  
  function convertToNewFormat(dateString) {
    const [day, month, year, hour] = dateString.match(/\d+/g);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[parseInt(month) - 1];
    const formattedDate = new Date(`${monthName} ${day}, ${year} ${hour}:00:00 GMT`).toUTCString();
  
    return formattedDate;
  }
       
})


it('Filtrovanie úloh podľa filtra Načas', function() {
  
  cy.viewport(1920, 937)
  cy.wait(1000)
  cy.get('.icon').find('[title="Načas"]').click()
  
  cy.get('.ngx-slider-pointer-min').type('{rightarrow}'); 
  cy.wait(1000)
  cy.get('.ngx-slider-pointer-max').type('{pagedown}'); 
  


  verifyExercises()
                   
  function verifyExercises() {
    let numberOd;
    let numberDo;
  
    cy.get('.ulohy').then((kontrola1) => {
      if (kontrola1.find('dashboard-exercise-list-item').length > 0) {
        //ziskanie poctu minut MIN
        cy.get('.ngx-slider-model-value').then((element1) => {
          const textOd = element1.text().replace('Od:', '').trim();
          numberOd = convertToNewFormat(textOd);
          console.log(numberOd);
        });
  
        //ziskanie poctu minut MAX 
        cy.get('.ngx-slider-model-high').then((element2) => {
          const textDo = element2.text().replace('Do:', '').trim();
          numberDo = convertToNewFormat(textDo);
          console.log(numberDo);
        });
  
        cy.get(kontrola1).find('dashboard-exercise-list-item').each((element) => {
          cy.wrap(element).find('.nazov-fade[title]').invoke('text').then((nazovText) => {
            cy.log(nazovText);
          });
  
          cy.wrap(element).find('var:contains("Načas")').find('time').then((casElement3) => {
            cy.wrap(casElement3)
              .invoke('attr', 'datetime')
              .then((exerciseAvailability) => {
                if (exerciseAvailability) {
                  const convertedNumberOd = new Date(numberOd);
                  const convertedNumberDo = new Date(numberDo);
                  console.log(exerciseAvailability);
                  expect(new Date(exerciseAvailability)).to.be.greaterThan(convertedNumberOd);
                  expect(new Date(exerciseAvailability)).to.be.lessThan(convertedNumberDo);
                } else {
                  cy.log('Exercise availability datetime attribute is not found');
                  console.log(exerciseAvailability);

                }
              });
          
            cy.wait(500);
          });
          
        });
  
      } else {
        cy.log('Skipping code block as no exercises were found');
      }
    });
  }
  
  function convertToNewFormat(dateString) {
    const [day, month, year, hour] = dateString.match(/\d+/g);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[parseInt(month) - 1];
    const formattedDate = new Date(`${monthName} ${day}, ${year} ${hour}:00:00 GMT`).toUTCString();
  
    return formattedDate;
  }
  
})


it('Filtrovanie úloh podľa filtra V termíne', function() {
  
  cy.wait(1000)
  cy.get('.icon').find('[title="V termíne"]').click()
  
  cy.get('.ngx-slider-pointer-min').type('{rightarrow}'); 
  cy.wait(1000)
  cy.get('.ngx-slider-pointer-max').type('{pagedown}'); 
  


  verifyExercises()
                   
  function verifyExercises() {
    let numberOd;
    let numberDo;
  
    cy.get('.ulohy').then((kontrola1) => {
      if (kontrola1.find('dashboard-exercise-list-item').length > 0) {
        //ziskanie poctu minut MIN
        cy.get('.ngx-slider-model-value').then((element1) => {
          const textOd = element1.text().replace('Od:', '').trim();
          numberOd = convertToNewFormat(textOd);
          console.log(numberOd);
        });
  
        //ziskanie poctu minut MAX 
        cy.get('.ngx-slider-model-high').then((element2) => {
          const textDo = element2.text().replace('Do:', '').trim();
          numberDo = convertToNewFormat(textDo);
          console.log(numberDo);
        });
  
        cy.get(kontrola1).find('dashboard-exercise-list-item').each((element) => {
          cy.wrap(element).find('.nazov-fade[title]').invoke('text').then((nazovText) => {
            cy.log(nazovText);
          });
  
          cy.wrap(element).find('var:contains("Termín")').find('time').then((casElement3) => {
            cy.wrap(casElement3)
              .invoke('attr', 'datetime')
              .then((exerciseAvailability) => {
                if (exerciseAvailability) {
                  const convertedNumberOd = new Date(numberOd);
                  const convertedNumberDo = new Date(numberDo);
                  console.log(exerciseAvailability);
                  expect(new Date(exerciseAvailability)).to.be.greaterThan(convertedNumberOd);
                  expect(new Date(exerciseAvailability)).to.be.lessThan(convertedNumberDo);
                } else {
                  cy.log('Exercise availability datetime attribute is not found');
                  console.log(exerciseAvailability);

                }
              });
          
            cy.wait(500);
          });
          
        });
  
      } else {
        cy.log('Skipping code block as no exercises were found');
      }
    });
  }
  
  function convertToNewFormat(dateString) {
    const [day, month, year, hour] = dateString.match(/\d+/g);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[parseInt(month) - 1];
    const formattedDate = new Date(`${monthName} ${day}, ${year} ${hour}:00:00 GMT`).toUTCString();
  
    return formattedDate;
  }
   
})


it.skip('Filtrovanie úloh podľa filtra Disciplína', function() {
  
  cy.wait(1000)
  cy.get('.icon').find('[title="Disciplína"]').click()
  
  //prvy filter
  cy.get('.icon-172').click()
  //ziskat atribut style kliknutim
  cy.get('.icon-171').click()
  cy.get('.icon-173').click()
  cy.wait(1000)
  cy.get('.icon-171').click()
  cy.get('.icon-173').click()

  verifyExercises()    
  
  //druhy filter
  cy.get('.icon-172').click()
  cy.get('.icon-171').click()
  verifyExercises()
  
  //treti filter
  cy.get('.icon-171').click()
  cy.get('.icon-173').click()
  verifyExercises()






//funkcia

function verifyExercises() {
const currentDate = new Date();

cy.get('.ulohy').then((kontrola1) => {
  if (kontrola1.find('dashboard-exercise-list-item').length > 0) {
    cy.get(kontrola1).find('dashboard-exercise-list-item').each((element) => {
      
      cy.wrap(element).find('.nazov-fade[title]').invoke('text').then(nazovText => {
      cy.log(nazovText);
      });



      cy.wrap(element).find('var:contains("Dostupná od")').then((casElement3) => {
        cy.wrap(casElement3).invoke('text').then((time3) => {
          const exerciseAvailability = convertToDate(time3.replace('Dostupná od', '').trim());

          cy.wrap(element).find('var:contains("Načas")').then((casElement2) => {
            cy.wrap(casElement2).invoke('text').then((time2) => {
              const exerciseTime = convertToDate(time2.replace('Načas', '').trim());

              cy.wrap(element).find('var:contains("Termín")').then((casElement1) => {
                cy.wrap(casElement1).invoke('text').then((time1) => {
                  const exerciseDeadline = convertToDate(time1.replace('Termín', '').trim());

                  const buttonA = cy.get('.icon-172');
                  const buttonB = cy.get('.icon-171');
                  const buttonC = cy.get('.icon-173');


                  buttonA.invoke('attr', 'style').then((style) => {
                    if (style.includes('color: rgb(1, 161, 154)')) {
                      expect(exerciseAvailability).to.be.lessThan(currentDate);
                      expect(exerciseTime).to.be.greaterThan(currentDate);
                    }
                  });

                  buttonB.invoke('attr', 'style').then((style) => {
                    if (style.includes('color: rgb(1, 161, 154)')) {
                      expect(exerciseTime).to.be.lessThan(currentDate);
                      expect(exerciseDeadline).to.be.greaterThan(currentDate);
                    }
                  });

                  buttonC.invoke('attr', 'style').then((style) => {
                    if (style.includes('color: rgb(1, 161, 154)')) {
                      expect(exerciseDeadline).to.be.lessThan(currentDate);
                    }
                  });

                  cy.wait(500)
                  
                });
                });
              });
            });
          });
        });
      });
    
  } else {
    cy.log('Skipping code block as no exercises were found');
  }
});
}


function convertToDate(dateString) {
  const [day, month, year, hour, minute] = dateString.match(/\d+/g);
  return new Date(`${year}-${month}-${day}T${hour}:${minute}`);
}
  
});


it('Filtrovanie úloh podľa filtra Hodnotenie', function() {
  
  cy.wait(1000)
  cy.get('.icon').find('[title="Hodnotenie"]').click()


  //Hodnotenie nad 65%
  cy.get('.icon').find('[title="Hodnotenie nad 65%"]').click();

  cy.get('.ulohy').then(($kontrola1) => {
      if ($kontrola1.find('dashboard-exercise-list-item').length > 0) {
        cy.get('.btn.btn-hover').contains(/Výsledky/).each(($button) => {
          expect($button).to.have.class('green-bck');
        });
      } else {
        cy.log('Skipping code block as no exercises were found');
      }
    });
    

  //Hodnotenie medzi 50% a 65%
  cy.get('.icon').find('[title="Hodnotenie nad 65%"]').click();
  cy.get('.icon').find('[title="Hodnotenie medzi 50% a 65%"]').click();
  cy.get('.ulohy').then(($kontrola1) => {
      if ($kontrola1.find('dashboard-exercise-list-item').length > 0) {
        cy.get('.btn.btn-hover').contains(/Výsledky/).each(($button) => {
          expect($button).to.have.class('orange-bck');
        });
      } else {
        cy.log('Skipping code block as no exercises were found');
      }
    });


  //Hodnotenie pod 50%
  cy.get('.icon').find('[title="Hodnotenie medzi 50% a 65%"]').click();
  cy.get('.icon').find('[title="Hodnotenie pod 50%"]').click();
  cy.get('.ulohy').then(($kontrola1) => {
      if ($kontrola1.find('dashboard-exercise-list-item').length > 0) {
        cy.get('.btn.btn-hover').contains(/Výsledky/).each(($button) => {
          expect($button).to.have.class('red-bck');
        });
      } else {
        cy.log('Skipping code block as no exercises were found');
      }
    });

})


it('Filtrovanie úloh podľa filtra Status', function() {
  cy.wait(2000)
  cy.get('.icon').find('[title="Status"]').click()

  //Vypracovaný
  cy.get('.icon').find('[title="Vypracovaný"]').click()
  cy.get('.ulohy').then((kontrola1) => {
      if (kontrola1.find('dashboard-exercise-list-item').length > 0) {
          cy.get('.btn.btn-hover.green-bck').each(($button) => {
          const text = $button.text();
          expect(text).to.match(/Výsledky/);
        });
      } else {
        cy.log('Skipping code block as no exercises were found');
      }
    });
  


  //Nevypracovaný
  cy.get('.icon').find('[title="Vypracovaný"]').click()
  cy.get('.icon').find('[title="Nevypracovaný"]').click()
  cy.get('.ulohy').then((kontrola1) => {
      if (kontrola1.find('dashboard-exercise-list-item').length > 0) {
          cy.get('.btn-hover.btn.btn-info').each(($button) => {
          const text = $button.text();
          expect(text).to.contain('Absolvovať');
        });
      } else {
        cy.log('Skipping code block as no exercises were found');
      }
    });



  //Čaká na vyhodnotenie
  cy.get('.icon').find('[title="Nevypracovaný"]').click()
  cy.get('.icon').find('[title="Čaká na vyhodnotenie"]').click()
  cy.get('.ulohy').then((kontrola1) => {
      if (kontrola1.find('dashboard-exercise-list-item').length > 0) {
          cy.get('ma-exercise-status').each(($button) => {
          const text = $button.text();
          expect(text).to.contain('Čaká na vyhodnotenie');
        });
      } else {
        cy.log('Skipping code block as no exercises were found');
      }
    });

})



});

