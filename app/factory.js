;(function() {

  /**
   * Facebook factory
   */
   
  angular
    .module('ConnectifyWeb')
    .factory('FacebookService', getDataFromFacebook);

  getDataFromFacebook.$inject = ['$rootScope', '$location', '$q'];


  ////////////


  function getDataFromFacebook($rootScope, $location, $q) {

    var _self = this;

    _self.getUserInfo = function() {
        
        var deferred = $q.defer();
        
        FB.api('/me', function(response) {
            if (!response || response.error) {
                  deferred.reject('Error occured');
            } else {
                  deferred.resolve(response);
            }
        });
        
        return deferred.promise;
    } // End of getUserInfo

    _self.watchLoginChange = function() {
        
        FB.Event.subscribe('auth.authResponseChange', function(res) {

            if (res.status === 'connected') {

              console.log("User is connected.");

            } else {

              /*
               The user is not logged to the app, or into Facebook:
               destroy the session on the server.
              */
              $location.url('/login');

            }

        });

    } // End of watchLoginChange

    _self.logout = function() {

      FB.logout(function(response) {
        $rootScope.$apply(function() {
          $rootScope.user = {};
        });
      });

    } // End of logout

    return _self;

  }


})();
