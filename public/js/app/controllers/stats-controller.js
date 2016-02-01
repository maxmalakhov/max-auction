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

    function load($http, $rootScope, $scope) {

        statsService.user($http, $rootScope.loggedUser, function(data) {

            if(data.success && data.user) {
                $scope.user = data.user;
            } else {
                $scope.error = data.error;
                $scope.message = data.message;
            }
        });
    }


    return function($scope, $location, $rootScope, $http) {

        load($http, $rootScope, $scope);

        var intervalId = setInterval(function() {

            load($http, $rootScope, $scope);

        }, 3000);

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