/*
 * Edit component for an address
 *
 *    usage: <phone-detail-edit-component phone="phone"></phone-detail-edit-component>
 */
(function() {

   'use strict';

   var PhoneDetailEditComponent = {
      // Note - Our data binding is two way. We're updating the local copy in our parent component.
      bindings: {
        phoneNumbers: '='
      },

      template: [
        '<div class="row">',
          '<div class="col-xs-12">',

              // Phone type
              '<div class="form-group">',
                '<label for="type" class="control-label col-lg-2">Type:</label>',
                '<div class="col-lg-4">',
                    '<input type="text" id="type" name="phoneType" ng-model="$ctrl.phoneNumbers.type"',
                          'class="form-control" placeholder="Phone type">',
                '</div>',
              '</div>',

              // Phone number
              '<div class="form-group">',
                '<label for="phone" class="control-label col-lg-3">Phone:</label>',
                '<div class="col-lg-4">',
                    '<input type="text" id="number" name="number" ng-model="$ctrl.phoneNumbers.number"',
                          'class="form-control" placeholder="Phone number">',
                '</div>',
              '</div>',

          '</div>',
        '</div>'
      ].join(''),

      controller: function () { }

   };

   // Register this component with our application module
   angular
     .module('angularcrud')
     .component('phoneDetailEditComponent', PhoneDetailEditComponent);
})();
