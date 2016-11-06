/*Created by Vineet Nair on 10/19/2016.*/
(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController",RegisterController);


    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.register=register;
        vm.clear=clear;
        function login(user) {
            if(user){
            UserService.findUserByCredentials(user.username, user.password)
                .then(function (response){
                    var user = response.data;
                $location.url("/user/" + user._id);
                    }, function (error) {
                vm.alert = "No such user";
            });
            } else {
                vm.alert="Enter details first";
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

    function RegisterController($location, UserService){
        var vm=this;
        vm.register=register;
        vm.cancel=cancel;
        vm.clear=clear;
        function register(user) {
            if (user) {
                if (user.password === user.verifyPassword && user.password) {
                    UserService
                        .createUser(user)
                        .then(function (response) {
                            var user = response.data;
                            $location.url("/user/" + user._id);
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


    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
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
            $location.url("/login");
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.userId)
                .then(function (response) {
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