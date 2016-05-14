/*
 * usage: <phone-view-detail-component phone="phoneData"></phone-view-detail-component>
 */
(function() {

   'use strict';

   // Note: No controller. We're read only with the passed in data.
   var PhoneViewDetailComponent = {
      bindings: {
         phone: '<'   // One way binding - Read Only
      },

      template: [
         '<div>',
            '<span id="type"><b>{{$ctrl.phone.type}}</b></span>',
            '<span id="number">{{$ctrl.phone.number | phoneNumber}}</span><br>',
         '</div>'
      ].join(''),

      controller: function () {}

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('phoneViewDetailComponent', PhoneViewDetailComponent);
})();
