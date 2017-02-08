'use strict';
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const musicPath = require('../config').musicPath;
const musicList = require('../models/music');
const Music = musicList;

// 直接将内容渲染出来
exports.renderIndex = (req, res) => {
    res.render('index');
}

// 获取所有的音乐信息
exports.getMusicList = (req, res) => {
    Music.getAll((err, rows) => {
        if (err) {
            return res.end(err.message);
        }
        res.json({
            musicList: rows
        })
    })
}

exports.transferMusic = (req, res) => {
    let fullPath = path.join(musicPath, req.pathname);
    let readStream = fs.createReadStream(fullPath);

    readStream.pipe(res);
}

// 添加页面
exports.renderAdd = (req, res) => {
    res.render('add');
}

// 执行添加过程
exports.doAdd = (req, res) => {
    let data = '';
    // 监听数据接受事件
    req.on('data', (chunk) => {
            data += chunk;
        })
        // 数据接收完以后 添加 保存数据
    req.on('end', () => {
        let obj = querystring.parse(data);
        let music = new Music(obj);
        // 首先在当前对象中找, 如果没有在原型链上往上找
        music.save((err, rows) => {
            if (err) {
                return res.end(err.message);
            }
            res.writeHead(302, {
                'Location': 'http://127.0.0.1:3000/'
            })
            res.end();
        })
    })
}


// 根据ID进行渲染编辑的歌曲
exports.renderEdit = (req, res) => {
    let mid = req.query.mid;
    Music.getColumn(mid, (err, rows) => {
        if (err) {
            return res.json({
                code: '5003',
                msg: 'music not found'
            })
        }
        console.log(rows);
        let music = rows;
        res.render('edit', {
            music: rows[0]
        })
    })
}

// 执行进行编辑的操作
exports.doEdit = (req, res) => {
    let mid = req.query.mid;
    // let index = musicList.findIndex(m => m.id === mid);
    Music.getColumn(mid, (err, rows) => {
        if (err) {
            return res.json({
                code: '5002',
                msg: 'music info not found'
            })
        }
        let selectTitle = rows[0].title;
        // req的数据内容
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            data = querystring.parse(data);
            data.id = mid;
            let music = new Music(data);
            music.id = mid;
            music.update((err, rows) => {
                if (err) {
                    return res.json({
                        code: '5003',
                        msg: 'music updatea failed'
                    })
                }
                res.writeHead(302, {
                    'Location': 'http://127.0.0.1:3000/'
                })
                res.end();
            })
        })

    })

}
exports.doRemove = (req, res) => {
    let mid = req.query.mid;
    // let index = musicList.findIndex(m => m.id === mid);
    Music.getColumn(mid, (err, rows) => {
        if (err) {
            return res.json({
                code: '6002',
                msg: 'music info not found'
            })
        }
        Music.remove(mid, (err, rows) => {
            if (err) {
                throw err;
            }
            res.json({
                code: '6000',
                msg: 'remove success'
            })
        });
    })


}