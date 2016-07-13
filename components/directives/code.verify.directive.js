;(function() {

  'use strict';

  angular
    .module('ConnectifyWeb')
    .controller('PhoneNumberController', PhoneNumberController);

  PhoneNumberController.$inject = ['$rootScope', '$scope'];

  function PhoneNumberController($rootScope, $scope) {

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
            console.log("Send Code: ", self.ovocie);
            $rootScope.userVerified = true;
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
            console.log("Verify Code: ", self.ovocie);
            var data = self.ovocie;
            $rootScope.userVerified = true;
            if(data["result"] == "verified") {
               $scope.verifiedStatus = "Your phone number has been verified !"
            } else {
               $scope.verifiedStatus = "Oops ! We were not able to verify your number. Please try again..."
            }
          });
      };
  }

  angular
    .module('ConnectifyWeb')
    .directive('codeVerify', CodeVerification);

  CodeVerification.$inject = ['$rootScope', '$window'];

  function CodeVerification($rootScope, $window, QueryService) {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'components/directives/code-verify.html'
    };

    return directiveDefinitionObject;
  }

})();