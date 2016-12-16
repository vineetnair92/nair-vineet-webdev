module.exports = function (app, models,userModel) {

    var companyModel = models.companyModel;
//    var userModel = models.userModel;

    app.post("/api/user/:userId/company", createCompany);
    app.get("/api/user/:userId/company", findAllCompaniesForUser);
    app.get("/api/company/:companyId", findCompanyById);
    app.put("/api/company/:companyId", updateCompany);
    app.delete("/api/company/:companyId", deleteCompany);
    app.get("/api/company", findOrdersByCompany);

    function createCompany(req, res) {
        var newCompany = req.body;
        companyModel
            .createCompanyForUser(newCompany)
            .then(function (company) {
                res.json(company);
                console.log("Reached Here"+company._doc._id);
            })
            .catch(function (error) {
                console.log("Oops..");
                res.status(400).send(error);
            })
    }

    function findAllCompaniesForUser(req, res) {
        var userId = req.params.userId;
        companyModel
            .findAllCompanyForUser(userId)
            .then(function (companies) {
                res.json(companies);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }

    function findCompanyById(req, res) {
        var companyId = req.params.companyId;
        companyModel
            .findCompanyById(companyId)
            .then(function (company) {
                res.json(company);
            })
            .catch(function (error) {
                res.status(400).send(error);
            });

    }


    function findOrdersByCompany(req,res) {
        var companyName = req.query.company;
        console.log("Company Name in service serer");
        companyModel.findOrdersByCompany(companyName)
            .then(function (orders){
                res.json(orders);
            }).catch(function (error) {
            res.status(400).send(error);
        });

    }


    function updateCompany(req, res) {
        var company = req.body;
        var companyId = req.params.companyId;
        delete company._id;
        companyModel
            .updateCompany(companyId, company)
            .then(function (response) {
                res.json(response);
            })
            .catch(function (error) {
                res.status(400).send(error);
            })
    }

    function deleteCompany(req, res) {
        var companyId = req.params.companyId;
        companyModel
            .findCompanyById(companyId)
            .then(function (company) {
                companyModel
                    .deleteCompany(companyId)
                    .then(function (response) {
                        userModel
                            .deleteCompanyForUser(company._user, companyId)
                            .then(function (response) {
                                res.send(response);
                            })
                            .catch(function (error) {
                                res.status(400).send(error);
                            })

                    })
                    .catch(function (error) {
                        res.status(400).send(error);
                    });
            })
            .catch(function (error) {
                res.status(400).send(error);
            });
    }
};