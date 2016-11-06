/* Created by Vineet Nair on 10/19/2016.*/
(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController)
        .controller('NewWebsiteController', NewWebsiteController)
        .controller('EditWebsiteController', EditWebsiteController);


    function WebsiteListController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.profile = profile;
        vm.websiteOpen = websiteOpen;
        vm.websiteNew = websiteNew;
        vm.websiteEdit = websiteEdit;
        vm.back = back;
        vm.clear=clear;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                }, function (error) {
                    vm.alert = "No such website for this user";
                });
        }

        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function websiteOpen(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function websiteNew() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function websiteEdit(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }

        function back(){
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.alert = "";
        }
    }


    function NewWebsiteController($location,$routeParams, WebsiteService ) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.profile = profile;
        vm.websiteOpen = websiteOpen;
        vm.websiteNew = websiteNew;
        vm.websiteEdit = websiteEdit;
        vm.websiteCreate = websiteCreate;
        vm.back = back;
        vm.clear=clear;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                }, function (error) {
                    vm.alert = "No such website for this user";
                });
        }
        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }


        function websiteOpen(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function websiteNew() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function websiteEdit(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }

        function websiteCreate(website) {
            if (website) {
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .then(function (response) {
                        vm.success = "Website created successfully";
                        $location.url("/user/" + vm.userId + "/website");
                    }, function (error) {
                        vm.alert = "Website could not be created";
                    });
            } else {
                vm.alert = "No details found";
            }
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function clear() {
            vm.alert = "";
            vm.success = "";
        }

    }

    function EditWebsiteController($location, $routeParams, WebsiteService ) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.profile = profile;
        vm.websiteOpen = websiteOpen;
        vm.websiteNew = websiteNew;
        vm.websiteEdit = websiteEdit;
        vm.websiteUpdate = websiteUpdate;
        vm.websiteDelete = websiteDelete;
        vm.back = back;
        vm.clear=clear;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                }, function (error) {
                    vm.alert = "No such website for this user";
                });
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = response.data;
                }, function (error) {
                    vm.alert = "No such website found";
                });
        }

        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }


        function websiteOpen(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function websiteNew() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function websiteEdit(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }


        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }


        function websiteUpdate(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .then(function (response) {
                    vm.success = "Website Updated successfully";
                    $location.url("/user/" + vm.userId + "/website");
                }, function (error) {
                    vm.alert = "Website could not be updated.";
                });
        }

        function websiteDelete() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function (response) {
                    vm.success = "Website deleted successfully";
                    $location.url("/user/" + vm.userId + "/website");
                }, function (error) {
                    vm.alert = "Website could not be deleted.";
                });
        }

        function clear() {
            vm.alert = "";
            vm.success = "";
        }
    }
    })();