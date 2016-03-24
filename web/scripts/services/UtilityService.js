(function() {
   'use strict';

   function UtilityService(toaster) {
      var self = this;

      /*   Toasts   */

      self.showToastSuccess = function showToastSuccess(message) {
         toaster.pop('success', 'Success', message, 2000);
      };

      self.showToastError = function showToastError(message) {
         toaster.pop('error', message);
      };

   }

   angular
      .module('angularcrud')
      .service('UtilityService', ['toaster', UtilityService]);
})();