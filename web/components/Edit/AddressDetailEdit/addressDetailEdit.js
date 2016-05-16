/*
 * Edit component for an address
 *
 *    usage: <address-detail-edit-component address="address"></address-detail-edit-component>
 */
(function() {

   'use strict';

   var AddressDetailEditComponent = {
      // Note - Our data binding is two way. We're updating the local copy in our parent component.
      bindings: {
        address: '='
      },

      template: [
         // Street
         '<div class="row">',
            '<div class="col-xs-12">',
               '<div class="form-group">',
                  '<label for="street" class="control-label col-lg-3">Street:</label>',
                  '<div class="col-lg-9">',
                     '<input type="text" id="street" name="street" class="form-control" placeholder="Street"',
                          'ng-model="$ctrl.localPerson.address.street">',
                '</div>',
              '</div>',
          '</div>',
         '</div>',

         '<div class="row">',
            '<div class="col-xs-12">',

               // City
               '<div class="form-group">',
                  '<label for="city" class="control-label col-lg-1">City:</label>',
                  '<div class="col-lg-3">',
                      '<input type="text" id="city" name="city" ng-model="$ctrl.localPerson.address.city"',
                            'class="form-control" placeholder="City">',
                  '</div>',
               '</div>',

               // State
              '<div class="form-group" ng-class="{ \'has-error\' : personForm.state.$invalid }">',
                '<label for="state" class="control-label col-lg-1">State: </label>',
                '<div class="col-lg-3">',
                    '<select name="state" id="state"',
                            'ng-options="item.abbreviation as item.name for item in $ctrl.states"',
                            'ng-model="$ctrl.localPerson.address.state">',
                    '</select>',
                '</div>',

                '<div ng-messages="personForm.state.$error" ng-if="personForm.state.$dirty" class="text-danger">',
                    '<div id="stateErrorMinLength" ng-message="minlength">State is too short</div>',
                    '<div id="stateErrorMaxLength" ng-message="maxlength">State is too long</div>',
                '</div>',
              '</div>',

              // Zip TODO validation should be length = 0 or 5
              '<div class="form-group" ng-class="{ \'has-error\' : personForm.zip.$invalid }">',
                '<label for="zip" class="control-label col-lg-1">Zip:</label>',
                '<div class="col-lg-3">',
                    '<input type="text" id="zip" name="zip" ng-model="$ctrl.localPerson.address.zip"',
                          'class="form-control" placeholder="Zip" minlength="5" ng-maxlength="5">',

                    '<div ng-messages="personForm.zip.$error" ng-if="personForm.zip.$dirty" class="text-danger">',
                      '<div id="zipErrorMinLength" ng-message="minlength">Zip is too short</div>',
                      '<div id="zipErrorMaxLength" ng-message="maxlength">Zip is too long</div>',
                    '</div>',

              '</div>',
            '</div>',

         '</div>',
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
     .component('addressDetailEditComponent', AddressDetailEditComponent);
})();
