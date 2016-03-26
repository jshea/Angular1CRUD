/*
 * Controller for reinitializing the database.
 */
(function() {

   'use strict';

   function LoadController($location, DataService) {

      // Save a pointer to our current context
      var self = this;

      // Delete all existing data and reload our sample data
      DataService.loadSeedData(
         function () {
            $location.path('/');
         }
      );
   };

   // Register our controller
   angular
      .module('angularcrud')
      .controller('LoadController', ['$location', 'DataService', LoadController]);
})();
