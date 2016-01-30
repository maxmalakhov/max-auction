/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'angularAMD',
    'angular-route',
    'app/config',
    'app/directives/app-stats',
    'app/directives/app-inventory'
], function (angular, angularAMD, angularRoute, config, appStats, appInventory) {
    'use strict';

    var app = angular.module('webapp' , ['ngRoute'] );
    app.config(config);

    app.directive('appStats', appStats);
    app.directive('appInventory', appInventory);

    //app.run(function ($window, auth, user) {
    //    auth.setAuthorizationHeaders();
    //    user.initialize();
    //});

    return angularAMD.bootstrap(app);
});