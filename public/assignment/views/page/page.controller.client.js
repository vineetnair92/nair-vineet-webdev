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
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
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

        function init() {
            vm.websites = PageService.findPagesByWebsiteId(vm.websiteId);
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
                page = PageService.createPage(vm.websiteId, page);
                if (page==null) {
                    vm.alert = "page could not be created";
                } else {
                    vm.success = "Page created successfully";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");                }
            } else {
                vm.alert = "No details found";
            }
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }

    function EditPageController($location, $routeParams, PageService ) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.profile = profile;
        vm.pageOpen = pageOpen;
        vm.pageNew = pageNew;
        vm.pageEdit = pageEdit;
        vm.pageUpdate = pageUpdate;
        vm.pageDelete = pageDelete;
        vm.back = back;

        function init() {
            vm.pages = WebsiteService.findPageByWebsiteId(vm.websiteId);
            vm.page = WebsiteService.findPageById(vm.pageId);
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
            page = WebsiteService.updateWebsite(vm.pageId, page);
            if (page==null) {
                vm.alert = "page could not be updated";
            } else {
                vm.success = "Page updated successfully";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");            }
        }

        function pageDelete() {
            var response = PageService.deletePage(vm.pageId);
            if (response==null) {
                vm.alert = "page could not be deleted";
            } else {
                vm.success = "Page deleted successfully";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }


    }
})();