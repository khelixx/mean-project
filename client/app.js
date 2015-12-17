'use strict';

(function() {

    // Main module.
    var app = angular.module('PayMeApp', ['ngRoute', 'ngResource']);

    // Routes configurations.
    app.config(['$routeProvider',
        function($routeProvider) {
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
        }
    ]);

    app.factory('payMeFactory', ['$resource', function($res) {
        return $res('/users', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });
    }]);


    app.controller('MainCtrl', ['$scope', 'payMeFactory', function($scope, fact) {
        $scope.users = fact.get();
    }]);

    app.controller('LoginCtrl', ['$scope', function($scope) {
        $scope.credentials = {
            email: "",
            passwd: ""
        };

        $scope.login = function(credentials) {
            if (credentials.email == "rjorel@truc.fr" && credentials.passwd == "truc")
                alert("You are logged !");
        }
    }]);

    app.controller('RegisterCtrl', ['$scope', function($scope) {

    }]);

})();
