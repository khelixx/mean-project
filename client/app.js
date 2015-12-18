
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

            .otherwise({ redirectTo: '/' });

    }]);

    // For communication.
    app.factory('UserFactory', ['$resource', function($res) {
        return $res('/user/:email/:passwd', { }, {
            update: {
                method: 'PUT'
            }
        });
    }]);


    // And now, the controllers.
    app.controller('MainCtrl', ['$scope', function($scope) {
        $scope.email = "";
        $scope.passwd = "";
    }]);

    app.controller('LoginCtrl', function($scope, $rootScope, UserFactory) {
        $scope.login = function() {
            UserFactory.get({ email: $scope.email, passwd: $scope.passwd }, function(user) {

                $rootScope.user = user;
            });
        }
    });

    app.controller('RegisterCtrl', function($scope, UserFactory) {
        $scope.register = function() {
            var user = new UserFactory({
                email: $scope.email,
                passwd: $scope.passwd
            });

            user.$save(function(res) {
                $scope.good = "";
                $scope.bad = "";

                if (res.exists)
                    $scope.bad = "This e-mail address is already used... try something else, bastard !"

                else
                    $scope.good = "You are registred, now get your money !"
            });
        }
    });

})();
