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
        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if(user === null) {
                vm.error = "No such user";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($location, UserService){
        var vm=this;
        vm.register=register;
        vm.cancel=cancel;
        function register(user) {
            if(user.password === user.verifyPassword)
            {
                user = UserService.createUser(user);
                if(user==null){
                    vm.error="user cannot Register";
                } else {
                    $location.url("/user/"+user._id);
                }
            }
            else vm.error="Passwords do not match";
        }
    }

    function cancel() {
        $location.url("/login");
    }


    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.website = website;
        vm.logout = logout;


        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }

        init();

        function updateUser(user) {
            user = UserService.updateUser(vm.userId, user);
            if (user === null) {
                vm.error = "User could not update profile";
            } else {
                vm.success = "User updated";
            }
        }

        function website() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function logout() {
            $location.url("/login");
        }

    }
})();
