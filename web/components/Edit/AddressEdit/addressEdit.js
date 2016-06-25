/*
 * usage: <address-edit-component address="addresses"></address-edit-component>
 */
(function() {

   'use strict';

   var AddressEditComponent = {
      bindings: {
         addresses: '='   // Two way binding - we're updating the original value in our parent
      },

      template: [
         '<h4>Address</h4>',
         '<div ng-repeat="address in $ctrl.addresses">',
            '<address-edit-detail-component address="address"></address-edit-detail-component>',
         '</div>'
      ].join(''),

      controller: function () {
         var self = this;

         this.$onChanges = function (changesObj) {
            if (changesObj.addresses) {
               console.log(self.addresses);
            }
         };
       }

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('addressEditComponent', AddressEditComponent);
})();
