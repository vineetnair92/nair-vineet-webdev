/**
 * Created by Vineet Nair on 10/19/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Watchmaker <a href="http://gizmodo.com/tag/mbf" rel="nofollow">MB&amp;F</a> isn’t as well-known as  Rolex or Timex, but that’s because the company’s unique creations—like a <a href="http://gizmodo.com/listen-to-an-18-000-tie-fighter-music-box-play-the-sta-1717444112" rel="nofollow">TIE Fighter-shaped music box</a> that plays the <em>Star Wars</em> theme—are made for die-hard collectors. Its latest creation is a <a href="https://www.mbandf.com/en/machines/co-creations/astrograph" target="_blank" rel="noopener">rocket-shaped pen inspired by the moon landing</a>, and I’m desperately trying to justify…<span class="read-more-placeholder"></span><span class="readmore-core-decorated"></span></p>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetsForPage: findWidgetsForPage,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget:deleteWidget
        };
        return api;


        function createWidget(pageId,widget) {
            var widget_new= {
                _id: (new Date()).getTime().toString(),
                widgetType:widget.widgetType,
                pageId: pageId,
                size: widget.size,
                text:widget.text
            };
            widgets.push(widget_new);
        }


        function findWidgetsForPage(pageId) {
            var widgets_list=[];
            for (var w in widgets){
                if (widgets[w].pageId ===  parseInt(pageId)){
                    websites_list.push(widgets[w]);
                }
            }
            return websites_list;
        }


        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === parseInt(widgetId)) {
                    return widgets[w];
                }
            }
            return null;
        }


        function updateWidget(widgetId, widget) {
            for (var w in widgets){
                currentWidget = widgets[w];
                if (currentWebsite._id ===  parseInt(widgetId)){
                    currentWidget.widgetType=widget.widgetType;
                    currentWidget.pageId= widget.pageId;
                    currentWidget.size= widget.size;
                    currentWidget.text=widget.text;
                    return true;
                }
                return false;
            }
        }

        function deleteWidget(widgetId) {
            for (var i in widgets){
                widget = widgets[i];
                if (widget._id ===  parseInt(widgetId)){
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }




    }
})();