//index.js
//获取应用实例
var app = getApp();
var initData = 'this is first line\nthis is second line'
var extraLine = [];
const date = new Date()
const years = []
const months = []
const days = []
var pageData = {}
for (var i = 1; i < 5; i++) {
    (function(index) {
        pageData['slider' + index + 'change'] = function(e) {
            console.log('slider' + 'index' + '发生 change 事件，携带值为', e.detail.value)
        }
    })(i)
}

for (let i = 1990; i <= date.getFullYear(); i++) {
    years.push(i)
}

for (let i = 1; i <= 12; i++) {
    months.push(i)
}

for (let i = 1; i <= 31; i++) {
    days.push(i)
}
Page({
    onReady: function(e) {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        this.audioCtx = wx.createAudioContext('myAudio')
    },
    audioPlay: function() {
        this.audioCtx.play()
    },
    audioPause: function() {
        this.audioCtx.pause()
    },
    audio14: function() {
        this.audioCtx.seek(14)
    },
    audioStart: function() {
        this.audioCtx.seek(0)
    },
    data: {
        motto: 'Hello World',
        userInfo: {},
        array1: [{
            mode: 'scaleToFill',
            text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
        }, {
            mode: 'aspectFit',
            text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
        }, {
            mode: 'aspectFill',
            text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
        }, {
            mode: 'top',
            text: 'top：不缩放图片，只显示图片的顶部区域'
        }, {
            mode: 'bottom',
            text: 'bottom：不缩放图片，只显示图片的底部区域'
        }, {
            mode: 'center',
            text: 'center：不缩放图片，只显示图片的中间区域'
        }, {
            mode: 'left',
            text: 'left：不缩放图片，只显示图片的左边区域'
        }, {
            mode: 'right',
            text: 'right：不缩放图片，只显示图片的右边边区域'
        }, {
            mode: 'top left',
            text: 'top left：不缩放图片，只显示图片的左上边区域'
        }, {
            mode: 'top right',
            text: 'top right：不缩放图片，只显示图片的右上边区域'
        }, {
            mode: 'bottom left',
            text: 'bottom left：不缩放图片，只显示图片的左下边区域'
        }, {
            mode: 'bottom right',
            text: 'bottom right：不缩放图片，只显示图片的右下边区域'
        }],
        src: '../resources/cat.jpg',
        array: ['美国', '中国', '巴西', '日本'],
        objectArray: [{
                id: 0,
                name: '美国'
            },
            {
                id: 1,
                name: '中国'
            },
            {
                id: 2,
                name: '巴西'
            },
            {
                id: 3,
                name: '日本'
            }
        ],
        index: 0,
        date: '2016-09-01',
        time: '12:01',
        years: years,
        year: date.getFullYear(),
        months: months,
        month: 2,
        days: days,
        day: 2,
        year: date.getFullYear(),
        value: [9999, 1, 1],
        poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
        name: '此时此刻',
        author: '许巍',
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    },
    imageError: function(e) {
        console.log('image3发生error事件，携带值为', e.detail.errMsg)
    },
    pageData: pageData,
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
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
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function(e) {
        this.setData({
            time: e.detail.value
        })
    },
    bindChange: function(e) {
        const val = e.detail.value
        this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            day: this.data.days[val[2]]
        })
    }
})