#NodeJs sample summary
***
## 1. 依赖 模块维护
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>第三方依赖</title>
</head>

<body>
    <div>
        <input type="text" id="x">
        <select name="" id="opt">
      <option value="0"> + </option>
      <option value="1"> - </option>
      <option value="2"> * </option>
      <option value="3"> / </option>
      <option value="4"> % </option>
    </select>
        <input type="text" id="y">
        <input type="button" id="btn" value="=">
        <input type="text" id="result">
    </div>
    <!-- 
    模块依赖的问题
    1. 手动方式加载：不方便
    2. 模块的加载顺序：可能会出错
   -->
    <script src="../js/jquery-1.11.3.js"></script>
    <script>
        /**
         * 通过 匿名自执行函数，利用函数作用域的机制 隔离私有变量
         */

        var calculator = (function() {
            // 对于 _count 来说，如果不通过 return ，外部是无法访问的，无法修改
            var _count = 10;

            function add(x, y) {
                return parseFloat(x) + parseFloat(y);
            };

            function substract(x, y) {
                return parseFloat(x) - parseFloat(y);
            };

            function multiply(x, y) {
                return parseFloat(x) * parseFloat(y);
            };

            function divide(x, y) {
                return parseFloat(x) / parseFloat(y);
            };
            return {
                add: add,
                substract: substract,
                multiply: multiply,
                divide: divide
            };
        })();

        // 下面这个扩展的模块--- 处理第三方依赖
        var calculator = (function(cal, $) {
            cal.changeColor = function() {
                $('#x').css('backgroundColor', 'red');
                $('#y').css('backgroundColor', 'green');
            };

            // ============== 此处有1000行代码 ================
            // template()  $  ...
            // ============== /此处有1000行代码================

            return cal;

            // 一定要把依赖项 通过参数的形式 注入进来，然后在内部使用注入的属性
            // 好处：1. 依赖关系变的明显，有利于代码的阅读
            // 2. 提高了性能：减少了作用域的查找范围
            //通过看这里的参数  就知道了我们的这个模块依赖了哪些

        })(window.calculator || {}, window.$);

        var oX = document.getElementById('x');
        var oY = document.getElementById('y');
        var oOpt = document.getElementById('opt');
        var oBtn = document.getElementById('btn');
        var oResult = document.getElementById('result');

        oBtn.addEventListener('click', function(e) {
            calculator.changeColor();
            var x = oX.value.trim();
            var y = oY.value.trim();
            var opt = oOpt.value;

            var result = 0;
            switch (opt) {
                case '0':
                    result = calculator.add(x, y);
                    break;
                case '1':
                    result = calculator.substract(x, y);
                    break;
                case '2':
                    result = calculator.multiply(x, y);
                    break;
                case '3':
                    result = calculator.divide(x, y);
                    break;
                case '4':
                    result = calculator.mod(x, y);
                    break;
            }
            oResult.value = result;
        });
    </script>
</body>

</html>
```
```
sea.js
 seajs.use(['./cal.js', '../lib/jquery/jquer.js'], function(cal, $) {
            // window.onload = function () {

            // };

            $(function() {

            });

        });
```
## 2. node命令
- var args = process.argv.slice(2);  argv获取命令行参数 
    F:\Review\nodejs\code02\node>node 09_argv.js 2 + 3
    [ '2', '+', '3' ]

    process.argv
    F:\Review\nodejs\code02\node>node 09_argv.js 2 + 3
    [ 'D:\\Program Files\\nodejs\\node.exe',
    'F:\\Review\\nodejs\\code02\\node\\09_argv.js',
    '2',
    '+',
    '3' ]
- process.abort() 可以终止当前node进程
- process.arch  获取当前操作系统的 位数
- process.exit() 退出当前进程
- process.platform  获取当前操作系统的所属平台    
- process.env  获取的是环境变量
    // 如果是开发环境：NODE_ENV=develop
    // 如果是生产环境，NODE_ENV=production
    // var env = process.env['NODE_ENV'];    
- 异步执行下一个回调函数
  process.nextTick(function() {
    console.log(3);
    console.log('回调函数被执行了');
  });

- kill
  var pid = args[0]; //process.argv
  process.kill(pid);

- stdout 
  // console.log 本身就是封装的下面的这段代码
  function log(msg) {
     process.stdout.write(msg+'\n');
  }
  // 清屏 node clear cmd
  process.stdout.write('\u001b[2J\u001b[0;0H');
- 异步
  // 所有异步代码中，return 是不管用的
  function parseJsonStrToObj(str, callback) {
      process.nextTick(function() {
          try {
              var obj = JSON.parse(str);
              callback(null, obj);
          } catch (e) {
              callback(e, null);
          }
      });
  }

  parseJsonStrToObj('dsadsa', function(err, obj) {
      if (err) {
          console.log('抱歉，出错了');
      } else {
          console.log('success', obj);
      }
  });
```
path 使用：
console.log(path.parse('c:/foo/bar/baz/asdf/quux.html'));
// { root: 'c:/',
//   dir: 'c:/foo/bar/baz/asdf',
//   base: 'quux.html',
//   ext: '.html',
//   name: 'quux' }
console.log(path.format({
    root: 'c:\\',
    dir: 'c:\\a\\b',
    name: 'hello',
    ext: '.html'
}));
// c:\a\b\hello.html

