'use strict';
const url = require('url');
const path = require('path');
const fs = require('fs');

const mime = require('./mime.json');
const querystring = require('querystring');
const music = require('./controllers/music');
const user = require('./controllers/user');


module.exports = function(req, res) {
    // 解析url 为urlObj
    let urlObj = url.parse(req.url, true);
    // 放置queryParm
    req.query = urlObj.query;
    // 解码url
    let pathname = decodeURI(urlObj.pathname);
    req.pathname = pathname;
    let method = req.method;

    // 根据不同的method 和路径 进行不同的操作
    if (method === 'GET' && pathname === '/') {
        music.renderIndex(req, res);
    } else if (method === 'GET' && pathname.startsWith('/node_modules/')) {
        let fullPath = path.join(__dirname, pathname);
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                return res.end(err.message);
            }
            res.writeHead(200, {
                'Content-Type': mime[path.extname(fullPath)] || 'text/plain'
            })
            res.end(data);
        })
    } else if (method === 'GET' && pathname === '/index.html') {
        music.renderIndex(req, res);
    } else if (method === 'GET' && pathname === '/music') {
        music.getMusicList(req, res);
    } else if (method === 'GET' && pathname.startsWith('/files/')) {
        music.transferMusic(req, res);
    } else if (method === 'GET' && pathname === '/add') {
        music.renderAdd(req, res);
    } else if (method === 'POST' && pathname === '/add') {
        music.doAdd(req, res);
    } else if (method === 'GET' && pathname === '/edit') {
        music.renderEdit(req, res);
    } else if (method === 'POST' && pathname === '/edit') {
        music.doEdit(req, res);
    } else if (method === 'GET' && pathname === '/remove') {
        music.doRemove(req, res);
    } else if (method === 'GET' && pathname === '/login') {
        user.showLogin(req, res);
    } else if (method === 'POST' && pathname === '/login') {
        user.doLogin(req, res);
    }
}