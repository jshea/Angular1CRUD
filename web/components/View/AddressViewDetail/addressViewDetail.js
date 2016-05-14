/*
 * usage: <address-view-detail-component address="myAddressData"></address-view-detail-component>
 */
(function() {

   'use strict';

   // Note: No controller. We're read only with the passed in data.
   var AddressViewDetailComponent = {
      bindings: {
         address: '<'   // One way binding - Read Only
      },

      template: [
         '<div>',
            '<h5><span id="type">{{$ctrl.address.type}}</span></h5>',
            '<span id="street">{{$ctrl.address.street}}</span>',
            '<br>',
            '<span id="city">{{$ctrl.address.city}}</span>',
            '<span id="state">{{$ctrl.address.state}}</span>',
            '<span id="zip">{{$ctrl.address.zip}}</span>',
         '</div>'
      ].join(''),

      controller: function () { }

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('addressViewDetailComponent', AddressViewDetailComponent);
})();
