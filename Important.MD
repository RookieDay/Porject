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


