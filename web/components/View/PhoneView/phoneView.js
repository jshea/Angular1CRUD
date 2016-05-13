/*
 * View component for displaying the detail for a Person
 * https://toddmotto.com/stateless-angular-components
 *
 *    usage: <phone-view-component phone="myPhoneData"></phone-view-component>
 */
(function() {

   'use strict';

   // Note: No controller. We're read only with the passed in data.
   var PhoneViewComponent = {
      bindings: {
         person: '<'   // One way binding - Read Only
      },

      template: [
         '<div>',
            '<h4>Phone</h4>',
            '<b>Home</b> <span id="homePhone">{{$ctrl.person.homePhone | phoneNumber}}</span><br>',
            '<b>Mobile</b> <span id="mobile">{{$ctrl.person.mobile | phoneNumber}}</span><br>',
         '</div>'
      ].join(''),

      controller: function () {}

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('phoneViewComponent', PhoneViewComponent);
})();
