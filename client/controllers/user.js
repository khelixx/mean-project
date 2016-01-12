(function() {
    'use strict';

    angular.module('payMeApp').controller('UserCtrl', function($scope, $location, $rootScope, UserFactory, $filter) {

        //scope variables for bill etc...
        $scope.payer = "you";
        $scope.check_payer = false;
        $scope.check_count_payer = false;
        $scope.number_payers = 0;
        $scope.opacity = 1;
        $scope.check_bill = [ {dashboard : false , friend : false , none : true}];

        //variable for init facture number of payers
        var count_payers_init = false;
        var display_title = "dashboard";

        $scope.change_group = function(group) {
            var group_json = angular.toJson(group);
            $location.url("/user/update_group?array=" + group_json);
        }

        function init_dashboard(){
            $rootScope.user.groups.forEach(function(element, index, array){
                if(element.bill.length != 0){
                    $scope.check_bill.dashboard = true;$scope.check_bill.friend = false;$scope.check_bill.none = false;
                }
            });
        }

        $scope.show_group = function(group) {
            $scope.current_groupe = group;
            init_dashboard();
            display_title = "group";
        }

        var bool_check_bill = false;
        $scope.check_bill = function(param){
            if(!bool_check_bill){
                init_dashboard();
                bool_check_bill = true;
            }

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
                if (group.bill) {
                    group.bill.forEach(function (bill, index_bill) {
                        bill.owed.forEach(function (owed_person, index_person) {
                            if (owed_person.person == "you" && bill.owe != "you") {
                                balance_user.owe += owed_person.money;
                                balance_user.total_owe.push({person: bill.owe, money: owed_person.money});
                            }


                            if (owed_person.person != "you" && bill.owe == "you") {
                                balance_user.owed += owed_person.money;
                                balance_user.total_owed.push(owed_person);
                            }
                        });
                    });
                }
            });

            balance_user.total = balance_user.owed - balance_user.owe;
            console.log(balance_user);
            return balance_user;
        }

        $scope.review = $scope.total_balance();
        $scope.list_friend = null;
        $scope.current_user = $rootScope.user.email;


        $scope.show_listbill_friend = function(friend){
            $scope.check_bill.dashboard = false;$scope.check_bill.friend = true;$scope.check_bill.none = false;
            $scope.current_groupe = null; display_title = "friend";
            $scope.friend_name = friend;

            var friend_resume = [];            alert("truc");


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

        $scope.title_dashboard = function(name){
            var temp = false;

            (name == display_title ? temp = true : temp);
            (name == display_title ? temp = true : temp);
            (name == display_title ? temp = true : temp);

            return temp;
        }

    });
})();