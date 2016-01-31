/**
 * Created by max on 1/31/16.
 */
var WebSocketServer = require("ws").Server;

var app = {};

app.init = function(server) {

    var wss = new WebSocketServer({server: server});

    wss.on("connection", function(ws) {
        var id = setInterval(function() {
            var auction = {
                seller: 'Seller',
                type: 'diamond',
                quantity: 1,
                timeleft: 45,
                lastbid: 100,
                bid: 101
            };
            ws.send(JSON.stringify({ auction: auction }), function() {  })
        }, 5000);

        console.log("websocket connection open");

        ws.on('message', function(message) {
            console.log('received: %s', message);
        });

        ws.on("close", function() {
            console.log("websocket connection close");
            clearInterval(id);
        });
    });

};

module.exports = app;