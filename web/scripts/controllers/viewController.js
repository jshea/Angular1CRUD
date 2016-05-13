/*
 * Controller for the view details page.
 */
(function() {

   'use strict';

   function ViewController($scope, $routeParams, $location, DataService) {

      var self = this;     // Save a pointer to our current context

      // Initialize our data based on id parameter
      DataService.personGet($routeParams.id,
         function (data) {
            self.person = data;
         }
      );


      /*   Listen for events emitted from our Person Edit component   */

      // Edit button was clicked - Load the edit screen
      $scope.$on('personEdit',
         function (event, person) {
            $location.path('/edit/' + person.id);
         }
      );

      // Delete button clicked - Delete person and return to main screen
      $scope.$on('personDelete',
         function (event, person) {
            DataService.personDelete(person.id,
               function() {
                  $location.path('/');
               }
            );
         }
      );
   };

   // Register our controller
   angular
      .module('angularcrud')
      .controller('ViewController', ['$scope', '$routeParams', '$location', 'DataService', ViewController]);
})();
