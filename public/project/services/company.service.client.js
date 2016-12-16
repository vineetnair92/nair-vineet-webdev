(function () {
    angular
        .module("TexApp")
        .factory("CompanyService", CompanyService);

    function CompanyService($http) {
        var api = {
            createCompany: createCompany,
            findCompaniesByUser: findCompaniesByUser,
            deleteCompany: deleteCompany,
            findCompanyById: findCompanyById,
            updateCompany: updateCompany
        };
        return api;

        function deleteCompany(companyId) {
            var url = "/api/company/" + companyId;
            return $http.delete(url);
        }

        function createCompany(userId, company) {
            var newCompany = {
                //_id: (new Date()).getTime() + "",
                name: company.name,
                description: company.description,
                _user: userId
            };
            var url = "/api/user/" + userId + "/company";
            console.log(url);
            return $http.post(url, newCompany);
        }

        function findCompaniesByUser(userId) {
            var url = "/api/user/" + userId + "/company";
            return $http.get(url);
        }

        function findCompanyById(companyId) {
            var url = "/api/company/" + companyId;
            return $http.get(url);
        }

        function updateCompany(companyId, company) {
            var url = "/api/company/" + companyId;
            return $http.put(url, company);
        }


    }
})();