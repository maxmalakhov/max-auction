/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'app/utils/logger',
    'app/services/inventory-service'
], function (angular, logger, inventoryService) {
    'use strict';

    return function($scope, $location, $rootScope, $http) {

        inventoryService.goods($http, $rootScope.loggedUser, function(data) {

            if(data.success && data.goods) {
                $scope.goods = data.goods;
            } else {
                $scope.error = data.error;
                $scope.msg = data.msg;
            }
        });

        $scope.auction = function(itemId) {
            logger.debug('auction', itemId);
        }
    }
});