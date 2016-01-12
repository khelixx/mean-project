(function() {
    'use strict';

    angular.module('payMeApp').controller('UserAddGroupCtrl', function($scope, $rootScope, $location, UserFactory) {
        $scope.group_name = "";
        $scope.group_person_names = [];
        $scope.group_person_count = [0, 1, 2, 3];

        var next_num_added_person= $scope.group_person_count.length;

        $scope.add_group = function() {
            if ($scope.group_name == "") {          // Group name is required. It's possible to have group with no persons.
                $scope.alert = "No group name";
                return;
            }

            // Get user in database to update it. Strangely, even the user comes from database, it's
            // not possible to update it directly (or I didn't do the good method).
            UserFactory.get({ email: $rootScope.user.email, passwd: $rootScope.user.passwd },
                function(user) {
                    if (user.email) {
                        user.groups.push({
                            name: $scope.group_name,
                            persons: $scope.group_person_names,
                            bill: []
                        });

                        user.$update();
                        $rootScope.user = user;     // Update user data.

                        $location.url("/user");
                    }
                });
        }

        $scope.add_person = function() {
            $scope.group_person_count.push(next_num_added_person++);
        }
    });
})();