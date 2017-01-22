## 
- stackoverflow 答案
- 字符串匹配相等 / 回文 
```
解法1：
function strEqual1(str1,str2){
    return str1 === str2.split('').reverse().join('');
}
解法2：
function strEqual2(str1,str2){
    let len1 = str1.length,
        len2 = str2.length;

    if (typeof str1 !== 'string' || typeof str2 !== 'string') return false;
	if (str1 === str2) return true;
	if (len1 !== len2) return false;
    for(let i = 0, j = len2 - 1;i < len1 - 1; i++,j-- ){
        if(str1[i] !== str2[j]){
            return false;
        }
    }
    return true;
}
```
- 当你输入一个网址的时候，实际会发生什么?
[英文地址](http://igoro.com/archive/what-really-happens-when-you-navigate-to-a-url/)
[翻译地址](http://www.cnblogs.com/wenanry/archive/2010/02/25/1673368.html)
[stackoverflow](http://stackoverflow.com/questions/2092527/what-happens-when-you-type-in-a-url-in-browser)
  + 第一步当然是输入网址
  + 第二步浏览器查找域名对于的IP地址
  + 第三步浏览器给web服务器发送一个HTTP请求
  + 第四步 facebook服务的永久重定向响应 服务器给浏览器响应一个301永久重定向响应，这样浏览器就会访问“http://www.facebook.com/” 而非“http://facebook.com/”。
  + 第五步浏览器跟踪重定向地址  现在，浏览器知道了“http://www.facebook.com/”才是要访问的正确地址，所以它会发送另一个获取请求
  + 第六步服务器"处理"请求 服务器接收到获取请求，然后处理并返回一个响应。
  + 第七步服务器发回一个HTML响应 报头中把Content-type设置为“text/html”。报头让浏览器将该响应内容以HTML形式呈现，而不是以文件形式下载它。浏览器会根据报头信息决定如何解释该响应，不过同时也会考虑像URL扩展内容等其他因素。
  + 第八步浏览器开始显示HTML 在浏览器没有完整接受全部HTML文档时，它就已经开始显示这个页面了：
  + 第九步浏览器发送获取嵌入在HTML中的对象
  + 第十步浏览器发送异步（AJAX）请求

- 什么是DOM  
    [Render](http://www.nowamagic.net/academy/detail/48110557)
    [Render](http://www.cnblogs.com/RachelChen/p/5456182.html)
    [cnblogs Render](http://www.cnblogs.com/luluping/archive/2013/04/05/3000460.html)
    简单来说，DOM是对HTML或者XML等文档的一种结构化表示方法，通过这种方式，用户可以通过提供标准的接口来访问HTML页面中
    的任何元素的相关属性，并可对DOM进行相应的添加、删除和更新操作等

    基于DOM树的一些可视（visual）的节点，WebKit来根据需要来创建相应的RenderObject节点，这些节点也构成了一颗树，称之为Render树。
    基于Render树，WebKit也会根据需要来为它们中的某些节点创建新的RenderLayer节点，从而形成一棵RenderLayer树。

    Render树和RenderLayer树是WebKit支持渲染所提供的基础但是却非常重要的设施。
    这是因为WebKit的布局计算依赖它们，浏览器的渲染和GPU硬件加速也都依赖于它们。幸运地是，得益于它们接口定义的灵活性，不同的浏览器可以很方便地来实现自己的渲染和加速机制。

    Render树和RenderLayer树是WebKit支持渲染所提供的基础但是却非常重要的设施。这是因为WebKit的布局计算
    依赖它们，浏览器的渲染和GPU硬件加速也都依赖于它们。幸运地是，得益于它们接口定义的灵活性，不同的浏览器可以很方便地来实现自己的渲染和加速机制。

    Render树是基于DOM树建立起来的一颗新的树， 是布局和渲染等机制的基础设施。 Render树节点和DOM树节点
    不是一一对应关系，那么哪些情况下需要建立新的Render节点呢？
      DOM树的document节点；
      DOM树中的可视化节点，例如HTML，BODY，DIV等，非可视化节点不会建立Render树节点，例如HEAD，META，SCRIPT等；
      某些情况下需要建立匿名的Render节点，该节点不对应于DOM树中的任何节点；   
      RenderObject对象在DOM树创建的同时也会被创建，当然，如果DOM中有动态加入元素时，也可能会相应地创建RenderObject对象。下图示例的是RenderObject对象被创建的函数调用过程。
      Render树建立之后，布局运算会计算出相关的属性，这其中有位置，大小，是否浮动等。有了这些信息之后，渲染引擎才只知道在何处以及如何画这些元素。

    记住"visibility:hidden"和"display：none"之间的不同，“visibility:hidden”将元素设置为不可见，但是同样在布局上占领一定空间（例如，它会被渲染成为空盒子），但是“display:none”的元素是将节点从整个render tree中移除，所以不是布局中的一部分 。 

    渲染引擎首先解析HTML文档，转换为一棵DOM树，此为第一步。接下来不管是内联式，外联式还是嵌入式引入的CSS样式也会被解析，渲染出另外一棵用于渲染DOM树的树-渲染树(render tree) ，渲染树包含带有颜色，尺寸等显示属性的矩形，这些矩形的顺序与显示顺序一致。然后就是对渲染树的每个节点进行布局处理，确定其在屏幕上的显示位置。最后就是遍历渲染树并用上一章提到的ＵＩ后端层将每一个节点绘制出来。
- 一道简单面试题
```
//函数声明
function Foo() {
    //前面没有var let const 所以这个是全局的
    getName = function () { 
    	console.log('1');
    };
    return this;
}
//函数添加getName属性 ，类型是Function
Foo.getName = function () {
	console.log('2');
};
//函数原型添加方法
Foo.prototype.getName = function () { 
	console.log('3');
};
var getName = function () { 
	console.log('4');
};
function getName() { 
	console.log(5);
}

Foo.getName();     2
getName();	       4
Foo().getName();   //括号和点 优先级一样 从左向右执行  1
getName();         1
new Foo.getName();  // .操作符要比new优先级要高 new (Foo.getName)() 2
<!--带参数的new操作符是优先级最高的
按照(new Foo()).getName();来执行，情况就很简单了，
(new Foo())返回了新生成的对象，该对象没有getName()方法，
所以在prototype中找到了getName()方法
-->
<!--new Foo().getName();    3
首先带参数的new操作符优先级最高，第一步划分为：
new (new Foo().getName)();
第二步划分为：
new ((new Foo()).getName)();
所以执行(new Foo()).getName这个函数是对应的Foo.prototype.getName,
所以执行new (Foo.prototype.getName)()-->

new new Foo().getName();3		
请问上述代码在浏览器环境下，输出结果是多少？
　　 揭晓一下最终答案:

2 4 1 1 2 3 3
```

讲解:
```
　首先必须注意一个问题

function Foo() {
    getName = function () { 
    	console.log('1');
    };
    return this;
}
在函数内部声明的getName变量，前面是不带有var、let,const的，所以其实根据LHS(这个的介绍可以去的我博客看一下关于LHS和RHS的总结)，声明的getName是在全局范围内(也是就window)。
　　其次需要明确你是否知道下面代码在浏览器中的执行结果：

var getName = function () { 
	console.log('4');
};
function getName() { 
	console.log(5);
}
getName();
上述代码的执行结果是:4。原因是这样的，var声明的变量和函数声明function都会被提升，但是函数声明的提升的级别是比
var要高的，所以上面的代码的实际执行结果是：

function getName() { 
	console.log(5);
}
var getName = function () { 
	console.log('4');
};
getName();
后一个函数表达式getName覆盖了前面的函数声明getName,实际执行的是函数表达式（也就是是为什么JavaScript永远不会有函数重载这么一说了），所以输出的是4。
　　首先我给下面的代码添加一下必要的注释：

//函数声明
function Foo() {
    //全局变量
    getName = function () { 
    	console.log('1');
    };
    return this;
}
//为函数添加属性getName,其类型是Function，所以这里也可以看出来，Function也是一种Object
Foo.getName = function () {
	console.log('2');
};
//为Foo的原型添加方法getName
Foo.prototype.getName = function () { 
	console.log('3');
};
var getName = function () { 
	console.log('4');
};
function getName() { 
	console.log(5);
}
下面执行第一条语句：

Foo.getName();  
函数Foo本身并没有执行，执行的是函数的属性getName，当然输出的是：2.
　　接下来执行：

getName();	
这是在全局范围内执行了getName()，有两条对应的getName的声明，根据前面我们所提到的提升的级别来看实际执行是函数表达式：

var getName = function () { 
	console.log('4');
};
所以输出的是4。
　　接下来执行

Foo().getName(); 
首先看一下JavaScript的操作符优先级,从高到低排序
从上面可以看出来()与.优先级相同，所以Foo().getName()从左至右执行。首先运行Foo(),全局的getName被覆盖成输出console.log('1'),并且返回的this此时代表的是window。随后相当于执行的window.getName(),那么输出的实际就是1(被覆盖)。
　　下面到了

getName();  
这个不用说了，执行的还是：1(和上面一毛一样)。
　　下面到了三个最难的部分：

new Foo.getName();
对于这条语句的执行，有两种可能：

(new Foo).getName()
或

new (Foo.getName)()
但是我们根据操作符优先级表可以得知，其实上.操作符要比new优先级要高，所以实际执行的是第二种，所以是对

Foo.getName = function () {
	console.log('2');
};
函数执行了new操作，当然输出的是2。
下面到了执行

new Foo().getName();   
这个语句的可能性也有两种：

(new Foo()).getName();
或者

new (Foo().getName)();
那么应该是那种的呢？原来我以为会是第二种的执行方式，后面通过浏览器调试发现真实的执行的方式是第一种。我看到题目的作者是这么解释的：

 首先看运算符优先级括号高于new。实际执行为(new Foo()).getName()。遂先执行Foo函数。

我觉得上面的解释是有问题的，对比上面两种执行方式，第一种是先执行new，然后执行的是.操作符，然后执行的是()。第二种是先执行了(),再执行的是.，最后执行new操作符。如果真的按照引用所说的用优先级的方式判别，其实恰恰应该执行的是第二种而不是第一种。
　　后来总算找到原因了，原来之前那个出现的比较多的JavaScript优先级的表并不完整，万能的MDN给出了最权威的JavaScript优先级表运算符优先级
　　我列举出最重要的部分（由高到低）：
所以带参数的new操作符是优先级最高的，这下就没有问题了，执行顺序确实应该是第一种。
　　那么按照(new Foo()).getName();来执行，情况就就很简单了，(new Foo())返回了新生成的对象，该对象没有getName()方法，所以在prototype中找到了getName()方法。所以输出的是3。
　　胜利就在眼前，我们看一下最后一问。

new new Foo().getName();		
和上一步一样的方法，我们按照优先级表给分析一下这个语句到底是怎么执行的。
　　首先带参数的new操作符优先级最高，第一步划分为：

new (new Foo().getName)();
第二步划分为：

new ((new Foo()).getName)();
所以执行(new Foo()).getName这个函数是对应的Foo.prototype.getName,所以执行new (Foo.prototype.getName)()肯定输出的是3。
```
- 关于apply的错误分析 调用层数太多 Uncaught RangeError: Maximum call stack size exceeded
```
执行一下代码块,可能出现的问题：
var a=[]; var b=new Array(12562214);
a.push.apply(a,b)  --- 建议使用concat会好点
或者下面这个
(function a() {
    a();
})();
fix as below:
(function a(x) {
    // The following condition 
    // is the base case.
    if ( ! x) {
        return;
    }
    a(--x);
})(10)
```

- 题目1
```
数组

a = [
{id: 10001, name: "Lisa", age: 16},
{id: 10002, name: "Bob", age: 22},
{id: 10003, name: "Alice", age: 20},
];
数组

b = [
{id: 10001, gender: "Female"},
{id: 10002, name: "Bob King", birthday: "1996-01-22"},
{id: 10005, name: "Tom", birthday: "2000-01-01"},
];
写一个函数按id用b更新a,期望得到的结果为：

[
{id: 10001, name: "Lisa", age: 16, gender: "Female"},
{id: 10002, name: "Bob King", birthday: "1996-01-22", age: 22},
{id: 10003, name: "Alice", age: 20},
{id: 10005, name: "Tom", birthday: "2000-01-01"},
]
```
```
const map = a.reduce((acc, curr, index) => {
  acc[curr.id] = index;
  return acc;
}, {});
// 返回的acc 如下内容： 
<!-- 箭头函数
10001:0
10002:1
10003:2
-->
b.forEach(o => {
  const index = map[o.id];

  if (index !== undefined) {
    a[index] = Object.assign(a[index], o);
  }
  else {
    a.push(o);
  }
});
```

- 题目2 
```
接口数据：
{
 rows: [
  ["Lisa", 16, "Female", "2000-12-01"],
  ["Bob", 22, "Male", "1996-01-21"]
 ],
 metaData: [
  {name: "name", note: ''},
  {name: "age", note: ''},
  {name: "gender", note: ''},
  {name: "birthday", note: ''}
 ]
}

期待输出：
[
 {name: "Lisa", age: 16, gender: "Female", birthday: "2000-12-01"},
 {name: "Bob", age: 22, gender: "Male", birthday: "1996-01-21"},
]
```

```
解法：
//外循环走 各种数据
var result = data.rows.reduce(function(prev1, cur1) {
    //内循环走要出来的数据属性
    prev1.push(data.metaData.reduce(function(prev, cur, index) {
        prev[cur.name] = cur1[index];
        return prev;
    }, {}))
    return prev1;
}, []);

console.log(result);
console.log(result[0]);
console.log(result[1]);
```
- [严格和非严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)
- ana.js / select.js
- Object Array 方法
