angular
    .module('ConnectifyWeb')
    .directive('checkImage', function($http, CONSTANTS) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                attrs.$observe('ngSrc', function(ngSrc) {
                    $http({
                        method: 'GET',
                        url: CONSTANTS.API_URL + "get-avatar/",
                        headers: { 'Content-Type': false }
                    }).
                    success(function (data, status, headers, config) {
                        console.log("success!");
                        scope.image = data;
                    }).
                    error(function (data, status, headers, config) {
                        console.log("failed!");
                        element.attr('src', '../images/default_user.png'); // set default image
                    });
                });
            }
        };
    });