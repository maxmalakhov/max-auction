/**
 * Created by max on 1/30/16.
 */
var pg = require('pg');
var connectionString = require('../config/db-connection');

var database =  function() {};

database.prototype  = {

    'getByUser' : function(user_id, handler, options) {

        pg.connect(connectionString, function(err, client, done) {
            // Handle connection errors
            if(err) {
                return console.log('Could not connect to postgres', err);
            }

            var results = [];

            var query = client.query("select * from inventory where user_id = $1", [user_id]);
            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            query.on('end', function() {
                done();
                handler(results, options);
            });
        });
    },

    'create' : function(user_id, type, quantity, handler, options) {

        pg.connect(connectionString, function(err, client, done) {
            // Handle connection errors
            if(err) {
                return console.log('Could not connect to postgres', err);
            }

            var result = { user_id: user_id, type: type, quantity: quantity };

            var query = client.query("insert into inventory (user_id, type, quantity) values ($1, $2, $3)", [user_id, type, quantity]);

            query.on('end', function() {
                done();
                handler(result, options);
            });

        });
    },

    'update' : function(username, balance, handler) {

        pg.connect(connectionString, function(err, client, done) {
            // Handle connection errors
            if(err) {
                return console.log('Could not connect to postgres', err);
            }

            var results = [];

            var query = client.query("update card set balance = $2 where username = $1", [username, balance]);

            query.on('row', function(row) {
                results.push(row);
            });

            query.on('end', function() {
                done();
                handler(results, options);
            });
        });
    }
};

module.exports = new database();