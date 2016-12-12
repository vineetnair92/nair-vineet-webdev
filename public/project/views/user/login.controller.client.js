(function () {
    angular.module("TexApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var cModel = this;

        cModel.login = login;



        function login(userInput) {

            UserService
                .login(userInput)
                .then(function (response) {
                    var user = response.data;
                    if (user && user.usertype==="Customer") {
                        console.log("true");
                        $location.url("/customer/" + user._id +"/"+ user.company);
                    }
                    else if (user && user.usertype==="Staff") {
                        $location.url("/user/" + user._id);
                    }
                    else {
                        cModel.error = "Username/Password is incorrect";
                    }
                })
                .catch(function (response) {
                    cModel.error = "Something is wrong!!";
                })
        }



    }

})();