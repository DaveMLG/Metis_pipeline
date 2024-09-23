let tasks_Name = [],
    tasks_Diff = [],
    tasks_timeVal = []

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

  it('SPO odporúčanie šablóny', function () {
   
    cy.get('.page-sidebar-wrapper > .page-sidebar > .page-sidebar-menu > li:nth-child(3) > a').as('nastavenia');
    cy.get('@nastavenia').click();
    cy.get('[href="/admin/elearning/training"]').click()
    cy.wait(2000)
    cy.get('[type = "text"]').first().clear().type('CY testing_AAA')
    cy.get('[type="submit"]').first().click()
    cy.wait(5000);
    cy.sortTableByColumn('Vytvorené');
    cy.get('tbody').contains('Neprevzaté').parent().parent().contains('CY testing_AAA').click()
    cy.wait(5000)
    cy.get(':nth-child(5) > .nav-link').click().wait(2000)
    cy.get('[type="radio"]').eq(1).check({force: true})
    cy.get('[name="selectTheme"]').select(1)
    cy.get('[name="selectLesson"]').select(1)

    cy.get('[type="button"]').contains('Vložiť záznam').then((button) => {
      for (let x = 0; x < 3; x++) {
        cy.wrap(button).click()
      } 
    })
    cy.contains('Šablóna lekcie').next().find('tr').as('rows')

    cy.get('@rows').then((trs) => {
      for (let x = 1; x < trs.length; x++) {
        cy.wrap(trs[x]).find('select').first().select(x-1)
      }
    })

    cy.get('@rows').then((trs) => {
      for (let x = 1; x < trs.length; x++) {
        cy.wrap(trs[x]).find('select').eq(1).select(x)
      }
    })

    
    cy.get('@rows').then((trs) => {
      for (let x = 1; x < trs.length; x++) {
        cy.wrap(trs[x]).find('select').eq(1).invoke('val').then((value) => {
          value = parseInt(value)
          if (value === 3) {
            tasks_Name.push({taskName: 'Aut'})
          } else if (value === 8) {
            tasks_Name.push({taskName: 'Cvi'})
          } else if (value === 22) {
            tasks_Name.push({taskName: 'Ank'})
          } else if (value === 19) {
            tasks_Name.push({taskName: 'Dis'})
          }
        })
      }
    })

    cy.get('@rows').then((trs) => {
      for (let x = 1; x < trs.length; x++) {
        cy.wrap(trs[x]).find('select').eq(2).select(x - 1)
      }
    })

 

    
    cy.get('@rows').then((trs) => {
      for (let x = 1; x < trs.length; x++) {
        cy.wrap(trs[x]).find('select').eq(2).invoke('val').then((value) => {
          tasks_Diff.push({diff: value})
        })
      }
    })

    cy.get('@rows').then((trs) => {
      for (let x = 1; x < trs.length; x++) {
        cy.wrap(trs[x]).find('input').eq(1).clear().type('1:20')
      }
    })

    cy.get('@rows').then((trs) => {
      for (let x = 1; x < trs.length; x++) {
        cy.wrap(trs[x]).find('input').eq(1).invoke('val').then((value) => {
          tasks_timeVal.push({timeVal: value})
        })
      }
    })

    cy.get('[type="button"]').contains('Generovať úlohy').click()

    cy.contains('Zoznam úloh').next().find('tr:has(td[style*="background-color: rgb(233, 237, 154)"])').then((fields) => {
      for (let x = 0; x < fields.length; x++) {
        cy.wrap(fields[x]).find('span').first().invoke('text').then((taskText) => {
          expect(taskText).to.equal(tasks_Name[x].taskName);
        })
      }
    })
    cy.contains('Zoznam úloh').next().find('tr:has(td[style*="background-color: rgb(233, 237, 154)"])').then((fields) => {
      
      for (let x = 0; x < fields.length; x++) {
        cy.wrap(fields[x]).find('select').first().invoke('val').then((taskDiff) => {
          expect(taskDiff).to.equal(tasks_Diff[x].diff);
        })
      }

      for (let x = 0; x < fields.length; x++) {
        cy.wrap(fields[x]).find('input').eq(2).invoke('val').then((taskTimeVal) => {
          expect(taskTimeVal).to.equal(tasks_timeVal[x].timeVal);
        })
      }
    })
  })
})
    