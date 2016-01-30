/**
 * Created by max on 1/30/16.
 */
define([
    'app/controllers/entry-controller',
    'app/controllers/home-controller'
], function(EntryController, HomeController) {
    return ['$routeProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {
            //$httpProvider.interceptors.push('httpInterceptor');

            $routeProvider
                .when('/', {templateUrl: 'views/entry.html', controller: EntryController })
                .when('/home', {templateUrl: 'views/home.html', controller: HomeController })
                .when('/stats/:id', {templateUrl:'views/stats.html', controller:'StatsController'})
                .when('/inventory/:id', {templateUrl:'views/inventory.html', controller:'InventoryController'})
                .when('/auction/:id', {templateUrl:'views/auction.html', controller:'AuctionController'})
                .otherwise({redirectTo: '/'});

            $locationProvider.html5Mode(true);
        }
    ]
});
