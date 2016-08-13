;(function() {

  'use strict';

  /**
   * Main navigation, just a HTML template
   * @author Jozef Butko
   * @ngdoc  Directive
   *
   * @example
   * <main-nav><main-nav/>
   *
   */
  angular
    .module('ConnectifyWeb')
    .directive('mainNav', tinMainNav)
    .controller('NavigationController', NavigationController);

  function tinMainNav() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'components/directives/main-nav.html',
      controller: 'NavigationController'
    };

    return directiveDefinitionObject;
  }

  NavigationController.$inject = ['$rootScope', '$scope'];

  function NavigationController($rootScope, $scope) {

      $rootScope.$on("$locationChangeStart", function(event, next, current) {
          var after_hash = next.split("#")[1];
          
          if(after_hash == "/" || after_hash == "/register") {
              $scope.login = true;
              $scope.display_name = "";
          } else {
              $scope.login = false;
              $scope.display_name = "Shrikant Sarma Kakaraparthi";
          }
      });

  }

})();