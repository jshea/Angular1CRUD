/*
 * usage: <phone-edit-component phone="phoneNumbers"></phone-edit-component>
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
         '<div ng-repeat="phone in phoneNumbers">',
            '<phone-edit-detail-component phone="phoneData"></phone-edit-detail-component>',
         '</div>'
         // Add / Delete buttons, event emitting and catching
      ].join(''),

      controller: function () {}

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('phoneEditComponent', PhoneEditComponent);
})();
