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
                    var comp=response.data;
                    console.log("REAched back controller   "+ response.data);
                    if (comp) {
                        var _companyId = comp._id;
                        AddCompanyList(_companyId,comp);
                        $location.url("/user/" + cModel.userId + "/company");
                     //   updateCompanyReferencesInUser(_companyId,comp);
                    } else {
                        cModel.error = "Unable to create company";
                    }
                });
        }

        function AddCompanyList(companyId,company) {
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