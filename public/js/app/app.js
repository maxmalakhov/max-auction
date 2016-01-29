/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'angularAMD',
    'angular-route',
    //'app/services/services',
    'app/controllers/entry-controller'
    //'app/directives/directives'
], function (angular, angularAMD, angularRoute, EntryController) {
    'use strict';

    var app = angular.module('webapp' , ['ngRoute'] );

    app.controller('EntryController', EntryController);

    app.config(['$routeProvider', '$locationProvider', '$httpProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {
            //$httpProvider.responseInterceptors.push('httpInterceptor');

            $routeProvider
                .when('/', {templateUrl: 'views/entry.html', controller: 'EntryController' })
                .when('/home', {templateUrl: 'views/home.html', controller: 'HomeController'})
                .when('/stats/:id', {templateUrl:'views/stats.html', controller:'StatsController'})
                .when('/inventory/:id', {templateUrl:'views/inventory.html', controller:'InventoryController'})
                .when('/auction/:id', {templateUrl:'views/auction.html', controller:'AuctionController'})
                .otherwise({redirectTo: '/'});

            $locationProvider.html5Mode(true);
        }
    ]);

    //app.run(function ($window, auth, user) {
    //    auth.setAuthorizationHeaders();
    //    user.initialize();
    //});

    return angularAMD.bootstrap(app);
});