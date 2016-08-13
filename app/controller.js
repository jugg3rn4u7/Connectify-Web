/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('ConnectifyWeb')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['FacebookService', '$window', '$rootScope', '$scope', '$location', 'QueryService', 'md5', 'Session'];

  function LoginController(FacebookService, $window, $rootScope, $scope, $location, QueryService, md5, Session) {
    
    $scope.user = {
      phoneNumber: "",
      password: ""
    };

    $scope.login = function () {

       var visitor_id = $rootScope.visitor_id;
       var phoneNumber = $scope.user.phoneNumber;
       var password = $scope.user.password;
       var salt = md5.createHash(phoneNumber + "_" + password);

       QueryService.query('POST', 'authenticate', {}, { salt: salt })
          .then(function(ovocie) {
            
            self.ovocie = ovocie.data;
            
            var result = self.ovocie["result"];
            
            if(result == "valid") {
                
                console.log("You have been logged in !");

                $rootScope.user_info.isRegistered = 1;
                $rootScope.user_info.isLogged = 1;
                RouteManager.nextRoute();

            } else {
               console.log("Oops ! Your credentials are incorrect. Please try again...");
            }
          });
    };

    $window.fbAsyncInit = function() {

      FB.init({
        
        appId: '1628447944135801',

        status: true,

        cookie: true,

        xfbml: true,

        version: 'v2.6'

      });

      FacebookService.watchLoginChange();

    };

  };

  var getVisitorInfo = function ( LocalStorage ) {

    var uuid = function () {
        return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        })).replace("\"", "");
    };
  
    var visitor_id = null, 
        visit_count = 0;

    if( LocalStorage.exists() ) {

      visitor_id = LocalStorage.get( 'visitor_id' );
      visit_count = LocalStorage.get( 'visit_count' );

      if( !visitor_id ) { // new visitor
        LocalStorage.set( 'visitor_id' , uuid());
        LocalStorage.set( 'visit_count' , 1);

        navigator.geolocation.getCurrentPosition( function(position) {
          LocalStorage.set( 'latitude' , position.coords.latitude);
          LocalStorage.set( 'longitude' , position.coords.longitude);
        });
        
      } else {
        LocalStorage.update( 'visit_count' , ++visit_count);

        navigator.geolocation.getCurrentPosition( function(position) {
          LocalStorage.update( 'latitude' , position.coords.latitude);
          LocalStorage.update( 'longitude' , position.coords.longitude);
        });
      }

    } else {
      // No LocalStorage; Use Cookies;

      visitor_id = Cookies.get( 'visitor_id' );
      visit_count = Cookies.get( 'visit_count' );

      if( !visitor_id ) { // new visitor; Expire cookie after a year
        Cookies.set( 'visitor_id', uuid(), { expires: 365 }); 
      } 
        
      Cookies.set( 'visit_count', ++visit_count, { expires: 365 });

      navigator.geolocation.getCurrentPosition( function(position) {
        Cookies.set( 'latitude', position.coords.latitude, { expires: 365 });
        Cookies.set( 'longitude', position.coords.longitude, { expires: 365 });
      });
      
    }  

      // Update database with visit_count and user_rating; send new data to server.

    return {
      visitor_id: visitor_id,
      visit_count: visit_count
    }; 

  };


  angular
    .module('ConnectifyWeb')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$rootScope','$scope', 'QueryService', 'LocalStorage', 'RouteManager'];

  function RegisterController($rootScope, $scope, QueryService, LocalStorage, RouteManager) {

    var self = this;

    var visitor_info = getVisitorInfo( LocalStorage );

    $rootScope.visitor_id = visitor_info.visitor_id;

    $scope.passwordError = "";

    $scope.user = {
      password: "",
      passwordConfirm: ""
    };

    $scope.canRegister = "";

    $scope.checkMatch = function () {
        if ( $scope.user.password != $scope.user.passwordConfirm ) {
            $scope.passwordError = "Passwords don't match...";
        } else {
            $scope.passwordError = "Passwords match !";
            if( !!$rootScope.userVerified ) {
               $scope.canRegister = "checked";
            } else {
               $scope.canRegister = "";
               $rootScope.verifiedStatus = "Your phone number has not been verified. Please click 'Send Code' to send verification code your number !";
            }
        }
    };

    $scope.registerUser = function() {

        var visitor_id = $rootScope.visitor_id;
        var phoneNumber = $rootScope.fullNumber;
        var password = $scope.user.password;
        
        /**
         * Register - Backend API
         * @return {Object} Returned object
         */
        QueryService.query('POST', 'register', {}, { visitor_id: visitor_id, phoneNumber: phoneNumber, password: password })
          .then(function(ovocie) {
            
            var data = ovocie.data;
            
            if(data.result == "ok") {
               $rootScope.user_info.isRegistered = 1;
               RouteManager.nextRoute();
            } else {
               $scope.registrationStatus = "Oops ! We were not able to register you. Please try again...";
            }
          });
    };

  };


  angular
    .module('ConnectifyWeb')
    .controller('ManageProfileController', ManageProfileController);

  ManageProfileController.$inject = ['$rootScope', '$scope', 'Session', 'CONSTANTS'];

  function ManageProfileController($rootScope, $scope, Session, CONSTANTS) {

      var data = $rootScope.session;
      var salt = null;//data.salt;
      var UPLOAD_URL = CONSTANTS.API_URL + "upload-avatar?salt=" + salt;

      $rootScope.user_info.isRegistered = 1;
      $rootScope.user_info.isLogged = 1;
      $rootScope.user_info.hasManagedProfile = 1;
      //RouteManager.nextRoute();

      $scope.config = {
          singleFile: true, 
          target: UPLOAD_URL, 
          testChunks: false
      };

      var profilePic = angular.element("#profile-picture");

      $scope.$on('flow::fileAdded', function (event, $flow, flowFile) {
          profilePic.removeClass("profile-pic-default");
          profilePic.addClass("profile-pic");
      });

      $scope.$on('flow::fileRemoved', function (event, $flow, flowFile) {
          profilePic.removeClass("profile-pic");
          profilePic.addClass("profile-pic-default");  
      });      

  };

})();