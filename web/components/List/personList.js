/*
 * View component for displaying the detail for a Person
 * https://toddmotto.com/stateless-angular-components
 *
 *    usage: <person-view-component person="myPersonData"></person-view-component>
 */
(function() {

   'use strict';

   var PersonListComponent = {
     bindings: {
       personListData: '<'
     },
     template: [
         '<table id="listTable"',
             'ng-table="$ctrl.table"',
             'class="table table-condensed table-bordered table-hover table-striped"',
             'show-filter="true">',

            '<tr ng-repeat="person in $data | orderBy:[\'lastName\', \'firstName\']">',
               '<td id="cellName" title="\'Name\'" filter="{ lastName: \'text\'}" sortable="\'lastName\'">',
                  '<a id="cellNameLink" href="#/view/{{person.id}}">{{person.lastName}}, {{person.firstName}}</a>',
               '</td>',
               '<td id="cellPhone" title="\'Phone\'" filter="{ mobile: \'text\'}" sortable="\'mobile\'">',
                  '{{person.mobile | phoneNumber}}',
               '</td>',
            '</tr>',

         '</table>'
      ].join(''),
      controller: function ($scope, NgTableParams) {
         var self = this;

         // Initialize the table when data is loaded
         $scope.$watch('$ctrl.personListData', function() {
            if (self.personListData) {
               if (self.personListData.length < 25) {
                  self.table = new NgTableParams({count: self.personListData.length}, {dataset: self.personListData, counts: []});
               }
               else {
                  self.table = new NgTableParams({}, {dataset: self.personListData});
               }
            }
         });
      }

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('personListComponent', PersonListComponent);
})();
