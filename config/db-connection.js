/**
 * Created by max on 1/30/16.
 */

var connectionString = process.env.DATABASE_URL || 'postgres://max-auction:max-auction@localhost:5432/max-auction';

//var connectionString = {
//    host: 'localhost',
//    port: 5432,
//    database: 'max-auction',
//    user: 'max-auction',
//    password: 'max-auction'
//};

module.exports = connectionString;