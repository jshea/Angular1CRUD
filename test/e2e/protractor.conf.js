/* global exports, jasmine */

exports.config = {
   // baseUrl: 'http://localhost:7001',          // Test local
   // baseUrl: 'https://ebsda02.jpl.nasa.gov:8000', // Test TRAIN
   framework: "jasmine2",                        // Use jasmine 2.x
   specs: [
      'controllers/spec.features.js',
      'controllers/spec.features.add.js',
      'controllers/spec.formValidation.js'
   ],
   exclude: [],

   allScriptsTimeout: 21000,
   getPageTimeout: 20000,

   jasmineNodeOpts: {
      showTiming: true,
      showColors: true,
      isVerbose: false,
      includeStackTrace: false,
      defaultTimeoutInterval: 520000,
      print: function() {} // Remove protractor dot reporter (since we are using jasmine spec reporter).
   },

   capabilities: {
      'browserName': 'chrome',
      'chromeOptions' : {
          'args': ['--lang=en', '--window-size=1500,950']
      }
   },

   // Set Protractor to test directly against Chrome and Firefox without using a Selenium Server.
   // Much faster.
   // Comment this out and use the seleniumServerJar instead if using any other browser other than Chrome or Firefox.
   directConnect: true,

   // seleniumServerJar: "./../../web/node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar",

   onPrepare: function() {
      browser.ignoreSynchronization = false;

      // Jasmine Spec Reporter.
      var SpecReporter = require("./../../web/node_modules/jasmine-spec-reporter");

      var SpecReporterOptions = {
         displayStacktrace: 'summary'
      };

      jasmine.getEnv().addReporter(new SpecReporter(SpecReporterOptions));
   }
};
