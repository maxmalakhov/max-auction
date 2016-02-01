/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'app/utils/notifier',
    'app/utils/logger',
    'app/services/auction-service'
], function (angular, notifier, logger, service) {
    'use strict';

    return function($scope, $location, $rootScope, $websocket) {
        $scope.showAuction = false;

        var server = $location.host() + ":" + $location.port();
        service.init($websocket, server, function(data) {

            if(data.auction) {
                $scope.current = data.auction;
                $scope.showAuction= true;
            } else {
                $scope.showAuction= false;
                notifier.notify(data.level || 'warning', 'Current Action', data.msg, data.timer);
            }
        });

        $scope.place = function() {
            logger.debug('place', $scope.current);

            service.place($rootScope.loggedUser, $scope.current);
        }
    }
});