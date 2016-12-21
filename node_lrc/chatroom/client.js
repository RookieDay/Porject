'use strict';
const net = require('net');
const client = net.connect({ port: 3000, host: '127.0.0.1' });

let nickName;

client.on('connect', () => {
    process.stdout.write('Please input userName: ');
    process.stdin.on('data', (data) => {
        // 用户通过控制台输入数据敲回车，就会触发 当前 data 事件，
        // data事件处理函数会把用户输入的数据传递给回调处理函数
        // 因为用户是敲回车触发的 data  事件，所以用户输入的数据中包含了回车换行符
        // 所以我们要把该数据进行 trim() 一下，把回车换行符 去除。
        data = data.toString().trim();
        if (!nickName) {
            let send = {
                protocol: 'signup',
                nickName: data
            }

            // 因为在网络中传输数据只能发送二进制数据
            // 所以我们将 json 对象转换为 json 格式的字符串
            // 然后将 json 格式字符串 通过 socket 端口 编码成二进制数据 发往我们的服务器
            return client.write(JSON.stringify(send));
        }
        // 我们约定好，如果用户输入不包含冒号，那么表示用户要发送广播数据
        // 如果用户发送的数据中有冒号，就表示用户要发送 点对点 数据

        let arr = data.split(':');
        let send = {};
        if (arr.length == 2) {
            send = {
                protocol: 'p2p',
                from: nickName,
                to: arr[0],
                message: arr[1]
            }
        } else if (arr.length == 1) {
            send = {
                protocol: 'broadcast',
                from: nickName,
                message: data
            }
        }
        client.write(JSON.stringify(send));
    })
});

// 当服务器通过 socket 调用了 write 方法之后，就会触发自己的 data 事件
client.on('data', (data) => {
    try {
        let signal = JSON.parse(data);
        let protocol = signal.protocol;
        console.log("here: " + protocol)
        if (protocol === 'signup') {
            switch (signal.code) {
                case '1000':
                    nickName = signal.nickName;
                    console.log('success');
                    break;
                case '1001':
                    console.log('exists');
                    break;
                case '1002':
                    console.log('wrong input');
                    break;
            }
        } else if (protocol === 'broadcast') {
            console.log(`${signal.nickName} said: ${signal.message}`);
        } else if (protocol === 'p2p') {
            let code = signal.code;
            if (!code) {
                console.log(`${signal.from} said to u: ${signal.message} `);
            } else {
                console.log('user not exists!')
            }
        }
    } catch (e) {
        console.log('server wrong json');
    }
})

client.on('end', () => {
    console.log('disconnect from server!')
})