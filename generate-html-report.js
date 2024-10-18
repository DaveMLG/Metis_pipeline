const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'cypress/cypress-json',
  reportPath: './cypress/reports',
  metadata: {
    browser: {
      name: 'chrome',
      version: 'xx',
    },
    device: 'Local test machine',
    platform: {
      name: 'windows',
      version: '10',
    },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Cypress Test' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
      { label: 'Execution End Time', value: new Date().toLocaleString() },
    ],
  },
});
