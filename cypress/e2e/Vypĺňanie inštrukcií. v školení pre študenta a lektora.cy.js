describe('Vlastník obsahu', function() {
    beforeEach(() => {
      cy.loginAdmin('cy.vo', 'ML_heslo1');
      cy.viewport(1920, 937)
      cy.visit('https://dev.metis.academy/admin')

      })

    it('Hromadné vypĺňanie inštrukcií pre lektora (globalne)', function() {
        cy.wait(500)
        cy.get('.icon-menu-elearning').click()
        cy.get('[href="/admin/elearning/training"]').click()
        cy.get('[training-keyword="keyword"]').type('G školenie AAA')
        cy.get('[global-search="search"]').click()
        cy.wait(1000)
        cy.get('[class="af-table table table-striped table-bordered table-hover table-component"]').contains('Neprevzaté').parent().parent().contains('G školenie AAA').click()
        cy.get('[class="nav nav-tabs"]').find('li').last().click()
        cy.get('[name="instruction"]').select(1)
        cy.get('[global-search="search"]').click()
        cy.contains('Hromadne pridať inštrukciu').click()
        cy.get('[class="note-editable panel-body"]').type('Inštrukcia pre lektora (globálna)')
        cy.get('[type="submit"]').contains('Vložiť').click().wait(3000)

        //Kontrola inštrukcií
        cy.get('table').find('tr').then((value) => {
            for (let x=1; x<value.length; x++) {
                cy.wrap(value).eq(x).find('td').eq(8).invoke('text').then((textVal) => {
                    console.log(textVal)
                })
            }
        })
    })
})