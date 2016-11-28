/*Created by Vineet Nair on 11/27/2016.*/
module.exports = function () {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

    var WidgetSchema = Schema({
        _page: {type: Schema.Types.ObjectId, ref: 'Page'},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'], required: true},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        order:Number,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "widget"});

    return WidgetSchema;

};