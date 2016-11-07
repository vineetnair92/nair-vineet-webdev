(function(){
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable(){
        function linker(scope, element, attributes){
            var initial = -1;
            var final = -1;

            element
                .sortable({
                    start: function(event, ui){
                        initial = $(ui.item).index();
                    },
                    stop: function(event, ui){
                        final = $(ui.item).index();
                        var pid = scope.$parent.model.pageId;
                        scope.SortableController.rearrange(initial, final, pid);
                    }
                });
        }

        return{
            scope:{},
            link: linker,
            controller: SortableController,
            controllerAs: 'SortableController'
        }
    }


    function SortableController(WidgetService){
        var vm = this;
        vm.rearrange = rearrange;

        function rearrange(initial, final, pageId){
            WidgetService.widgetsSort(initial, final, pageId);
        }
    }
})();