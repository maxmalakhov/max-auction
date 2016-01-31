/**
 * Created by max on 1/31/16.
 */
var WebSocketServer = require("ws").Server;

var auctionService  = require('./services/auction-service');

var clients = [];
var app = function(server) {

    var wss = new WebSocketServer({server: server});

    var auction  = false;

    wss.on("connection", function(ws) {

        console.log("websocket connection open");

        auctionService.init(ws, wss);

        ws.on('message', function(message) {
            console.log('received: %s', message);
            var data = JSON.parse(message);
            switch(data.receiver) {
                case 'auction': auctionService.handle(data.data); return;
                default : console.error('Receiver unknown', data.receiver);
            }
        });

        ws.on("close", function() {
            console.log("websocket connection close");
        });
    });

    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };

};

module.exports = app;