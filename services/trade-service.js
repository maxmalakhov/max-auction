/**
 * Created by max on 1/31/16.
 */

var userService  = require('../services/user-service');
var goodsService  = require('../services/goods-service');

var service = function() {};

var ws = false;

service.prototype = {

    'notify': function(data) {
        ws.send(JSON.stringify({ receiver: 'auction', data: data }), function(data) {
            console.log('sent', data);
        });
    },

    'process': function(_ws, auction) {

        ws = _ws;
        var self = this;

        var seller = auction.seller;
        var buyer = auction.buyer;
        var type = auction.type;
        var price = auction.lastbid;
        var quantity = auction.quantity;

        //if(seller.id === buyer.id) {
        //    self.notify({ auction: false, msg: "There were no one bids" });
        //    return;
        //}

        if(buyer.balance < auction.lastbid) {
            self.notify({ auction: false, msg: "Buyer does not have enough coins" });
            return;
        }

        var buyer_balance = parseInt(buyer.balance) - auction.lastbid;
        var seller_balance = parseInt(seller.balance) + auction.lastbid;
        // no transaction management
        // reduce buyer coins
        userService.updateBalance(buyer.id, buyer_balance, function() {
            // reduce seller item quantity
            goodsService.decreaseQuantity(seller.id, type, quantity, function() {

                // increase buyer item quantity
                goodsService.increaseQuantity(buyer.id, type, quantity, function() {

                });

                // increase seller coins
                userService.updateBalance(seller.id, seller_balance, function() {

                });
            });
        });
    }
};

module.exports = new service();