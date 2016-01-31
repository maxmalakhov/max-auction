/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'angularAMD',
    'angular-route',
    'app/config',
    'app/directives/app-stats',
    'app/directives/app-inventory',
    'app/directives/app-auction',
    'app/directives/app-dialog'
], function (angular, angularAMD, angularRoute, config, appStats, appInventory, appAuction, appDialog) {
    'use strict';

    var app = angular.module('webapp' , ['ngRoute'] );
    app.config(config);

    app.directive('appStats', appStats);
    app.directive('appInventory', appInventory);
    app.directive('appAuction', appAuction);
    app.directive('appDialog', appDialog);

    //app.run(function ($window, auth, user) {
    //    auth.setAuthorizationHeaders();
    //    user.initialize();
    //});

    return angularAMD.bootstrap(app);
});