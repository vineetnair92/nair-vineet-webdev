(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController)
        .controller('NewWidgetController', NewWidgetController)
        .controller('EditWidgetController', EditWidgetController);


    function WidgetListController($sce, $location, $routeParams, WidgetService) {
        var vm  = this;
        vm.userId  = $routeParams.uid;
        vm.websiteId  = $routeParams.wid;
        vm.pageId  = $routeParams.pid;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;
        vm.widgetNew = widgetNew;
        vm.widgetEdit = widgetEdit;
        vm.profile = profile;
        vm.back=back;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                }, function (error) {
                    vm.alert = "No such widgets for this page";
                });
        }
        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }


        function checkSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function checkSafeYouTubeUrl(widget) {
            var parts = widget.url.split('/');
            var id = parts[parts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function widgetNew() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
        }

        function widgetEdit(widget) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

    }


    function NewWidgetController($location,$routeParams, WidgetService ) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.profile = profile;
        vm.widgetCreate = widgetCreate;
        vm.back = back;
        vm.clear=clear;

        function init() {
        }
        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }


        function widgetCreate(widgetType) {
            var widget={};
            widget.widgetType=widgetType;
            WidgetService
                .createWidget(vm.pageId, widget)
                .then(function (response) {
                    var widget = response.data;
                    vm.success = "Widget created successfully";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                }, function (error) {
                    vm.alert = "Widget could not be created";
                });
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function clear()
        {
            vm.alert="";
            vm.success="";
        }
    }


    function EditWidgetController($location, $routeParams, WidgetService ) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.profile = profile;
        vm.widgetUpdate = widgetUpdate;
        vm.widgetDelete = widgetDelete;
        vm.back = back;
        vm.clear=clear;
        vm.url=url;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                }, function (error) {
                    vm.alert = "No such widget found";
                });
        }

        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function widgetUpdate(widget) {
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(function (response) {
                    vm.success = "Widget updated successfully";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, function (error) {
                    vm.alert = "Widget could not be updated";
                });
        }

        function widgetDelete() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function (response) {
                    vm.success = "Widget deleted successfully";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, function (error) {
                    vm.alert = "Widget could not be deleted";
                });
        }

        function url() {
            return "/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId;
        }

        function clear() {
            vm.success = "";
            vm.alert = "";
        }
    }
})();