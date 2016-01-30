/**
 * Created by max on 1/30/16.
 */
var pg = require('pg');
var connectionString = require('../config/db-connection');

var tables =  function() {};

tables.prototype = {
    'drop': function() {
        // drop users table
        pg.connect(connectionString, function(err, client, done) {
            console.log("Drop table 'users'")

            var query = client.query("drop table if exists users");

            query.on('end', function() {
                console.log("Dropped!");
                done();
            });
        });
        // drop inventory table
        pg.connect(connectionString, function(err, client, done) {
            console.log("Drop table 'inventory'")

            var query = client.query("drop table if exists inventory");

            query.on('end', function() {
                console.log("Dropped!");
                done();
            });
        });
    },

    'create': function() {
        // create users table
        pg.connect(connectionString, function(err, client, done) {
            console.log("Create table 'users' if not existing");
            if(err) {
                return console.error(err);
            }

            function createTable() {

                var create_table = client.query("create table users(id serial NOT NULL, username varchar(50) NOT NULL, fullname varchar(50), balance numeric)");
                create_table.on('end', function() {
                    // create async because constraints
                    var add_constraints = client.query("create unique index user_name ON users (username)");
                    console.log("Created!");
                    done()
                });
            }

            // #1. check for existing
            var exists = false;
            var query = client.query("select exists( select * from information_schema.tables where table_name = 'users')");
            query.on('row', function(row) {
                exists = row.exists;
            });
            query.on('end', function() {
                if (!exists) {
                    // #2. create if not existing
                    createTable();
                } else {
                    done();
                }
            });
        });
        // create inventory table
        pg.connect(connectionString, function(err, client, done) {
            console.log("Create table 'inventory' if not existing");
            if(err) {
                return console.error(err);
            }

            function createTable() {
                var create_table = client.query("create table inventory(id serial, user_id varchar(50), type varchar(20), quantity numeric)")

                create_table.on('end', function() {
                    // create async because constraints
                    var add_constraints = client.query("create unique index user_type ON inventory (user_id, type)");
                    console.log("Created!");
                    done()
                });
            }

            // #1. check for existing
            var exists = false;
            var query = client.query("select exists( select * from information_schema.tables where table_name = 'inventory')");
            query.on('row', function(row) {
                exists = row.exists;
            });
            query.on('end', function() {
                if (!exists) {
                    // #2. create if not existing
                    createTable();
                } else {
                    done();
                }
            });
        });
    }
};

module.exports = new tables();