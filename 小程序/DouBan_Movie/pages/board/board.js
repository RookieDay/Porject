// pages/board/board.js
'use strict';

// 获取全局应用程序实例对象
var Promise = require('../../utils/bluebird');
var app = getApp();


Page({
  data:{
    boards: [{ key: 'in_theaters' }, { key: 'coming_soon' }, { key: 'top250' }

    ],
        loading:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    var promises = this.data.boards.map(function(board){
      return app.douban.find(board.key,1,10).then(function(d){
        board.title = d.title;
        board.movies = d.subjects;
        return board;
      })
    })
    Promise.all(promises).then(function(boards){
      return _this.setData({boards:boards,loading:false});
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