jQuery入口函数与js入口函数的区别（理解）
    js入口函数指的是：window.onload = function() {};
    区别一：书写个数不同
        Js入口函数只能出现一次，出现多次会存在事件覆盖的问题。
        jQuery的入口函数，可以出现任意多次，并不会存在事件覆盖问题。
    区别二：执行时机不同
        Js入口函数是在所有的文件资源加载完成后，才执行。这些文件资源包括：页面文档、外部的js文件、外部的css文件、图片等。
        jQuery的入口函数，是在文档加载完成后，就执行。文档加载完成指的是：DOM树加载完成后，就可以操作DOM了，不用等到所有的外部资源都加载完成。
        文档加载的顺序：从上往下，边解析边执行。

jQuery对象和DOM对象的相互转换:
    DOM对象此处指的是：使用js操作DOM返回的结果。
        var btn = document.getElementById(“btnShow”); // btn就是一个DOM对象   
    jQuery对象此处指的是：使用jQuery提供的操作DOM的方法返回的结果。
        jQuery拿到DOM对象后又对其做了封装，让其具有了jQuery方法的jQuery对象，说白了，就是把DOM对象重新包装了一下。
        （联想：手机和有手机壳的手机，手机就好比是DOM对象，有手机壳的手机就好比是jQuery对象）
        var $btn = $(“#btnShow”); // $btn就是一个jQuery对象
    DOM对象转换成jQuery对象：
        var $btn1 = $(btn); // 此时就把DOM对象btn转换成了jQuery对象$btn1
        // $(document）.ready(function(){}); // 调用入口函数
        // 此处是将document这个js的DOM对象，转换成了jQuery对象，然后才能调用jQuery提供的方法：ready
    jQuery对象转换成DOM对象：
        // 第一种方式
        var btn1 = $btn[0]; // 此时就把jQuery对象$btn转换成了DOM对象btn1 （推荐使用此方式）
        // 第二种方式
        var btn2 = $btn.get(0);// 此时就把jQuery对象$btn转换成了DOM对象btn2

html创建元素（推荐使用，重点）
    作用：设置或返回所选元素的html内容（包括 HTML 标记）
    设置内容的时候，如果是html标记，会动态创建元素，此时作用跟js里面的 innerHTML属性相同
    // 动态创建元素
    $(selector).html(‘<span>传智播客</span>’);
    // 获取html内容
    $(selector).html();
    // 传入一个空字符串，表示清空内容
    $(selector).html(“”);


清空元素
    // 清空指定元素的所有子元素（光杆司令）
    // 没有参数
    $(selector).empty();
    // “自杀” 把自己（包括所有内部元素）从文档中删除掉
    $(selector).remove();



JQ 事件绑定：
    历程：简单事件绑定 >> bind事件绑定 >> delegate事件绑定 >> on

bind方式（不推荐，1.7以后的jQuery版本被on取代）
    作用：给匹配到的元素直接绑定事件
    // 绑定单击事件处理程序
    第一个参数：事件类型
    第二个参数：事件处理程序
    $("p").bind("click mouseenter", function(e){
        //事件响应方法
    });
    比简单事件绑定方式的优势：
        可以同时绑定多个事件，比如：bind(“mouseenter  mouseleave”, function(){})
    缺点：要绑定事件的元素必须存在文档中。

    delegate方式（特点：性能高，支持动态创建的元素）
    作用：给匹配到的元素绑定事件，对支持动态创建的元素有效
    // 第一个参数：selector，要绑定事件的元素
    // 第二个参数：事件类型
    // 第三个参数：事件处理函数
    $(".parentBox").delegate("p", "click", function(){
        //为 .parentBox下面的所有的p标签绑定事件
    });
    与前两种方式最大的优势：减少事件绑定次数提高效率，支持动态创建出来的元素绑定事件！

    on方式（最现代的方式，兼容zepto(移动端类似jQuery的一个库))
    jQuery1.7版本后，jQuery用on统一了所有的事件处理的方法
    作用：给匹配的元素绑定事件，包括了上面所有绑定事件方式的优点
    语法：
    // 第一个参数：events，绑定事件的名称可以是由空格分隔的多个事件（标准事件或者自定义事件）
    // 第二个参数：selector, 执行事件的后代元素
    // 第三个参数：data，传递给处理函数的数据，事件触发的时候通过event.data来使用
    // 第四个参数：handler，事件处理函数
    $(selector).on(events[,selector][,data],handler);

        // 表示给$(selector)绑定事件，当必须是它的内部元素span才能执行这个事件
    $(selector).on( "click","span", function() {});

    // 绑定多个事件
    // 表示给$(selector)匹配的元素绑定单击和鼠标进入事件
    $(selector).on(“click mouseenter”, function(){});

