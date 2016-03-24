/*
 * Controller for reinitializing the database.
 */
(function() {

   'use strict';

   function LoadController($location, ApiService, UtilityService) {

      // Save a pointer to our current context
      var self = this;

      // Delete all existing data and reload our sample data
      // TODO - Move this to a DataService call
      ApiService.loadSeedData(
         // WS Success
         function (response) {
            $location.path('/');
         },
         // WS Failure
         function (response) {
            UtilityService.showToastError('Web Service call failed - getAll ' + response.config.url + ' failed.');
         }
      );
   };

   // Register our controller
   angular
      .module('angularcrud')
      .controller('LoadController', ['$location', 'ApiService', 'UtilityService', LoadController]);
})();
