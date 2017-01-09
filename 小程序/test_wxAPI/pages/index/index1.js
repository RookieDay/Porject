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
        ],
        focus: false,
        inputValue: '',
        checkboxItems: [
            { name: 'USA', value: '美国' },
            { name: 'CHN', value: '中国', checked: 'true' },
            { name: 'BRA', value: '巴西' },
            { name: 'JPN', value: '日本', checked: 'true' },
            { name: 'ENG', value: '英国' },
            { name: 'TUR', value: '法国' },
        ],
        radioItems: [
            { name: 'USA', value: '美国' },
            { name: 'CHN', value: '中国', checked: 'true' },
            { name: 'BRA', value: '巴西' },
            { name: 'JPN', value: '日本' },
            { name: 'ENG', value: '英国' },
            { name: 'TUR', value: '法国' },
        ],
        hidden: false
    },
    checkboxChange: function(e) {
        console.log(e);
        var checked = e.detail.value
        var changed = {}
        for (var i = 0; i < this.data.checkboxItems.length; i++) {
            if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
                changed['checkboxItems[' + i + '].checked'] = true
            } else {
                changed['checkboxItems[' + i + '].checked'] = false
            }
        }
        this.setData(changed)
    },
    radioChange: function(e) {
        var checked = e.detail.value
        var changed = {}
        for (var i = 0; i < this.data.radioItems.length; i++) {
            if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
                changed['radioItems[' + i + '].checked'] = true
            } else {
                changed['radioItems[' + i + '].checked'] = false
            }
        }
        this.setData(changed)
    },
    bindKeyInput: function(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    bindReplaceInput: function(e) {
        var value = e.detail.value
        var pos = e.detail.cursor
        if (pos != -1) {
            //光标在中间
            var left = e.detail.value.slice(0, pos)
                //计算光标的位置
            pos = left.replace(/11/g, '2').length
        }

        //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
        console.log(e)
        return {
            value: value.replace(/11/g, '2'),
            cursor: pos
        }

        //或者直接返回字符串,光标在最后边
        //return value.replace(/11/g,'2'),
    },
    bindHideKeyboard: function(e) {
        if (e.detail.value === '123') {
            //收起键盘
            wx.hideKeyboard()
        }
    },
    formSubmit: function(e) {
        console.log(e);
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