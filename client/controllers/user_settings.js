(function() {
    'use strict';

    angular.module('payMeApp').controller('UserSettingsCtrl', function ($scope, $rootScope, $location, UserFactory) {
        $scope.user_name = $rootScope.user.settings.name;
        $scope.user_firstname = $rootScope.user.settings.firstname;
        $scope.user_phone = $rootScope.user.settings.phone;

        $scope.update = function () {
            UserFactory.get({email: $rootScope.user.email, passwd: $rootScope.user.passwd},
                function (user) {
                    if (user.email) {
                        user.settings = {
                            name: $scope.user_name,
                            firstname: $scope.user_firstname,
                            phone: $scope.user_phone
                        }

                        user.$update();
                        $rootScope.user = user;     // Update user data.

                        $location.url("/user");
                    }
                });
        }
    });
})();