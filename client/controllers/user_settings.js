(function() {
    'use strict';

    angular.module('payMeApp').controller('UserSettingsCtrl', function ($scope, $rootScope, $location, UserFactory) {
        $scope.user_name = $rootScope.user.settings.name;
        $scope.user_firstname = $rootScope.user.settings.firstname;
        $scope.user_phone = $rootScope.user.settings.phone;

        $scope.update = function () {
            $rootScope.user.settings = {
                name: $scope.user_name,
                firstname: $scope.user_firstname,
                phone: $scope.user_phone
            }

            $rootScope.user.$update();
            $location.url("/user");
        }
    });
})();