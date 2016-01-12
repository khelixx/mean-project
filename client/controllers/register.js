(function() {
    'use strict';

    angular.module('payMeApp').controller('RegisterCtrl', function($scope, $location, $rootScope, UserFactory) {
        $scope.register = function() {
            var user = new UserFactory({
                email: $scope.email,
                passwd: $scope.passwd
            });

            user.$save(function(res) {
                $scope.alert = "";

                // If the result is defined, save worked. Otherwise, e-mail address is already used.
                // (See node server).
                if (res.email) {
                    $rootScope.user = res;
                    $location.url("/user");
                }
                else
                    $scope.alert = "Another person uses this address ! You are not the lonely one who wants his money...";

            });
        }
    });
})();