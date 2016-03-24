/*
 * Controller for the view details page.
 */
(function() {

   'use strict';

   function ViewController($routeParams, $location, DataService) {

      var self = this;     // Save a pointer to our current context

      // Initialize our data based on id parameter
      DataService.personGet($routeParams.id,
         function (data) {
            self.person = data;
         }
      );

      // Handler for edit button
      self.edit = function () {
         $location.path('/edit/' + self.person.id);
      };

      // Handler for remove button
      self.delete = function () {
         DataService.personDelete(self.person.id,
            function() {
               $location.path('/');
            }
         );
      };
   };

   // Register our controller
   angular
      .module('angularcrud')
      .controller('ViewController', ['$routeParams', '$location', 'DataService', ViewController]);
})();
