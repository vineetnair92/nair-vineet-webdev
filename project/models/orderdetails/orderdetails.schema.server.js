module.exports = function () {

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var OrderdetailsSchema = Schema({
        _order: {type: Schema.Types.ObjectId, ref: 'User'},
        SlNo: String,
        description: String,
        diameter: String,
        clothdesc: String,
        color:String,
        actualWeight:String,
        pdcWeight:String,
        actualRolls:String,
        pdcRolls:String,
        uom:String,
        Remarks:String,
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "orderdetails"});

    return OrderdetailsSchema;
}