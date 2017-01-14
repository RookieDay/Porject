// pages/topics/topics.js
var api = require('../../utils/api.js');
var util = require('../../utils/util.js')
Page({
    data: {
        title: '话题列表',
        postsList: [],
        hidden: false,
        page: 1,
        tab: 'all'
    },
    onPullDownRefresh: function() {
        this.fetchData();
        console.log('pull down', new Date());
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.fetchData();
    },
    onTapTag: function(e) {
        var self = this;
        var tab = e.currentTarget.id;
        self.setData({
            tab: tab
        });
        if (tab !== 'all') {
            this.fetchData({ tab: tab });
        } else {
            this.fetchData();
        }
    },
    fetchData: function(data) {
        var self = this;
        self.setData({
            hidden: false
        });
        if (!data) data = {};
        if (!data.page) data.page = 1;
        if (data.page === 1) {
            self.setData({
                postsList: []
            });
        }
        wx.request({
            url: api.getTopics(data),
            success: function(res) {
                console.log(res);
                self.setData({
                    postsList: self.data.postsList.concat(res.data.data.map(function(item) {
                        // console.log(item.last_reply_at);
                        // console.log(new Date(item.last_reply_at))
                        item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
                        return item;
                    }))
                });
                setTimeout(function() {
                    self.setData({
                        hidden: true
                    });
                }, 300);
            }
        })
    },
    redictDetail: function(e) {
        var id = e.currentTarget.id,
            url = '../detail/detail?id=' + id;
        wx.navigateTo({
            url: url
        })
    },
    lower: function(e) {
        var self = this;
        self.setData({
            page: self.data.page + 1
        });
        if (self.data.tab !== 'all') {
            this.fetchData({ tab: self.data.tab, page: self.data.page });
        } else {
            this.fetchData({ page: self.data.page });
        }
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})