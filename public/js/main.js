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
        'jquery': '../lib/jquery.min',
        'bootstrap': '../lib/bootstrap.min',
        'angular': '../lib/angular',
        'angularAMD': '../lib/angularAMD.min',
        'angular-route': '../lib/angular-route.min',

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
        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        }
    },
    deps: ['app/app']
});