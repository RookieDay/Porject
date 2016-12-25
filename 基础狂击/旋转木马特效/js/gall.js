var wrap = document.getElementById("wrap");
var slide = document.getElementById("slide");
var ul = slide.children[0];
var lis = ul.children;
var arrRight = document.getElementById("arrRight");
var arrLeft = document.getElementById("arrLeft");

var arrow = document.getElementById("arrow");
var config = [ //config 配置
    {
        width: 400,
        top: 20,
        left: 50,
        opacity: 0.2,
        zIndex: 2
    }, //0
    {
        width: 600,
        top: 70,
        left: 0,
        opacity: 0.8,
        zIndex: 3
    }, //1
    {
        width: 800,
        top: 100,
        left: 200,
        opacity: 1,
        zIndex: 4
    }, //2
    {
        width: 600,
        top: 70,
        left: 600,
        opacity: 0.8,
        zIndex: 3
    }, //3
    {
        width: 400,
        top: 20,
        left: 750,
        opacity: 0.2,
        zIndex: 2
    } //4
]; //其实就是一个配置单 规定了每张图片的大小位置层级透明度


wrap.onmouseover = function() {
    animate(arrow, { "opacity": 1 });
}
wrap.onmouseout = function() {
    animate(arrow, { "opacity": 0 });
}

function assign() {
    for (var i = 0; i < lis.length; i++) {
        animate(lis[i], config[i], function() {
            flag = true;
        })
    }
}
assign();


arrRight.onclick = function() {
    if (flag) { //点击按钮的时候对阀门的状态进行判断 如果是打开的就可以执行
        //关闭节流阀
        //点击右侧按钮 配置单 删除第一个元素 追加到结尾
        config.push(config.shift()); //修改配置单
        assign(); //根据修改完成的配置单对位置进行重新分配
        flag = false;
    }
}

arrLeft.onclick = function() {
        if (flag) {
            //点击左侧按钮 配置单 删除最后一个 追加到开头
            config.unshift(config.pop()); //修改配置单
            assign(); //根据修改完成的配置单对位置进行重新分配
            flag = false;
        }
    }
    //4.添加节流阀
var flag = true; //flag为true的时候表示节流阀打开 箭头可以点击