(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;


        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = '/api/user?username='+username;
            return $http.get(url);
        }


        function updateUser(user) {
            var url = "/api/user/" + user._id;
            return $http.put(url, user);
        }

        function deleteUser(uid) {
            var url = "/api/user/" + uid;
            return $http.delete(url);
        }


    }
})();