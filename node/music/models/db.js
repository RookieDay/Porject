'use strict';
exports.query = function(sql, callback) {
    var mysql = require('mysql');
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