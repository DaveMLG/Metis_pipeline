const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  // Pridaj Cucumber preprocesor
  await addCucumberPreprocessorPlugin(on, config);

  // Nastav esbuild preprocesor
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    websiteUrl:       'https://dev.metis.academy/admin',
    websiteUrlPortal: 'https://dev.metis.academy/portal',
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
    specPattern: "**/*.feature", // Spracovanie .feature súborov
    setupNodeEvents,
    watchForFileChanges: false,
  },
});
