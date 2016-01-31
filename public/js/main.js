/**
 * Created by max on 1/29/16.
 */
'use strict';

require.config({
    map:{
        // Maps
    },
    paths:{
        // Aliases and paths of modules
        //'angular': '../lib/angular.min',
        'angular': '../lib/angular',
        'angularAMD': '../lib/angularAMD.min',
        'route': '../lib/angular-route.min',
        'websocket': '../lib/angular-websocket.min',

        'jquery': '../lib/jquery.min',
        'bootstrap': '../lib/bootstrap.min',
        'notify': '../lib/bootstrap-notify.min',

        'app': '../js/app',
        'views': '../views'
    },
    shim:{
        // Modules and their dependent modules
        'angular': {
            exports: 'angular'
        },
        'angularAMD': {
            deps: ['angular'],
            exports: 'angularAMD'
        },
        'route': {
            deps: ['angular'],
            exports: 'route'
        },
        'websocket': {
            deps: ['angular'],
            exports: 'websocket'
        },
        'jquery': {
            exports: 'jquery'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'notify': {
            deps: ['bootstrap', 'jquery'],
            exports: 'notify'
        }
    },
    deps: ['app/app']
});