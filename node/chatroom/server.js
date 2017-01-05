'use strict';
const net = require('net');
const server = net.createServer();
const users = {};

// 监听用户的 connection 事件，只要用户连接上来就会触发该回调处理函数，
// 同时服务器会生成一个 socket 用来与客户端进行通信
server.on('connection', (socket) => {
    // 服务器监听到客户端 socket 发送过来的数据之后，不知道 客户端到底发送的是什么
    // 所以我们已经按照自己约定好的 协议数据格式来解析 客户端发送给我的数据
    socket.on('data', (data) => {
        data = data.toString().trim();
        try {
            let signal = JSON.parse(data);
            let protocol = signal.protocol;
            switch (protocol) {
                case 'signup':
                    signup(signal);
                    break;
                case 'broadcast':
                    broadcast(signal);
                    break;
                case 'p2p':
                    p2p(signal);
                    break;
            }
        } catch (e) {
            socket.write('sorry wrong!')
        }
    })

    function p2p(signal) {
        let someBody = signal.to;
        let user = users[someBody];
        if (!user) {
            let send = {
                protocol: 'p2p',
                code: 2002,
                message: 'nickName not exists'
            }
            return socket.write(JSON.stringify(send));
        }
        let send = {
            protocol: 'p2p',
            from: signal.from,
            message: signal.message
        }
        user.write(JSON.stringify(send));
    }

    function broadcast(signal) {
        let send = {
            protocol: 'broadcast',
            nickName: signal.from,
            message: signal.message
        }
        let sendStr = JSON.stringify(send);
        for (let nickName in users) {
            users[nickName].write(sendStr);
        }
    }

    function signup(signal) {
        if (users[signal.nickName]) {
            let send = {
                protocol: 'signup',
                code: '1001',
                message: 'already exists'
            }
            return socket.write(JSON.stringify(send));
        }
        users[signal.nickName] = socket;
        let send = {
            protocol: 'signup',
            code: '1000',
            nickName: signal.nickName,
            message: 'ok'
        }
        return socket.write(JSON.stringify(send));
    }
})


let port = 3000;
server.listen(port, '127.0.0.1', () => {
    console.log(`server is listening at port ${port}`);
})