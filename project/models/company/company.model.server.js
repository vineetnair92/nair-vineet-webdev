module.exports = function (db_assignment) {

    var mongoose = require("mongoose");
    var CompanySchema = require("./company.schema.server.js")();
    var Company = db_assignment.model("Company", CompanySchema);
    var api = {
        createCompanyForUser: createCompanyForUser,
        findAllCompanyForUser: findAllCompanyForUser,
        findCompanyById: findCompanyById,
        updateCompany: updateCompany,
        deleteCompany: deleteCompany,
        deleteOrderForCompany: deleteOrderForCompany,
        findOrdersByCompany:findOrdersByCompany
    };
    return api;

    function createCompanyForUser(company) {
        console.log("Create company in model");
        return Company.create(company);
    }

    function findAllCompanyForUser(userId) {
        return Company.find({_user: userId});
    }

    function findCompanyById(companyId) {

        return Company.findById({_id: companyId});
    }

    function findOrdersByCompany(companyName) {
        return Company.find({name:companyName});
    }

    function updateCompany(companyId, company) {

        return Company.update({_id: companyId},
            {
                $set: {
                    _user: company._user,
                    name: company.name,
                    description: company.description,
                    orders: company.orders
                }
            });
    }


    function deleteCompany(companyId) {
        return Company.remove({_id: companyId});
    }

    function deleteOrderForCompany(companyId, orderId) {
        return Company.update({_id: companyId},
            {
                $pullAll: {
                    "orders": [orderId]
                }
            },
            {safe: true});
    }
}