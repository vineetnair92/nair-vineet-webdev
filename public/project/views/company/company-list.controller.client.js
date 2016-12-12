(function () {
    angular
        .module('TexApp')
        .controller("CompanyListController", CompanyListController);

    function CompanyListController($routeParams, CompanyService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;

        init();

        function init() {
            CompanyService
                .findCompaniesByUser(cModel.userId)
                .then(function (response) {
                    cModel.companies = response.data;
                })
        }
    }

})();