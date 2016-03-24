/*
 * Controller for the listing page.
 */
(function() {

   'use strict';

   function ListController(DataService) {

      // Save a pointer to our current context
      var self = this;

      // Get all data and show it in a list
      DataService.personGetAll(
         function (data) {
            self.personListData = data;
         }
      );
   };

   // Register our controller
   angular
      .module('angularcrud')
      .controller('ListController', ['DataService', ListController]);
})();
