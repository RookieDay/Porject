'use strict';
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const musicPath = require('../config').musicPath;
const musicList = require('../models/music');
const Music = musicList;

exports.renderIndex = (req, res) => {
    res.render('index');
}

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

exports.renderAdd = (req, res) => {
    res.render('add');
}

exports.doAdd = (req, res) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    })
    req.on('end', () => {
        let obj = querystring.parse(data);
        let music = new Music(obj);
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


exports.renderEdit = (req, res) => {
    let mid = req.query.mid;
    Music.getColumn(mid, (err, rows) => {
        if (err) {
            return res.json({
                code: '5003',
                msg: 'music not found'
            })
        }
        res.render('edit', {
            music: rows
        })
    })
}

exports.doEdit = (req, res) => {
    let mid = req.query.mid;
    // let index = musicList.findIndex(m => m.id === mid);
    Music.getColumn(mid, (err, rows) => {
        if (err) {
            return res.json({
                code: '5002',
                msg: 'music info not found'
            })
            let selectTitle = rows.title;

            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            })
            req.on('end', () => {
                data = querystring.parse(data);
                data.id = mid;
                let music = new Music(data);
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
        }
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