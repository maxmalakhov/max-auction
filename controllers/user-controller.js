/**
 * Created by max on 1/30/16.
 */
var users  = require('../models/db-users');
var inventory  = require('../models/db-inventory');

var controller = function() {};

var COINS = 1000;
var BREAD = { type: 'bread', quantity: 30 };
var CARROT = { type: 'carrot', quantity: 8 };
var DIAMOND = { type: 'diamond', quantity: 1 };

controller.prototype = {
    'getUser' : function(username, handler) {

        users.get(username, function (users) {

            var user = users[0];

            inventory.getByUser(username, function(inventory) {
                if(inventory.length < 1) {
                    createInventory(username);
                }
            });

            handler(user);
        });
    },

    'createNew' : function(username, handler) {

        users.create(username, capitalise(username), COINS, function (user) {

            createInventory(username);

            handler(user);
        });
    }

};

module.exports = new controller();

function createInventory(username) {
    // add inventory async
    inventory.create(username, BREAD.type, BREAD.quantity);
    inventory.create(username, CARROT.type, CARROT.quantity);
    inventory.create(username, DIAMOND.type, DIAMOND.quantity);
}

function capitalise(string) {

    var words = string.split(" ");
    for ( var i = 0; i < words.length; i++ )
    {
        var j = words[i].charAt(0).toUpperCase();
        words[i] = j + words[i].substr(1);
    }
    return words.join(" ");
}