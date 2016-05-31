/*
 * Edit component for an address
 *
 *    usage: <phone-detail-edit-component phone="phone"></phone-detail-edit-component>
 */
(function() {

   'use strict';

   var PhoneEditDetailComponent = {

      bindings: {
        phone: '='   // Two way binding - we're updating the original value in our parent
      },

      template: [
        '<div class="row">',
          '<div class="col-xs-12">',

              // Phone type
              '<div class="form-group">',
                '<label for="type" class="control-label col-lg-2">Type:</label>',
                '<div class="col-lg-4">',
                    '<input type="text" id="type" name="phoneType" ng-model="$ctrl.phone.type"',
                          'class="form-control" placeholder="Phone type">',
                '</div>',
              '</div>',

              // Phone number
              '<div class="form-group">',
                '<label for="phone" class="control-label col-lg-3">Phone:</label>',
                '<div class="col-lg-4">',
                    '<input type="text" id="number" name="number" ng-model="$ctrl.phone.number"',
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
     .component('phoneEditDetailComponent', PhoneEditDetailComponent);
})();
