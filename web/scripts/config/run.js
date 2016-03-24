(function() {

   'use strict';

   /**
    *
    * @param {type} $window         Base DOM object for checking networking connectivity
    * @param {type} $rootScope      Root of AngularJS data where we'll set online/offline status
    * @param {type} ApiService
    * @param {type} DataService
    * @param {type} UtilityService
    * @returns {undefined}
    */
   function Run($window, $rootScope, ApiService, DataService, UtilityService) { // , WS_URL

      /*
       * Sets a global variable ($rootScope.online) to true when we gain network availability.
       *
       * @returns {undefined}
       */
      function onOnline() {
         $rootScope.$apply(function() {
            $rootScope.online = true;
         });
      }


      /*
       * Sets a global variable ($rootScope.online) to false when we lose network availability.
       *
       * @returns {undefined}
       */
      function onOffline() {
         $rootScope.$apply(function() {
            $rootScope.online = false;
         });
      }


      /*
       * Variable containing network status (online true or false), note we don't (but should) also
       * test access to our REST Web Service. We're assuming since we have a network connection we
       * must be able to access our data!
       */
      $rootScope.online = $window.navigator.onLine;

      // Set our on/off line functions as event listeners
      $window.addEventListener('offline', onOffline, false);
      $window.addEventListener('online',  onOnline,  false);

      /*
       * Load our states
       * TODO - Move to DataService
       */
      ApiService.getStates(
         // WS Success
         function (data) {
            DataService.setStates(data);
         },
         // WS Failure
         function () {
            UtilityService.showToastError("Web Service call failed - getStates failed.");
         }
      );


      /* This is an example of saving user variables in the browsers localStorage.
       *
       * Get the REST web service URL from localStorage. If this is the first run (or localStorage
       * has been cleared) the returned value will be null. If null the user will be redirected to
       * the settings page where it can be set.
       *
       * In localStorage, if the key isn't found null is returned
       */
//      WS_URL = localStorage.getItem('WS_URL');

      // This is how we could automatically set the URL at startup. By using this with localstorage
      // we could have a default data url that the user could override.
      /*
      if ($rootScope.RESTURL === null) {
         $rootScope.RESTURL = '/angularcrudperson/';
         localStorage.setItem('RESTURL', $rootScope.RESTURL);   // Persist the URL to localStorage for future use
      }
      */
   }

   // Register this with our application module
   angular
      .module('angularcrud')
      .run(['$window', '$rootScope', 'ApiService', 'DataService', 'UtilityService', Run]);   // , 'WS_URL'
})();
