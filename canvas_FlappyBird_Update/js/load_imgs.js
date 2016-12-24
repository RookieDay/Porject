var sources = ['birds', 'land', 'pipe1', 'pipe2', 'sky']; // 保存了源文件的路径
var images = { count: 0 };

function loadHandler(name, elem, event) {
    // 加载好一张图，就在images里面新增一条记录，将计数器加一
    images[name] = elem;
    images.count++;
    if (images.count >= sources.length) {
        /* 如果images的计数次数等于sources数组的长度，
         则代表全部加载完成
         此时执行主函数，游戏主逻辑开始
         */
        main();
    }
}

for (var i = 0; i < sources.length; i++) {
    var imageElem = new Image(); // 创建图像标签
    imageElem.src = 'imgs/' + sources[i] + '.png';
    /* 使用bind方法的原因是，
        我们addEventListener时，所传入的函数是浏览器在图像加载之后自己调用的。
        浏览器调用这个函数时，会传入一个evt对象，
        而我们的loadHandler函数需要传入一个我们自制的imageObj对象，
        于是我们就可以用bind方法把imageObj对象作为第一个参数绑定到一个新的函数上，
        把这个新的函数传递给addEventListener函数。
        */
    (function(i) {
        var handlerFn = loadHandler.bind(window, sources[i], imageElem);
        imageElem.addEventListener('load', handlerFn);
    })(i);
}



// 方法2：
// // 加载图片
// var imgs = ['birds.png', 'land.png', 'pipe1.png', 'pipe2.png', 'sky.png'];
// // 用于存放图像的标签<img />
// var imgObjects = [];

// // 在用到的时候,这样拿图像:
// // imgObjects[0]

// var loadCount = 0;
// // 图片加载完成后的监听器
// function listener() {
//     loadCount++;
//     if (loadCount >= imgs.length) {
//         main();
//     }
// }

// imgs.forEach(function (imgurl) {
//     // 通过遍历，创建了五个IMG标签
//     var img = new Image(); // 这个是img标签。
//     img.addEventListener('load', listener);
//     img.src = './imgs/' + imgurl;
//     imgObjects.push(img);
// });