JQ事件解绑
    	unbind() 方式
        作用：解绑 bind方式绑定的事件
        $(selector).unbind(); //解绑所有的事件
        $(selector).unbind(“click”); //解绑指定的事件
    	undelegate() 方式
        作用：解绑delegate方式绑定的事件
        $( selector ).undelegate(); //解绑所有的delegate事件
        $( selector).undelegate( “click” ); //解绑所有的click事件

    off解绑on方式绑定的事件（重点）
        // 解绑匹配元素的所有事件
        $(selector).off();
        // 解绑匹配元素的所有click事件
        $(selector).off(“click”);
        // 解绑所有代理的click事件，元素本身的事件不会被解绑 
        $(selector).off( “click”, "**" ); 

JQ事件触发
    简单事件触发
    $(selector).click(); //触发 click事件
    trigger方法触发事件
    $(selector).trigger(“click”);
    triggerHandler触发 事件处理函数，不触发浏览器行为
    比如:文本框获得焦点的默认行为
    $(selector).triggerHandler(“focus”);
   

 如何得到计算后的样式属性值呢
```
IE
div.currentStyle.left或 div.current["left"]
w3c  
window.getComputedStyle(元素,伪元素)["left"]
```

clientX   clientY
当前窗口的左上角为基准点  比如浏览器窗口
pageX    pageY
以当前文档的左上角为基准点
screenX  screenY
当前屏幕的左上角为基准点


事件冒泡简介
当一个元素上的事件被触发的时候，比如说鼠标点击了一个按钮，同样的事件将会在那个元素的所有祖先元素中被触发。这一过程被称为事件冒泡；这个事件从原始元素开始一直冒泡到DOM树的最上层。
顺序
IE 6.0: 
div -> body -> html -> document
其他浏览器: 
div -> body -> html -> document -> window
不是所有的事件都能冒泡。以下事件不冒泡：blur、focus、load、unload

阻止冒泡的方法
 标准浏览器 和  ie浏览器  
 w3c的方法是event.stopPropagation()           
 IE是event.cancelBubble = true  
@阻止事件冒泡
 兼容的写法： 
if(event && event.stopPropagation)
{
  event.stopPropagation();  //  w3c 标准
} else {
  event.cancelBubble = true;  // ie 678  ie浏览器
}


词法作用域

JavaScript中的函数是通过词法来划分作用域的（而不是动态地划分作用域的）。
即，函数在定义它们的作用域运行（而不是在执行它们的作用域里运行）。

定义和执行的区别：
```
// 定义指的是这个语句被解析执行的时候
function func() {}
// 执行指的是这个函数被调用的时候
func();
```

执行环境和作用域

执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个
与之关联的变量对象（variable object），环境中定义的所有变量和函数都保存在这个对象中。
虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。

全局执行环境是最外围的一个执行环境，在 Web 浏览器中，全局执行环境是 window 对象。
所有全局变量和函数都是作为 window 对象的属性和方法创建的

当代码在一个环境中执行时，会创建变量对象的一个作用域链（scope chain）。作用域链的用途，是
保证对执行环境有权访问的所有变量和函数的有序访问。

