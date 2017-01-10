//index.js
//获取应用实例
var app = getApp()
Page({
        data: {
            motto: 'Hello World',
            userInfo: {},
            animationData: {},
            x: 0,
            y: 0,
            hidden: true
        },
        start: function(e) {
            this.setData({
                hidden: false,
                x: e.touches[0].x,
                y: e.touches[0].y
            })
        },
        move: function(e) {
            this.setData({
                x: e.touches[0].x,
                y: e.touches[0].y
            })
        },
        end: function(e) {
            this.setData({
                hidden: true
            })
        },
        //事件处理函数
        bindViewTap: function() {
            wx.navigateTo({
                url: '../logs/logs'
            })
        },
        onReady: function(e) {
            // 使用 wx.createMapContext 获取 map 上下文 
            this.mapCtx = wx.createMapContext("myMap");
        },
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
                // 创建一个 Canvas 绘图上下文 CanvasContext
                // const ctx = wx.createCanvasContext('myCanvas');
                // // 描述要在 Canvas 中绘制什么内容。
                // ctx.setFillStyle('red');
                // ctx.fillRect(10, 10, 150, 75);
                // // 告诉 <canvas/> 组件你要将刚刚的描述绘制上去：
                // ctx.draw();
        },
        getCenterLocation: function(e) {
            this.mapCtx.getCenterLocation({
                success: function(res) {
                    console.log(res.longitude);
                    console.log(res.latitude);
                }
            });
        },
        moveToLocation: function() {
            this.mapCtx.moveToLocation()
        },
        onShow: function() {
            var animation = wx.createAnimation({
                duration: 1000,
                timingFunction: 'ease',
            })

            this.animation = animation

            animation.scale(2, 2).rotate(45).step()

            this.setData({
                animationData: animation.export()
            })

            setTimeout(function() {
                animation.translate(30).step()
                this.setData({
                    animationData: animation.export()
                })
            }.bind(this), 1000)
        },
        rotateAndScale: function() {
            // 旋转同时放大
            this.animation.rotate(45).scale(2, 2).step()
            this.setData({
                animationData: this.animation.export()
            })
        },
        rotateThenScale: function() {
            // 先旋转后放大
            this.animation.rotate(45).step()
            this.animation.scale(2, 2).step()
            this.setData({
                animationData: this.animation.export()
            })
        },
        rotateAndScaleThenTranslate: function() {
            // 先旋转同时放大，然后平移
            this.animation.rotate(45).scale(2, 2).step()
            this.animation.translate(100, 100).step({ duration: 1000 })
            this.setData({
                animationData: this.animation.export()
            })
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

// wx.getSystemInfo({
//     success: function(res) {
//         console.log(res.model)
//         console.log(res.pixelRatio)
//         console.log(res.windowWidth)
//         console.log(res.windowHeight)
//         console.log(res.language)
//         console.log(res.version)
//         console.log(res.platform)
//     }
// })

// try {
//     wx.getSystemInfoSync();
//     console.log(res.model)
//     console.log(res.pixelRatio)
//     console.log(res.windowWidth)
//     console.log(res.windowHeight)
//     console.log(res.language)
//     console.log(res.version)
//     console.log(res.platform)
// } catch (e) {
//     //do something
// }

// wx.getNetworkType({
//     success: function(res) {
//         var netWorkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
//         console.log(netWorkType);
//     }
// })

// wx.onAccelerometerChange(function(res) {
//     console.log(res.x);
//     console.log(res.y);
//     console.log(res.z);
// })
// wx.onCompassChange(function(res) {
//         console.log(res.direction);
//     })
// wx.makePhoneCall({
//   phoneNumber: '18310652956',
//   success: function(res) {
//     console.log('success');
//   }
// })

// wx.scanCode({
//   success: function(res){
//     console.log(res);
//   },
//   fail: function() {
//     // fail
//   },
//   complete: function() {
//     // complete
//   }
// })


// wx.showToast({
//         title: '成功',
//         icon: 'success',
//         duration: 2000
//     })
// wx.showToast({
//   title: '加载中',
//   icon: 'loading',
//   duration: 10000
// })

// setTimeout(function(){
//   wx.hideToast()
// },2000)

// wx.showModal({
//   title: '提示',
//   content: '这是一个模态弹窗',
//   success: function(res) {
//     if (res.confirm) {
//       console.log('用户点击确定')
//     }
//   }
// })

// wx.showActionSheet({
//   itemList: ['A', 'B', 'C'],
//   itemColor:"pink",
//   success: function(res) {
//     console.log(res.tapIndex)
//   },
//   fail: function(res) {
//     console.log(res.errMsg)
//   }
// })

// wx.setNavigationBarTitle({
//     title: '当前页面'
// })

// var animation = wx.createAnimation({
//     transformOrigin: "50% 50%",
//     duration: 1000,
//     timingFunction: "ease",
//     delay: 0
// })