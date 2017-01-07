//app.js
//app.js是小程序的脚本代码。我们可以在这个文件中监听并处理小程序的生命周期函数、声明全局变量。
//调用框架提供的丰富的 API，如本例的同步存储及同步读取本地数据。
App({
    //生命周期函数--监听小程序初始化  当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    getUserInfo: function(cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    // 在 JavaScript 文件中声明的变量和函数只在该文件中有效； 不同的文件中可以声明相同名字的变量和函数， 
    // 不会互相影响。
    // 通过全局函数 getApp() 可以获取全局的应用实例， 如果需要全局的数据可以在 App() 中设置
    globalData: {
        userInfo: null
    },
    // 生命周期函数--监听小程序显示  当小程序启动，或从后台进入前台显示，会触发 onShow
    onshow: function() {

    },
    // 生命周期函数--监听小程序隐藏 当小程序从前台进入后台，会触发 onHide
    onhide: function() {

    },
    // 错误监听函数 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
    onerror: function() {

    }
})

// 前台、后台定义： 当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，
// 而是进入了后台；当再次进入微信或再次打开小程序，又会从后台进入前台。

// 只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。

// App({
//   onLaunch: function() { 
//     // Do something initial when launch.
//   },
//   onShow: function() {
//       // Do something when show.
//   },
//   onHide: function() {
//       // Do something when hide.
//   },
//   onError: function(msg) {
//     console.log(msg)
//   },
//   globalData: 'I am global data'
// })


// 注意：

// App() 必须在 app.js 中注册，且不能注册多个。

// 不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。

// 不要在 onLaunch 的时候调用 getCurrentPage()，此时 page 还没有生成。

// 通过 getApp() 获取实例之后，不要私自调用生命周期函数。