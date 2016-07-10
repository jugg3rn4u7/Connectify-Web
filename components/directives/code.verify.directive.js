;(function() {

  'use strict';

  angular
    .module('ConnectifyWeb')
    .directive('codeVerify', CodeVerification);

  function CodeVerification() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'components/directives/code-verify.html'
    };

    return directiveDefinitionObject;
  }

})();