作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象。
函数调用的执行过程：
    1. 设置作用域链
        当JavaScript的解释器调用一个函数，将此函数的作用域设置为定义函数的时候起作用的那个作用域链。
    2. 创建调用对象（其他名称：激活对象、活动对象），添加到作用域链的前端
        在作用域的前面添加一个新的对象：调用对象(call object)，它用一个名为arguments的属性来初始化，
        即：局部变量、函数参数和Arguments对象、内部函数都在函数内的作用域中，放到了调用对象里面。
        这样就隐藏了作用域链更上层的任何同名的属性。
    3. 调用结束后，调用对象从作用域链中移除。（一般情况下）
        当没有涉及嵌套的函数的时候，作用域链是对调用对象的唯一引用。当对象从链中移除，也就是没有对它的引用了，
        最终通过对它的垃圾收集而完结。

注意：this是一个关键字，而不是调用对象的一个属性，所以，this并不一定指的是函数自身。


协商缓存（性能优化）
    此知识点属性扩展内容，不做具体分析
    前端优化雅虎35条
    http://www.tuicool.com/articles/J3uyaa
    重绘&回流
    http://www.zhangxinxu.com/wordpress/2010/01/%E5%9B%9E%E6%B5%81%E4%B8%8E%E9%87%8D%E7%BB%98%EF%BC%9Acss%E6%80%A7%E8%83%BD%E8%AE%A9javascript%E5%8F%98%E6%85%A2%EF%BC%9F/
    利用浏览器的缓存机制，可以有效的减少HTTP的请求，提高页面加载速度，增强用户体验，同时也能极大的减轻服务器的负担，结合HTTP协议，缓存协商就是根据HTTP协议实现缓存控制的一种机制。
    问题：是否见过某些网站CSS地址后面会带有一些参数，通常为xxx.css?cache=20160106形式
    这种做法是用来强制清除缓存的，实际开发过程中，每当新功能上线时最容易引起BUG的即CSS的缓存，但是浏览器的缓存能减少请求，如果每次都强制清除，会对性能有损失，所以控制浏览器缓存成为前端性能化的一个重点
        1、Last-Modified时间精确到了秒，但如果1秒内修改了多次，并不能精确的更新缓存。
        2、ETag则是判断文件内容任何改变后，便会由服务器自动生成一个唯一标识。
        3、Expires 过期时间，HTTP1.0的规范，一个绝对的时间
        4、Cache-Control HTTP1.1规范，设置过期时间，优先级高于Expires。

JSONP JSON with Padding
1、原理剖析
    其本质是利用了<script src=""></script>标签具有可跨域的特性，由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来，此方法需要前后端配合完成。
    只能以GET方式请求
jQuery中的JSONP
    jQuery 的$.ajax() 方法当中集成了JSONP的实现，可以非常方便的实现跨域数据的访问。
    dataType: 'jsonp' 设置dataType值为jsonp即开启跨域访问
    jsonp 可以指定服务端接收的参数的“key”值，默认为callback
    jsonpCallback 可以指定相应的回调函数，默认自动生成       


var xhr = new XMLHttpRequest;
xhr.open('get', '02.php?name=itcast&age=10');

//when get 可以不写Content-Type
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
//when post 必须要写请求头Content-Type，并且只能是application/x-www-form-urlencoded
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

//POST数据放到请求体重，但非必须
xhr.onreadystatechange = functuin(){
    if(xhr.readyState == 4 && xhr.status == 200){
        console.log(xhr.responseText);
    }
}

封装自己的ajax

var $ = {
    params:function(params){
        var data;
        for(var key in params){
            data += key + '=' + params[key] + &;
        }
        return data.slice(0,-1);
    },
    ajax:function(options){
        var xhr = new XMLHttpRequest,
        //get default
        type = options.type || 'get',
        //
        url = options.url || location.pathname,
        data = this.params(option.data),
        callback = options.success;
        if(type == 'get'){
            url = url + '?' + data;
            data = null;
        }
        xhr.open(type,url);
        if(type == 'post'){
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        }
        xhr.send(data);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                var contentType = xhr.getResponseHeader('Content-Type');
                var data = data.responseText;
                if(contentType.indexOf('json') != -1){
                    data = JSON.parse(data);
                }
                callback(data);
            } else {
                options.error('error');
            }
        }
    }
}

