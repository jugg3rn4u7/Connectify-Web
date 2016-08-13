/**
 * 
 * AngularJS Boilerplate
 * @description           Description
 * @author                Jozef Butko // www.jozefbutko.com/resume
 * @url                   www.jozefbutko.com
 * @version               1.1.7
 * @date                  March 2015
 * @license               MIT
 * 
 */
;(function() {


  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('ConnectifyWeb', [
      'ngRoute', 'angular-md5', 'flow'
    ])
    .config(config);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider', '$provide'];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   * 
   */
  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider, $provide) {

    $locationProvider.html5Mode(false);

    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterController',
        controllerAs: 'register'
      })
      .when('/manage-profile', {
        templateUrl: 'views/profile.html',
        controller: 'ManageProfileController',
        controllerAs: 'manage_profile'
      })
      .when('/invite-friends', {
        templateUrl: 'views/invite-friends.html',
        controller: 'InviteFriendsController',
        controllerAs: 'invite_friends'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push('authInterceptor');
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);

    $provide.decorator("$exceptionHandler", [ '$delegate', function($delegate) {
            
            return function(exception, cause) {
                
                $delegate(exception, cause);

                var formatted = '';
                var properties = '';
                formatted += 'Exception: "' + exception.toString() + '"\n';
                formatted += 'Caused by: ' + cause + '\n';

                properties += (exception.message) ? 'Message: ' + exception.message + '\n' : ''
                properties += (exception.fileName) ? 'File Name: ' + exception.fileName + '\n' : ''
                properties += (exception.lineNumber) ? 'Line Number: ' + exception.lineNumber + '\n' : ''
                properties += (exception.stack) ? 'Stack Trace: ' + exception.stack + '\n' : ''

                if (properties) {
                  formatted += properties;
                }

                console.log(formatted);
            };
        }]);

  }


  /**
   * You can intercept any request or response inside authInterceptor
   * or handle what should happend on 40x, 50x errors
   * 
   */
  angular
    .module('ConnectifyWeb')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

  function authInterceptor($rootScope, $q, LocalStorage, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }

  angular
    .module('ConnectifyWeb')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);


  angular
    .module('ConnectifyWeb')
    .factory('RouteManager', getRouteManager);

  getRouteManager.$inject = ['$rootScope', '$location'];

  function getRouteManager($rootScope, $location) {

    var route = {

        nextRoute: function () {

            var user_info = $rootScope.user_info;
            var route = "";

            // if visitor registered
            if( user_info.isRegistered == 1 ) {

              // if user has managed profile
              if( user_info.hasManagedProfile == 0 ) {
                  route = '/manage-profile';
              } // if user has NOT managed profile
              else if( user_info.hasManagedProfile == 1 ) {

                // if user has NOT invited friends
                if( user_info.hasInvitedFriends == 0 ) {
                    route = '/invite-friends';
                } else { // After everything, home page
                  route = '/home';
                }
              }

            } else if( user_info.isLogged == 1 ) { // if NOT logged in go HOME
                route = '/home';
            } else { // login page
                route = '/';
            }

            $location.path(route).replace();

            return this;

        } // End of nextRoute
    };

    return route; // Route Object
  };


  /**
   * Run block
   */
  angular
    .module('ConnectifyWeb')
    .run(run);

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {

    $rootScope.user_info = {
       isLogged: 0,
       isRegistered: 0,
       hasManagedProfile: 0,
       hasInvitedFriends: 0,
       atHome: 0
    };

    // put here everything that you need to run on page load

    (function(d, s, id) {
       
       var js, fjs = d.getElementsByTagName(s)[0];
       
       if (d.getElementById(id)) {return;}
       
       js = d.createElement(s); js.id = id;
       
       js.src = "//connect.facebook.net/en_US/sdk.js";
       
       fjs.parentNode.insertBefore(js, fjs);

     } (document, 'script', 'facebook-jssdk'));

  }

})();