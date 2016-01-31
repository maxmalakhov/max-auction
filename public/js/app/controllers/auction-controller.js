/**
 * Created by max on 1/29/16.
 */
define([
    'angular',
    'app/utils/logger',
    'app/services/auction-service'
], function (angular, logger, service) {
    'use strict';

    return function($scope, $location, $rootScope, $websocket) {
        $scope.showAuction = false;
        //$scope.auction = {
        //    seller: 'Seller',
        //    type: 'diamond',
        //    quantity: 1,
        //    timeleft: 45,
        //    lastbid: 100,
        //    bid: 101
        //};

        var server = $location.host() + ":" + $location.port();
        //service.load($websocket, server, $rootScope.user, function(auction) {
        //    $scope.auction = auction;
        //});

        var dataStream = $websocket('ws://'+server);
        //var collection = [];

        dataStream.onMessage(function(message) {
            var data = JSON.parse(message.data);
            console.debug('received', data);

            if(data.auction) {
                $scope.auction = data.auction;
                $scope.showAuction= true;
            } else {
                $scope.showAuction= false;
            }
        });

        $scope.place = function() {
            logger.debug('place', $scope.auction.bid)
        }
    }
});