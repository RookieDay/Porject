// pages/detail/detail.js
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
Page({
  data: {
    title: '话题详情',
    detail: {},
    hidden: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.fetchData(options.id);
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
  },
  fetchData: function (id) {
    var self = this;
    self.setData({
      hidden: false
    });
    wx.request({
      url: api.getTopicByID(id, { mdrender: false }),
      success: function (res) {
        console.log(res);
        res.data.data.create_at = util.getDateDiff(new Date(res.data.data.create_at));
        res.data.data.replies = res.data.data.replies.map(function (item) {
            item.create_at = util.getDateDiff(new Date(item.create_at));
            return item;
          })
        self.setData({
          detail: res.data.data
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  }
})