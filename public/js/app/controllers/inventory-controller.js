/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'app/utils/logger',
    'app/services/inventory-service'
], function (angular, logger, inventoryService) {
    'use strict';

    function load($http, $rootScope, $scope) {

        inventoryService.goods($http, $rootScope.loggedUser, function(data) {

            if(data.success && data.goods) {
                $scope.goods = data.goods;
            } else {
                $scope.error = data.error;
                $scope.msg = data.msg;
            }
        });
    }

    return function($scope, $location, $rootScope, $http) {

        load($http, $rootScope, $scope);

        var intervalId = setInterval(function() {

            load($http, $rootScope, $scope);

        }, 3000);
    }
});