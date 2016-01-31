/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'app/utils/logger',
    'app/services/auction-service'
], function (angular, logger, service) {
    'use strict';

    return function($scope, $location, $rootScope, $http) {
        $scope.showModal = false;
        $scope.auction = {
            quantity: 1,
            bid: 1
        };

        $scope.closeDialog = function() {
            $scope.showModal = !$scope.showModal;
        };

        $scope.openDialog = function(item) {
            $scope.item = item;

            $scope.showModal = !$scope.showModal;
        };

        $scope.startAuction = function() {

            $scope.showModal = !$scope.showModal;

            if($scope.item && $scope.auction) {
                var auction = angular.copy($scope.item);
                auction.quantity = $scope.auction.quantity;
                auction.bid = $scope.auction.bid;

                service.start($rootScope.loggedUser, auction);

                console.log('start', auction);
            }
        };
    }
});