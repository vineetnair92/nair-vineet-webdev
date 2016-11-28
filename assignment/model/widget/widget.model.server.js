/**
 * Created by Vineet Nair on 11/26/2016.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var WidgetSchema = require('./widget.schema.server')();
    var Widget = mongoose.model('Widget', WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        sortWidget: sortWidget,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        widget.size = 1;
        widget.width = "100%";
        return Widget
            .find({_page: pageId})
            .then(function (widgets) {
                console.log("Widget Created");
                return Widget.create(widget);
            });
    }


    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId}).sort('order');
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }


    function sortWidget(pageId, start, end){
        return findAllWidgetsForPage(pageId)
            .then(function(pageWidgets){
                pageWidgets.splice(end, 0, pageWidgets.splice(start, 1)[0]);
                for(wid in pageWidgets){
                    pageWidgets[wid].order = parseInt(wid) + 1;
                    pageWidgets[wid].save();
                }
            });
    }


    function updateWidget(widgetId, widget) {
        delete widget._id;
        return Widget.update({_id: widgetId},
            {
                $set: {
                    name: widget.name ? widget.name : null,
                    description: widget.description ? widget.description:null,
                    text: widget.text ? widget.text : null,
                    placeholder: widget.placeholder ? widget.placeholder : null,
                    url: widget.url,
                    width: widget.width ? widget.width : null,
                    height: widget.height ? widget.height : null,
                    rows: widget.rows ? widget.rows : null,
                    size: widget.size ? widget.size : null,
                    class: widget.class,
                    icon: widget.icon,
                    deletable: widget.deletable,
                    formatted: widget.formatted ? widget.formatted : null
                }
            });
    }

    function deleteWidget(widgetId) {
        return Widget.remove(
            {
                _id: widgetId
            });
    }

};