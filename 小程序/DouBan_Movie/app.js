//app.js
'use strict';
// 引入对应模块
var wechat = require('./utils/wechat.js');
var douban = require('./utils/douban.js');
var baidu = require('./utils/baidu.js');
App({
  data: {
    // 定义全局变量
    name: 'Douban Movie',
    version: '0.1.0',
    currentCity: '北京'
  },
  //API 引用
  wechat: wechat,
  baidu: baidu,
  douban: douban,
  // 生命周期函数--监听小程序初始化
  // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch:function onLaunch(){
    var _this = this;
    
  },
  // 生命周期函数--监听小程序显示
  // 当小程序启动，或从后台进入前台显示，会触发 onShow
  onShow:function onShow(){
    console.log('Application showed');
  },
  // 生命周期函数--监听小程序隐藏
  // 当小程序从前台进入后台，会触发 onHide
  onHide:function onHide(){
    console.log('APplication showed');
  }
})