/**
 * Created by max on 1/30/16.
 */

var userService = require('../services/user-service');
var goodsService = require('../services/goods-service');

var controller = function() {};

controller.prototype = {

    'getUser' : function(username, success, failure) {

        userService.getUserByName(username, function(user) {
            if(user) {
                success(user);
            } else {
                userService.createNew(username, function(user) {
                    if(user) {
                        success(user);
                    } else {
                        failure()
                    }
                })
            }
        });
    },

    'getUserGoods' : function(username, success, failure) {

        userService.getUserByName(username, function(user) {
            if(user) {
                goodsService.getByUser(user.id, success);
            } else {
                failure();
            }
        });
    }
};

module.exports = new controller();