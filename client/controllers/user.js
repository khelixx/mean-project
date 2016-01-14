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
        $scope.comment ="";
        $scope.checkbox_group = [];
        $scope.list_friend = null;

        //variables for functions
        var count_payers_init = false;
        var display_title = "dashboard";
        var list_user = 'dashboard';
        var display_list = false;
        var update_index = 0;
        var update = "none";
        var display_bill = "";

        $scope.change_group = function(group) {
            var group_json = angular.toJson(group);
            $location.url("/user/update_group?array=" + group_json);
        }


        $scope.check_list = function(arg){
            return arg == list_user;
        }

        /********************************************************* function for dashboard ***********************************************************/
        function init_dashboard(){
            $rootScope.user.groups.forEach(function(element, index, array){
                if(element.bill.length != 0){
                    $scope.check_bill.dashboard = true;$scope.check_bill.friend = false;$scope.check_bill.none = false;
                }
            });
        }


        $scope.title_dashboard = function(name){
            var temp = false;

            (name == display_title ? temp = true : temp);
            (name == display_title ? temp = true : temp);
            (name == display_title ? temp = true : temp);

            return temp;
        }



        $scope.setDashboard = function(){
            list_user = "dashboard";
            display_title = "dashboard";
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
            return balance_user;
        }

        $scope.review = $scope.total_balance();
        

        /********************************************************** function for a group *****************************************************************/
        $scope.show_list_group = function(current_group){
            var list_resume = [];
           
            $rootScope.user.groups.forEach(function(group,index){
               

                if (group.name == current_group.name){
                    group.bill.forEach(function(bill,index_bill){
                        var count = 0;
                        bill.owed.forEach(function(owed_person,index_person){
                            if (owed_person.person != "you"){
                                count += owed_person.money;
                            }
                        });
                        list_resume.push({owe : bill.owe , lent : count , owed : bill.owed , price : bill.price , description : bill.description, comm : bill.comm })
                    });
                }
            });

            $scope.list_group = list_resume;
        }

        //Display in group membre frame the debt of user to you
        $scope.debt = function (member){
              var count = 0;
              $rootScope.user.groups.forEach(function(group,index){
                if (group.name == $scope.current_groupe.name){
                    group.bill.forEach(function(bill,index_bill){
                        bill.owed.forEach(function(owed_person,index_person){
                            if (owed_person.person == member){
                                count += owed_person.money;
                            }
                        });
                    });
                }
            });

            return count;
        }

        $scope.show_group = function(group) {
            $scope.current_groupe = group;
            init_dashboard();
            display_title = "group";
            list_user = "group";
            $scope.show_list_group($scope.current_groupe);
        }



        /***************************************************************** functions for bills *************************************************************/
        
        $scope.setBill = function(bill){
            if (display_bill == bill){
                display_bill = "";
            }
            else{
                display_bill = bill;
            }
        }

        $scope.update_or_display_bill = function(bill_description){
            return display_bill == bill_description ;
        }

        $scope.check_update = function(){
            return update == "none";
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

         $scope.update_bill = function(bill){
            update = "update";
            $scope.bill_show = true;
            bill.owed.forEach(function(owed,index){
                $scope.checkbox_group.push({ person : owed.person , value :true })
            });

            $scope.number_payers = bill.owed.length;
            $scope.description_bill = bill.description;
            $scope.price = bill.price;
            $scope.payer = bill.owe;

            var add_bill_bdd = $rootScope.user.groups;

            add_bill_bdd.forEach(function(element, index, array){
                if ( element.name == $scope.current_groupe.name){
                    element.bill.forEach(function(bill_element,index_bill){
                        (bill_element.description == bill.description ? update_index = index_bill : update_index);
                    });
                }
            });

            angular.element("#transparency")[0].style.opacity = 0.3;
        }

        //close bill interface
        $scope.close_bill = function(){
            $scope.check_payer = false;
            $scope.check_count_payer = false;
            $scope.checkbox_group = [];
            $scope.bill_show = false;
            $scope.payer = "you";
            $scope.opacity = 1;
            count_payers_init = false;
            angular.element("#transparency")[0].style.opacity = 1;
            update = "none";
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
        $scope.save = function (ope){

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
                        price : $scope.price,
                        description : $scope.description_bill
                    }

                    var tmp_group = {
                        name : element.name,
                        persons : element.persons,
                        bill : element.bill
                    }

                    if (ope != undefined){
                        console.log("salut");
                        tmp_group.bill[update_index] = bill_current;
                    }
                    else {
                        tmp_group.bill.push(bill_current);
                        element = tmp_group;
                    }
                  
                }
            });

            //update user groups
            UserFactory.get({ email: $rootScope.user.email, passwd: $rootScope.user.passwd },
                function(user) {
                    if (user.email) {
                        user.groups = add_bill_bdd;
                        console.log(user);
                        user.$update();
                        
                        $rootScope.user = user;
                    }
                });

            $scope.show_list_group($scope.current_groupe);
            $scope.close_bill();
        }

        $scope.add_comm = function(comm,bill_comm,price){

            var tmp ;
           $rootScope.user.groups.forEach(function(group,index){
                    group.bill.forEach(function (bill, index_bill) {
                        if (bill.description == bill_comm && price == bill.price){
                            if (bill.comm == undefined){
                                bill.comm = [];
                                bill.comm.push({ comment : comm });
                            }
                            else {
                                 bill.comm.push({ comment : comm});
                            }   
                        }
                    });
            });

            tmp = $rootScope.user.groups;
             //update user groups
            UserFactory.get({ email: $rootScope.user.email, passwd: $rootScope.user.passwd },
                function(user) {
                    if (user.email) {
                        user.groups = tmp;
                        user.$update();
                        $rootScope.user = user;     // Update user data.
                    }
                });
             $scope.show_list_group($scope.current_groupe);
        }


        $scope.delete_comm= function(comm){
           var tmp_comm = [];

           $rootScope.user.groups.forEach(function(group,index){
                    group.bill.forEach(function (bill, index_bill) {
                        if (bill.comm != undefined){
                                bill.comm.forEach(function(comment, index_comm){
                                if (comment == comm){
                                    bill.comm.splice(bill.comm.indexOf(comm), 1);
                                }
                            });
                        }  
                    });

                  //  tmp_comm.push(group);
            });

            $rootScope.user.$update();
            $scope.review = $scope.total_balance();
        }

        $scope.delete_bill = function(bill_delete){
            console.log(bill_delete);
            var tmp_bill = [];

            $rootScope.user.groups.forEach(function(group,index){
                    group.bill.forEach(function (bill, index_bill) {
                        if (bill.owe == bill_delete.owe && bill.price == bill_delete.price && bill.description == bill_delete.description ){
                              group.bill.splice(group.bill.indexOf(bill), 1);
                        }
                    });

                   // tmp_bill.push(group);
            });

            //console.log(tmp_bill);
            //$rootScope.user.groups = tmp_bill;
            $rootScope.user.$update();
            $scope.review = $scope.total_balance();
            $scope.show_list_group($scope.current_groupe);
        }


        $scope.show_listbill_friend = function(friend){
            $scope.check_bill.dashboard = false;$scope.check_bill.friend = true;$scope.check_bill.none = false;
            $scope.current_groupe = null; display_title = "friend";
            $scope.friend_name = friend;
            list_user = "none";
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

        $scope.Group_friend_bill_List = function(group_friend){
            if (display_list == false){
            var friend_resume = [];
               list_user = "group";
                $rootScope.user.groups.forEach(function(group,index){
                    if (group.name == group_friend){
                        group.bill.forEach(function(bill,index_bill){
                        var bool_here = false;
                        var count = 0;
                            bill.owed.forEach(function(owed_person,index_person){
                                if (owed_person.person == $scope.friend_name){
                                   bool_here = true;
                                }

                                if (owed_person.person != "you"){
                                    count += owed_person.money;
                                }
                            });
                            if (bool_here == true || bill.owe == $scope.friend_name ) {
                                friend_resume.push({owe : bill.owe , lent : count , owed : bill.owed , price : bill.price , description : bill.description });
                            }
                            
                        });
                    }
                });
                 $scope.list_group =  friend_resume;
                 display_list = true;
            }
            else{
                list_user = "none";
                $scope.show_listbill_friend($scope.friend_name);
                display_list = false;
            }
         
        }


        $scope.check_money = function(money){
            return money >0;
        }

        $scope.check_user_in_array = function(money){
            return (money >0 || money < 0);
        }

    });
})();