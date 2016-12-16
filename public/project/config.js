(function () {
    angular
        .module("TexApp")
        .config(Configure);

    function Configure($routeProvider) {

        $routeProvider
            .when("/home", {
                templateUrl: "views/homepage/project.view.client.html",
                controller: 'ProjectController'
            })

            .when("/login", {
                templateUrl: 'views/user/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when("/user/:uid", {
                templateUrl: 'views/user/user.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/company", {
                templateUrl: 'views/company/company-list.view.client.html',
                controller: 'CompanyListController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/company/new", {
                templateUrl: 'views/company/company-new.view.client.html',
                controller: 'NewCompanyController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/company/:wid", {
                templateUrl: 'views/company/company-edit.view.client.html',
                controller: 'EditCompanyController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/company/:wid/order", {
                templateUrl: 'views/order/order-list.view.client.html',
                controller: 'OrderListController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })

            .when("/user/:uid/company/:wid/order/new", {
                templateUrl: 'views/order/order-new.view.client.html',
                controller: 'NewOrderController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })

            .when("/user/:uid/company/:wid/order/:pid", {
                templateUrl: 'views/order/order-edit.view.client.html',
                controller: 'EditOrderController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })

            .when("/user/:uid/company/:wid/order/:pid/orderstatus", {
                templateUrl: 'views/order/update-orderStatus.view.client.html',
                controller: 'UpdateOrderStatusController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })

            .when("/user/:uid/company/:wid/order/:pid/orderdetails", {
                templateUrl: 'views/order/orderdetails-list.view.client.html',
                controller: 'OrderDetailsListController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/user/:uid/company/:wid/order/:pid/orderdetails/new", {
                templateUrl: 'views/order/order-modify.view.client.html',
                controller: 'ModifyOrderController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn

                }
            })
            .when("/register", {
                templateUrl: 'views/user/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })

            .when("/customer/:uid/:cid", {
                templateUrl: 'views/customer/user.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })
            .when("/customer/:uid/:cid/location", {
                templateUrl: 'views/customer/location.view.client.html',
                controller: 'LocationController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })

            .when("/customer/:uid/:cid/order", {
                templateUrl: 'views/customer/order-view.client.html',
                controller: 'ViewOrderController',
                controllerAs: 'model',
                resolve: {
                    isLoggedIn: isLoggedIn
                }
            })

            .otherwise({
                redirectTo: '/home'
            });

        function isLoggedIn(UserService, $location, $q, $rootScope) {

            var deferred = $q.defer();

            UserService
                .isLoggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        console.log(user);
                        if(user == '0') {
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/home");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function(err) {
                        $location.url("/home");
                    }
                );

            return deferred.promise;
        }
    }


})();