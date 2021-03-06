##Project summary
***
## 1.node_music 
- 关键字: MVC nodejs MySQL bootstrap template
- 基于MVC的简单音乐播放器demo
```
克隆 git clone git@github.com:RookieDay/Porject.git
进入 cd node_music
安装 MySQL 修改./models/db.js 里面的user password
执行 music.sql 在 MySQL 生成数据
运行 nodemon app.js
访问 http://127.0.0.1:3000/  即可看到效果
```
- 目录结构
<pre>
├── README.md           
├── common              // 通用方法
├── controllers         // controllers部分
├── demo                // 测试 or 案例部分
├── files               // 音乐文件
├── models              // 数据操作部分
├── views               // 视图部分
├── app.js              // 入口
├── config.js           // 配置部分
├── router.js           // 路由部分
├── package.json        // 依赖
├── mime.json           // Content-Type
</pre>


## 2.chatroom
- 关键字: node
- 通过 nodemon 实现 保存文件实时重启
    1. 安装ndemon ` npm install -g nodemon `
    2. 基本使用 `nodemon server.js`
    3. 只要执行了上面的命令，那么当你修改了 server.js 那么nodemon会帮你自动重启 server
- 制定协议（服务器和客户端之间数据格式的约定）</br>
    nickname </br>
    当用户来连接我们的服务器的时候，提示用户：</br>
    请输入你的昵称按回车进入：</br>
    注册昵称</br>
    如果昵称被占用：提示用户，昵称已存在，请重新输入</br>
    如果昵称没有被占用，则用户就可以进入聊天室</br>

    广播消息</br>
    当用户进入聊天室之后，</br>
    一种方式，可以直接发送消息，默认就是广播消息</br>
    消息体</br>

    私聊</br>
    当用户想向特定的某人发送消息的时候：</br>
    nickname:要说的话</br>

    需求如上：</br>
    数据格式协议如下：</br>
    注册的数据格式</br>
    ```
    {
    protocol:'signup',
    nickname:''
    }

    广播的数据格式
    {
    protocol: 'broadcast',
    from: '',
    message: ''
    }

    leijun:atr you ok
    私聊
    {
    protocol: 'p2p',
    from: '',
    to: '',
    message: ''
    }
```
- 实现广播消息
- 实现用户注册
- 实现点对对消息
- 操作
```
cd ./node/chatroom
nodemon server.js 
node client.js //也可以多人执行 实现单聊 群发的
```

## 3.框架
- 关键字：原生JS
- 简介
```
ana.js     //DOM操作模块 事件模块 样式属性模块 动画模块
select.js  // 选择器模块封装
test       //added test case
```
## 4.canvas_FlappyBird
- 关键字：canvas draw 
- 简介：基于canvas的FlappyBird的实现
- 运行 运行index.html即可

## 5.angular1_namelist
- 关键字：angular1 servie
- 运行  index.html

## 6.angular1_MovieList
- 关键字：angular1 MVVM router bootstrap template jsonp
- 运行  index.html (调用豆瓣电影API实现)

## 7.基础狂击
- 关键字：JS 
- 简介 ： 一些案例的实现