调用
 var mobile = $('.mobild').val();
    $.ajax({
        type: 'post',
        url: 'getCode.php',
        data: { mobile: mobile },
        timeout: 2000,
        beforeSend: function() {
            var regMobil = /^(13[0-9]|14[57]|15[0-9]|18[0-9])\d{8}$/;
            if (!regMobil.test($('.mobile').val())) {
                $('.tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('手机格式不正确');
                return false;
            }
            var seconds = 10;
            var t = setInterval(function() {
                _this.val(--seconds + '秒后重新获取');
                if (seconds < 0) {
                    clearInterval(t);
                    _this.val('获取验证码').removeClass('disabled');
                }
            }, 1000);
        },
        success: function() {
            console.log('success');
        },
        error: function() {

        },
        complete: function() {
            console.log('complete');
        }
    });



简单插件开发：
<p>我是一个文字</p>

<script src="./js/jquery.min.js"></script>
<script>

    console.log($.fn);

    // $('p').addClass();

    $.fn.test = function () {
        console.log(this);
    }

    $('p').test();

    // 1、自已可以往$.fn上面添加一个自定义的方法
    // 2、当我们在这个方法引用this，this指向的是当前DOM对象
    // 3、调用的时候和普通的方法一样

    // 换颜色
    $.fn.setColor = function (color) {
        $(this).css('color', color);
    }

    $('p').click(function () {
        $(this).setColor('blue');
    });

</script>


封装的JQ插件：
    制作插件
        如何创建jQuery插件：
        http://learn.jquery.com/plugins/basic-plugin-creation/

        给全局jQuery函数扩展方法
        $.pluginName = function() {};
        // 调用
        $.pluginName();

        给jQuery对象扩展方法
        $.fn.pluginName = function() {};
        $(“div”).pluginName();

;(function($){
    $.fn.waterFall = function(options){
        var defaule = $.extend({gap:20},options);

        var _this = $(this),
        items = _this.children(),
        width = items.width(),
        hegiht = 0,
        count = Math.floor(_this.width() / (width + default.gap)),
        columns = [];

        items.each(function(key,val){
            height = $(val).height;

            if(key < count){
                columns[key] = height;
                $(val).css({
                    top:0,
                    left:(width+default.gap) *key
                });
            } else {
                var min_h = columns[0];
                var min_k = 0;
                for(var i = 0; i < columns.length;i++){
                    if(columns[i] < min_h){
                        min_h = columns[i];
                        min_k = i;
                    }
                }
                columns[min_k] += height;
                $(val).css({
                    top:min_h + defalut.gap,
                    left:(width + default.gap) * min_k
                })
            }
        });
        columns = columns.sort(function(a,b){
            return b - a;
        })
        _this.css({
            heigth:columns[0];
        })
    }
})(jQuery)


Jsonp 跨域：
// jQuery中JSONP是通过$.ajax()，来实现的
$.ajax({
    url: 'http://api.study.com/jsonp.php',
    type: 'get',
    // 这里需要将dataType 指定为jsonp
    dataType: 'jsonp',
    data: {name: 'itcast'},
    // 以字符串形式将事先定义好的函数名传递进来
    // jsonpCallback: 'test',
    // jsonp: 'call',
    success: function (data) {
        // console.log(data);
    },
    error: function (err) {
        console.log(err);
    }
});


H5 C3 具体查看AllSummary.md

DOM扩展
    获取元素
        1、document.getElementsByClassName ('class') 通过类名获取元素，以类数组形式存在。
        2、document.querySelector('selector') 通过CSS选择器获取元素，符合匹配条件的第1个元素。
        3、document.querySelectorAll('selector') 通过CSS选择器获取元素，以类数组形式存在。
	类名操作
        1、Node.classList.add('class') 添加class
        2、Node.classList.remove('class') 移除class
        3、Node.classList.toggle('class') 切换class，有则移除，无则添加
        4、Node.classList.contains('class') 检测是否存在class
        Node指一个有效的DOM节点，是一个通称。
	自定义属性
        在HTML5中我们可以自定义属性，其格式如下data-*=""，例如
        data-info="我是自定义属性"，通过Node.dataset['info'] 我们便可以获取到自定义的属性值。
        Node.dataset是以对象形式存在的
        当我们如下格式设置时，则需要以驼峰格式才能正确获取
        data-my-name="baidu"，获取Node.dataset['myName']


Css3:

    []		表示全部可选项
    ||		表示或者
    |		表示多选一
    ？	表示0个或者1个
    *		表示0个或者多个
    {}		表示范围

选择器：

属性选择器
    其特点是通过属性来选择元素，具体有以下5种形式：
    1、E[attr] 表示存在attr属性即可；
    2、E[attr=val] 表示属性值完全等于val；
    3、E[attr*=val] 表示的属性值里包含val字符并且在“任意”位置；
    4、E[attr^=val] 表示的属性值里包含val字符并且在“开始”位置；
    5、E[attr$=val] 表示的属性值里包含val字符并且在“结束”位置；
伪类选择器
    除了以前学过的:link、:active、:visited、:hover，CSS3又新增了其它的伪类选择器。
    1、以某元素相对于其父元素或兄弟元素的位置来获取无素的结构伪类。
        重点理解通过E来确定元素的父元素。
        E:first-child第一个子元素
        E:last-child最后一个子元素
        E:nth-child(n) 第n个子元素，计算方法是E元素的全部兄弟元素；
        E:nth-last-child(n) 同E:nth-child(n) 相似，只是倒着计算；
        n遵循线性变化，其取值0、1、2、3、4、... 但是当n<=0时，选取无效。
        n可是多种形式：nth-child(2n+0)、nth-child(2n+1)、nth-child(-1n+3)等；
        需要满足y=ax+b
        注：指E元素的父元素，并对应位置的子元素必须是E
        E:empty 选中没有任何子节点的E元素；（使用不是非常广泛）
    2、目标伪类
      E:target 结合锚点进行使用，处于当前锚点的元素会被选中；

伪元素选择器
    E::first-letter文本的第一个单词或字（如中文、日文、韩文等）；
    E::first-line 文本第一行；
    E::selection 可改变选中文本的样式；
    重点：E::before、E::after
        是一个行内元素，需要转换成块元素
        E:after、E:before 在旧版本里是伪元素，CSS3的规范里“:”用来表示伪类，“::”用来表示伪元素，但是在高版本浏览器下E:after、E:before会被自动识别为E::after、E::before，这样做的目的是用来做兼容处理。
        E:after、E:before后面的练习中会反复用到，目前只需要有个大致了解
        ":" 与 "::" 区别在于区分伪类和伪元素
    参考文档
        :before和::before的区别
        https://www.qianduan.net/before-and-before-the-difference-between/
颜色
    新增了RGBA、HSLA模式，其中的A 表示透明度通道，即可以设置颜色值的透明度，相较opacity，它们不具有继承性，即不会影响子元素的透明度。
    Red、Green、Blue、Alpha即RGBA
    Hue、Saturation、Lightness、Alpha即HSLA
    R、G、B 取值范围0~255
    H 色调 取值范围0~360，0/360表示红色、120表示绿色、240表示蓝色
    S 饱和度 取值范围0%~100%
    L 亮度 取值范围0%~100%
    A 透明度 取值范围0~1
    关于透明度：
        1、opacity只能针对整个盒子设置透明度，子盒子及内容会继承父盒子的透明度；
        2 、transparent 不可调节透明度，始终完全透明
        RGBA、HSLA可应用于所有使用颜色的地方。
文本
    text-shadow，可分别设置偏移量、模糊度、颜色（可设透明度）。
        1、水平偏移量 正值向右 负值向左；
        2、垂直偏移量 正值向下 负值向上；
        3、模糊度是不能为负值；
边框
    其中边框圆角、边框阴影属性，应用十分广泛，兼容性也相对较好，具有符合渐进增强原则的特征

边框圆角
border-radius
    圆角处理时，脑中要形成圆、圆心、横轴、纵轴的概念，正圆是椭圆的一种特殊情况  附图

边框阴影
    box-shadow
        1、水平偏移量 正值向右 负值向左；
        2、垂直偏移量 正值向下 负值向上；
        3、模糊度是不能为负值；
        4、inset可以设置内阴影；
        设置边框阴影不会改变盒子的大小，即不会影响其兄弟元素的布局。
        可以设置多重边框阴影，实现更好的效果，增强立体感。

边框图片
    border-image
    设置的图片将会被“切割”成九宫格形式，然后进行设置。
    1、round和repeat之间的区别
        round 会自动调整尺寸，完整显示边框图片。

盒模型
    CSS3中可以通过box-sizing 来指定盒模型，即可指定为content-box、border-box，这样我们计算盒子大小的方式就发生了改变。
    可以分成两种情况：
        1、box-sizing: border-box  计算方式为content = width – border - padding  变小了
        2、box-sizing: content-box  计算方式为content = width
    兼容性比较好

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>CSS盒模型</title>
	<style>
		div {
			width: 200px;
			height: 200px;
			padding: 50px;
			margin: 100px auto;
			border: 20px solid orange;
			background: red;

			/*box-sizing: border-box;*/
			/*box-sizing: content-box;*/
			
			/*默认情况下盒子模型是content-box*/
		}
	</style>
</head>
<body>
	<div></div>
</body>
</html>


背景
    背景在CSS3中也得到很大程度的增强，比如背景图片尺寸、背景裁切区域、背景定位参照点、多重背景等。
    1、background-size设置背景图片的尺寸
        cover会自动调整缩放比例，保证图片始终填充满背景区域，如有溢出部分则会被隐藏。 完全的充满这一张
        contain会自动调整缩放比例，保证图片始终完整显示在背景区域。 也就是背景图片可能有多张而拼凑出来
        也可以使用长度单位或百分比 
    2、background-origin设置背景定位的原点
        border-box以边框做为参考原点；
        padding-box以内边距做为参考原点；
        content-box以内容区做为参考点；
    3、background-clip设置背景区域裁切
        border-box裁切边框以内为背景区域；
        padding-box裁切内边距以内为背景区域；
        content-box裁切内容区做为背景区域；
    4、以逗号分隔可以设置多背景，可用于自适应局
        背景图片尺寸在实际开发中应用十分广泛。
渐变
    渐变是CSS3当中比较丰富多彩的一个特性，通过渐变我们可以实现许多炫丽的效果，有效的减少图片的使用数量，并且具有很强的适应性和可扩展性。
    可分为线性渐变、径向渐变

线性渐变
    linear-gradient线性渐变指沿着某条直线朝一个方向产生渐变效果。
    从黄色渐变到绿色
        1、必要的元素：
        a、方向
        b、起始颜色
        c、终止色；
    关于方向附图
 
径向渐变
    radial-gradient径向渐变指从一个中心点开始沿着四周产生渐变效果
    
    1、必要的元素：
        a、辐射范围即圆半径 
        b、中心点 即圆的中心
        c、渐变起始色
        d、渐变终止色
    2、关于中心点：中心位置参照的是盒子的左上角
    3、关于辐射范围：其半径可以不等，即可以是椭圆

径向渐变
radial-gradient径向渐变指从一个中心点开始沿着四周产生渐变效果 
    1、必要的元素：
        a、辐射范围即圆半径 
        b、中心点 即圆的中心
        c、渐变起始色
        d、渐变终止色
    2、关于中心点：中心位置参照的是盒子的左上角
    3、关于辐射范围：其半径可以不等，即可以是椭圆

过渡
    过渡是CSS3中具有颠覆性的特征之一，可以实现元素不同状态间的平滑过渡（补间动画），经常用来制作动画效果。
    帧动画：通过一帧一帧的画面按照固定顺序和速度播放。如电影胶片
    补间动画：自动完成从起始状态到终止状态的的过渡。
    关于补间动画更多学习可查看http://mux.alimama.com/posts/1009
    特点：当前元素只要有“属性”发生变化时，可以平滑的进行过渡。
    transition-property设置过渡属性
    transition-duration设置过渡时间
    transition-timing-function设置过渡速度
    transition-delay设置过渡延时

2D转换
    转换是CSS3中具有颠覆性的特征之一，可以实现元素的位移、旋转、变形、缩放，甚至支持矩阵方式，配合即将学习的过渡和动画知识，可以取代大量之前只能靠Flash才可以实现的效果。
        1、移动 translate(x, y) 可以改变元素的位置，x、y可为负值；
        2、缩放 scale(x, y) 可以对元素进行水平和垂直方向的缩放，x、y的取值可为小数，不可为负值；
        4、旋转 rotate(deg) 可以对元素进行旋转，正值为顺时针，负值为逆时针；
        5、倾斜 skew(deg, deg) 可以使元素按一定的角度进行倾斜
3D转换
    1、3D坐标轴
        用X、Y、Z分别表示空间的3个维度，三条轴互相垂直
    2、左手坐标系
        伸出左手，让拇指和食指成“L”形，大拇指向右，食指向上，中指指向前方。这样我们就建立了一个左手坐标系，拇指、食指和中指分别代表X、Y、Z轴的正方向
    3、左手法则
        左手握住旋转轴，竖起拇指指向旋转轴正方向，正向就是其余手指卷曲的方向。

动画
    动画是CSS3中具有颠覆性的特征之一，可通过设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果。
    1、必要元素：
        a、通过@keyframes指定动画序列；
        b、通过百分比将动画序列分割成多个节点；
        c、在各节点中分别定义各属性
        d、通过animation将动画应用于相应元素；
    2、关键属性
        a、animation-name设置动画序列名称
        b、animation-duration动画持续时间
        c、animation-delay动画延时时间
        d、animation-timing-function动画执行速度，linear、ease等
        e、animation-play-state动画播放状态，play、paused等
        f、animation-direction动画逆播，alternate等
        g、animation-fill-mode动画执行完毕后状态，forwards、backwards等
        h、animation-iteration-count动画执行次数，inifinate等


伸缩布局 附图
    CSS3在布局方面做了非常大的改进，使得我们对块级元素的布局排列变得十分灵活，适应性非常强，其强大的伸缩性，在响应式开中可以发挥极大的作用。
    主轴：Flex容器的主轴主要用来配置Flex项目，默认是水平方向
    侧轴：与主轴垂直的轴称作侧轴，默认是垂直方向的
    方向：默认主轴从左向右，侧轴默认从上到下
    主轴和侧轴并不是固定不变的，通过flex-direction可以互换。

    1、必要元素：
        a、指定一个盒子为伸缩盒子 display: flex
        b、设置属性来调整此盒的子元素的布局方式 例如 flex-direction
        c、明确主侧轴及方向
        d、可互换主侧轴，也可改变方向
    2、各属性详解
        a、flex-direction调整主轴方向（默认为水平方向）
        b、justify-content调整主轴对齐
        c、align-items调整侧轴对齐
        d、flex-wrap控制是否换行
        e、align-content堆栈（由flex-wrap产生的独立行）对齐
        f、flex-flow是flex-direction、flex-wrap的简写形式
        g、flex控制子项目的缩放比例
        h、order控制子项目的排列顺序

字体格式
不同浏览器所支持的字体格式是不一样的，我们有必要了解一下有关字体格式的知识。
    1、TureTpe(.ttf)格式
        .ttf字体是Windows和Mac的最常见的字体，是一种RAW格式，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome4+、Safari3+、Opera10+、iOS Mobile、Safari4.2+；
    2、OpenType(.otf)格式
        .otf字体被认为是一种原始的字体格式，其内置在TureType的基础上，支持这种字体的浏览器有Firefox3.5+、Chrome4.0+、Safari3.1+、Opera10.0+、iOS Mobile、Safari4.2+；
    3、Web Open Font Format(.woff)格式
        woff字体是Web字体中最佳格式，他是一个开放的TrueType/OpenType的压缩版本，同时也支持元数据包的分离，支持这种字体的浏览器有IE9+、Firefox3.5+、Chrome6+、Safari3.6+、Opera11.1+；
    4、Embedded Open Type(.eot)格式
        .eot字体是IE专用字体，可以从TrueType创建此格式字体，支持这种字体的浏览器有IE4+；
    5、SVG(.svg)格式
        .svg字体是基于SVG字体渲染的一种格式，支持这种字体的浏览器有Chrome4+、Safari3.1+、Opera10.0+、iOS Mobile Safari3.2+；
    了解了上面的知识后，我们就需要为不同的浏览器准备不同格式的字体，通常我们会通过字体生成工具帮我们生成各种格式的字体，因此无需过于在意字体格式间的区别差异。
    推荐http://www.zhaozi.cn/、http://www.youziku.com/ 查找更多中文字体


字体图标
    其实我们可以把文字理解成是一种特殊形状的图片，反之我们是不是也可以把图片制作成字体呢？
    答案是肯定的。
    常见的是把网页常用的一些小的图标，借助工具帮我们生成一个字体包，然后就可以像使用文字一样使用图标了。
    优点：
        1、将所有图标打包成字体库，减少请求；
        2、具有矢量性，可保证清晰度；
        3、使用灵活，便于维护；
    Font Awesome 使用介绍
        http://fontawesome.dashgame.com/
    定制自已的字体图标库
        http://iconfont.cn/
        https://icomoon.io/
    SVG素材
        http://www.iconsvg.com/


通过http://caniuse.com/ 可查询CSS3各特性的支持程度，一般兼容性处理的常见方法是为属性
添加私有前缀，如不能解决，应避免使用，无需刻意去处理CSS3的兼容性问题。


私有前缀：
    /*-webkit- 内核的浏览器会识别*/
    -webkit-border-radius: 100px;
    /*火狐浏览器 当属稳定后会将带前缀的属性废弃*/
    -moz-border-radius: 100px;
    border-radius: 100px;
    /*欧朋*/
    /*-o-*/
    /*IE*/
    /*-ms-*/

锚点：
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>CSS3 动画</title>
    <style>
        html,
        body {
            height: 100%;
            overflow: hidden;
        }
        
        body {
            margin: 0;
            padding: 0;
            position: relative;
        }
        
        ul.handle {
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            position: relative;
        }
        
        .handle li {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        
        .handle li:nth-child(1) {
            background: url(./images/bg1.jpg);
            background-size: cover;
            z-index: 3;
        }
        
        .handle li:nth-child(2) {
            background: url(./images/bg2.jpg);
            background-size: cover;
            z-index: 2;
        }
        
        .handle li:nth-child(3) {
            background: url(./images/bg3.jpg);
            background-size: cover;
            z-index: 1;
        }
        
        .btn {
            width: 100%;
            height: 120px;
            text-align: center;
            position: absolute;
            bottom: 80px;
            z-index: 10;
        }
        
        .btn li {
            display: inline-block;
            width: 120px;
            height: 120px;
            text-align: center;
            line-height: 120px;
            font-size: 30px;
            border-radius: 50%;
            background: pink;
            margin: 0 10px;
        }
        
        .btn a {
            display: inline-block;
            width: 100%;
            height: 100%;
            text-decoration: none;
            color: #000;
        }
        /*表明第一个锚点被选中*/
        
        #img1:target {
            z-index: 3;
            /*可以定义一个动画*/
            animation: slideleft 1s;
        }
        /*表明第二个锚点被选中*/
        
        #img2:target {
            z-index: 3;
        }
        /*表明第三个锚点被选中*/
        
        #img3:target {
            z-index: 3;
        }
        
        @keyframes slideleft {
            from {
                transform: translateX(-100%);
            }
            to {
                transform: translateX(0);
            }
        }
    </style>
</head>

<body>
    <ul class="handle">
        <li id="img1"></li>
        <li id="img2"></li>
        <li id="img3"></li>
    </ul>

    <ul class="btn">
        <li>
            <a href="#img1">1</a>
        </li>
        <li>
            <a href="#img2">2</a>
        </li>
        <li>
            <a href="#img3">3</a>
        </li>
    </ul>
</body>

</html>

