##
***
## 架构 
### 创建小程序实例
    - app.js是小程序的脚本代码。我们可以在这个文件中监听并处理小程序的生命周期函数、声明全局变量。
    调用框架提供的丰富的 API，如本例的同步存储及同步读取本地数据。想了解更多可用 API
    - app.json 是对整个小程序的全局配置。我们可以在这个文件中配置小程序是由哪些页面组成，配置小程序的窗口
    背景色，配置导航条样式，配置默认标题。注意该文件不可添加任何注释。
    - app.wxss 是整个小程序的公共样式表。我们可以在页面组件的 class 属性上直接使用 app.wxss 中声明的样式规则。
### 创建页面
- 在这个教程里，我们有两个页面，index 页面和 logs 页面，即欢迎页和小程序启动日志的展示页，他们都在 pages 
        目录下。微信小程序中的每一个页面的【路径+页面名】都需要写在 app.json 的 pages 中，且 pages 中的第一个
        页面是小程序的首页。    每一个小程序页面是由同路径下同名的四个不同后缀文件的组成，
        如：index.js、index.wxml、index.wxss、index.json。.js后缀的文件是脚本文件，.json后缀的文件
        是配置文件，.wxss后缀的是样式表文件，.wxml后缀的文件是页面结构文件。   
-    index.wxml 是页面的结构文件：
        ```
        <!--index.wxml-->
        <view class="container">
        <view  bindtap="bindViewTap" class="userinfo">
            <image class="userinfo-avatar" src="{{userInfo.avatarUrl}}" background-size="cover"></image>
            <text class="userinfo-nickname">{{userInfo.nickName}}</text>
        </view>
        <view class="usermotto">
            <text class="user-motto">{{motto}}</text>
        </view>
        </view>
        ```
        本例中使用了<view/>、<image/>、<text/>来搭建页面结构，绑定数据和交互处理函数。
-   index.wxss 是页面的样式表： 
        页面的样式表是非必要的。当有页面样式表时，页面的样式表中的样式规则会层叠覆盖 app.wxss 中的样式规则。
        如果不指定页面的样式表，也可以在页面的结构文件中直接使用 app.wxss 中指定的样式规则。 
- index.json 是页面的配置文件：
  页面的配置文件是非必要的。当有页面的配置文件时，配置项在该页面会覆盖 app.json 的 window 中相同的配
  置项。如果没有指定的页面配置文件，则在该页面直接使用 app.json 中的默认配置。
- logs 的页面结构
```
<!--logs.wxml-->
<view class="container log-list">
  <block wx:for="{{logs}}" wx:for-item="log">
    <text class="log-item">{{index + 1}}. {{log}}</text>
  </block>
</view>
```
- logs 页面使用 <block/> 控制标签来组织代码，在 <block/> 上使用 wx:for 绑定 logs 数据，并将 logs 数据循环展开节点
``
//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
```