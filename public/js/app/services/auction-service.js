/**
 * Created by max on 1/30/16.
 */
define([
    'angular',
    'app/utils/notifier',
    'app/utils/logger'
], function (angular, notifier, logger) {
    'use strict';

    var ws;

    function send(action, user, auction) {
        ws.send(JSON.stringify({ receiver: 'auction',
            data: { action: action, user_id: user.id, auction: auction } }),
            function(data) {
                console.log('sent',data);
        });
    }

    return {
        init: function($websocket, server, handler) {
            ws = $websocket('ws://'+server);
            //var collection = [];

            ws.onMessage(function(message) {
                console.debug('received', message);
                var data = JSON.parse(message.data);
                if(data.receiver === 'auction') {
                    handler(data.data);
                }
            });

        },
        start: function(user, auction) {
            send('start', user, auction);
            notifier.notify('success', 'New Auction','Action has been started!');
        },
        place: function(user, auction) {
            if(user.balance < auction.bid) {
                notifier.notify('danger', 'Current Auction',"Your do not have enough coins!");
            } else {
                send('place', user, auction);
                notifier.notify('success', 'Current Auction',"Your bit '"+ auction.bid +"' has been placed!");
            }
        }
    }
});