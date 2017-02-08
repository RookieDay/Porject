'use strict';
const http = require('http');
const config = require('./config.js');
const render = require('./common/render');
const json = require('./common/json');
const router = require('./router');
const server = http.createServer();

//入口 服务器监听到请求
server.on('request', (req, res) => {
    // 绑定上去render函数和json转化函数 res是传进去的参数
    res.render = render(res);
    res.json = json(res);
    //router 进行路由控制 代表会跳转到那个页面
    router(req, res);
})

server.listen(config.port, config.host, () => {
    console.log(`server is listening at port ${config.port}`);
})