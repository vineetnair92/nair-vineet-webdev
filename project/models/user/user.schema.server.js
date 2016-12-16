module.exports = function (mongoose) {

//    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var UserSchema = Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        usertype: String,
        company:String,
        companies: [{type: Schema.ObjectId}],
        facebook: {
            id:    String,
            token: String
        },
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "proj.user"});

    return UserSchema;
}