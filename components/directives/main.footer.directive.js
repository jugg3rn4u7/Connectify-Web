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
    .directive('mainFooter', tinMainFooter);

  function tinMainFooter() {

    // Definition of directive
    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'components/directives/main-footer.html'
    };

    return directiveDefinitionObject;
  }

})();