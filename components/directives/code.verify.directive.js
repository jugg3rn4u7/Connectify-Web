;(function() {

  'use strict';

  angular
    .module('ConnectifyWeb')
    .controller('PhoneNumberController', PhoneNumberController);

  PhoneNumberController.$inject = ['$rootScope', '$scope', 'QueryService'];

  function PhoneNumberController($rootScope, $scope, QueryService) {

    var _areaCode = 0;
    var _prefix = 0;
    var _lineNumber = 0;

    $scope.phoneNumber = {
      areaCode: "",
      prefix: "",
      lineNumber: ""
    };

    $scope.change = function () {
        $rootScope.fullNumber = $scope.phoneNumber.areaCode + "-" + $scope.phoneNumber.prefix + "-" + $scope.phoneNumber.lineNumber;
    };

    $scope.checkNumber = function () {
        var phoneNumber = $rootScope.fullNumber;

        QueryService.query('POST', 'check-number', {}, { phoneNumber: phoneNumber })
          .then(function(ovocie) {
            self.ovocie = ovocie.data;
            var result = self.ovocie["result"];
            if(result == "exists") {
              $scope.phoneNumberError = "You are already have an account. Please login with your credentials.";
            } else {
              $scope.phoneNumberError = "";
            }
          });
    };
  }

  angular
    .module('ConnectifyWeb')
    .controller('CodeVerificationController', CodeVerificationController);

  CodeVerificationController.$inject = ['$rootScope', '$scope', 'QueryService'];

  function CodeVerificationController($rootScope, $scope, QueryService) {

      $scope.sendCode = function() {

        var phoneNumber = $rootScope.fullNumber;

        /**
         * Send Code - Backend API
         * @return {Object} Returned object
         */
        QueryService.query('POST', 'send-code', {}, { phoneNumber: phoneNumber })
          .then(function(ovocie) {
            self.ovocie = ovocie.data;
            var result = self.ovocie["result"];
            if(result == "ok") {
              $rootScope.verifiedStatus = "A code has been sent to you phone. Please enter the code above and click 'Verify Code'.";
            } else {
              $rootScope.verifiedStatus = "Oops ! We could not send verification code to this number. Please check if the number is correct.";
            }
          });
      };

      $scope.verifyCode = function() {

        var phoneNumber = $rootScope.fullNumber;
        var code = parseInt( $scope.code );

        /**
         * Verify Code - Backend API
         * @return {Object} Returned object
         */
        QueryService.query('POST', 'verify-code', {}, { phoneNumber: phoneNumber, code: code })
          .then(function(ovocie) {
            self.ovocie = ovocie.data;
            var data = self.ovocie;
            if(data["result"] == "verified") {
               $rootScope.userVerified = true;
               $scope.verifiedStatus = "Your phone number has been verified !";
            } else {
               $scope.verifiedStatus = "Oops ! We were not able to verify your number. Please try again...";
            }
          });
      };
  }

  angular
    .module('ConnectifyWeb')
    .directive('codeVerify', CodeVerification);

  CodeVerification.$inject = ['$rootScope', '$window'];

  function CodeVerification($rootScope, $window) {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'components/directives/code-verify.html'
    };

    return directiveDefinitionObject;
  }

})();