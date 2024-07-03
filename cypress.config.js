module.exports = {
  e2e: {
    projectId: "vy2679",
    setupNodeEvents(on, config) {
    },
  },
  browser: {
    name: 'edge',
    family: 'chromium',
    channel: 'stable',
    args: [
      '--max_old_space_size=8192' 
    ]
  }
};
