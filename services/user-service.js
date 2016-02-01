/**
 * Created by max on 1/30/16.
 */
var userDao  = require('../models/user-dao');
var goodsDao  = require('../models/goods-dao');

var goodsService = require('../services/goods-service');

var service = function() {};

// Default values
var COINS = 1000;

service.prototype = {

    'getUser' : function(user_id, handler) {

        userDao.get(user_id, function (users) {

            var user = users[0];
            if(user) {
                // we can do it async
                goodsService.getByUser(user.id, function(goods) {
                    if(goods.length !== 3) {
                        goodsService.giveGoods(user.id);
                    }
                });
            }

            handler(user);
        });
    },

    'getUserByName' : function(username, handler) {

        userDao.getByName(username, function (users) {

            var user = users[0];
            if(user) {
                // we can do it async
                goodsService.getByUser(user.id, function(goods) {
                    if(goods.length !== 3) {
                        goodsService.giveGoods(user.id);
                    }
                });
            }

            handler(user);
        });
    },

    'createNew' : function(username, handler) {

        userDao.create(username, capitalise(username), COINS, function (user) {

            if(user) {
                // we can do it async
                goodsService.giveGoods(user.id);
            }

            handler(user);
        });
    },

    'updateBalance' : function(user_id, balance, handler) {

        userDao.updateBalance(user_id, balance, function (user) {

            handler(user);
        });
    }
};

module.exports = new service();

function capitalise(string) {

    var fullname = string.replace(/\_/g, " ");

    var words = fullname.split(" ");
    for ( var i = 0; i < words.length; i++ )
    {
        var j = words[i].charAt(0).toUpperCase();
        words[i] = j + words[i].substr(1);
    }
    return words.join(" ");
}