// pages/profile/profile.js
'use strict';
var app = getApp();

Page({
  data:{
    title:'About',
    userInfo:{
      wechat:'Luck5Family',
      nickName:'RookieDay',
      avatarUrl: '../../images/wechat.jpg'
    }
  },
  getUserInfo:function getUserInfo(){
    var that = this;
    app.wechat.getUserInfo(function(res){
      return that.setData({ userInfo: res.userInfo});
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    app.wechat.login().then(function(res){
      if(res.code){
        console.log("success"+res.code);
      } else {
        console.error('error' + res.errMsg);
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})