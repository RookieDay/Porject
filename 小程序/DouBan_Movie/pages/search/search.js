// pages/search/search.js
'use strict';
var app = getApp();
Page({
  data: {
    page: 1,
    size: 20,
    subtitle: '请在此输入搜索内容',
    movies: [],
    search: '',
    loading: false,
    hasMore: false
  },
  // https://api.douban.com/v2/movie/search?start=0&count=20&q=情圣&city=北京
  handleLoadMore: function handleLoadMore() {
    var _this = this;
    if (!this.data.hasMore) return;
    this.setData({ subtitle: '加载中...', loading: true });
    return app.douban.find('search', this.data.page++, this.data.size, this.data.search).then(function (d) {
      if (d.subjects.length) {
        _this.setData({ subtitle: d.title, movies: _this.data.movies.concat(d.subjects), loading: false });
      } else {
        _this.setData({ hasMore: false, loading: false });

      }
    }).catch(function (e) {
      _this.setData({ subtitle: '获取数据异常', loading: false });
      console.error(e);
    })
  },
  handleSearch: function handleSearch(e) {
    if (!e.detail.value) return;
    this.setData({ movies: [], page: 1 });
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true, search: e.detail.value });
    this.handleLoadMore();

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  onPullDownRefresh: function onPullDownRefresh() {
    this.setData({ movies: [], page: 1 });
    this.handleLoadMore().then(function () {
      return app.wechat.original.stopPullDownRefresh();
    })
  }
})