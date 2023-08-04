import { defineConfig } from "cypress";

export default defineConfig({
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 2,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0
  },
  reporter: "mochawesome",
  reporterOptions: 
   {
      "reportDir": "cypress/results/json",
      "overwrite": false,
      "html": false,
      "json": true,
      suiteTitleSeparatedBy: " > ",
      testCaseSwitchClassnameAndName: false,
      rootSuiteTitle: "Angular Tests",
      toConsole: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
    supportFile:false,
    baseUrl: "https://htmlpreview.github.io/?https://raw.githubusercontent.com/ShellyDCMS/cypress-test-utils/main/index.html",
    viewportHeight: 1000,
    viewportWidth: 1600,
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    excludeSpecPattern: "cypress/**/*.driver.{js,jsx,ts,tsx}",
    defaultCommandTimeout: 50000,
    experimentalStudio: true
  },
    
   
});
