/*global angular*/

angular.module('cgBusy',[]);

//loosely modeled after angular-promise-tracker
angular.module('cgBusy').factory('_cgBusyTrackerFactory', [
    '$timeout',
    '$q',
  function($timeout, $q){

    return function() {

        var tracker = {};

        var addPromiseLikeThing = function(promise){

            if (!tracker.isPromise(promise)) {
                throw new Error('cgBusy expects a promise (or something that has a .promise or .$promise');
            }

            if (tracker.promises.indexOf(promise) !== -1){
                return;
            }
            tracker.promises.push(promise);

            tracker.callThen(promise, function(){
                promise.$cgBusyFulfilled = true;
                if (tracker.promises.indexOf(promise) === -1) {
                    return;
                }
                tracker.promises.splice(tracker.promises.indexOf(promise),1);
            },function(err){
                tracker.errors.push(err);
                promise.$cgBusyFulfilled = true;
                if (tracker.promises.indexOf(promise) === -1) {
                    return;
                }
                tracker.promises.splice(tracker.promises.indexOf(promise),1);
            });
        };

        tracker.promises = [];
        tracker.errors = [];
        tracker.delayPromise = null;
        tracker.durationPromise = null;
        tracker.delayJustFinished = false;

        tracker.reset = function(options){
            tracker.minDuration = options.minDuration;

            tracker.promises = [];
            tracker.errors.splice(0, tracker.errors.length); // reset array

            angular.forEach(options.promises,function(p){
                if (!p || p.$cgBusyFulfilled) {
                    return;
                }
                addPromiseLikeThing(p);
            });

            if (tracker.promises.length === 0) {
                //if we have no promises then dont do the delay or duration stuff
                return;
            }

            tracker.delayJustFinished = false;
            if (options.delay) {
                tracker.delayPromise = $timeout(function(){
                    tracker.delayPromise = null;
                    tracker.delayJustFinished = true;
                },parseInt(options.delay,10));
            }
            if (options.minDuration) {
                tracker.durationPromise = $timeout(function(){
                    tracker.durationPromise = null;
                },parseInt(options.minDuration,10) + (options.delay ? parseInt(options.delay,10) : 0));
            }
        };

        tracker.isPromise = function(promiseThing){
            var then = promiseThing && (promiseThing.then || promiseThing.$then ||
                (promiseThing.$promise && promiseThing.$promise.then));

            return typeof then !== 'undefined';
        };

        tracker.callThen = function(promiseThing,success,error){
            var promise;
            if (promiseThing.then || promiseThing.$then){
                promise = promiseThing;
            } else if (promiseThing.$promise){
                promise = promiseThing.$promise;
            } else if (promiseThing.denodeify){
                promise = $q.when(promiseThing);
            }

            var then = (promise.then || promise.$then);

            then.call(promise,success,error);
        };

        tracker.active = function(){
            if (tracker.delayPromise){
                return false;
            }

            if (!tracker.delayJustFinished){
                if (tracker.durationPromise){
                    return true;
                }
                return tracker.promises.length > 0;
            }

			//if both delay and min duration are set,
			//we don't want to initiate the min duration if the
			//promise finished before the delay was complete
			tracker.delayJustFinished = false;
			if (tracker.promises.length === 0) {
				tracker.durationPromise = null;
			}
			return tracker.promises.length > 0;
        };

        tracker.hasError = function(){
            return tracker.errors.length > 0;
        };

        return tracker;

    };
}]);

angular.module('cgBusy').provider('cgBusyProfiles', function() {

    this.profiles = {};

    this.addProfile = function (profileName, profileValues) {
        if (!profileName) {
            throw new Error('profileName must be provided');
        }

		if (!angular.isObject(profileValues)) {
            throw new Error('profileValues must be an object!');
        }
        this.profiles[profileName] = profileValues;
        return this.profiles[profileName];
    };

    this.$get = function () {
        var profiles = this.profiles;
        return {
            get: function(profileName) {
                return profiles[profileName];
            },
            keys: function() {
                var key, keys = [];
                for (key in profiles) {
                  if (profiles.hasOwnProperty(key)) {
                    keys.push(key);
                  }
                }
                return keys;
            }
        };
    };
});

angular.module('cgBusy').value('cgBusyDefaults',{});

