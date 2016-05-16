/*
 * usage: <phone-view-component phone-numbers="phoneNumbers"></phone-view-component>
 */
(function() {

   'use strict';

   // Note: No controller. We're read only with the passed in data.
   var PhoneViewComponent = {
      bindings: {
         phoneNumbers: '<'   // One way binding - Read Only
      },

      template: [
         '<h4>Phone</h4>',
         '<div ng-repeat="phone in $ctrl.phoneNumbers">',
            '<phone-view-detail-component phone="phone"></phone-view-detail-component>',
         '</div>'
      ].join(''),

      controller: function () {}

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('phoneViewComponent', PhoneViewComponent);
})();
