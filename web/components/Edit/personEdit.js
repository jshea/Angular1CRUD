/*
 * Edit component for editing the detail for a Person (or adding a new person)
 *
 *    usage: <person-edit-component person="myPersonData"></person-edit-component>
 *
 *    One must inject $scope to use $emit/$on
 *    http://stackoverflow.com/questions/28497208/angular-js-controller-as-scope-on
 */
(function() {

   'use strict';

   var PersonEditComponent = {
      // Note - Our data binding is one way. We'll make a local copy for our
      // form to work with. On save we'll send back the updated local copy
      // of the data.
      bindings: {
        person: '<'
      },

      // Because the template is rather large we have it as an external file
      templateUrl: './components/PersonEdit/personEdit.html',

      controller: ['$scope', 'DataService', function ($scope, DataService) {
         var self = this;

         /*
          * Because person is being loaded as we're transitioning to
          * this page? Person is being loaded asynchronously and may
          * not be loaded yet?
          */
         $scope.$watch('$ctrl.person', function() {
            if (self.person) {
               self.localPerson = self.person;
            }
         });

         self.onAdd = function () {
            $scope.$emit('personAdd', self.localPerson);
         };

         self.onSave = function () {
            $scope.$emit('personUpdate', self.localPerson);
         };

         self.onDelete = function () {
            $scope.$emit('personDelete', self.localPerson);
         };

         self.states = DataService.states;
      }]

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('personEditComponent', PersonEditComponent);
})();
