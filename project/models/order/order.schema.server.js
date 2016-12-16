module.exports = function (mongoose) {

  //  var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var OrderSchema = Schema({
        _company: {type: Schema.Types.ObjectId, ref: 'User'},
        SlNo: String,
        description: String,
        orderstatus:{type: String, default: "Recieved Order"},
        orders: [Schema.Types.ObjectId],
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "order"});

    return OrderSchema;
}