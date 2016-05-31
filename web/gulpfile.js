/*
 * This is the build and test running file for gulp. This is a streamlined version for demo purposes.
 * Additional tasks would exist for production supporting minification and multiple backends (oracle
 * and elastic) would be included.
 */

// Load all the gulp and testing libraries we'll be using in this gulp file
var gulp = require("gulp");
var concat = require("gulp-concat");
var concatCss = require("gulp-concat-css");


// All of our application .js files
var jsAppFiles = [
   "../web/scripts/app.js",
   "../web/scripts/config/routes.js",
   "../web/scripts/config/constants.js",            // This is before run.js as this may reset default constant values
   "../web/scripts/config/run.js",
   "../web/components/Edit/AddressEdit/addressEdit.js",
   "../web/components/Edit/AddressEditDetail/addressEditDetail.js",
   "../web/components/Edit/PersonEdit/personEdit.js",
   "../web/components/Edit/PhoneEdit/phoneEdit.js",
   "../web/components/Edit/PhoneEditDetail/phoneEditDetail.js",
   "../web/components/List/personList.js",
   "../web/components/View/AddressView/addressView.js",
   "../web/components/View/AddressViewDetail/addressViewDetail.js",
   "../web/components/View/PersonView/personView.js",
   "../web/components/View/PhoneView/phoneView.js",
   "../web/components/View/PhoneViewDetail/phoneViewDetail.js",
   "../web/scripts/controllers/editController.js",
   "../web/scripts/controllers/listController.js",
   "../web/scripts/controllers/loadController.js",
   "../web/scripts/controllers/newController.js",
   "../web/scripts/controllers/settingsController.js",
   "../web/scripts/controllers/viewController.js",
   "../web/scripts/filters/phoneNumber.js",
   "../web/scripts/filters/titleCase.js",
   "../web/scripts/services/ApiService.Firebase.js",
//   "../web/scripts/services/ApiService.Java.js",
   "../web/scripts/services/DataService.js",
   "../web/scripts/services/UtilityService.js"
];

/* All of our library .js files. Angular, jquery and bootstrap are first in case other libs have
 * dependencies. The rest of the libs are in alphabetic order.
 */
var jsLibFiles = [
   "../web/lib/angular.js",
   "../web/lib/jquery.js",
   "../web/lib/bootstrap.js",
   "../web/lib/angular-animate.js",
   "../web/lib/angular-busy.js",
   "../web/lib/angular-messages.js",
   "../web/lib/angular-route.js",
   "../web/lib/moment.js",
   "../web/lib/ng-table.js",
   "../web/lib/toaster.js",
   "../web/lib/ui-bootstrap-tpls.js"
];

/* All of our .css files (includes Bootstrap extensions). Note in increasing order of importance as css will
 * override previous settings.
 */
var cssFiles = [
    "../web/css/bootstrap.css",        // Bootstrap is foundational
//  "../web/css/bootstrap.paper.css",  // Paper/Material Design themed Bootstrap
    "../web/css/app.css",              // Do any overrides
    "../web/css/angular-busy.css",
    "../web/css/ng-table.css",
    "../web/css/toaster.css"
];


/*   Concatenate   */

// application .js files
gulp.task("debug-app-js-java", function() {
   return gulp.src(jsAppFiles)                          // Add our custom .js files
              .pipe(concat("AngularCRUDApp.debug.js"))  // Concatenate all .js files
              .pipe(gulp.dest("../web/dist"));          // Put it in our dist folder
});

// third party library .js files
gulp.task("debug-libs-js", function() {
   return gulp.src(jsLibFiles)                          // Add our .js files
              .pipe(concat("AngularCRUDLibs.debug.js")) // Concatenate all .js files
              .pipe(gulp.dest("../web/dist"));          // Put it in our dist folder
});

// CSS files - ours and 3rd party
gulp.task("debug-css", function () {
   return gulp.src(cssFiles)                            // Get our css files (by directory and/or file name)
               .pipe(concatCss("AngularCRUD.debug.css")) // Concatenate all .css files.
              .pipe(gulp.dest("../web/dist"));          // Put it with our other Bootstrap .css files.
});


/*   These are the "summary" tasks that are typically run at the command line   */

// Watch files and run tasks when they change.
gulp.task('watch', function() {
   gulp.watch([jsAppFiles], ['default']);
});

// Debug build without tests (call "gulp" to run).
gulp.task("default", ["debug-app-js-java", "debug-libs-js", "debug-css"]);