// 以后再做路径拼接的时候，都使用 path.join 方法，可以避免出错
console.log(path.join('/foo/bar/baz', 'asdf', '../quux.html'));
```

## 3. 解决 npm 被墙的问题

- 第一种方式：通过指定镜像源地址来下载包：
`npm install 包名 --registry=https://registry.npm.taobao.org`

- 第二种方式：通过 淘宝提供的一个 cnpm 全局命令行工具
  + 安装全局命令行工具 `npm install -g cnpm`
  + 基本使用`cnpm install 包名`

- 第三种方式：通过一个全局命令行工具 `nrm` 来管理我们的镜像源地址
  + 安装nrm `npm install -g nrm`
  + 基本使用
    * 显示当前所有可用镜像源 `nrm ls`
    * 显示当前正在使用的镜像源 `nrm current`
    * 切换镜像源 `nrm use 镜像源名称`

- 包的查找规则和 变量的作用域 查找规则很像
    先在当前目录下的 node_modules 目录下找
    ，如果找不到，跑到上一级目录下的 node_modules 目录下找
    ......依次向上查找
    最后到根目录下的 node_modules 还找不到，报错
    [ 'C:\\Users\\ana\\Desktop\\code\\node_modules',
    'C:\\Users\\ana\\Desktop\\node_modules',
    'C:\\Users\\ana\\node_modules',
    'C:\\Users\\node_modules',
    'C:\\node_modules' ]

## 4. Buffer
- 模板字符串注意事项：
    模板字符串使用反引号 ` 作为标识，在键盘左上角的Esc 下面（切换到英文状态才可以）
    模板字符串中所有的空格和缩进都会被保留
    在模板字符串中嵌入变量：${变量名}，可以使用多次
- includes(str)   表示是否找到了参数字符串
- startsWith(str) 表示参数字符串是否在源字符串的头部
- endsWith(str) 表示参数字符串是否在源字符串的尾部
- repeat(num) 将原字符串重复n次并返回        

- buf[index] 通过下标访问 buffer 的某个字节的数据
- buf.indexOf(value[, byteOffset][, encoding]) 查找某个字符在 buffer 内存中的字节下标
- buf.includes(value[, byteOffset][, encoding])
- buf.length
- buf.slice([start[, end]])
- buf.toString([encoding[, start[, end]]])
- buf.write(string[, offset[, length]][, encoding])
- Buffer.byteLength(string[, encoding])
- Buffer.concat(list[, totalLength])
- Buffer.isBuffer(obj)
- Buffer.isEncoding(encoding)
```
let sourcePath = 'D:/Softwares/OS/CentOS-7-x86_64-DVD-1511.iso';
let distPath = 'C:/Users/iroc/Desktop/CentOS-7-x86_64-DVD-1511.iso';

// 获取文件总字节大小
let totalSize = fs.statSync(sourcePath).size;

// 1. 创建一个读取流
let readStream = fs.createReadStream(sourcePath);

// 2. 创建一个写入流
let writeStream = fs.createWriteStream(distPath);

let curSize = 0;

// 读取流会源源不断的读取数据，只要读取到了数据就会触发读取流的 data 事件，
// 同时把数据传递给 data 事件的回调函数中                                                                                           的第一个参数
// chunk 标识 读取流使用一个 瓢 读取到的二进制数据（Buffer）
readStream.on('data',(chunk) => {
  // 要想实现进度条，就要获取当前最新已经读取的长度
  // 然后让 最新读取的字节大小 除以 总大小  再 * 100  得到 百分比
  curSize+=chunk.length;
  let percentage = curSize / totalSize * 100;
  console.log(`已复制：${percentage}%`);

  // 通过 写入流的 write 方法可以向这个流中写数据
  writeStream.write(chunk);
});

