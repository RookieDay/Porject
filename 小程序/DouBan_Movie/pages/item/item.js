// pages/item/item.js
'use strict';
var app = getApp();

Page({
    data: {
        title: '',
        loading: true,
        movie: {}
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        var _this = this;
        app.douban.findOne(options.id).then(function(d) {
            return _this.setData({ title: d.title, movie: d, loading: false })
        }).catch(function(e) {
            _this.setData({ title: '获取数据异常', movie: {}, loading: false });
            console.error(e);
        })
    },
    onReady: function() {
        // 页面渲染完成
        wx.setNavigationBarTitle({
            title: this.data.title + ' < 电影 < 豆瓣'
        })
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },
    onShareAppMessage: function onShareAppMessage() {
        return {
            title: '自定义分享标题',
            desc: '自定义分享描述',
            path: '/pages/item?id=' + this.data.id
        }
    }
})


// onShareAppMessage

// 在 Page 中定义 onShareAppMessage 函数，设置该页面的分享信息。

// 只有定义了此事件处理函数，右上角菜单才会显示“分享”按钮
// 用户点击分享按钮的时候会调用
// 此事件需要 return 一个 Object，用于自定义分享内容