/**
 * Created by max on 1/30/16.
 */
var goodsDao  = require('../models/goods-dao');

var service = function() {};

// Default values
var BREAD = { type: 'bread', quantity: 30 };
var CARROT = { type: 'carrot', quantity: 8 };
var DIAMOND = { type: 'diamond', quantity: 1 };

service.prototype = {

    'getByUser' : function(user_id, handler) {
        goodsDao.getByUser(user_id, function(goods) {
            handler(goods);
        });
    },

    'giveGoods' : function(user_id, handler) {

        // we can make it async
        goodsDao.create(user_id, BREAD.type, BREAD.quantity);
        goodsDao.create(user_id, CARROT.type, CARROT.quantity);
        goodsDao.create(user_id, DIAMOND.type, DIAMOND.quantity);
    }

};

module.exports = new service();