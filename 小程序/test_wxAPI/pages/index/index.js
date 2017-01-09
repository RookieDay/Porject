//index.js
//获取应用实例
var app = getApp();
var initData = 'this is first line\nthis is second line'
var extraLine = [];
// var types = ['default', 'primary', 'warn']
// var pageObject = {
//   data: {
//     defaultSize: 'default',
//     primarySize: 'default',
//     warnSize: 'default',
//     disabled: false,
//     plain: false,
//     loading: false
//   },
//   setDisabled: function(e) {
//     this.setData({
//       disabled: !this.data.disabled
//     })
//   },
//   setPlain: function(e) {
//     this.setData({
//       plain: !this.data.plain
//     })
//   },
//   setLoading: function(e) {
//     this.setData({
//       loading: !this.data.loading
//     })
//   }
// }

// for (var i = 0; i < types.length; ++i) {
//   (function(type) {
//     pageObject[type] = function(e) {
//       var key = type + 'Size'
//       var changedData = {}
//       changedData[key] =
//         this.data[key] === 'default' ? 'mini' : 'default'
//       this.setData(changedData)
//     }
//   })(types[i])
// }

// Page(pageObject)
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        iconSize: [20, 30, 40, 50, 60, 70],
        iconColor: [
            'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
        ],
        iconType: [
            'success', 'info', 'warn', 'waiting', 'safe_success', 'safe_warn',
            'success_circle', 'success_no_circle', 'waiting_circle', 'circle', 'download',
            'info_circle', 'cancel', 'search', 'clear'
        ],
        text: initData,
        items: [
            { name: 'USA', value: '美国' },
            { name: 'CHN', value: '中国', checked: 'true' },
            { name: 'BRA', value: '巴西' },
            { name: 'JPN', value: '日本' },
            { name: 'ENG', value: '英国' },
            { name: 'TUR', value: '法国' },
        ]
    },
    formSubmit: function(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    formReset: function() {
        console.log('form发生了reset事件')
    },
    checkboxChange: function(e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },
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
    add: function(e) {
        extraLine.push('other line')
        this.setData({
            text: initData + '\n' + extraLine.join('\n')
        })
    },
    remove: function(e) {
        if (extraLine.length > 0) {
            extraLine.pop()
            this.setData({
                text: initData + '\n' + extraLine.join('\n')
            })
        }
    }
})