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
                controller:'UserAddAppartCtrl'
            })

            .when('/user/update_group', {
                templateUrl: "views/user_update_group.html",
                controller:'UserUpdateGroupCtrl'
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

    app.controller('UserUpdateCtrl', function($scope, $rootScope, $location, $routeParams, UserFactory) {

        $scope.value = angular.fromJson($location.search().array);
        $scope.update_group = function(){
            // Get user in database to update it. Strangely, even the user comes from database, it's
            // not possible to update it directly (or I didn't do the good method).
            console.log($routeParams.id)
        }
    });
})();
