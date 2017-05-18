// gulp.src(globs[, options])
// globs：  需要处理的源文件匹配符路径。类型(必填)：String or StringArray；
// “src/a.js”：指定具体文件；
// “*”：匹配所有文件    例：src/*.js(包含src下的所有js文件)；
// “**”：匹配0个或多个子文件夹    例：src/**/*.js(包含src的0个或多个子文件夹下的js文件)；
// “{}”：匹配多个属性    例：src/{a,b}.js(包含a.js和b.js文件)  src/*.{jpg,png,gif}(src下的所有jpg/png/gif文件)；
// “!”：排除文件    例：!src/a.js(不包含src下的a.js文件)；

var gulp = require('gulp'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    minify = require('gulp-minify-css');

gulp.task('lint', function() {
    // gulp.src('src/js/*.js')
    //     .pipe(jshint())
    //     .pipe(jshint.reporter('default'));
    gulp.src('src/css/**/*.css')
        .pipe(minify())
        .pipe(gulp.dest('build'));

    gulp.src('src/css/**/*.css', { base: 'src' })
        .pipe(minify())
        .pipe(gulp.dest('testbase'));
});



gulp.task('testLess', function() {
    gulp.src('src/less/*.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
});

gulp.task('default', ['testLess', 'lint']);
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