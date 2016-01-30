/**
 * Created by max on 1/30/16.
 */
var pg = require('pg');
var connectionString = require('../config/db-connection');

var database =  function() {};

database.prototype  = {

    'get' : function(username, handler, options) {

        pg.connect(connectionString, function(err, client, done) {
            // Handle connection errors
            if(err) {
                return console.log('Could not connect to postgres', err);
            }

            var results = [];

            var query = client.query("select * from users where username = $1", [username]);
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

    'create' : function(username, fullname, balance, handler, options) {

        pg.connect(connectionString, function(err, client, done) {
            // Handle connection errors
            if(err) {
                return console.log('Could not connect to postgres', err);
            }

            var result = { username: username, fullname: fullname, balance: balance };

            var query = client.query("insert into users (username, fullname, balance) values ($1, $2, $3)", [username, fullname, balance]);

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