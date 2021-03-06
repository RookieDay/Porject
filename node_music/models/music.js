'use strict';
const db = require('./db');

function Music(music) {
    this.title = music.title;
    this.time = music.time;
    this.singer = music.singer;
    this.src = music.src;
}
// 函数上添加
Music.getAll = function(callback) {
    db.query('select * from music', (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        // console.log(rows);
        callback(null, rows);
    })
}
Music.getColumn = function(id, callback) {
    db.query(`
        select * from music 
        where id=${id}
        `, (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        // console.log(rows);
        callback(null, rows);
    })
}

Music.remove = function(id, callback) {
    db.query(`
        DELETE from music
        WHERE id="${id}"
        `, (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, rows);
    })
}

// 原型上添加 对象访问
Music.prototype.save = function(callback) {
    db.query(`
    insert into music 
    values(null,"${this.title}","${this.time}","${this.singer}","${this.src}")`, (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, rows);
    })
}
Music.prototype.update = function(callback) {
    db.query(`update music set title="${this.title}" where id="${this.id}"`, (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, rows);
    })
}
module.exports = Music;