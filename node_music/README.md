## node_music 
- 关键字: MVC nodejs MySQL bootstrap template
- 基于MVC的简单音乐播放器demo
```
克隆 git clone git@github.com:RookieDay/Porject.git
进入 cd node_music
安装 install MySQL 修改./models/db.js 里面的user password
执行 execute music.sql on MySQL 生成数据
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
