'use strict';
var Promise = require('./bluebird');

// 获取地址
// https://developers.douban.com/wiki/?title=movie_v2

module.exports = function (api, path, params) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: api + '/' + path,
            data: Object.assign({}, params),
            header: { 'Content-Type': 'json' },
            success: resolve,
            fail: reject
        })
    })
}