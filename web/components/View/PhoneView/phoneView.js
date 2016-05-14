/*
 * usage: <phone-view-component phone="phoneNumbers"></phone-view-component>
 */
(function() {

   'use strict';

   // Note: No controller. We're read only with the passed in data.
   var PhoneViewComponent = {
      bindings: {
         person: '<'   // One way binding - Read Only
      },

      template: [
         '<h4>Phone</h4>',
         '<div ng-repeat="phone in phoneNumbers">',
            '<phone-view-detail-component phone="phoneData"></phone-view-detail-component>',
         '</div>'
      ].join(''),

      controller: function () {}

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('phoneViewComponent', PhoneViewComponent);
})();
