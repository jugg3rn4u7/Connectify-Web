;(function() {

  /**
   * Facebook factory
   */
   
  angular
    .module('ConnectifyWeb')
    .factory('FacebookService', getDataFromFacebook);

  getDataFromFacebook.$inject = ['$rootScope', '$location', 'Session', 'QueryService', 'md5', '$q'];

  function getDataFromFacebook($rootScope, $location, Session, QueryService, md5, $q) {

    var _self = this;

    _self.getUserInfo = function() {
        
        var deferred = $q.defer();
        
        FB.api('/me', function(response) {
            if (!response || response.error) {
                  deferred.reject('Error occured');
            } else {
                  console.log("FB logged in: ", response);
                  deferred.resolve(response);
            }
        });
        
        return deferred.promise;
    }; // End of getUserInfo

    _self.watchLoginChange = function() {
        
        FB.Event.subscribe('auth.authResponseChange', function(res) {

            if (res.status === 'connected') {

              console.log("User is connected.");
              console.log("FB connected: ", res);

              var userID = res.authResponse.userID;
              //$rootScope.session = Session.new(data.result.salt, 2);
              $location.path('/manage-profile').replace();

              // QueryService.query('POST', 'check-fb-user', {}, { userID: userID })
              //     .then(function(ovocie) {
                    
              //       var data = ovocie.data;
              //       var salt = md5.createHash(userID);
                    
              //       if(data.result == "valid") {

              //         $rootScope.session = Session.new(salt, 2);
              //         $location.path('/manage-profile').replace();
                       
              //       } else if(data.result == "invalid") {

              //         QueryService.query('POST', 'fb-register', {}, { userID: userID })
              //             .then(function(ovocie) {
                            
              //               var data = ovocie.data;
                            
              //               if(data.result.status == "ok") {

              //                 $rootScope.session = Session.new(data.result.salt, 2);
              //                 $location.path('/manage-profile').replace();
              //               } 
              //             });  

              //       } else {

              //           $location.path('/login').replace();

              //       }

              //     });  

            } else {

              /*
               The user is not logged to the app, or into Facebook:
               destroy the session on the server.
              */
              $location.path('/login').replace();
              _self.logout();

            }

        });

    }; // End of watchLoginChange

    _self.logout = function() {

      FB.logout();

    }; // End of logout

    return _self;

  };


})();
