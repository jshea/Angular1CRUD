/*
 * usage: <address-edit-component address="addresses"></address-edit-component>
 */
(function() {

   'use strict';

   // Note: No controller. We're read only with the passed in data.
   var AddressEditComponent = {
      bindings: {
         addresses: '<'   // One way binding - Read Only
      },

      template: [
         '<h4>Address</h4>',
         '<div ng-repeat="address in $ctrl.addresses">',
            '<address-edit-detail-component address="address"></address-edit-detail-component>',
         '</div>'
         // Add / Delete buttons, event emitting and catching
      ].join(''),

      controller: function () { }

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('addressEditComponent', AddressEditComponent);
})();
