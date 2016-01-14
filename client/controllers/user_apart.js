(function() {
    'use strict';

    angular.module('payMeApp').controller('UserAddAppartCtrl', function($scope, $rootScope, $location, UserFactory){

        $scope.user_appartement = "";
        $scope.group_person_names = [];
        $scope.group_person_count = [0,1,2,3];
        $scope.current_user = $rootScope.user.email;

        var count_person_in_addition = 4;

        $scope.add_appart = function(){
            if ($scope.user_appartement == "") {
                $scope.alert = "No apartment name";
                return;
            }

            $rootScope.user.groups.push({
                name: $scope.user_appartement,
                persons: $scope.group_person_names,
                bill: []
            });

            $rootScope.user.$update();
            $location.url("/user");
        }

        $scope.add_person = function(){
            $scope.group_person_count.push(count_person_in_addition);
            count_person_in_addition ++;
        }
    });
})();