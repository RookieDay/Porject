var path = require('path');
var htmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: APP_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    //添加我们的插件 会自动生成一个html文件
    plugins: [
        new htmlwebpackPlugin({
            title: 'hello world app'
        })
    ],
    // 在项目根目录下输入npm start,一堆花花绿绿的信息后server已经起来了，在浏览器里面输入http://localhost:8080 发现伟大的hello world出现了，在js里面随便修改一些输出然后保存, boom!浏览器自动刷新，新的结果出现了。

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },
    // 看loaders的书写方式，test里面包含一个正则，包含需要匹配的文件，loaders是一个数组，
    // 包含要处理这些程序的loaders，这里我们用了css和style，注意loaders的处理顺序是从右到左的，
    // 这里就是先运行css-loader然后是style-loader.
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css'],
            include: APP_PATH
        }]
    }
}

// webpack简单点来说就就是一个配置文件，所有的魔力都是在这一个文件中发生的。 这个配置文件主要分为三大块

// entry 入口文件 让webpack用哪个文件作为项目的入口
// output 出口 让webpack把处理完成的文件放在哪里
// module 模块 要用什么不同的模块来处理各种类型的文件

// webpack使用loader的方式来处理各种各样的资源，比如说样式文件，我们需要两种loader，css-loader 和 style－loader，css-loader会遍历css文件，找到所有的url(...)并且处理。style-loader会把所有的样式插入到你页面的一个style tag中。