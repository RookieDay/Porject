//index.js
//获取应用实例 我们提供了全局的 getApp() 函数，可以获取到小程序实例。
var app = getApp()
console.log(app)
console.log(app.globalData.userInfo)
    // Page() 函数用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
Page({
    // 页面的初始数据
    data: {
        motto: 'Hello World',
        userInfo: {},
        objectArray: [
            { id: 5, unique: 'unique_5' },
            { id: 4, unique: 'unique_4' },
            { id: 3, unique: 'unique_3' },
            { id: 2, unique: 'unique_2' },
            { id: 1, unique: 'unique_1' },
            { id: 0, unique: 'unique_0' },
        ],
        numberArray: [1, 2, 3, 4],
        item: {
            index: 0,
            msg: 'this is a template',
            time: '2016-09-15'
        },
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000
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
            console.log(userInfo);
            that.setData({
                userInfo: userInfo
            })
        })
    },
    switch: function(event) {
        const length = this.data.objectArray.length
        for (let i = 0; i < length; ++i) {
            const x = Math.floor(Math.random() * length)
            const y = Math.floor(Math.random() * length)
            console.log(x + ":" + y);
            const temp = this.data.objectArray[x]
            this.data.objectArray[x] = this.data.objectArray[y]
            this.data.objectArray[y] = temp
        }
        this.setData({
            objectArray: this.data.objectArray
        })
        console.log(event);
    },
    addToFront: function(e) {
        const length = this.data.objectArray.length
        this.data.objectArray = [{ id: length, unique: 'unique_' + length }].concat(this.data.objectArray)
        this.setData({
            objectArray: this.data.objectArray
        })
    },
    addNumberToFront: function(e) {
        this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
        this.setData({
            numberArray: this.data.numberArray
        })
    },
    tapName: function(event) {
        console.log(event);
    },
    handleTap2: function(event) {
        console.log(event)
    },
    handleTap3: function(event) {
        console.log(event)
    },
    bindViewTap: function(event) {
        // event.target.dataset.alphaBeta === 1 // - 会转为驼峰写法
        // event.target.dataset.alphabeta === 2 // 大写会转为小写
        // console.log(event.target.dataset.alphaBeta === 1);
        // console.log(event.target.dataset.alphabeta === 2);
        console.log(event);
    },
    changeIndicatorDots: function(e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function(e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    },
    changeCircular: function(e) {
        this.setData({
            circular: !this.data.circular
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