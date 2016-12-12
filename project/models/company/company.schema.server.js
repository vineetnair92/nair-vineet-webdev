module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var CompanySchema = Schema({
        _user: {type: Schema.Types.ObjectId, ref: 'User'},
        name: String,
        description: String,
        orders: [Schema.Types.ObjectId],
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "company"});

    return CompanySchema;
}