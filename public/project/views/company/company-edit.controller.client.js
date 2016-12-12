(function () {
    angular
        .module("TexApp")
        .controller("EditCompanyController", EditCompanyController);

    function EditCompanyController($location, $routeParams, CompanyService) {
        console.log("In edit");
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.companyId = $routeParams.wid;
        cModel.updateCompany = updateCompany;
        cModel.deleteCompany = deleteCompany;
        init();

        function init() {
            CompanyService
                .findCompanyById(cModel.companyId)
                .then(function (response) {
                    cModel.company = response.data;
                    console.log(cModel.company);
                })
        }

        function updateCompany(company) {
            cModel.updateStats =

                CompanyService
                    .updateCompany(cModel.companyId, company)
                    .then(function (response) {
                        var updateStats = response.status;
                        if (updateStats === 200) {
                            $location.url("/user/" + cModel.userId + "/company");
                        }
                        else {
                            cModel.error = "Unable to update company";
                        }

                    })
                    .catch(function (response) {
                        cModel.error = "Unable to update company";
                    });


        }

        function deleteCompany(companyId) {
            CompanyService.deleteCompany(companyId)
                .then(function (response) {
                    var deleteStats = response.status;
                    if (deleteStats === 200) {
                        $location.url("/user/" + cModel.userId + "/company");
                    }
                    else {
                        cModel.error = "Unable to delete company";
                    }

                })
                .catch(function (response) {
                    cModel.error = "Unable to delete company";
                });
        }
    }
})();