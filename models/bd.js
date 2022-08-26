var mysql = require('mysql');
var util = require('util');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b55dee3bdd375f',
    password: '909d1843',
    database: 'heroku_904cbceca4ab77d'
});


pool.query = util.promisify(pool.query);

module.exports = pool;



