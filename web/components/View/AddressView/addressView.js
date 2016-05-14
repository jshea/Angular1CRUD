/*
 * usage: <address-view-component address="addresses"></address-view-component>
 */
(function() {

   'use strict';

   // Note: No controller. We're read only with the passed in data.
   var AddressViewComponent = {
      bindings: {
         addresses: '<'   // One way binding - Read Only
      },

      template: [
         '<h4>Address</h4>',
         '<div ng-repeat="address in $ctrl.addresses">',
            '<address-view-detail-component address="address"></address-view-detail-component>',
         '</div>'
      ].join(''),

      controller: function () { }

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('addressViewComponent', AddressViewComponent);
})();
