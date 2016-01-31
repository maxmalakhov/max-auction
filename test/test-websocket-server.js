/**
 * Created by max on 1/31/16.
 */
var app = require("../app");
var should = require('should');
var assert = require('assert');
var WebSocket = require("ws");

var client = new WebSocket('ws://localhost:'+(process.env.PORT || '3000'));

//client.send("Test message");
client.on("connection", function(ws) {
    var id = setInterval(function() {
        ws.send(JSON.stringify(new Date()), function() {  })
    }, 1000);

    ws.on('open', function open() {
        console.log('connected');
    });

    ws.on('message', function(message) {
        console.log('received: %s', message);
    });

    ws.on("close", function() {
        console.log("websocket connection close");
        clearInterval(id);
    });
});

describe("WebSocket", function() {
    it('Should broadcast new user to all users', function(done){

        done();
    });
});

