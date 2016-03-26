/*
 * Controller for the edit page.
 *
 *    One must inject $scope to use $emit/$on
 *    http://stackoverflow.com/questions/28497208/angular-js-controller-as-scope-on
 */
(function() {

   'use strict';

   function EditController($scope, $routeParams, $location, DataService) {

      // Save a pointer to our current context
      var self = this;

      // Initialize our data to the document with key of $routeParams.id
      DataService.personGet($routeParams.id,
         function (data) {
            self.person = data;
         }
      );


      /*   Listen for events emitted from our Person Edit component   */

      // Save button was clicked - Save person and view their new detail
      $scope.$on('personUpdate',
         function (event, person) {
            DataService.personUpdate(person,
               function(person) {
                  $location.path('/view/' + person.id);
               }
            );
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

   // Register our controller with our application module
   angular
      .module('angularcrud')
      .controller('EditController', ['$scope', '$routeParams', '$location', 'DataService', EditController]);
})();
