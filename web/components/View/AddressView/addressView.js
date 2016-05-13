/*
 * View component for displaying the address for a Person
 * https://toddmotto.com/stateless-angular-components
 *
 *    usage: <address-view-component address="myAddressData"></address-view-component>
 */
(function() {

   'use strict';

   // Note: No controller. We're read only with the passed in data.
   var AddressViewComponent = {
      bindings: {
         address: '<'   // One way binding - Read Only
      },

      template: [
         '<div>',
            '<h4>Address</h4>',
            '<span id="street">{{$ctrl.address.street}}</span>',
            '<br>',
            '<span id="city">{{$ctrl.address.city}}</span> ',
            '<span id="state">{{$ctrl.address.state}}</span> ',
            '<span id="zip">{{$ctrl.address.zip}}</span>',
         '</div>'
      ].join(''),

      controller: ['DataService', function (DataService) {
         var self = this;
         self.states = DataService.states;
      }]

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('addressViewComponent', AddressViewComponent);
})();
