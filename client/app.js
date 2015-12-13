'use strict';

(function() {

    // Main module.
    var app = angular.module('PayMeApp', ['ngRoute']);

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



    app.controller('MainCtrl', ['$scope', function($scope) {

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
