/**
 * Created by max on 1/30/16.
 */

var connectionString = process.env.DATABASE_URL || 'postgres://max-auction:max-auction@localhost:5432/max-auction';

module.exports = connectionString;