'use strict';

// 接口形式
// https://api.douban.com/v2/movie/coming_soon?page=1&count=3

var URI = 'https://api.douban.com/v2/movie';
var fetch = require('./fetch');

// https://api.douban.com/v2/movie/top250?count=10&start=4
function fetchApi(type, params) {
    return fetch(URI, type, params);
}

/** /v2/movie/coming_soon
 * 获取列表类型的数据
 * @param  {String} type   类型，例如：'coming_soon'
 * @param  {Number} page   页码
 * @param  {Number} count  页条数
 * @param  {String} search 搜索关键词
 * @return {Promise}       包含抓取任务的Promise
 */
function find(type) {
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
    var search = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    var params = { start: (page - 1) * count, count: count, city: getApp().data.currentCity };

    var params = { start: (page - 1) * count, count: count, city: getApp().data.currentCity };
    return fetchApi(type, search ? Object.assign(params, { q: search }) : params).then(function (res) {
        console.log("DouBan" + res.data);
        return res.data;
    })
}

/**
 * 获取单条类型的数据
 * @param  {Number} id     电影ID
 * @return {Promise}       包含抓取任务的Promise
 */

function findOne(id) {
    return fetchApi('subject/' + id).then(function (res) {
        return res.data;
    });
}

module.exports = { find: find, findOne: findOne }