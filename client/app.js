(function() {
    'use strict';

    // Main module.
    var app = angular.module('payMeApp', ['ngRoute', 'ngResource']);

    // Routes configurations.
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: "views/welcome.html"
        })

        .when('/login', {
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

        .when('/register', {
            templateUrl: "views/register.html",
            controller: 'RegisterCtrl'
        })

        .when('/logout', {
            templateUrl: "views/logout.html",
            controller: 'LogoutCtrl'
        })

        .when('/user', {
            templateUrl: "views/user.html",
            controller: 'UserCtrl'
        })

        .when('/user/settings', {
            templateUrl: "views/user_settings.html",
            controller: 'UserSettingsCtrl'
        })

        .when('/user/add_group', {
            templateUrl: "views/user_add_group.html",
            controller: 'UserAddGroupCtrl'
        })

        .when('/user/add_appart', {
            templateUrl: "views/user_add_appart.html",
            controller:'User_appart'
        })

        .when('/user/update_group', {
            templateUrl: "views/user_update_group.html",
            controller:'UserUpdate'
        })

        .otherwise({ redirectTo: '/' });

    }]);

    // For communication.
    // E-mail address is used as id.
    app.factory('UserFactory', ['$resource', function($res) {
        return $res('/user/:email/:passwd', {  }, {
            update: {
                method: 'PUT'
            }
        });
    }]);



    // And now, the controllers.
    app.controller('MainCtrl', ['$scope', function($scope) {

    }]);

    app.controller('LoginCtrl', function($scope, $rootScope, $location, UserFactory) {

        $scope.login = function() {
            UserFactory.get({ email: $scope.email, passwd: $scope.passwd }, function(user) {
                $scope.alert = "";

                // Email -> id.
                if (user.email) {
                    $rootScope.user = user;
                    $location.url("/user");
                }
                else
                    $scope.alert = "Are you killing me ? Go register you before trying the website..."
            });
        }
    });

    app.controller('RegisterCtrl', function($scope, $location, $rootScope, UserFactory) {
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

    app.controller('LogoutCtrl', function($scope, $rootScope) {

    });

    app.controller('UserCtrl', function($scope, $location) {

        //scope variables for bill etc...
        $scope.payer = "you";
        $scope.check_payer = false;
        $scope.check_count_payer = false;
        $scope.number_payers = 0;
        $scope.opacity = 1;

        //variable for init facture number of payers
        var count_payers_init = false;


        $scope.change_group = function(group) {
            var group_json = angular.toJson(group);
            $location.url("/user/update_group?array=" + group_json);
        }

        $scope.show_group = function(group) {
            $scope.current_groupe = group;
        }

        $scope.add_bill = function(){
            $scope.bill_show = true;
            $scope.number_payers = $scope.current_groupe.persons.length + 1;
            $scope.checkbox_group = [];
            angular.element("#transparency")[0].style.opacity = 0.3;
        };

        $scope.close_bill = function(){
            $scope.check_payer = false;
            $scope.check_count_payer = false;
            $scope.bill_show = false;
            $scope.payer = "you";
            $scope.opacity = 1;
            count_payers_init = false;
            angular.element("#transparency")[0].style.opacity = 1;
        }

        $scope.bill_payer = function(){
            if ($scope.check_payer){
                $scope.check_payer = false;
            }
            else{
                $scope.check_payer = true;
                $scope.check_count_payer = false;
            }
        }


        $scope.change_payer = function(member){
            (member? $scope.payer = member : $scope.payer = "you");
         }

        $scope.number_of_payers = function(){

            if (!count_payers_init){
                $scope.current_groupe.persons.forEach(function(element, index, array){
                    var tmp = {
                        person : element,
                        value : true
                    }
                    $scope.checkbox_group.push(tmp);
                });

                $scope.checkbox_group.push({person : "you", value : true });
                count_payers_init = true;
            }


            if ($scope.check_count_payer){
                $scope.check_count_payer = false;
            }
            else{
                $scope.check_count_payer = true;
                $scope.check_payer = false;
            } 
        }

        $scope.checkbox_update = function(index){

            ($scope.checkbox_group[index].value? $scope.number_payers ++ :  $scope.number_payers --);
        }

 });

app.controller('UserSettingsCtrl', function($scope) {

});

app.controller('UserUpdate', function($scope, $rootScope, $location, $routeParams,UserFactory) {

    $scope.value = angular.fromJson($location.search().array);
    $scope.update_group = function(){
               // Get user in database to update it. Strangely, even the user comes from database, it's
            // not possible to update it directly (or I didn't do the good method).
            console.log($routeParams.id)
        }     
    });

app.controller('UserAddGroupCtrl', function($scope, $rootScope, $location, UserFactory) {
    $scope.group_name = "";
    $scope.group_person_names = [];

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
                            persons: $scope.group_person_names
                        });

                        user.$update();
                        $rootScope.user = user;     // Update user data.

                        $location.url("/user");
                    }
                });
        }

    });


app.controller('User_appart', function($scope, $rootScope, $location, UserFactory){

    $scope.user_appartement = "";
    $scope.group_person_names = [];
    $scope.group_person_count = [0,1,2,3];
    $scope.current_user = $rootScope.user.email;

    var count_person_in_addition = 4;

    $scope.add_appart = function(){
        if ($scope.user_appartement == "") {          
            $scope.alert = "No appartement name";
            return;
        }

            // Get user in database to update it. Strangely, even the user comes from database, it's
            // not possible to update it directly (or I didn't do the good method).
            UserFactory.get({ email: $rootScope.user.email, passwd: $rootScope.user.passwd },
                function(user) {
                    if (user.email) {
                        user.groups.push({
                            flat : $scope.user_appartement,
                            name: $scope.group_name,
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
