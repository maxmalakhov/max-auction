/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'app/utils/logger',
    'app/services/entry-service'
], function (angular, logger, service) {
    'use strict';

    return function($scope, $location, $rootScope) {
        $scope.enter = function() {
            if(service.login($scope.username)) {
                $rootScope.loggedUser = $scope.username;
                $location.path( "/home" );
            } else {
                $scope.error = "Something goes wrong!";
            }
        }
    }
});