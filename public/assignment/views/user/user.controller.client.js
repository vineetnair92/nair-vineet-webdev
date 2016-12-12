/*Created by Vineet Nair on 10/19/2016.*/
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController",RegisterController);


    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;
        vm.register=register;
        vm.clear=clear;
        function login(user) {
            if (user) {
                if (user.username && user.password) {
                    UserService
                        .login(user)
                        .then(function (response) {
                            var user = response.data;
                            if (user) {
                                $rootScope.currentUser = user;
                                $location.url("/user/" + user._id);
                            }
                            else
                                vm.alert = "No such user found";
                        }, function (error) {
                            vm.alert = "No such user";
                        });
                } else {
                    vm.alert = "Enter details first";
                }
            } else {
                vm.alert = "Enter username and password";
            }
        }


        function register()
        {
            $location.url("/register");
        }

        function clear() {
            vm.alert = "";
        }
    }

    function RegisterController($location, $rootScope, UserService){
        var vm=this;
        vm.register=register;
        vm.cancel=cancel;
        vm.clear=clear;
        function register(user) {
            if (user) {
                if (user.password === user.verifyPassword && user.password) {
                    UserService
                        .register(user)
                        .then(function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/"+ user._id);
                        }, function (error) {
                            vm.alert = "Cannot Register user";
                        });
                }
                else {
                    vm.alert = "Passwords do not match";
                }
            } else {
                vm.alert = "Enter a username and password";
            }
        }

        function clear() {
            vm.alert = "";
        }

        function cancel() {
            $location.url("/login");
        }

    }


    function ProfileController($location, $rootScope, $routeParams, UserService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
        vm.UpdateUser = UpdateUser;
        vm.website = website;
        vm.logout = logout;
        vm.clear=clear;
        vm.deleteUser=deleteUser;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function (response) {
                    vm.user = response.data;
                }, function (error) {
                    vm.alert = "No such user";
                });
        }

        init();

        function UpdateUser(user) {
            UserService
                .updateUser(user)
                .then(function (response) {
                    vm.success = "User updated";
                }, function (error) {
                    vm.alert = "User could not update profile";
                });
        }

        function website() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                }, function (err) {
                    vm.alert = "Could not logout";
                });
            //$location.url("/login");
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.userId)
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                }, function (error) {
                    vm.alert = "Account cannot be deleted";
                });
        }


        function clear() {
            vm.alert = "";
            vm.success = "";
        }
    }
})();