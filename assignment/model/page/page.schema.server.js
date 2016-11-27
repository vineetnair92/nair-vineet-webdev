/**
 * Created by Vineet Nair on 11/26/2016.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

    var PageSchema = Schema({
        _website: {type: Schema.Types.ObjectId, ref: 'Website'},
        name: {type: String, required: true},
        title: String,
        description: String,
        widgets: [{type: Schema.Types.ObjectId, ref: 'Widget'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "page"});

    return PageSchema;

};