describe('Student', function() {

    beforeEach(() => {
    
    cy.loginStudent(Cypress.env('loginStudent1'), Cypress.env('password'));
    
    cy.visit(Cypress.env('websiteUrlPortal'))
    cy.get('[title="PO predmet AAA_PT"]').parent().parent().find('img').click()
    })
    




    it('Zoradenie úloh podľa kritéria Náročnosť', function() {
    
        cy.wait(1000)
           
           cy.get('button').contains('poradie').then(ikonkaPoradie => {
            if (ikonkaPoradie.parentsUntil('.filter-row').next().find('.filter-icons')) {
            cy.contains('poradie').click()
             } 
            else  {
             }
    
              //funkcne
            cy.get('.icon').find('[title="Náročnosť"]').then(ikonka => {
            if (ikonka.length > 1) {
                cy.get('.icon').find('[title="Náročnosť"]').last().click()
              } 
              else  {
                cy.get('.icon').find('[title="Náročnosť"]').click()
                console.log('iba jedna ikonka')
                
              }
           
              
              cy.get('.narocnost').next().then(($icon) => {
                if ($icon.hasClass('icon-arrow-up')) {
                  kontrola1();
                } else if ($icon.hasClass('icon-arrow-down')) {
                  kontrola2();
                } 
              });

              function kontrola1() {
                cy.get('.ulohy').then((kontrola1) => {
                    if (kontrola1.children().find('dashboard-exercise-list-item').length > 0) {
                        cy.get('ma-difficulty').then($elements => {
                            const totalElements = $elements.length;
                            console.log('Number of ma-difficulty elements:', totalElements);
            
                            // Ensure there's at least two elements to compare
                            if (totalElements > 1) {
                                for (let index = 1; index < totalElements; index++) {
                                    cy.wrap($elements.eq(index)).find('span').then($spans => {
                                        const difficultyText = $spans.eq(1).text().trim();
                                        const difficultyNumber = extractDifficultyNumber(difficultyText);
            
                                        if (difficultyNumber !== null) {
                                            cy.wrap($elements.eq(index - 1)).find('span').then($prevSpans => {
                                                const previousText = $prevSpans.eq(1).text().trim();
                                                const previousDifficultyNumber = extractDifficultyNumber(previousText);
            
                                                if (previousDifficultyNumber !== null) {
                                                    console.log("Current Difficulty Number:", difficultyNumber);
                                                    console.log("Previous Difficulty Number:", previousDifficultyNumber);
            
                                                    expect(difficultyNumber).to.be.gte(previousDifficultyNumber);
                                                    cy.wait(500);
                                               
                                                }
                                            });
                                        } else {
                                            cy.log('Current difficulty number could not be extracted');
                                        }
                                    });
                                }
                            } else {
                                cy.log('Not enough ma-difficulty elements to perform comparison');
                            }
                        });
                    } else {
                        cy.log('Skipping code block as no ma-difficulty elements found');
                    }
                });
            }
          })
        })
      })
            
            function extractDifficultyNumber(text) {
                const regex = /(\d+)\/(\d+)/;
                const matches = text.match(regex);
            
                if (matches) {
                    const numerator = parseFloat(matches[1]);
                    const denominator = parseFloat(matches[2]);
                    if (denominator !== 0) {
                        return numerator / denominator;
                    } else {
                        cy.log('Denominator is zero, cannot divide');
                        return null;
                    }
                } else {
                    cy.log('Difficulty text does not match expected format:', text);
                    return null;
                }
            }
            
            
            function extractDifficultyNumber(text) {
                const regex = /(\d+)\/(\d+)/;
                const matches = text.match(regex);
            
                if (matches) {
                    const numerator = parseFloat(matches[1]);
                    const denominator = parseFloat(matches[2]);
                    if (denominator !== 0) {
                        return numerator / denominator;
                    } else {
                        cy.log('Denominator is zero, cannot divide');
                        return null;
                    }
                } else {
                    cy.log('Difficulty text does not match expected format:', text);
                    return null;
                }
            }

    it('Zoradenie úloh podľa kritéria Trvanie v minútach', function() {
      
        cy.wait(1000)
    
      
         cy.get('button').contains('poradie').then(ikonkaPoradie => {
          if (ikonkaPoradie.parentsUntil('.filter-row').next().find('.filter-icons')) {
          cy.contains('poradie').click()
           } 
          else  {
           }
  
            //funkcne
          cy.get('.icon').find('[title="Trvanie v minútach"]').then(ikonka => {
          if (ikonka.length > 1) {
              cy.get('.icon').find('[title="Trvanie v minútach"]').last().click()
            } 
            else  {
              cy.get('.icon').find('[title="Trvanie v minútach"]').click()
              console.log('iba jedna ikonka')
              
            }
         
        
            cy.get('[title="Trvanie v minútach"]').find('.icon-23').next().then(($icon) => {
              if ($icon.hasClass('icon-arrow-up')) {
                kontrola1();
              } else if ($icon.hasClass('icon-arrow-down')) {
                kontrola2();
              } 
            });


            cy.get('.icon-arrow-up, .icon-arrow-down').click();


            cy.get('[title="Trvanie v minútach"]').find('.icon-23').next().then(($icon) => {
              if ($icon.hasClass('icon-arrow-up')) {
                kontrola1();
              } else if ($icon.hasClass('icon-arrow-down')) {
                kontrola2();
              } 
            });

  
            function kontrola1() {
              cy.get('.ulohy').then((kontrola1) => {
                if (kontrola1.children().find('dashboard-exercise-list-item').length > 0) {
                  cy.get('ma-length').each(($span, index) => {
                    if (index > 0) {
                      const text = $span.text();
                      const totalMinutes = calculateTotalMinutes(text)
            
                      cy.get('ma-length').eq(index - 1).then(($prevSpan) => {
                        const previousText = $prevSpan.text();
                        const previousTotalMinutes = calculateTotalMinutes(previousText);
                        expect(totalMinutes).to.be.gte(previousTotalMinutes);
                        cy.wait(500)
  
                      });
                    } else {
                      const text = $span.text();
                      const totalMinutes = calculateTotalMinutes(text);
                    }
                  });
                } else {
                  cy.log('Skipping code block as no ma-length elements found');
                }
              });
            }
  
  
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
                     
  })



            function kontrola2() {
              cy.get('.ulohy').then((kontrola2) => {
                if (kontrola2.children().find('dashboard-exercise-list-item').length > 0) {
                  cy.get('ma-length').each(($span, index) => {
                    if (index > 0) {
                      const text = $span.text();
                      const totalMinutes = calculateTotalMinutes(text)
            
                      cy.get('ma-length').eq(index - 1).then(($prevSpan) => {
                        const previousText = $prevSpan.text();
                        const previousTotalMinutes = calculateTotalMinutes(previousText);
                        expect(totalMinutes).to.be.lte(previousTotalMinutes);
                        cy.wait(500)

                      });
                    } else {
                      const text = $span.text();
                      const totalMinutes = calculateTotalMinutes(text);
                    }
                  });
                } else {
                  cy.log('Skipping code block as no ma-length elements found');
                }
              });
            }


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




  })
    }) 
  

    it('Zoradenie úloh podľa kritéria XP body', function() {
      
        cy.wait(1000)
  
  
         cy.get('button').contains('poradie').then(ikonkaPoradie => {
          if (ikonkaPoradie.parentsUntil('.filter-row').next().find('.filter-icons')) {
          cy.contains('poradie').click()
           } 
          else  {
           }
  
            //funkcne
          cy.get('.icon').find('[title="XP body"]').then(ikonka => {
          if (ikonka.length > 1) {
              cy.get('.icon').find('[title="XP body"]').last().click()
            } 
            else  {
              cy.get('.icon').find('[title="XP body"]').click()
              console.log('iba jedna ikonka')
              
            }
         

            cy.get('[title="XP body"]').find('.icon-99').next().then(($icon) => {
              if ($icon.hasClass('icon-arrow-up')) {
                kontrola1();
              } else if ($icon.hasClass('icon-arrow-down')) {
                kontrola2();
              } 
            });


            cy.get('.icon-arrow-up, .icon-arrow-down').click();


            cy.get('[title="XP body"]').find('.icon-99').next().then(($icon) => {
              if ($icon.hasClass('icon-arrow-up')) {
                kontrola1();
              } else if ($icon.hasClass('icon-arrow-down')) {
                kontrola2();
              } 
            });



  
            function kontrola1() {
              cy.get('.ulohy').then((kontrola1) => {
                if (kontrola1.children().find('dashboard-exercise-list-item').length > 0) {
                  cy.get('ma-xp').each(($span, index) => {
                    if (index > 0) {
                      const text = $span.text();
                      const xpNumber = parseInt(text.match(/\d+/)[0], 10);
            
                      cy.get('ma-xp').eq(index - 1).then(($prevSpan) => {
                        const previousText = $prevSpan.text();
                        const previousXpNumber = parseInt(previousText.match(/\d+/)[0], 10);
                        expect(xpNumber).to.be.gte(previousXpNumber);
                        cy.wait(500)
  
                      });
                    } else {
                      const text = $span.text();
                      const xpNumber = parseInt(text.match(/\d+/)[0], 10);
                    }
                  });
                } else {
                  cy.log('Skipping code block as no ma-xp elements found');
                }
              });
            }
              





            function kontrola2() {
              cy.get('.ulohy').then((kontrola2) => {
                if (kontrola2.children().find('dashboard-exercise-list-item').length > 0) {
                  cy.get('ma-xp').each(($span, index) => {
                    if (index > 0) {
                      const text = $span.text();
                      const xpNumber = parseInt(text.match(/\d+/)[0], 10);
            
                      cy.get('ma-xp').eq(index - 1).then(($prevSpan) => {
                        const previousText = $prevSpan.text();
                        const previousXpNumber = parseInt(previousText.match(/\d+/)[0], 10);
                        expect(xpNumber).to.be.lte(previousXpNumber);
                        cy.wait(500)
  
                      });
                    } else {
                      const text = $span.text();
                      const xpNumber = parseInt(text.match(/\d+/)[0], 10);
                    }
                  });
                } else {
                  cy.log('Skipping code block as no ma-xp elements found');
                }
              });
            }

        
                
  })
  })
    }) 
  

    it('Zoradenie úloh podľa kritéria Dostupný od', function() {
      
        cy.wait(1000)
  
      
          cy.get('button').contains('poradie').then(ikonkaPoradie => {
          if (ikonkaPoradie.parentsUntil('.filter-row').next().find('.filter-icons')) {
          cy.contains('poradie').click()
           } 
          else  {
           }
  
            //funkcne
          cy.get('.icon').find('[title="Dostupný od"]').then(ikonka => {
          if (ikonka.length > 1) {
              cy.get('.icon').find('[title="Dostupný od"]').last().click()
            } 
            else  {
              cy.get('.icon').find('[title="Dostupný od"]').click()
              console.log('iba jedna ikonka')
              
            }
         
  
            cy.get('[title="Dostupný od"]').find('.icon-106').next().then(($icon) => {
              if ($icon.hasClass('icon-arrow-up')) {
                kontrola1();
              } else if ($icon.hasClass('icon-arrow-down')) {
                kontrola2();
              } 
            });


            cy.get('.icon-arrow-up, .icon-arrow-down').click();


            cy.get('[title="Dostupný od"]').find('.icon-106').next().then(($icon) => {
              if ($icon.hasClass('icon-arrow-up')) {
                kontrola1();
              } else if ($icon.hasClass('icon-arrow-down')) {
                kontrola2();
              } 
            });





  
        //nove
        function kontrola1() {
          cy.get('.ulohy').then((kontrola1) => {
            if (kontrola1.children().find('dashboard-exercise-list-item').length > 0) {
              cy.get('var:contains("Dostupná od")').find('time').each(($span, index) => {
                if (index > 0) {
                  const date = $span.attr('datetime');
        
                  cy.get('var:contains("Dostupná od")').eq(index - 1).find('time').then(($prevSpan) => {
                    const previousDate = $prevSpan.attr('datetime');
                    expect(new Date(date)).to.be.gte(new Date(previousDate));
                    cy.wait(500)
                  });
                } else {
                  const text = $span.attr('datetime');
                }
              });
            } else {
              cy.log('Skipping code block as no .dashboard-exercise-list-item elements found');
            }
          });
        }
        
        
        function convertToNewFormat(dateString) {
          const [day, month, year, hour] = dateString.match(/\d+/g);
          const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          const monthName = monthNames[parseInt(month) - 1];
          const formattedDate = new Date(`${monthName} ${day}, ${year} ${hour}:00:00 GMT`).toUTCString();
        
          return formattedDate;
        }







        function kontrola2() {
          cy.get('.ulohy').then((kontrola2) => {
            if (kontrola2.children().find('dashboard-exercise-list-item').length > 0) {
              cy.get('var:contains("Dostupná od")').find('time').each(($span, index) => {
                if (index > 0) {
                  const date = $span.attr('datetime');
        
                  cy.get('var:contains("Dostupná od")').eq(index - 1).find('time').then(($prevSpan) => {
                    const previousDate = $prevSpan.attr('datetime');
                    expect(new Date(date)).to.be.lte(new Date(previousDate));
                    cy.wait(500)
                  });
                } else {
                  const text = $span.attr('datetime');
                }
              });
            } else {
              cy.log('Skipping code block as no .dashboard-exercise-list-item elements found');
            }
          });
        }
        
        
        function convertToNewFormat(dateString) {
          const [day, month, year, hour] = dateString.match(/\d+/g);
          const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          const monthName = monthNames[parseInt(month) - 1];
          const formattedDate = new Date(`${monthName} ${day}, ${year} ${hour}:00:00 GMT`).toUTCString();
        
          return formattedDate;
        }

                    
  })
  })
    }) 
  

    it('Zoradenie úloh podľa kritéria Načas', function() {
      
        cy.wait(1000)
     
      
         cy.get('button').contains('poradie').then(ikonkaPoradie => {
          if (ikonkaPoradie.parentsUntil('.filter-row').next().find('.filter-icons')) {
          cy.contains('poradie').click()
           } 
          else  {
           }
  
            //funkcne
          cy.get('.icon').find('[title="Načas"]').then(ikonka => {
          if (ikonka.length > 1) {
              cy.get('.icon').find('[title="Načas"]').last().click()
            } 
            else  {
              cy.get('.icon').find('[title="Načas"]').click()
              console.log('iba jedna ikonka')
              
            }
         


            cy.get('[title="Načas"]').find('.icon-107').next().then(($icon) => {
              if ($icon.hasClass('icon-arrow-up')) {
                kontrola1();
              } else if ($icon.hasClass('icon-arrow-down')) {
                kontrola2();
              } 
            });


            cy.get('.icon-arrow-up, .icon-arrow-down').click();


            cy.get('[title="Načas"]').find('.icon-107').next().then(($icon) => {
              if ($icon.hasClass('icon-arrow-up')) {
                kontrola1();
              } else if ($icon.hasClass('icon-arrow-down')) {
                kontrola2();
              } 
            });




        //nove
        function kontrola1() {
          cy.get('.ulohy').then((kontrola1) => {
            if (kontrola1.children().find('dashboard-exercise-list-item').length > 0) {
              cy.get('var:contains("Načas")').find('time').each(($span, index) => {
                if (index > 0) {
                  const date = $span.attr('datetime');
        
                  cy.get('var:contains("Načas")').eq(index - 1).find('time').then(($prevSpan) => {
                    const previousDate = $prevSpan.attr('datetime');
                    expect(new Date(date)).to.be.gte(new Date(previousDate));
                    cy.wait(500)
                  });
                } else {
                  const text = $span.attr('datetime');
                }
              });
            } else {
              cy.log('Skipping code block as no .dashboard-exercise-list-item elements found');
            }
          });
        }
        
        
        function convertToNewFormat(dateString) {
          const [day, month, year, hour] = dateString.match(/\d+/g);
          const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          const monthName = monthNames[parseInt(month) - 1];
          const formattedDate = new Date(`${monthName} ${day}, ${year} ${hour}:00:00 GMT`).toUTCString();
        
          return formattedDate;
        }



        function kontrola2() {
          cy.get('.ulohy').then((kontrola2) => {
            if (kontrola2.children().find('dashboard-exercise-list-item').length > 0) {
              cy.get('var:contains("Načas")').find('time').each(($span, index) => {
                if (index > 0) {
                  const date = $span.attr('datetime');
        
                  cy.get('var:contains("Načas")').eq(index - 1).find('time').then(($prevSpan) => {
                    const previousDate = $prevSpan.attr('datetime');
                    expect(new Date(date)).to.be.lte(new Date(previousDate));
                    cy.wait(500)
                  });
                } else {
                  const text = $span.attr('datetime');
                }
              });
            } else {
              cy.log('Skipping code block as no .dashboard-exercise-list-item elements found');
            }
          });
        }
        
        
        function convertToNewFormat(dateString) {
          const [day, month, year, hour] = dateString.match(/\d+/g);
          const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          const monthName = monthNames[parseInt(month) - 1];
          const formattedDate = new Date(`${monthName} ${day}, ${year} ${hour}:00:00 GMT`).toUTCString();
        
          return formattedDate;
        }

                             
  })
  })
    }) 
  

    it('Zoradenie úloh podľa kritéria V Termíne', function() {
      
        cy.wait(1000)
  
      
         cy.get('button').contains('poradie').then(ikonkaPoradie => {
          if (ikonkaPoradie.parentsUntil('.filter-row').next().find('.filter-icons')) {
          cy.contains('poradie').click()
           } 
          else  {
           }
  
            //funkcne
          cy.get('.icon').find('[title="V termíne"]').then(ikonka => {
          if (ikonka.length > 1) {
              cy.get('.icon').find('[title="V termíne"]').last().click()
            } 
            else  {
              cy.get('.icon').find('[title="V termíne"]').click()
              console.log('iba jedna ikonka')
              
            }
         
        
            cy.get('[title="V termíne"]').find('.icon-100').next().then(($icon) => {
              if ($icon.hasClass('icon-arrow-up')) {
                kontrola1();
              } else if ($icon.hasClass('icon-arrow-down')) {
                kontrola2();
              } 
            });


            cy.get('.icon-arrow-up, .icon-arrow-down').click();


            cy.get('[title="V termíne"]').find('.icon-100').next().then(($icon) => {
              if ($icon.hasClass('icon-arrow-up')) {
                kontrola1();
              } else if ($icon.hasClass('icon-arrow-down')) {
                kontrola2();
              } 
            });






         //nove
        function kontrola1() {
          cy.get('.ulohy').then((kontrola1) => {
            if (kontrola1.children().find('dashboard-exercise-list-item').length > 0) {
              cy.get('var:contains("Termín")').find('time').each(($span, index) => {
                if (index > 0) {
                  const date = $span.attr('datetime');
        
                  cy.get('var:contains("Termín")').eq(index - 1).find('time').then(($prevSpan) => {
                    const previousDate = $prevSpan.attr('datetime');
                    expect(new Date(date)).to.be.gte(new Date(previousDate));
                    cy.wait(500)
                  });
                } else {
                  const text = $span.attr('datetime');
                }
              });
            } else {
              cy.log('Skipping code block as no .dashboard-exercise-list-item elements found');
            }
          });
        }
        
        
        function convertToNewFormat(dateString) {
          const [day, month, year, hour] = dateString.match(/\d+/g);
          const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          const monthName = monthNames[parseInt(month) - 1];
          const formattedDate = new Date(`${monthName} ${day}, ${year} ${hour}:00:00 GMT`).toUTCString();
        
          return formattedDate;
        }





        function kontrola2() {
          cy.get('.ulohy').then((kontrola2) => {
            if (kontrola2.children().find('dashboard-exercise-list-item').length > 0) {
              cy.get('var:contains("Termín")').find('time').each(($span, index) => {
                if (index > 0) {
                  const date = $span.attr('datetime');
        
                  cy.get('var:contains("Termín")').eq(index - 1).find('time').then(($prevSpan) => {
                    const previousDate = $prevSpan.attr('datetime');
                    expect(new Date(date)).to.be.lte(new Date(previousDate));
                    cy.wait(500)
                  });
                } else {
                  const text = $span.attr('datetime');
                }
              });
            } else {
              cy.log('Skipping code block as no .dashboard-exercise-list-item elements found');
            }
          });
        }
        
        
        function convertToNewFormat(dateString) {
          const [day, month, year, hour] = dateString.match(/\d+/g);
          const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          const monthName = monthNames[parseInt(month) - 1];
          const formattedDate = new Date(`${monthName} ${day}, ${year} ${hour}:00:00 GMT`).toUTCString();
        
          return formattedDate;
        }

         
                    
  })
  })
    }) 
  

    it('Zoradenie úloh podľa kritéria Hodnotenie', function() {
      
        cy.wait(1000)
  
     
      cy.get('button').contains('filter').then(ikonkaFilter => {
        if (ikonkaFilter.parentsUntil('.filter-row').next().find('.filter-icons')) {
        cy.contains('filter').click()
         } 
        else  {
         }
  
  
         cy.get('button').contains('poradie').then(ikonkaPoradie => {
          if (ikonkaPoradie.parentsUntil('.filter-row').next().find('.filter-icons')) {
          cy.contains('poradie').click()
           } 
          else  {
           }
  
            //funkcne
          cy.get('.icon').find('[title="Hodnotenie"]').then(ikonka => {
          if (ikonka.length > 1) {
              cy.get('.icon').find('[title="Hodnotenie"]').last().click()
            } 
            else  {
              cy.get('.icon').find('[title="Hodnotenie"]').click()
              console.log('iba jedna ikonka')
              
            }


            cy.get('[title="Hodnotenie"]').find('.icon-98').next().then(($icon) => {
              if ($icon.hasClass('icon-arrow-up')) {
                kontrola1();
              } else if ($icon.hasClass('icon-arrow-down')) {
                kontrola2();
              } 
            });

            cy.get('.icon-arrow-up, .icon-arrow-down').click();


            cy.get('[title="Hodnotenie"]').find('.icon-98').next().then(($icon) => {
              if ($icon.hasClass('icon-arrow-up')) {
                kontrola1();
              } else if ($icon.hasClass('icon-arrow-down')) {
                kontrola2();
              } 
            });

            function kontrola1() {
            let submitBox, redBox, orangeBox, greenBox;

            let orderVal = 0;
  
           /* cy.get('[class="btn-hover btn btn-info"]').then((value) => {
              submitBox = value.length;
            });*/
  
            cy.get('[class="btn btn-hover red-bck"]').then((value) => {
              redBox = value.length;
            });
  
            cy.get('[class="btn btn-hover orange-bck"]').then((value) => {
              orangeBox = value.length;
            });
  
            cy.get('[class="btn btn-hover green-bck"]').then((value) => {
              greenBox = value.length;
            });
  
            function kontrolaAbs() {
              cy.wait(1000).then(() => {
                  cy.get('.btn-hover:not(:contains("Hľadať")):not(:contains("Odoslať")):not(:contains("Zavrieť")):not(:contains("Absolvovať znova")):not(:contains("Výsledky"))').then((value) => {
                    for (let x = orderVal; x < submitBox; x++) {
                      cy.wrap(value[x]).should('have.class', 'btn-info').then(() => {
                          orderVal += 1;
                      });
                  }
              });
          });
      }
            function kontrolaRed() {
            // Skontroluje tlacidla red button
            cy.wait(1000).then(() => {
              cy.get('.btn-hover:not(:contains("Hľadať")):not(:contains("Odoslať")):not(:contains("Zavrieť")):not(:contains("Absolvovať znova"))').then((value) => {
                for (let x = orderVal; x < submitBox + redBox; x++) {
                  cy.wrap(value[x]).should('have.class', 'red-bck').then(()=>{ orderVal += 1;})
                }
              });
            });
          }
            function kontrolaOrange() {
            // Skontroluje tlacidla yellow button
            cy.wait(1000).then(() => {
              cy.get('.btn-hover:not(:contains("Hľadať")):not(:contains("Odoslať")):not(:contains("Zavrieť")):not(:contains("Absolvovať znova"))').then((value) => {
                for (let x = orderVal; x < submitBox + redBox + orangeBox; x++) {
                  cy.wrap(value[x]).should('have.class', 'orange-bck').then(()=>{ orderVal += 1;})
                }
              });
            });
          }
            function kontrolaGreen() {
            // Skontroluje tlacidla green button
            cy.wait(1000).then(() => {
              cy.get('.btn-hover:not(:contains("Hľadať")):not(:contains("Odoslať")):not(:contains("Zavrieť")):not(:contains("Absolvovať znova"))').then((value) => {
                for (let x = orderVal; x < submitBox + redBox + orangeBox + greenBox; x++) {
                  cy.wrap(value[x]).should('have.class', 'green-bck').then(()=>{ orderVal += 1;})
                }
              });
            });
          }
          kontrolaAbs()
          kontrolaRed()
          kontrolaOrange()
          kontrolaGreen()


            let previousNumber = null;

            function performActions(exerciseNumber) {
              const trimmedNumber = exerciseNumber.split(' - ')[0].trim();
              console.log(trimmedNumber);
            
              if (previousNumber !== null) {
                const currentNumbers = trimmedNumber.split('.');
                const prevNumbers = previousNumber.split('.');
            
                let incremented = false;
            
                // Start by checking the last number
                if (parseInt(currentNumbers[2]) > parseInt(prevNumbers[2])) {
                  incremented = true;
                } else if (parseInt(currentNumbers[1]) > parseInt(prevNumbers[1])) {
                  // If the last number is not incremented, check the middle number
                  incremented = true;
                } else if (parseInt(currentNumbers[0]) > parseInt(prevNumbers[0])) {
                  // If both last and middle numbers are not incremented, check the first number
                  incremented = true;
                }
            
                expect(incremented).to.be.true;
              }
            
              previousNumber = trimmedNumber;
            }
            

          function kontrolaClass() {
          // ABSOLVOVAT
          // Use cy.get() to locate the list items and then find the buttons within them
          cy.get('.ulohy dashboard-exercise-list-item').find('btn btn-hover').each(($button) => {
            // Use cy.contains() to get the text of the button
            cy.wrap($button).invoke('text').then((buttonText) => {
              // Assert that the text matches the specified pattern
              expect(buttonText).to.match(/Absolvovať/);

              cy.wrap($button).parent().parent().find('.nazov-fade').invoke('text').then((exerciseNumber) => {
                  performActions(exerciseNumber);
                });
             
            });
          });


          // RED
          let previousRedPercentage = 0; 
          // Use cy.get() to locate the list items and then find the buttons within them
          cy.get('.ulohy dashboard-exercise-list-item').find('.red-bck').each(($button) => {
            // Use cy.contains() to get the text of the button
            cy.wrap($button).invoke('text').then((buttonText) => {
              // Extract the percentage value from the buttonText
              const percentage = parseInt(buttonText.match(/\d+/)[0]);

              if (percentage >= 0 && percentage <= 49) {
                // Assert that the text matches the specified pattern for the range 0-49
                expect(buttonText).to.match(/Výsledky \(\d+%\)/);
                // Use \( and \) to match parentheses in the regular expression
                expect(percentage).to.be.gte(previousRedPercentage)
                previousRedPercentage = percentage;
              } else {
                // Log the issue to the Cypress console
                cy.log(`Button with text '${buttonText}' has a percentage greater than 49`);

                // Fail the test intentionally
                cy.fail('Button with percentage > 49 should have a different class');
              }
            });
          });



          // ORANGE
          let previousOrangePercentage = 50; 
          // Use cy.get() to locate the list items and then find the buttons within them
          cy.get('.ulohy dashboard-exercise-list-item').find('.orange-bck').each(($button) => {
            // Use cy.contains() to get the text of the button
            cy.wrap($button).invoke('text').then((buttonText) => {
              // Extract the percentage value from the buttonText
              const percentage = parseInt(buttonText.match(/\d+/)[0]);

              if (percentage >= 50 && percentage <= 64) {
                // Assert that the text matches the specified pattern for the range 0-49
                expect(buttonText).to.match(/Výsledky \(\d+%\)/);
                // Use \( and \) to match parentheses in the regular expression
                expect(percentage).to.be.gte(previousOrangePercentage)
                previousOrangePercentage = percentage;
              } else {
                // Log the issue to the Cypress console
                cy.log(`Button with text '${buttonText}' has not a percentage >= 50 && percentage <= 64`);

                // Fail the test intentionally
                cy.fail('Button with percentage different than >= 50 && percentage <= 64 should have a different class');
              }
            });
          });



          // GREEN
          let previousGreenPercentage = 65; 
          // Use cy.get() to locate the list items and then find the buttons within them
          cy.get('.ulohy dashboard-exercise-list-item').find('.green-bck').each(($button) => {
            // Use cy.contains() to get the text of the button
            cy.wrap($button).invoke('text').then((buttonText) => {
              // Extract the percentage value from the buttonText
              const percentage = parseInt(buttonText.match(/\d+/)[0]);

              if (percentage >= 65 && percentage <= 100) {
                // Assert that the text matches the specified pattern for the range 0-49
                expect(buttonText).to.match(/Výsledky \(\d+%\)/);
                // Use \( and \) to match parentheses in the regular expression
                expect(percentage).to.be.gte(previousGreenPercentage)
                previousGreenPercentage = percentage;
              } else {
                // Log the issue to the Cypress console
                cy.log(`Button with text '${buttonText}' has not a percentage >= 65 && percentage <= 100`);

                // Fail the test intentionally
                cy.fail('Button with percentage different than >= 65 && percentage <= 100 should have a different class');
              }
            });
          });
        }

        kontrolaClass()
      }



      function kontrola2() {
        let submitBox, redBox, orangeBox, greenBox;

        let orderVal = 0;

        cy.get('[class="btn-hover btn btn-info"]').then((value) => {
          submitBox = value.length;
        });

        cy.get('[class="btn btn-hover red-bck"]').then((value) => {
          redBox = value.length;
        });

        cy.get('[class="btn btn-hover orange-bck"]').then((value) => {
          orangeBox = value.length;
        });

        cy.get('[class="btn btn-hover green-bck"]').then((value) => {
          greenBox = value.length;
        });

        function kontrolaAbs() {
        // Skontroluje tlacidla absolvovat
        cy.wait(1000).then(() => {
          cy.get('.btn-hover:not(:contains("Hľadať")):not(:contains("Odoslať")):not(:contains("Zavrieť")):not(:contains("Absolvovať znova"))').then((value) => {
            for (let x = orderVal; x < greenBox + orangeBox + redBox + submitBox; x++) {
              cy.wrap(value[x]).should('have.class', 'btn-info').then(()=>{ orderVal += 1;})
            }
          });
        })
      }
        function kontrolaRed() {
        // Skontroluje tlacidla red button
        cy.wait(1000).then(() => {
          cy.get('.btn-hover:not(:contains("Hľadať")):not(:contains("Odoslať")):not(:contains("Zavrieť")):not(:contains("Absolvovať znova"))').then((value) => {
            for (let x = orderVal; x < greenBox + orangeBox + redBox; x++) {
              cy.wrap(value[x]).should('have.class', 'red-bck').then(()=>{ orderVal += 1;})
            }
          });
        });
      }
        function kontrolaOrange() {
        // Skontroluje tlacidla yellow button
        cy.wait(1000).then(() => {
          cy.get('.btn-hover:not(:contains("Hľadať")):not(:contains("Odoslať")):not(:contains("Zavrieť")):not(:contains("Absolvovať znova"))').then((value) => {
            for (let x = orderVal; x < greenBox + orangeBox; x++) {
              cy.wrap(value[x]).should('have.class', 'orange-bck').then(()=>{ orderVal += 1;})
            }
          });
        });
      }
        function kontrolaGreen() {
        // Skontroluje tlacidla green button
        cy.wait(1000).then(() => {
          cy.get('.btn-hover:not(:contains("Hľadať")):not(:contains("Odoslať")):not(:contains("Zavrieť")):not(:contains("Absolvovať znova"))').then((value) => {
            for (let x = orderVal; x < greenBox; x++) {
              cy.wrap(value[x]).should('have.class', 'green-bck').then(()=>{ orderVal += 1;})
            }
          });
        });
      }

      
      kontrolaGreen()
      kontrolaOrange()
      kontrolaRed()
      kontrolaAbs()
      


        let previousNumber = null;

        function performActions(exerciseNumber) {
          const trimmedNumber = exerciseNumber.split(' - ')[0].trim();
          console.log(trimmedNumber);
        
          if (previousNumber !== null) {
            const currentNumbers = trimmedNumber.split('.');
            const prevNumbers = previousNumber.split('.');
        
            let incremented = false;
        
            // Start by checking the last number
            if (parseInt(currentNumbers[2]) > parseInt(prevNumbers[2])) {
              incremented = true;
            } else if (parseInt(currentNumbers[1]) > parseInt(prevNumbers[1])) {
              // If the last number is not incremented, check the middle number
              incremented = true;
            } else if (parseInt(currentNumbers[0]) > parseInt(prevNumbers[0])) {
              // If both last and middle numbers are not incremented, check the first number
              incremented = true;
            }
        
            expect(incremented).to.be.true;
          }
        
          previousNumber = trimmedNumber;
        }
        

      function kontrolaClass() {
      // ABSOLVOVAT
      // Use cy.get() to locate the list items and then find the buttons within them
      cy.get('.ulohy dashboard-exercise-list-item').find('btn btn-hover').each(($button) => {
        // Use cy.contains() to get the text of the button
        cy.wrap($button).invoke('text').then((buttonText) => {
          // Assert that the text matches the specified pattern
          expect(buttonText).to.match(/Absolvovať/);

          cy.wrap($button).parent().parent().find('.nazov-fade').invoke('text').then((exerciseNumber) => {
              performActions(exerciseNumber);
            });
         
        });
      });


      // RED
      let previousRedPercentage = 49; 
      // Use cy.get() to locate the list items and then find the buttons within them
      cy.get('.ulohy dashboard-exercise-list-item').find('.red-bck').each(($button) => {
        // Use cy.contains() to get the text of the button
        cy.wrap($button).invoke('text').then((buttonText) => {
          // Extract the percentage value from the buttonText
          const percentage = parseInt(buttonText.match(/\d+/)[0]);

          if (percentage >= 0 && percentage <= 49) {
            // Assert that the text matches the specified pattern for the range 0-49
            expect(buttonText).to.match(/Výsledky \(\d+%\)/);
            // Use \( and \) to match parentheses in the regular expression
            expect(percentage).to.be.lte(previousRedPercentage)
            previousRedPercentage = percentage;
          } else {
            // Log the issue to the Cypress console
            cy.log(`Button with text '${buttonText}' has a percentage greater than 49`);

            // Fail the test intentionally
            cy.fail('Button with percentage > 49 should have a different class');
          }
        });
      });



      // ORANGE
      let previousOrangePercentage = 64; 
      // Use cy.get() to locate the list items and then find the buttons within them
      cy.get('.ulohy dashboard-exercise-list-item').find('.orange-bck').each(($button) => {
        // Use cy.contains() to get the text of the button
        cy.wrap($button).invoke('text').then((buttonText) => {
          // Extract the percentage value from the buttonText
          const percentage = parseInt(buttonText.match(/\d+/)[0]);

          if (percentage >= 50 && percentage <= 64) {
            // Assert that the text matches the specified pattern for the range 0-49
            expect(buttonText).to.match(/Výsledky \(\d+%\)/);
            // Use \( and \) to match parentheses in the regular expression
            expect(percentage).to.be.lte(previousOrangePercentage)
            previousOrangePercentage = percentage;
          } else {
            // Log the issue to the Cypress console
            cy.log(`Button with text '${buttonText}' has not a percentage >= 50 && percentage <= 64`);

            // Fail the test intentionally
            cy.fail('Button with percentage different than >= 50 && percentage <= 64 should have a different class');
          }
        });
      });



      // GREEN
      let previousGreenPercentage = 100; 
      // Use cy.get() to locate the list items and then find the buttons within them
      cy.get('.ulohy dashboard-exercise-list-item').find('.green-bck').each(($button) => {
        // Use cy.contains() to get the text of the button
        cy.wrap($button).invoke('text').then((buttonText) => {
          // Extract the percentage value from the buttonText
          const percentage = parseInt(buttonText.match(/\d+/)[0]);

          if (percentage >= 65 && percentage <= 100) {
            // Assert that the text matches the specified pattern for the range 0-49
            expect(buttonText).to.match(/Výsledky \(\d+%\)/);
            // Use \( and \) to match parentheses in the regular expression
            expect(percentage).to.be.lte(previousGreenPercentage)
            previousGreenPercentage = percentage;
          } else {
            // Log the issue to the Cypress console
            cy.log(`Button with text '${buttonText}' has not a percentage >= 65 && percentage <= 100`);

            // Fail the test intentionally
            cy.fail('Button with percentage different than >= 65 && percentage <= 100 should have a different class');
          }
        });
      });
    }

    kontrolaClass()
  }


                     
  })
  })
  }) 
  }) 
  
  



    it('Zoradenie úloh podľa kritéria Poradie', function() {
          
      cy.wait(1000)


      cy.get('button').contains('poradie').then(ikonkaPoradie => {
        if (ikonkaPoradie.parentsUntil('.filter-row').next().find('.filter-icons')) {
        cy.contains('poradie').click()
        } 
        else  {
        }

        cy.get('.icon').find('[title="Poradie"]').then(ikonka => {
        if (ikonka.length > 1) {
            cy.get('.icon').find('[title="Poradie"]').last().click()
          } 
          else  {
            cy.get('.icon').find('[title="Poradie"]').click()
            console.log('iba jedna ikonka')
            
          }
      
      
          cy.get('[title="Poradie"]').find('.icon-167').next().then(($icon) => {
            if ($icon.hasClass('icon-arrow-up')) {
              kontrola1();
            } else if ($icon.hasClass('icon-arrow-down')) {
              kontrola2();
            } 
          });


          cy.get('.icon-arrow-up, .icon-arrow-down').click();


          cy.get('[title="Poradie"]').find('.icon-167').next().then(($icon) => {
            if ($icon.hasClass('icon-arrow-up')) {
              kontrola1();
            } else if ($icon.hasClass('icon-arrow-down')) {
              kontrola2();
            } 
          });






      //nove
      function kontrola1() {
        console.log('kontrola1');
      
        let previousNumber = null;
      
        function performActions(exerciseNumber) {
          const trimmedNumber = exerciseNumber.split(' - ')[0].trim();
          console.log(trimmedNumber);
        
          if (previousNumber !== null) {
            const currentNumbers = trimmedNumber.split('.');
            const prevNumbers = previousNumber.split('.');
        
            let incremented = false;
            
            // Start by checking the last number
            if (parseInt(currentNumbers[2]) === parseInt(prevNumbers[2]) + 1) {
              incremented = true;
            } else if (parseInt(currentNumbers[1]) === parseInt(prevNumbers[1]) + 1) {
              // If the last number is not incremented, check the middle number
              incremented = true;
            } else if (parseInt(currentNumbers[0]) === parseInt(prevNumbers[0]) + 1) {
              // If both last and middle numbers are not incremented, check the first number
              incremented = true;
            }
        
            expect(incremented).to.be.true;
          }
        
          previousNumber = trimmedNumber;
        }
        
      
        cy.get('.nazov-fade').each(($el, index, $list) => {
          cy.wrap($el).invoke('text').then((exerciseNumber) => {
            performActions(exerciseNumber);
          });
        });
      }
            
      
      

      function kontrola2() {
        console.log('kontrola2')

        let previousNumber = null;

        function performActions(exerciseNumber) {
          const trimmedNumber = exerciseNumber.split(' - ')[0].trim();
          console.log(trimmedNumber);
        
          if (previousNumber !== null) {
            const currentNumbers = trimmedNumber.split('.');
            const prevNumbers = previousNumber.split('.');
        
            let decremented = false;
        
            // Check if the last number is decremented by 1
            if (parseInt(currentNumbers[2]) === parseInt(prevNumbers[2]) - 1) {
              decremented = true;
            } else if (parseInt(currentNumbers[1]) === parseInt(prevNumbers[1]) - 1) {
              // If the last number is not decremented, check the middle number
              decremented = true;
            } else if (parseInt(currentNumbers[0]) === parseInt(prevNumbers[0]) - 1) {
              // If both last and middle numbers are not decremented, check the first number
              decremented = true;
            }
        
            expect(decremented).to.be.true;
          }
        
          previousNumber = trimmedNumber;
        }
        
        cy.get('.nazov-fade').each(($el, index, $list) => {
          cy.wrap($el).invoke('text').then((exerciseNumber) => {
            performActions(exerciseNumber);
          });
        });

      }
      
      
      

      
                  
    })
    })
    }) 




  });

