/**
 * Created by max on 1/30/16.
 */
var pg = require('pg');
var connectionString = require('../config/db-connection');

var dao =  function() {};

dao.prototype  = {

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
            // try to insert
            client.query(
                "insert into users (username, fullname, balance) values ($1, $2, $3)",
                [username, fullname, balance],
                function(err, result) {
                    if(err) {
                        return console.log('Could not insert new record', err);
                    }
                }
            );

            var results = [];
            var query = client.query("select * from users where username = $1", [username]);
            // Stream results back one row at a time
            query.on('row', function(row) {
                results.push(row);
            });

            query.on('end', function() {
                done();
                handler(results[0], options);
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

module.exports = new dao();