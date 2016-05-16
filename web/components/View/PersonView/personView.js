/*
 * usage: <person-view-component person="myPersonData"></person-view-component>
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

            '<address-view-component addresses="$ctrl.person.addresses"></address-view-component>',
            '<br>',

            '<phone-view-component phone-numbers="$ctrl.person.phoneNumbers"></phone-view-component>',
            '<h4>Electronic</h4>',
            '<b>eMail</b> <span id="email">{{$ctrl.person.email}}</span><br>',
            '<b>Website</b> <span id="website">{{$ctrl.person.website}}</span><br>',

            '<button type="button" id="btnEdit" class="btn btn-primary" ng-click="$ctrl.onEdit()">',
               'Edit',
            '</button>',
            '&nbsp;&nbsp;',
            '<button type="button" id="btnDelete" class="btn btn-danger" ng-click="$ctrl.onDelete()">',
               'Delete',
            '</button>',
         '</div>'
      ].join(''),

      controller: ['$scope', function ($scope) {
         var self = this;

         self.onEdit = function () {
            $scope.$emit('personEdit', self.person);
         };

         self.onDelete = function () {
            $scope.$emit('personDelete', self.person);
         };
      }]

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('personViewComponent', PersonViewComponent);
})();
