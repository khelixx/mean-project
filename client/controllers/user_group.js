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

            $rootScope.user.groups.push({
                name: $scope.group_name,
                persons: $scope.group_person_names,
                bill: []
            });

            $rootScope.user.$update();
            $location.url("/user");
        }

        $scope.add_person = function() {
            $scope.group_person_count.push(next_num_added_person++);
        }
    });
})();