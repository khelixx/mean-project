
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

    app.controller('UserCtrl', function($scope) {

    });

    app.controller('UserSettingsCtrl', function($scope) {

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

})();
