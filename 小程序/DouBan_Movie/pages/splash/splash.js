// pages/splash/splash.js
'use strict';
// 获取全局应用程序实例对象
var Promise = require('../../utils/bluebird');
var app = getApp();


Page({
  data: {
    movies: [],
    loading: true
  },
  getCache: function getCache() {
    return new Promise(function (resolve) {
      app.wechat.getStorage("last_splash_data").then(function(res){
        if(res.data.expires < Date.now()){
          // 已经过期
          console.log("storage expired");
          return resolve(null);
        } 
        return resolve(res.data);
      }).catch(function(e){
        return resolve(null);
      })
    })
  },
  handelStart:function handleStart(){
        // TODO: 访问历史的问题
    wx.switchTab({
      url: '../board/board'
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    this.getCache().then(function (cache) {
      if (cache) {
        return _this.setData({ movies: cache.movies, loading: false });
      }
      app.douban.find('coming_soon', 1, 3).then(function (d) {
        _this.setData({ movies: d.subjects, loading: false });
        console.log("splash" + d);
        return app.wechat.setStorage('last_splash_data', {
          movies: d.subjects,
          expires: Date.now() + 1 * 24 * 60 * 60 * 1000
        }).then(function(){
          return console.log('storage last splash data');
        })
      })
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})