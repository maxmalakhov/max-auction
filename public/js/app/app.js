/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'angularAMD',
    'angular-route',
    'app/config',
    'app/directives/app-stats'
], function (angular, angularAMD, angularRoute, config, appStats) {
    'use strict';

    var app = angular.module('webapp' , ['ngRoute'] );
    app.config(config);

    app.directive('appStats', appStats);

    //app.run(function ($window, auth, user) {
    //    auth.setAuthorizationHeaders();
    //    user.initialize();
    //});

    return angularAMD.bootstrap(app);
});