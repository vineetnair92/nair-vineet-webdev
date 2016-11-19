/**
 * Created by Vineet Nair on 11/18/2016.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var WebsiteSchema = Schema({
        _user: {type: Schema.Types.ObjectId, ref: 'User'},
        name: {type: String, required: true},
        description: String,
        pages: [{type:Schema.Types.ObjectId, ref: 'Page'}],
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "website"});

    return WebsiteSchema;
};