/*
 * Controller for the new person page.
 */
(function() {

   'use strict';

   function NewController($scope, $location, DataService) {

      var self = this;     // Save a pointer to our current context
      self.person = {};    // Initialize the person object as an empty object

      // Add button was clicked - Save person and view their new detail
      $scope.$on('personAdded',
         function (event, person) {
            DataService.personAdd(person,
               function(person) {
                  $location.path('/view/' + person.id);
               }
            );
         }
      );

   };

   // Register our controller
   angular
      .module('angularcrud')
      .controller('NewController', ['$scope', '$location', 'DataService', NewController]);
})();
