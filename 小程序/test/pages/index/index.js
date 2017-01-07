//index.js
//获取应用实例 我们提供了全局的 getApp() 函数，可以获取到小程序实例。
var app = getApp()
console.log(app.globalData.userInfo)
    // Page() 函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
Page({
    // 页面的初始数据
    data: {
        motto: 'Hello World',
        userInfo: {}
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    // 生命周期函数--监听页面加载
    onLoad: function() {
        console.log('onLoad')
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    }
})


//index.js
// Page({
// 页面的初始数据
//   data: {
//     text: "This is page data."
//   },
// 生命周期函数--监听页面加载
//   onLoad: function(options) {
//     // Do some initialize when page load.
//   },
// 生命周期函数--监听页面初次渲染完成
//   onReady: function() {
//     // Do something when page ready.
//   },
// 生命周期函数--监听页面显示
//   onShow: function() {
//     // Do something when page show.
//   },
// 生命周期函数--监听页面隐藏
//   onHide: function() {
//     // Do something when page hide.
//   },
// 生命周期函数--监听页面卸载
//   onUnload: function() {
//     // Do something when page close.
//   },
// 页面相关事件处理函数--监听用户下拉动作
//   onPullDownRefresh: function() {
//     // Do something when pull down.
//   },
// 页面上拉触底事件的处理函数
//   onReachBottom: function() {
//     // Do something when page reach bottom.
//   },
// 用户点击右上角分享
//   onShareAppMessage: function () {
//    // return custom share data when user share.
//   },
//   // Event handler.
//   viewTap: function() {
//     this.setData({
//       text: 'Set some data for updating view.'
//     })
//   },
//   customData: {
//     hi: 'MINA'
//   }
// })