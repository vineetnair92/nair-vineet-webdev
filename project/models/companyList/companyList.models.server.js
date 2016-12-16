module.exports = function (db_assignment,mongoose) {

//    var mongoose = require("mongoose");
    var companyListSchema = require("./companyList.schema.server.js")(mongoose);
    var companyList = mongoose.model("companyListSchema", companyListSchema);
    var api = {
        createCompanyList: createCompanyList,
        findCompanyExists: findCompanyExists
    };
    return api;

    function createCompanyList(companylist) {
        console.log("added company in model");
        return companyList.create(companylist);
    }

    function findCompanyExists(company) {
        console.log("Models Server side");
        return companyList.find({"company": company});
    }

}