angular.module('cgBusy').directive('cgBusy', [
		'$compile',
		'$templateCache',
		'cgBusyDefaults',
		'cgBusyProfiles',
		'$http',
		'_cgBusyTrackerFactory',
		'$q',
		function(
			$compile,
			$templateCache,
			cgBusyDefaults,
			cgBusyProfiles,
			$http,
			_cgBusyTrackerFactory,
			$q
){
	return {
            restrict: 'AE',
            transclude: true,
            link: function(scope, element, attrs, fn, transcludeFn) {

                //Apply position:relative to parent element if necessary
                var position = element.css('position');
                if (position === 'static' || position === '' || typeof position === 'undefined'){
                    element.css('position','relative');
                }

                var templateElement;
                var backdropElement;
                var errorElement;
                var currentTemplate;
                var currentErrorTemplate;
                var templateScope;
                var backdrop;
                var tracker = _cgBusyTrackerFactory();
                var deregisterActiveWatch;
                var originalElementContent;

                var defaults = {
                    templateUrl: 'angular-busy.html',
                    delay:0,
                    minDuration:0,
                    backdrop: true,
                    aria: true, // add aria-busy tag to normal (not inline) mode
                    inline: false,
                    inlineReplace: true,
                    inlineErrorClass: 'cg-busy-error',
                    message:'Please Wait...',
                    wrapperClass: 'cg-busy cg-busy-animation',
                    errorTemplateUrl: undefined
                };

                angular.extend(defaults,cgBusyDefaults);

                scope.$watchCollection(attrs.cgBusy,function(options){

                    if (!options) {
                        options = {promise:null};
                    }

                    if (angular.isString(options)) {
                        throw new Error('Invalid value for cg-busy. cgBusy no longer accepts string ids to represent promises/trackers.');
                    }

                    //is it an array (of promises) or one promise
                    if (angular.isArray(options) || tracker.isPromise(options)) {
                        options = {promise:options};
                    }

                    var tmpOptions = angular.extend(angular.copy(defaults),options);
                    // if a profile exists, use those values and override with any options
                    if (tmpOptions.profile) {
                        var profileValues = cgBusyProfiles.get(options.profile);
                        if (profileValues) {
                           angular.extend(tmpOptions, profileValues, options);
                        }
                    }
                    options = tmpOptions;

                    if (!options.templateUrl){
                        options.templateUrl = defaults.templateUrl;
                    }

                    if (!angular.isArray(options.promise)){
                        options.promise = [options.promise];
                    }

                    // options.promise = angular.isArray(options.promise) ? options.promise : [options.promise];
                    // options.message = options.message ? options.message : 'Please Wait...';
                    // options.template = options.template ? options.template : cgBusyTemplateName;
                    // options.minDuration = options.minDuration ? options.minDuration : 0;
                    // options.delay = options.delay ? options.delay : 0;

                    if (!templateScope) {
                        templateScope = scope.$new();
                    }

                    templateScope.$message = options.message;
                    templateScope.$errors = tracker.errors;
                    templateScope.$inline = options.inline || '';

                    if (!angular.equals(tracker.promises,options.promise)) {
                        tracker.reset({
                            promises:options.promise,
                            delay:options.delay,
                            minDuration: options.minDuration
                        });
                    }

                    templateScope.$cgBusyIsActive = function() {
                        return tracker.active();
                    };

                    templateScope.$cgBusyHasError = function () {
                        return tracker.active() ? false : tracker.hasError();
                    };

                    templateScope.$applyCgBusy = function(indicatorTemplate, errorTemplate) {
                        if (angular.isFunction(deregisterActiveWatch)) {
                            deregisterActiveWatch();
                            deregisterActiveWatch = null;
                        }
                        if (options.inline) {
                            templateScope.$applyInlineCgBusy(indicatorTemplate, errorTemplate);
                        } else {
                            templateScope.$applyNormalCgBusy(indicatorTemplate, errorTemplate);
                        }
                    };

                    templateScope.$applyNormalCgBusy = function(indicatorTemplate, errorTemplate) {
                        options.backdrop = typeof options.backdrop === 'undefined' ? true : options.backdrop;

                        if (options.backdrop){
                            var backdrop = '<div class="cg-busy cg-busy-backdrop cg-busy-backdrop-animation ng-hide" ng-show="$cgBusyIsActive()"></div>';
                            backdropElement = $compile(backdrop)(templateScope);
                        }

                        var template = '<div class="'+options.wrapperClass+' ng-hide" ng-show="$cgBusyIsActive()">' + indicatorTemplate + '</div>';
                        if (options.errorTemplateUrl) {
                            template += '<div ng-if="$cgBusyHasError()">' + errorTemplate + '</div>';
                        }
                        templateElement = $compile(template)(templateScope);

                        angular.element(templateElement.children()[0])
                            .css({
                                'position': 'absolute',
                                'top': 0,
                                'left': 0,
                                'right': 0,
                                'bottom': 0
                            });

                       // Get the original content and append it
                        transcludeFn(scope, function (orig) {
                            originalElementContent = orig;
                            element.append(orig);

                            // add backdrop
                            if (options.backdrop) {
                              element.append(backdropElement);
                            }

                            // add cg-busy
                            element.append(templateElement);
                        });

                        // add aria-busy to element
                        if (options.aria) {
                            // set aria-busy based on cgBusyIsActive
                            deregisterActiveWatch = templateScope.$watch('$cgBusyIsActive()', function (busy) {
                                // element.attr('aria-busy', busy);
                                attrs.$set('aria-busy', busy);
                            });
                        }
                    };

                    templateScope.$applyInlineCgBusy = function(indicatorTemplate, errorTemplate) {
                        var template = '<div class="'+options.wrapperClass+'">' + indicatorTemplate + '</div>',
                          wrappedErrorTemplate;
                        templateElement = $compile(template)(templateScope);

                        // Get the original button content and append it
                        transcludeFn(scope, function (orig) {
                          originalElementContent = orig;
                          element.append(orig);
                        });

                        // get the width and height of the current element and let us
                        // set them on the new template element.
                        deregisterActiveWatch = templateScope.$watch('$cgBusyIsActive()', function (busy) {
                            if (busy) {
                                // append spinner to button
                                element.append(templateElement);
                            } else {
                                // promise resolved
                                templateElement.remove();

                                // remove any previous errors
                                if (errorElement) {
                                  errorElement.remove();
                                  errorElement = null;
                                }

                                if (options.errorTemplateUrl && templateScope.$cgBusyHasError()) {
                                  wrappedErrorTemplate = '<div class="'+options.inlineErrorClass+'">' + errorTemplate + '</div>';
                                  errorElement = $compile(wrappedErrorTemplate)(templateScope);
                                  element.parent().prepend(errorElement);
                                }
                            }
                            if (options.inlineReplace) {
                                // hide original element via visiblity so button does not shrink
                                originalElementContent.css('visibility', (busy ? 'hidden' : ''));
                            }
                            if (!attrs.ngDisabled) {
                              attrs.$set('disabled', busy);
                            }
                        });
                    };


                    if (!templateElement || currentTemplate !== options.templateUrl ||
                        backdrop !== options.backdrop ||
                        currentErrorTemplate !== options.errorTemplateUrl ) {

                        if (templateElement) {
                            templateElement.remove();
                        }
                        if (backdropElement){
                            backdropElement.remove();
                        }

                        currentTemplate = options.templateUrl;
                        backdrop = options.backdrop;
                        currentErrorTemplate = options.errorTemplateUrl;


                        $q.all({
                            template: $http.get(currentTemplate, {
                                cache: $templateCache
                            }),
                            errorTemplate: $q.when(currentErrorTemplate ? $http.get(currentErrorTemplate, {
                                cache: $templateCache
                            }) : {data: null})
                        }).then(function(results) {
                            templateScope.$applyCgBusy(results.template.data, results.errorTemplate.data);
                        }, function(err) {
                            throw new Error('Template(s) specified for cgBusy ('+options.templateUrl+ (options.errorTemplateUrl ? ' or ' + options.errorTemplateUrl : '') + ') +could not be loaded. ' + angular.toJson(err));
                        });
                    }

                },true);
            }
        };
    }
]);


angular.module('cgBusy').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-busy.html',
    "<div class=\"cg-busy-default-wrapper\">\n" +
    "\n" +
    "   <div class=\"cg-busy-default-sign\">\n" +
    "\n" +
    "      <div class=\"cg-busy-default-spinner\">\n" +
    "         <div class=\"bar1\"></div>\n" +
    "         <div class=\"bar2\"></div>\n" +
    "         <div class=\"bar3\"></div>\n" +
    "         <div class=\"bar4\"></div>\n" +
    "         <div class=\"bar5\"></div>\n" +
    "         <div class=\"bar6\"></div>\n" +
    "         <div class=\"bar7\"></div>\n" +
    "         <div class=\"bar8\"></div>\n" +
    "         <div class=\"bar9\"></div>\n" +
    "         <div class=\"bar10\"></div>\n" +
    "         <div class=\"bar11\"></div>\n" +
    "         <div class=\"bar12\"></div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"cg-busy-default-text\">{{$message}}</div>\n" +
    "\n" +
    "   </div>\n" +
    "\n" +
    "</div>"
  );

}]);