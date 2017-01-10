//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {}
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onReady: function (e) {
        // 使用 wx.createMapContext 获取 map 上下文 
        this.mapCtx = wx.createMapContext("myMap");
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    getCenterLocation: function (e) {
        this.mapCtx.getCenterLocation({
            success: function (res) {
                console.log(res.longitude);
                console.log(res.latitude);
            }
        });
    },
    moveToLocation: function () {
        this.mapCtx.moveToLocation()
    }
})
// 获取地理位置
// wx.getLocation({
//     type: 'gcj02', //返回可以用于wx.openLocation的经纬度
//     // 成功以后的回调函数
//     success: function(res) {
//         var latitude = res.latitude
//         var longitude = res.longitude
//             //  打开位置 缩放比例
//         wx.openLocation({
//             latitude: latitude,
//             longitude: longitude,
//             scale: 28
//         })
//     }
// })

wx.getSystemInfo({
    success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
    }
})

try {
    wx.getSystemInfoSync();
    console.log(res.model)
    console.log(res.pixelRatio)
    console.log(res.windowWidth)
    console.log(res.windowHeight)
    console.log(res.language)
    console.log(res.version)
    console.log(res.platform)
} catch (e) {

}