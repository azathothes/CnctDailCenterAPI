const mysql = require('mysql');

const options = require('./database');

var connection = mysql.createPool(options.testConn);
console.log('connPool established successful...');
module.exports = connection;