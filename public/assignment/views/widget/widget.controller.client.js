/*Created by Vineet Nair on 10/19/2016.*/
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
        vm.newWidget = newWidget;
        vm.editWidget = editWidget;
        vm.profile = profile;
        vm.back=back;

        function init() {
            vm.widgets = WidgetService.findWidgetsForPage(vm.pageid);
        }
        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }


        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

        function newWidget() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
        }

        function editWidget(widget) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

    }


    function NewWidgetController($location,$routeParams, WidgetService ) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.profile = profile;
        vm.widgetCreate = widgetCreate;
        vm.back = back;

        function init() {
//            vm.widgets = WidgetService.findWidgetsForPage(vm.pageId)
        }
        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }


        function widgetCreate(website) {
            var widget = {};
            widget.widgetType = widgetType;
            widget = WidgetService.createWidget(vm.pageId, widget);
            if (widget) {
                vm.success = "Widget created successfully";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
            } else {
                vm.alert = "widget could not be created";
            }
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }


    function EditWidgetController($location, $routeParams, WidgetService ) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.profile = profile;
        vm.widgetUpdate = widgetUpdate;
        vm.widgetDelete = widgetDelete;
        vm.back = back;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function widgetUpdate(widget) {
            widget = WidgetService.updateWidget(vm.widgetId, widget);
            if (widget==null) {
                vm.alert = "widget could not be updated";
            } else {
                vm.success = "Widget updated successfully";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");            }
        }

        function widgetDelete() {
            var response = WidgetService.deleteWidget(vm.widgetId);
            if (response==null) {
                vm.alert = "widget could not be deleted";
            } else {
                vm.success = "Widget deleted successfully";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");            }
        }
    }
})();