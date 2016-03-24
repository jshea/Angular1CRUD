/*
 * Services to interact with our data storage via REST Web Services
 *
 *    Java/Jersey version
 */
(function() {

   'use strict';

   function ApiService($http, $rootScope, $q) {
      var self = this;

      // This is the path to add to our source URL to get to the REST url's
      var WS_URL = 'ws/person/';


      self.getAll = function getAll() {
         return $http.get(WS_URL);
      };

      self.getById = function getById(id) {
         return $http.get(WS_URL + id);
      };

      self.add = function add(person) {
         return $http.post(WS_URL, person);
      };

      self.update = function update(person) {
         return $http.put(WS_URL, person);
      };

      // Note delete is a JS reserved word, so we use deleteObj
      self.deleteObj = function deleteObj(id) {
         return $http.delete(WS_URL + id);
      };

         /*
          * Get a list of states to build a picklist and could be used for validation.
          */
      self.getStates = function getStates(successCallback, failureCallback) {
         var dataUrl = 'sampledata/states.json';   // URL for our state data

         $rootScope.isLoading = true;

         $http.get(dataUrl)
         .then(
            function (response) {
               successCallback(response.data);
               $rootScope.isLoading = false;
            },
            function (response) {
               console.log('httpFactory.writeLog() Error: ', response);
               failureCallback();
               $rootScope.isLoading = false;
            }
         );
      };

      /*
       * Note - This uses $q.all to wait until all promises (run in parallel) complete. This could
       *        overwhelm your REST service. Another strategy is to use $q.when to wait until all
       *        promises run sequentially, complete.
       *
       *        https://daveceddia.com/waiting-for-promises-in-a-loop/
       *
       *        var chain = $q.when();
       *        for(var i = 0; i < result.data.length; i++) {
       *           chain = chain.then(function() {
       *              return $http.post(WS_URL, result.data[i]);
       *           });
       *        }
       */
      self.loadSeedData = function loadSeedData(successCallback, failureCallback) {
         var sampleDataUrl = 'sampledata/sample.json';   // URL for our sample data
         var self = this;

         $rootScope.isLoading = true;

         // Delete the old data and load the sample data
         $http.delete(WS_URL + 'deleteall')
         .then(function() {
            // Get the sample data
            return $http.get(sampleDataUrl);
         })
         .then(function (result) {
            self.promises = [];

            // Iterate through local data saving to server
            for (var i = 0; i < result.data.length; i++) {
               // Push each promise to an array and then return $q.all([promiseArray])
               self.promises.push($http.post(WS_URL, result.data[i]));
            }
            $rootScope.isLoading = false;
            return $q.all(self.promises);
         })
         .finally(successCallback, failureCallback);
      };

   }

   // Register the service
   angular
      .module('angularcrud')
      .service('ApiService', ['$http', '$rootScope', '$q', ApiService]);
})();