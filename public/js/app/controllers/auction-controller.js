/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'app/utils/logger'
], function (angular, logger) {
    'use strict';

    return function($scope, $location, $rootScope, $http) {

        $scope.auction = {
            seller: 'Seller',
            type: 'diamond',
            quantity: 1,
            timeleft: 45,
            lastbid: 100,
            bid: 101
        };

        $scope.place = function() {
            logger.debug('place', $scope.auction.bid)
        }
    }
});