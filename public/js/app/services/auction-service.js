/**
 * Created by max on 1/30/16.
 */
define([
    'angular',
    'app/utils/logger'
], function (angular, logger) {
    'use strict';

    return {
        load: function($websocket, server, user, handler) {
            var dataStream = $websocket('ws://'+server);
            //var collection = [];

            dataStream.onMessage(function(message) {
                console.debug('received', JSON.parse(message.data));
                handler(JSON.parse(message.data));
                //collection.push(JSON.parse(message.data));
            });

            //return {
            //    collection: collection,
            //    get: function() {
            //        dataStream.send(JSON.stringify({ action: 'get' }));
            //    }
            //};
        }
    }
});