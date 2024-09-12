module.exports = {
  viewportWidth: 1440,
  viewportHeight: 1200,
  env: {
    websiteUrl:       'https://dev.metis.academy/admin',
    websiteUrlPortal: Cypress.env('websiteUrlPortal'),
    loginSK:       'cy.sk',
    loginAV:       'cy.av',
    loginET:       'cy.et',
    loginGO:       'cy.go',
    loginK:        'cy.k',
    loginL:        'cy.l',
    loginCO:       'cy.co',
    loginSAV:      'cy.sav',
    loginSKO:      'cy.sko',
    loginSVO:      'cy.svo',
    loginVO:       'cy.vo',
    loginP:        'cy.p',
    loginAA:       'cy.aa',
    loginAH:       'cy.ah',
    loginAVO:      'cy.avo',
    loginNAH:      'cy.nah',
    loginStudent1: 'cy.student1',
    password:      'ML_heslo1',
    vocy:          'vo, cy',
    avocy:         'avp, cy',
    gocy:          'go, cy',
    nahcy:         'nah, cy',
    lcy:           'l, cy',
    avcy:          'av, cy',
    etcy:          'et, cy',
    cocy:          'co, cy',
    kcy:           'k, cy',
    aacy:          'aa, cy',
  },
  e2e: {
    baseUrl: 'https://dev.metis.academy/admin',
    projectId: 'vy2679',
    downloadsFolder: '/MR_CY_test/cypress/downloads',
    setupNodeEvents(on, config) {
      const data = {};
      on('task', {
        save(x) {
          console.log('title', x);
          data['trainingTermTitle'] = x;
          return null;
        },
        load() {
          console.log('returning', data.trainingTermTitle);
          return data['trainingTermTitle'] || null;
        }
      });
    },
    watchForFileChanges: false,
  },
};
