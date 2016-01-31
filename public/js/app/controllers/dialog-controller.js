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
        $scope.showModal = false;

        $scope.openDialog = function(item) {
            console.debug('opened', item);
            $scope.showModal = !$scope.showModal;
        };

        $scope.start = function() {

            console.log();
        }
    }
});