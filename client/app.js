
(function() {
    'use strict';

    // Main module.
    var app = angular.module('PayMeApp', ['ngRoute', 'ngResource']);

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
        return $res('/user/:userId', { userId: '@_id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]);


    // And now, the controllers.
    app.controller('MainCtrl', ['$scope', function($scope) {

    }]);

    app.controller('LoginCtrl', ['$scope', 'UserFactory', function($scope, Users) {
        $scope.login = function() {
          //  var user = new User({
          //      email: $scope.email,
          //      passwd: $scope.passwd
          //  });

            var user = Users.get({ email: $scope.email, passwd: $scope.passwd });
         //   console.log(user);
        }
    }]);

    app.controller('RegisterCtrl', ['$scope', 'UserFactory', function($scope, Users) {
        $scope.register = function() {
            var user = new Users({
                email: $scope.email,
                passwd: $scope.passwd
            });

            user.$save(function(res) {
                $scope.good = "";
                $scope.bad = "";

                if (res.    exists)
                    $scope.bad = "This e-mail address already exists... try something else, bastard !"

                else
                    $scope.good = "You are registred, now get your money !"
            });
        }
    }]);

})();
