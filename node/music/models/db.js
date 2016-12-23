'use strict';
const mysql = require('mysql');
exports.query = function(sql, callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'music'
    })
    connection.connect();
    connection.query(sql, callback);
    connection.end();
}