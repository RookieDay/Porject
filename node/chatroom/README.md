## chatroom
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