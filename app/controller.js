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
    .controller('MainController', MainController);

  MainController.$inject = ['LocalStorage', 'QueryService'];


  function MainController(LocalStorage, QueryService) {

    // 'controller as' syntax
    var self = this;

    var uuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };
  
    var visitor_id = null, 
        visit_count = 0, 
        user_rating = null;

    if( LocalStorage.exists() ) {

      visitor_id = LocalStorage.get( 'visitor_id' );
      visit_count = LocalStorage.get( 'visit_count' );
      user_rating = LocalStorage.get( 'user_rating' );

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
      user_rating = Cookies.get( 'user_rating' );

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
  

    ////////////  function definitions


    /**
     * Hello World message
     * @return {Object} Returned object
     */
    QueryService.query('GET', 'hello', {}, {})
      .then(function(ovocie) {
        self.ovocie = ovocie.data;
        console.log("Hello response: ", self.ovocie);
      });
  }

  angular
    .module('ConnectifyWeb')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['FacebookService', '$rootScope', '$scope', '$window', '$location', 'QueryService', 'md5', 'Session'];

  function LoginController(facebookService, $rootScope, $scope, $window, $location, QueryService, md5, Session) {

    $scope.user = {
      phoneNumber: "",
      password: ""
    };

    $scope.login = function () {

       var phoneNumber = $scope.user.phoneNumber;
       var password = $scope.user.password;
       var salt = md5.createHash(phoneNumber + "_" + password)

       QueryService.query('POST', 'authenticate', {}, { salt: salt })
          .then(function(ovocie) {
            self.ovocie = ovocie.data;
            var result = self.ovocie["result"];
            if(result == "valid") {
                console.log("You have been logged in !");
                $location.path('/manage-profile').replace();
                if(!$scope.$$phase) {
                  $rootScope.$apply();
                } 
                Session.new(salt);
            } else {
               console.log("Oops ! Your credentials are incorrect. Please try again...");
            }
          });
    };

    // Facebook user authentication
    $rootScope.user = {};

    $window.fbAsyncInit = function() {

      FB.init({
        
        appId: '1628447944135801',

        status: true,

        cookie: true,

        xfbml: true,

        version: 'v2.6'

      });

      facebookService.watchLoginChange();
      $location.path('/manage-profile').replace();
      $rootScope.$apply();

    };

  }

  angular
    .module('ConnectifyWeb')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$rootScope','$scope', '$window', 'QueryService'];

  function RegisterController($rootScope, $scope, $window, QueryService) {

    $scope.passwordError = "";

    $scope.user = {
      password: "",
      passwordConfirm: ""
    };

    $scope.canRegister = ""

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

        var phoneNumber = $rootScope.fullNumber;
        var password = $scope.user.password;

        /**
         * Register - Backend API
         * @return {Object} Returned object
         */
        QueryService.query('POST', 'register', {}, { phoneNumber: phoneNumber, password: password })
          .then(function(ovocie) {
            self.ovocie = ovocie.data;
            var result = self.ovocie["result"];
            if(result == "ok") {
               $scope.registrationStatus = "You have been registered !";
            } else {
               $scope.registrationStatus = "Oops ! We were not able to register you. Please try again...";
            }
          });
    };

  }


  angular
    .module('ConnectifyWeb')
    .controller('ManageProfileController', ManageProfileController);

  ManageProfileController.$inject = ['$rootScope', '$scope', 'Session'];

  function ManageProfileController($rootScope, $scope, Session) {
      console.log(Session.data);
  };

  angular
    .module('ConnectifyWeb')
    .controller('UploadController', UploadController);

  UploadController.$inject = ['$scope', '$timeout', 'CONSTANTS', '$http'];

  function UploadController($scope, $timeout, CONSTANTS, $http) {

    var fileDialog = angular.element('#browse-avatar');
            
    $scope.getDialog = function () {
      $timeout(function() {
        fileDialog.trigger('click');
      }, 100);
    };

    $scope.image = function () {

    };

    //an array of files selected
    $scope.file = {};

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's file
            $scope.file = args.file;
        });
    });

    $scope.submit = function () {

        $http({
            method: 'POST',
            url: CONSTANTS.API_URL + "upload-avatar",
            headers: { 'Content-Type': false },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("file", data.file);
                return formData;
            },
            data: { file: $scope.file }
        }).
        success(function (data, status, headers, config) {
            console.log("success!");
        }).
        error(function (data, status, headers, config) {
            console.log("failed!");
        });
    };       
  };

})();