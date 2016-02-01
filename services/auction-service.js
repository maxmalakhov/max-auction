/**
 * Created by max on 1/31/16.
 */

var userService  = require('../services/user-service');
var tradeService  = require('../services/trade-service');

var service = function() {};

var ws = false;
var wss = false;
var intervalId = false;
var current = false;

service.prototype = {

    'init': function(_ws, _wss) {
        ws = _ws;
        wss = _wss;
    },

    'broadcast': function(data) {
        wss.broadcast(JSON.stringify({ receiver: 'auction', data: data }), function(data) {
            console.log('sent', data);
        });
    },

    'notify': function(data) {
        ws.send(JSON.stringify({ receiver: 'auction', data: data }), function(data) {
            console.log('sent', data);
        });
    },

    'handle': function(data) {

        var self = this;

        switch(data.action) {
            case 'start': {
                start(data.user_id, data.auction,
                    function(auction) {
                        self.timer();
                        self.broadcast({ auction: auction });
                    },
                    function(error) {
                        if(error) {
                            self.broadcast(error);
                        } else {
                            self.broadcast({msg: "Current auction has not been ended yet!"});
                        }
                    });
                return;
            }
            case 'place': {
                update(data.user_id, data.auction,
                    function(auction) {
                        self.broadcast({ auction: auction });
                    },
                    function(error, auction) {
                        if(error) {
                            self.broadcast(error);
                        } else {
                            self.broadcast({ msg: "Current auction has been already ended!" });
                        }
                    });
                return;
            }
            default :
                console.error("Action undefined", data.action);
        }
    },

    'timer': function() {

        var self = this;

        intervalId = setInterval(function() {
            processTime(function(auction) {
                if(auction) {
                    self.broadcast({ auction: auction });
                } else {
                    self.broadcast({ auction: auction, msg: "Current auction has been ended!" });
                }
            });
        }, 1000)
    }
};

module.exports = new service();

function start(user_id, auction, success, failure) {

    if(current) {
        failure();
    } else {
        userService.getUser(user_id, function(user) {
            success(createAuction(user, auction));
        });
    }
}

function update(user_id, auction, success, failure) {

    if(current) {
        userService.getUser(user_id, function(user) {
            if(user.balance < auction.lastbid) {
                failure({ auction: auction, msg: "Buyer does not have enough coins" });
                return;
            }
            success(updateAuction(user, auction));
        });
    } else {
        failure();
    }
}

function updateAuction(user, auction) {
    current.buyer = user;
    current.lastbid = auction.bid;
    current.bid = auction.bid+1;
    if(current.timeleft < 10) {
        current.timelength += 10;
    }
    return current;
}

function processTime(handler) {
    if(current.timeleft < 1) {
        clearInterval(intervalId);
        tradeService.process(wss, current);

        current = false;
    } else {
        var time = Math.round((new Date().getTime() - current.starttime) / 1000);
        current.timeleft = current.timelength - time;
    }
    handler(current);
}

function calcTime(starttime) {
    return Math.round((new Date().getTime() - starttime) / 1000);
}

function createAuction(user, auction) {

    current = {
        seller: user,
        buyer: user,
        type: auction.type,
        quantity: auction.quantity,
        timelength: 90, // sec
        timeleft: 90, // sec
        lastbid: auction.bid,
        bid: auction.bid+1,
        starttime: new Date().getTime() // millisec
    };
    return current;
}