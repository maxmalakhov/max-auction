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

        $scope.closeDialog = function() {
            $scope.showModal = !$scope.showModal;
        };

        $scope.openDialog = function(item) {
            $scope.item = item;

            $scope.showModal = !$scope.showModal;
        };

        $scope.startAuction = function() {

            $scope.showModal = !$scope.showModal;

            console.log('start', $scope.item);
        };
    }
});