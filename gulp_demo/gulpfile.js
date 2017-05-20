// gulp.src(globs[, options])
// globs：  需要处理的源文件匹配符路径。类型(必填)：String or StringArray；
// “src/a.js”：指定具体文件；
// “*”：匹配所有文件    例：src/*.js(包含src下的所有js文件)；
// “**”：匹配0个或多个子文件夹    例：src/**/*.js(包含src的0个或多个子文件夹下的js文件)；
// “{}”：匹配多个属性    例：src/{a,b}.js(包含a.js和b.js文件)  src/*.{jpg,png,gif}(src下的所有jpg/png/gif文件)；
// “!”：排除文件    例：!src/a.js(不包含src下的a.js文件)；
var gulp = require('gulp');
// demo

// var gulp = require('gulp'),
//     less = require('gulp-less'),
//     jshint = require('gulp-jshint'),
//     minify = require('gulp-minify-css');

// gulp.task('lint', function() {
//     gulp.src('src/css/**/*.css')
//         .pipe(minify())
//         .pipe(gulp.dest('build'));

//     gulp.src('src/css/**/*.css', { base: 'src' })
//         .pipe(minify())
//         .pipe(gulp.dest('testbase'));
// });



// gulp.task('testLess', function() {
//     gulp.src('src/less/*.less') //该任务针对的文件
//         .pipe(less()) //该任务调用的模块
//         .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
// });

// gulp.task('default', ['testLess', 'lint']);


// options：类型(可选)：Object，有3个属性buffer、read、base；
// options.buffer：  类型：Boolean  默认：true 设置为false，将返回file.content的流并且不缓冲文件，处理大文件时非常有用；
// options.read：  类型：Boolean  默认：true 设置false，将不执行读取文件操作，返回null；
// options.base：  类型：String  设置输出路径以某个路径的某个组成部分为基础向后拼接

// gulp.dest(path[, options])
// path：  类型(必填)：String or Function 指定文件输出路径，或者定义函数返回文件输出路径亦可；
// 2.3、options：  类型(可选)：Object，有2个属性cwd、mode；
// options.cwd：  类型：String  默认：process.cwd()：前脚本的工作目录的路径 当文件输出路径为相对路径将会用到；
// options.mode：  类型：String  默认：0777 指定被创建文件夹的权限；


// gulp.task(name[, deps], fn)
// 3.1、说明：task定义一个gulp任务；
// 3.2、name：  类型(必填)：String 指定任务的名称（不应该有空格）；
// 3.3、deps：  类型(可选)：StringArray，该任务依赖的任务（注意：被依赖的任务需要返回当前任务的事件流，请参看下面示例）；
// 3.4、fn：  类型(必填)：Function 该任务调用的插件操作；

// gulp.task('mytask', ['array', 'of', 'task', 'names'], function() {
// 做一些事
// });


// gulp.task('testLess', function() {
//     return gulp.src(['less/style.less'])
//         .pipe(less())
//         .pipe(gulp.dest('./css'));
// });

// gulp.task('mincss', ['testLess'], function() {
//     gulp.src(['css/*.css'])
//         .pipe(minify())
//         .pipe(gulp.dest('./dist/css'))
// })

// gulp.watch(glob [, opts], tasks) or gulp.watch(glob [, opts, cb])
// 4.1、说明：watch方法是用于监听文件变化，文件一修改就会执行指定的任务；
// 4.2、glob：  需要处理的源文件匹配符路径。类型(必填)：String or StringArray；
// 4.3、opts：  类型(可选)：Object 具体参看https://github.com/shama/gaze；
// 4.4、tasks：  类型(必填)：StringArray 需要执行的任务的名称数组；
// 4.5、cb(event)：  类型(可选)：Function 每个文件变化执行的回调函数；

// gulp 技巧集

// 1. 整合 streams 来处理错误
// 默认情况下，在 stream 中发生一个错误的话，它会被直接抛出，除非已经有一个时间监听器监听着 error 时间。 这在处理一个比较长的管道操作的时候会显得比较棘手。
// 通过使用 stream-combiner2，你可以将一系列的 stream 合并成一个，这意味着，你只需要在你的代码中一个地方添加监听器监听 error 时间就可以了。
// var combiner = require('stream-combiner2');
// var uglify = require('gulp-uglify');
// var gulp = require('gulp');

// gulp.task('test', function() {
//     var combined = combiner.obj([
//         gulp.src('src/**/*.js'),
//         uglify(),
//         gulp.dest('public/js')
//     ]);

//     combined.on('error', console.error.bind(console));
//     return combined;
// })

// gulp.task('default', ['test']);

// 2. 删除文件和文件夹
// var strripDebug = require('gulp-strip-debug'),
//     del = require('del'),
//     vinyPaths = require('vinyl-paths');

// gulp.task('clean:mobile', function() {
//     del([
//         'dist/repost.csv',
//         'dist/mobile/**',
//         '!dist/mobile/s.json'
//     ])
// });
// gulp.task('clear:tmp', function() {
//     return gulp.src('tmp/*')
//         .pipe(strripDebug())
//         .pipe(gulp.dest())
//         //  vinyl-paths 模块来简单地获取 stream 中每个文件的路径，然后传给 del 方法。
//         .pipe(vinyPaths(del));
// });
// gulp.task('defalut', ['clean:tmp']);


// 3. 使用 watchify 加速 browserify 编译
// 一个持续监视文件的改动，并且 只重新打包必要的文件 的 browserify 打包工具。用这种方法，第一次打包的时候可能会还是会花 30 秒，但是后续的编译打包工作将一直保持在 100 毫秒以下 —— 这是一个极大的提升。