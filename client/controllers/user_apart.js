(function() {
    'use strict';

    // Hum, very hard.
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

            // Get user in database to update it. Strangely, even the user comes from database, it's
            // not possible to update it directly (or I didn't do the good method).
            UserFactory.get({ email: $rootScope.user.email, passwd: $rootScope.user.passwd },
                function(user) {
                    if (user.email) {
                        user.groups.push({
                            // flat : $scope.user_appartement,
                            name: $scope.user_appartement,
                            persons: $scope.group_person_names
                        });

                        user.$update();
                        $rootScope.user = user;     // Update user data.

                        $location.url("/user");
                    }
                });
        }

        $scope.add_person = function(){
            $scope.group_person_count.push(count_person_in_addition);
            count_person_in_addition ++;
        }
    });
})();