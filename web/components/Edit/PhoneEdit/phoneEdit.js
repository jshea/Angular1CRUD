/*
 * usage: <phone-edit-component phone-numbers="phoneNumbers"></phone-edit-component>
 */
(function() {

   'use strict';

   // Note: No controller. We're read only with the passed in data.
   var PhoneEditComponent = {
      bindings: {
         phoneNumbers: '<'   // One way binding - Read Only
      },

      template: [
         '<h4>Phone</h4>',
         '<div ng-repeat="phone in $ctrl.phoneNumbers">',
            '<phone-edit-detail-component phone="phone"></phone-edit-detail-component>',
         '</div>'
      ].join(''),

      controller: function () {}

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('phoneEditComponent', PhoneEditComponent);
})();
