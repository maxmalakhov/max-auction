/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'angularAMD',
    'route',
    'websocket',
    'app/config',
    'app/directives/app-stats',
    'app/directives/app-inventory',
    'app/directives/app-auction',
    'app/directives/app-dialog'
], function (angular, angularAMD, route, websocket, config, appStats, appInventory, appAuction, appDialog) {
    'use strict';

    var app = angular.module('webapp' , ['ngRoute', 'ngWebSocket'] );
    app.config(config);
    //app.factory('CurrentAuction', function($websocket) {
    //    // Open a WebSocket connection
    //    var dataStream = $websocket('wss');
    //
    //    var collection = [];
    //
    //    dataStream.onMessage(function(message) {
    //        collection.push(JSON.parse(message.data));
    //    });
    //
    //    var methods = {
    //        collection: collection,
    //        get: function() {
    //            dataStream.send(JSON.stringify({ action: 'get' }));
    //        }
    //    };
    //
    //    return methods;
    //});

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