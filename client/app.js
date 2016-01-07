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

    app.controller('UserCtrl', function($scope, $location,$rootScope, UserFactory, $filter) {

        //scope variables for bill etc...
        $scope.payer = "you";
        $scope.check_payer = false;
        $scope.check_count_payer = false;
        $scope.number_payers = 0;
        $scope.opacity = 1;

        $scope.check_bill = [ {dashboard : false , friend : false , none : true}];

        //variable for init facture number of payers
        var count_payers_init = false;


        $scope.change_group = function(group) {
            var group_json = angular.toJson(group);
            $location.url("/user/update_group?array=" + group_json);
        }

        $scope.show_group = function(group) {
            $scope.current_groupe = group;
            $rootScope.user.groups.forEach(function(element, index, array){
                    if(element.bill.length != 0){
                         $scope.check_bill.dashboard = true;
                         $scope.check_bill.friend = false;
                         $scope.check_bill.none = false;
                    }
            });
        }

        $scope.check_bill = function(param){
            
            if(param == 'dashboard'){
                 return $scope.check_bill.dashboard;
            }

            if (param == 'friend'){
                return $scope.check_bill.friend;
            }

            if (param == 'none'){
                return $scope.check_bill.none;
            }
        }

        //display bill interface
        $scope.add_bill = function(){
            $scope.bill_show = true;
            $scope.number_payers = $scope.current_groupe.persons.length + 1;
            $scope.checkbox_group = [];
            $scope.description_bill = null;
            angular.element("#transparency")[0].style.opacity = 0.3;
            $scope.price = 0.00;

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
        };

        //close bill interface
        $scope.close_bill = function(){
            $scope.check_payer = false;
            $scope.check_count_payer = false;
            $scope.bill_show = false;
            $scope.payer = "you";
            $scope.opacity = 1;
            count_payers_init = false;
            angular.element("#transparency")[0].style.opacity = 1;
        }

        //display payer interface
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

        //display number of payers interface
        $scope.number_of_payers = function(){

            if ($scope.check_count_payer){
                $scope.check_count_payer = false;
            }
            else{
                $scope.check_count_payer = true;
                $scope.check_payer = false;
            } 
        }

        //update the number of payers
        $scope.checkbox_update = function(index){

            ($scope.checkbox_group[index].value? $scope.number_payers ++ :  $scope.number_payers --);
        }


        //Add the bill in user
        $scope.save = function (){

            var add_bill_bdd = $rootScope.user.groups;
            var owed_array = [];

            //fill the array of owed persons
            $scope.checkbox_group.forEach(function(element, index, array){
                if (element.value == true){
                    var owed_person = {
                        person : element.person,
                        money : ($scope.price / $scope.number_payers)
                    }
                    owed_array.push(owed_person);
                }
            });

            // creation of a temporary index object because we cant push on the array direct and replace
            add_bill_bdd.forEach(function(element, index, array){
                if ( element.name == $scope.current_groupe.name){

                    var bill_current = {
                        owe : $scope.payer,
                        owed : owed_array,
                        description : $scope.description_bill
                    }

                    var tmp_group = {
                        name : element.name,
                        persons : element.persons,
                        bill : element.bill 
                    }

                    tmp_group.bill.push(bill_current);
                    element = tmp_group;              
                }
            });

            //update user groups
            UserFactory.get({ email: $rootScope.user.email, passwd: $rootScope.user.passwd },
                function(user) {
                    if (user.email) {
                        user.groups = add_bill_bdd;
                        user.$update();
                        $rootScope.user = user;     // Update user data.
                    }
                });


            $scope.close_bill();
        }


        //retrieve money
        $scope.total_balance = function(){

            var balance_user = {
                owed : 0,
                owe : 0,
                total : 0,
                total_owed : [],
                total_owe : []
            }

            $rootScope.user.groups.forEach(function(group,index){
                group.bill.forEach(function(bill,index_bill){
                    bill.owed.forEach(function(owed_person,index_person){
                        if(owed_person.person == "you" && bill.owe != "you"){
                            balance_user.owe += owed_person.money;
                            balance_user.total_owe.push({person : bill.owe , money : owed_person.money});
                        }

                        if (owed_person.person != "you" && bill.owe == "you"){
                            balance_user.owed +=  owed_person.money;
                             balance_user.total_owed.push(owed_person);
                        }
                     });
                 });  
             });

             balance_user.total = balance_user.owed - balance_user.owe;
             console.log(balance_user);
             return balance_user;
        }

           $scope.review = $scope.total_balance();
           $scope.list_friend = null;


        $scope.show_listbill_friend = function(friend){
              $scope.check_bill.dashboard = false;
              $scope.check_bill.friend = true;
              $scope.check_bill.none = false;


            var friend_resume = [];
           
             $rootScope.user.groups.forEach(function(group,index){
                var count = 0;
                group.bill.forEach(function(bill,index_bill){
                    bill.owed.forEach(function(owed_person,index_person){
                        if(owed_person.person == "you" && bill.owe == friend){
                            count-= owed_person.money;
                        }

                        if (owed_person.person == friend && bill.owe == "you"){
                            count += owed_person.money;
                        }
                     });
                 }); 

                 friend_resume.push({money : count , group_bill : group.name}); 
             });

            $scope.list_friend =  friend_resume;
        }

        $scope.check_money = function(money){
          return money >0;
        }

        $scope.check_user_in_array = function(money){
            return (money >0 || money < 0);
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
                            persons: $scope.group_person_names,
                            bill: []
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