// 当文件被读取文件之后，就可以关闭了
readStream.on('end',() => {
  writeStream.close();
});
--------------------------or as below----------------
// pipe 就是那根管子，pipe 左边就是 油箱 右边就是 你的容器
// 通过调用可读流的 pipe 方法，传入一个可写流  就自动实现了 流，node内部做了防爆仓控制
// 流 不仅仅有文件流，还有 网络流  内存流
// 流：流就是一种处理数据的高效方式
rs.pipe(ws);

```
## 5. iconv-lite 基本使用

原生node对于某些编码并不支持，为了解决这个问题，
我们可以使用社区提供的一个包：`iconv-lite` 来解决node无法识别的编码的问题

首先，要下载 `iconv-lite` 到当前项目中

```
npm install iconv-lite --save
```

安装之后，就可以在项目中使用了

基本使用：
```javascript
// 引包
const iconv = require('iconv-lite');
 
// 将一个buffer对象按照 gbk 编码来解析，得到的就是一个 解码过后的 字符串
// 注意：前提是你要知道你的 buffer 对象中实际存储的是哪个编码生成的二进制数据
str = iconv.decode(new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'gbk');
 
// 对字符串进行 gbk 编码，得到的就是一个进行 gbk 编码过后的二进制数据
buf = iconv.encode("Sample input string", 'gbk');

// 检查 iconv-lite 是否支持该编码
iconv.encodingExists("us-ascii")
```

## 6. 服务器事件
- listening：调用 server.listen() 绑定端口之后会触发
- connection：每个客户端套接字连接到服务器时触发
- close：当服务器关闭时会触发，只有手动调用 server.close() 之后会触发该事件
- error：当服务器发生异常的时候，会触发该事件
- data 当一端调用 write() 方法发送数据时，另一端就会触发 data 事件，事件回调处理函数中的参数就是 write() 发送的数据
- end 当连接中的任意一端发送了 FIN 数据时，将会触发该事件
- connect 该事件用于客户端，当套接字与服务器连接成功时会被触发
- error：当异常发生时，触发该事件
- close：当套接字完全关闭时，触发该事件

## 7. HTTP server
```
demo
    'use strict';

    const http = require('http');
    const fs = require('fs');
    const path = require('path');

    const mimeObj = require('./mime.json');

    const server = http.createServer((req, res) => {

        // res.statusCode = 200;
        // res.statusMessage = 'success';
        // res.setHeader('Content-Type','text/plain; charset=utf-8');

        // 你要发送给客户端的数据，最好告诉人家你发送的数据是什么类型
        // 一般来说，都是根据不同的文件后缀名：来区分 Content-Type 的
        // res.writeHead(200,{
        //   'Content-Type': 'text/plain; charset=utf-8'
        // });

        // res.end(`当前客户端请求路径是：${req.url}`);

        // 浏览器中的中文路径在传递给后台的时候会编码之后再传递
        // 所以，为了解决中文路径的问题，我们需要通过 decodeURI 该方法把编码的url解码
        let url = decodeURI(req.url);

        // 当用户访问 /index.html 的时候，我们读取 path.join(__dirname,url)
        // 当用户访问 /css/main.css 的时候，我们读取 path.join(__dirname,url)

        let filePath = path.join(__dirname, url);
        console.log(filePath)
        fs.readFile(filePath, (err, data) => {
            if (err) {
                // 当发生错误的时候，我们可以直接把错误信息传递到客户端
                // 在开发过程中，可以这么玩儿
                // 目的是有错误的时候可以快速在浏览器中看到错误信息而不用打开cmd查看错误消息了
                // 即便有错误，服务器也不会挂掉
                // 当发生错误之后，就不要让代码继续往后执行了
                res.end(err.message);
                return;
            }

            // 根据文件后缀名，获取对应的 Content-Type 类型
            let mime = mimeObj[path.extname(filePath)] || 'text/plain; charset=utf-8';

            // 处理文件文本，最好设置一下 utf-8 编码
            mime.startsWith('text/') ?
                mime += '; charset=utf-8' : mime;

            // 在发送数据之前，就要把响应头写好
            res.writeHead(200, {
                'Content-Type': mime
            });

            // 当代码执行到这里的时候，就表示读取文件成功，没有问题了，可以继续操作了
            res.end(data);
        });
    });

    server.listen(3000, () => {
        console.log('server is runnig at port 3000');
    });
```
