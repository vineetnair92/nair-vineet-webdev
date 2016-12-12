(function () {
    angular
        .module("TexApp")
        .controller("NewOrderController", NewOrderController);

    var companyOrdersUpdateError = "Error updating orders references in company";

    function NewOrderController($location, $routeParams, OrderService, CompanyService) {
        var cModel = this;
        cModel.userId = $routeParams.uid;
        cModel.companyId = $routeParams.wid;
        cModel.createOrder = createOrder;

        function createOrder(order) {
            OrderService
                .createOrder(cModel.companyId, order)
                .then(function (response) {
                    var order = response.data;
                    if (order) {
                        var _orderId = order._id;
                        updateOrderReferencesInWebsite(_orderId);
                    } else {
                        cModel.error = "Unable to create order";
                    }
                })
                .catch(function (error) {
                    cModel.error = "Something went wrong!!"
                })
        }


        function updateOrderReferencesInWebsite(orderId) {
            CompanyService
                .findCompanyById(cModel.companyId)
                .then(function (response) {
                    var company = response.data;
                    if (company) {
                        company.orders.push(orderId);
                        CompanyService
                            .updateCompany(cModel.companyId, company)
                            .then(function (response) {
                                if (response.status === 200) {
                                    $location.url("/user/" + cModel.userId + "/company/" + cModel.companyId + "/order");
                                }
                                else {
                                    cModel.error = companyOrdersUpdateError;
                                }
                            })
                            .catch(function (error) {
                                cModel.error = companyOrdersUpdateError;
                            });

                    }
                    else {
                        cModel.error = companyOrdersUpdateError;
                    }
                })
                .catch(function (error) {
                    cModel.error = companyOrdersUpdateError;
                });
        }

    }
})();