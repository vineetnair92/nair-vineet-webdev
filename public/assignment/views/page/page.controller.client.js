/* Created by Vineet Nair on 10/19/2016.*/
(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController)
        .controller('NewPageController', NewPageController)
        .controller('EditPageController', EditPageController);


    function PageListController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId=$routeParams["wid"];
        vm.profile = profile;
        vm.pageOpen = pageOpen;
        vm.pageNew = pageNew;
        vm.pageEdit = pageEdit;
        vm.back = back;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                }, function (error) {
                    vm.alert = "No such pages for this website";
                });
        }

        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function pageOpen(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function pageNew() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function pageEdit(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }

        function back(){
            $location.url("/user/" + vm.userId + "/website");
        }


    }


    function NewPageController($location,$routeParams, PageService ) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId=$routeParams["wid"];
        vm.profile = profile;
        vm.pageOpen = pageOpen;
        vm.pageNew = pageNew;
        vm.pageEdit = pageEdit;
        vm.pageCreate=pageCreate;
        vm.back = back;
        vm.clear=clear;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                }, function (error) {
                    vm.alert = "No such pages for this website";
                });
        }
        init();


        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function pageOpen(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function pageNew() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function pageEdit(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }

        function pageCreate(page) {
            if (page) {
                PageService
                    .createPage(vm.websiteId, page)
                    .then(function (response) {
                        vm.success = "Page created successfully";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }, function (error) {
                        vm.alert = "Page could not be created.";
                    });
            } else {
                vm.alert = "No details found";
            }
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function clear(){
            vm.alert="";
            vm.success="";
            }
    }

    function EditPageController($location, $routeParams, PageService ) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId=$routeParams["pid"];
        vm.profile = profile;
        vm.pageOpen = pageOpen;
        vm.pageNew = pageNew;
        vm.pageEdit = pageEdit;
        vm.pageUpdate = pageUpdate;
        vm.pageDelete = pageDelete;
        vm.back = back;
        vm.clear=clear;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                }, function (error) {
                    vm.alert = "No such pages for this website";
                });
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                }, function (error) {
                    vm.alert = "No such page found";
                });
        }

        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function pageOpen(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function pageNew() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function pageEdit(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }


        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }


        function pageUpdate(page) {
            PageService
                .updatePage(vm.pageId, page)
                .then(function (response) {
                    vm.success = "Page updated successfully";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, function (error) {
                    vm.alert = "Page could not be updated";
                });
        }

        function pageDelete() {
            PageService
                .deletePage(vm.pageId)
                .then(function (response) {
                    vm.success = "Page deleted successfully";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, function (error) {
                    vm.alert = "Page could not be deleted";
                });        }

        function clear(){
            vm.alert="";
            vm.success="";
        }

    }
})();