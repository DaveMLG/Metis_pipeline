module.exports = {
  e2e: {
    baseUrl: "https://dev.metis.academy/admin",
    projectId: "r5bg3g",
    include: ["node_modules/cypress", "./cypress/**/*.js"],
    downloadsFolder: "/MR_CY_test/cypress/downloads",
    //retries: 2,


    setupNodeEvents(on, config) {
    const data = {}
    on ('task', {
      save(x) {
        console.log('title', x)
        data['trainingTermTitle'] = x
        return null
        },
          load() {
            console.log('returning', data.trainingTermTitle)
            return data['trainingTermTitle'] || null
          }
        });
      },

      watchForFileChanges: false
    },
};
