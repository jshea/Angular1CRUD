(function() {
   'use strict';

   function DataService(ApiService, UtilityService, $rootScope) {
      var self = this;

      // An array of state objects, abbreviation and name.
      self.states = [];

     /**
      * Initialize/set the states value.
      *
      * @param {type} states
      * @returns {undefined}
      */
      self.setStates = function setStates(states) {
         self.states = states;
      };


      /*   Getting/Setting data   */

      // Get one person by id
      self.personGet = function personGet(personId, successCallBack) {
         $rootScope.isLoading = true;

         ApiService.getById(personId)
         .then(
            function (data) {
               successCallBack(data);
            }
         )
         .catch(
            function (response) {
               console.log("ApiService.personGet() Error: ", response);
               UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
            }
         )
         .finally(
            function() {
               $rootScope.isLoading = false;
            }
         );
      };


      // Get all people, no guarantee on sort order!
      self.personGetAll = function personGetAll(successCallBack) {
         $rootScope.isLoading = true;

         ApiService.getAll()
         .then(
            function (data) {
               successCallBack(data);
            }
         )
         .catch(
            function (response) {
               console.log("ApiService.personGetAll() Error: ", response);
               UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
            }
         )
         .finally(
            function() {
               $rootScope.isLoading = false;
            }
         );
      };


      // Add a new person
      self.personAdd = function personAdd(person, successCallBack) {
         $rootScope.isLoading = true;

         ApiService.add(person)
         .then(
            function(data) {
               UtilityService.showToastSuccess('Person added - Your changes have been saved');
               successCallBack(data);
            }
         )
         .catch(
            function (response) {
               console.log("ApiService.personAdd() Error: ", response);
               UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
            }
         )
         .finally(
            function() {
               $rootScope.isLoading = false;
            }
         );
      };


      // Update an existing person
      self.personUpdate = function personUpdate(person, successCallBack) {
         $rootScope.isLoading = true;

         ApiService.update(person)
         .then(
            function(data) {
               UtilityService.showToastSuccess('Changes saved - Your changes have been saved');
               successCallBack(data);
            }
         )
         .catch(
            function (response) {
               console.log("ApiService.personUpdate() Error: ", response);
               UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
            }
         )
         .finally(
            function() {
               $rootScope.isLoading = false;
            }
         );
      };


      // Delete a person
      self.personDelete = function personDelete(personId, successCallBack) {
         $rootScope.isLoading = true;

         ApiService.deleteObj(personId)
         .then(
            function() {
               UtilityService.showToastSuccess('Changes saved - Item deleted');
               successCallBack();
            }
         )
         .catch(
            function (response) {
               console.log("ApiService.personDelete() Error: ", response);
               UtilityService.showToastError('Web Service call failed - save ' + response.config.url + ' failed.');
            }
         )
         .finally(
            function() {
               $rootScope.isLoading = false;
            }
         );
      };

   }

   // Register the service
   angular
      .module('angularcrud')
      .service('DataService', ['ApiService', 'UtilityService', '$rootScope', DataService]);
})();