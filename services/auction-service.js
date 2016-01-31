/**
 * Created by max on 1/31/16.
 */

var userService  = require('../services/user-service');

var service = function() {};

var ws = false;
var intervalId = false;
var current = false;

service.prototype = {

    'notify': function(data) {
        ws.send(JSON.stringify({ receiver: 'auction', data: data }), function(data) {
            console.log('sent', data);
        });
    },

    'handle': function(_ws, data) {

        ws = _ws;
        var self = this;

        switch(data.action) {
            case 'start': {
                start(data.user_id, data.auction,
                    function(auction) {
                        self.timer();
                        self.notify({ auction: auction });
                    },
                    function() {
                        self.notify({ msg: "Current auction has not been ended yet!" });
                    });
                return;
            }
            case 'place': {
                update(data.user_id, data.auction,
                    function(auction) {
                        self.notify({ auction: auction });
                    },
                    function() {
                        self.notify({ msg: "Current auction has been already ended!" });
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
                    self.notify({ auction: auction });
                } else {
                    self.notify({ auction: auction, msg: "Current auction has been ended!" });
                }
            });
        }, 1000)
    },

    'deal': function(auction) {
        var seller = auction.seller.id;
        var buyer = auction.buyer.id;
        var type = auction.type;
        var price = auction.lastbid;
        var quantity = auction.quantity;

        if(buyer.balance < auction.lastbid) {
            self.notify({ auction: false, msg: "Buyer does not have enough coins" });
            return;
        }
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
            success(updateAuction(user, auction));
        });
    } else {
        failure();
    }
}

function updateAuction(user, auction) {
    current.buyer = user.username;
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
        timelength: 10, // sec
        timeleft: 90, // sec
        lastbid: auction.bid,
        bid: auction.bid+1,
        starttime: new Date().getTime() // millisec
    };
    return current;
}