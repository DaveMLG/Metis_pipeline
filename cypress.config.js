module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      include: ["node_modules/cypress", "./cypress/**/*.js"]
    },
  },
};
