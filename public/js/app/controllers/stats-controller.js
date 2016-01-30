/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'app/utils/logger',
    'app/services/entry-service',
    'app/services/stats-service'
], function (angular, logger, entryService, statsService) {
    'use strict';

    return function($scope, $location, $rootScope, $http) {

        statsService.user($http, $rootScope.loggedUser, function(data) {
            if(data.success && data.user) {
                $scope.user = data.user;
            } else {
                $scope.error = data.error;
            }
        });

        $scope.exit = function() {
            if(entryService.logout()) {
                $rootScope.loggedUser = "";
                $location.path( "/" );
            } else {
                $scope.error = "Something goes wrong!";
            }
        }
    }
});