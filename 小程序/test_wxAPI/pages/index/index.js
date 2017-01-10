//index.js
//获取应用实例
var app = getApp();

function getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16)
        color = color.length == 1 ? '0' + color : color
        rgb.push(color)
    }
    return '#' + rgb.join('')
}

Page({
        data: {
            motto: 'Hello World',
            userInfo: {},
            src: '',
            danmuList: [{
                    text: '第 1s 出现的弹幕',
                    color: '#ff0000',
                    time: 1
                },
                {
                    text: '第 3s 出现的弹幕',
                    color: '#ff00ff',
                    time: 3
                }
            ],
            markers: [{
                iconPath: "/resources/2.jpg",
                id: 0,
                latitude: 23.099994,
                longitude: 113.324520,
                width: 50,
                height: 50
            }],
            polyline: [{
                points: [{
                    longitude: 113.3245211,
                    latitude: 23.10229
                }, {
                    longitude: 113.324520,
                    latitude: 23.21229
                }],
                color: "#FF0000DD",
                width: 2,
                dottedLine: true
            }],
            controls: [{
                id: 1,
                iconPath: '/resources/1.jpg',
                position: {
                    left: 0,
                    top: 300 - 50,
                    width: 50,
                    height: 50
                },
                clickable: true
            }]

        },
        regionchange(e) {
            console.log(e.type)
        },
        markertap(e) {
            console.log(e.markerId)
        },
        controltap(e) {
            console.log(e.controlId)
        },
        onReady: function(res) {
            this.videoContext = wx.createVideoContext('myVideo')
                // 使用 wx.createContext 获取绘图上下文 context
            var context = wx.createContext()

            context.setStrokeStyle("#00ff00")
            context.setLineWidth(5)
            context.rect(0, 0, 200, 200)
            context.stroke()
            context.setStrokeStyle("#ff0000")
            context.setLineWidth(2)
            context.moveTo(160, 100)
            context.arc(100, 100, 60, 0, 2 * Math.PI, true)
            context.moveTo(140, 100)
            context.arc(100, 100, 40, 0, Math.PI, false)
            context.moveTo(85, 80)
            context.arc(80, 80, 5, 0, 2 * Math.PI, true)
            context.moveTo(125, 80)
            context.arc(120, 80, 5, 0, 2 * Math.PI, true)
            context.stroke()

            // 调用 wx.drawCanvas，通过 canvasId 指定在哪张画布上绘制，通过 actions 指定绘制行为
            wx.drawCanvas({
                canvasId: 'firstCanvas',
                actions: context.getActions() // 获取绘图动作数组
            })
        },
        inputValue: '',
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
        },
        bindInputBlur: function(e) {
            this.inputValue = e.detail.value
        },
        bindButtonTap: function() {
            var that = this
            wx.chooseVideo({
                sourceType: ['album', 'camera'],
                maxDuration: 60,
                camera: ['front', 'back'],
                success: function(res) {
                    that.setData({
                        src: res.tempFilePath
                    })
                }
            })
        },
        bindSendDanmu: function() {
            this.videoContext.sendDanmu({
                text: this.inputValue,
                color: getRandomColor()
            })
        },
        canvasIdErrorCallback: function(e) {
            console.error(e.detail.errMsg)
        },

    })
    // wx.getLocation({
    //     type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //     success: function(res) {
    //         var latitude = res.latitude
    //         var longitude = res.longitude
    //         wx.openLocation({
    //             latitude: latitude,
    //             longitude: longitude,
    //             scale: 28
    //         })
    //     }
    // })