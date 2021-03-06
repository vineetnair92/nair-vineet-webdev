/**
 * Created by Vineet Nair on 11/18/2016.
 */
module.exports = function (mongoose) {
  //  var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

    var UserSchema = Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        facebook: {id: String, token: String},
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "user"});

    return UserSchema;
}