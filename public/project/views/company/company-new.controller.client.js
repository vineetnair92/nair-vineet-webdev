(function () {
    angular
        .module("TexApp")
        .controller("NewCompanyController", NewCompanyController);

    var userCompaniesUpdateError = "Error updating company references in user";

    function NewCompanyController($location, $routeParams, CompanyService, UserService, CompanyListService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.createCompany = createCompany;


        function createCompany(company) {
            CompanyService
                .createCompany(cModel.userId, company)
                .then(function (response) {
                    if (response.data) {
                        var _companyId = response.data._id;
                        updateCompanyReferencesInUser(_companyId,company);
                    } else {
                        cModel.error = "Unable to create company";
                    }
                });

        }

        function updateCompanyReferencesInUser(companyId,company) {
            UserService
                .findUserById(cModel.userId)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        user.companies.push(companyId);
                        UserService
                            .updateUser(cModel.userId, user)
                            .then(function (response) {
                                if (response.status === 200) {
                                    $location.url("/user/" + cModel.userId + "/company");
                                }
                                else {
                                    cModel.error = userCompaniesUpdateError;
                                }
                            })
                            .catch(function (error) {
                                cModel.error = userCompaniesUpdateError;
                            });

                    }
                    else {
                        cModel.error = userCompaniesUpdateError;
                    }
                })
                .catch(function (error) {
                    cModel.error = userCompaniesUpdateError;
                });

            CompanyListService
                .createCompanyList(companyId, company)
                .then(function (response) {
                    if (!response.data) {
                        cModel.error = "Unable to create company";
                    }
                });

        }
    }
})();