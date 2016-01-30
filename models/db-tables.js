/**
 * Created by max on 1/30/16.
 */
var pg = require('pg');
var connectionString = require('../config/db-connection');

var tables =  function() {};

tables.prototype = {
    'drop': function() {

        pg.connect(connectionString, function(err, client, done) {
            console.log("Drop tables")

            var query = client.query("drop table if exists users");

            query.on('end', function() {
                console.log("Dropped!");
                done();
            });
        });
    },

    'create': function() {

        pg.connect(connectionString, function(err, client, done) {
            console.log("Create tables if not existing");
            if(err) {
                console.error(err);
                done();
                return;
            }

            function createTable() {
                var create_table = client.query("create table users(id serial, username varchar(50), fullname varchar(50), balance numeric)");
                create_table.on('end', function() {
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
                console.log("Check Table!");
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