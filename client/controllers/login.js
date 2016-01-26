(function() {
    'use strict';

    angular.module('payMeApp').controller('LoginCtrl', function($scope, $rootScope, $location, UserFactory) {

        $scope.login = function() {
            UserFactory.get({ email: $scope.email, passwd: $scope.passwd }, function(user) {
                $scope.alert = "";

                // Email -> id.
                if (user.email) {
                    $rootScope.user = user;
                    $location.url("/user");
                }
                else
                    $scope.alert = "Are you kidding me ? Go register you before trying the website..."
            });
        }
    });
})();