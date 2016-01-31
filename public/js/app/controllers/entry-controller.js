/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'app/utils/logger',
    'app/services/entry-service'
], function (angular, logger, service) {
    'use strict';

    return function($scope, $location, $rootScope, $http) {
        $scope.enter = function() {

            service.login($http, $scope.username, function(data) {

                if(data.success && data.user) {
                    $rootScope.loggedUser = data.user;
                    $location.path( "/home" );
                } else {
                    $scope.error = data.error;
                    $scope.msg = data.msg;
                }
            });
        }
    }
});