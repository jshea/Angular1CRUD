/*
 * View component for displaying the detail for a Person
 * https://toddmotto.com/stateless-angular-components
 *
 *    usage: <person-view-component person="myPersonData"></person-view-component>
 */
(function() {

   'use strict';

   // Note: No controller. We're read only with the passed in data.
   var PersonViewComponent = {
      bindings: {
         person: '<'   // One way binding - Read Only
      },

      template: [
         '<div>',
            '<h3><span id="firstName">{{$ctrl.person.firstName}}</span> ',
                '<span id="lastName">{{$ctrl.person.lastName}}</span>',
            '</h3>',

            '<h4>Address</h4>',
            '<span id="street">{{$ctrl.person.address.street}}</span>',
            '<br>',
            '<span id="city">{{$ctrl.person.address.city}}</span> ',
            '<span id="state">{{$ctrl.person.address.state}}</span> ',
            '<span id="zip">{{$ctrl.person.address.zip}}</span>',
            '<br>',

            '<h4>Phone</h4>',
            '<b>Home</b> <span id="homePhone">{{$ctrl.person.homePhone | phoneNumber}}</span><br>',
            '<b>Mobile</b> <span id="mobile">{{$ctrl.person.mobile | phoneNumber}}</span><br>',

            '<h4>Electronic</h4>',
            '<b>eMail</b> <span id="email">{{$ctrl.person.email}}</span><br>',
            '<b>Website</b> <span id="website">{{$ctrl.person.website}}</span><br>',
         '</div>'
      ].join(''),

      controller: ['DataService',
                   function (DataService) {
         var self = this;

         self.states = DataService.states;

      }]

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('personViewComponent', PersonViewComponent);
})();
