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
- 继承
```
组合继承
var o1 = {num:123};
var o2 = {num2:345};
o2.extend = function(obj){
    for(var k in obj){
        this[k] = obj[k];
    }
}
o2.extend(o1);

原型继承
Fn.prototype.fn = function(){}
Fn.prototype = {
    constructor:Fn,
    fn:function(){}
}

组合式实现 原型继承 原型继承修改的是对象的原型对象 函数的原型属性
function Fn(){}
Fn.fn = Fn.prototype;
Fn.fn = function(obj){
    for(var k in obj){
        this[k] = obj[k]; //这里的this指的是Fn.prototype的
    }
}
Fn.fn.extend({});
```

- prototype + __proto__
```
// 相同点?
// 1, 这两个都是属性, 简单说就是存储引用的变量
// 2, 同一个构造函数, 与构造函数的实例对象. 这两个属性的引用对象是同一个对象

// 不同点?
// 1, 在不同的角度使用这两个属性
//		prototype 使用在构造函数后面
//		__proto__ 使用在对象后面
// 2, 描述也不相同
//		prototype 叫做	构造函数的原型属性
//		__proto__ 叫做	对象的原型对象
// 3, __proto__ 是非标准属性
//		所以我们在描述对象的时候是说 对象会连接到原型对象上

// 作用
// 在实现继承的时候, 一般都是使用 构造函数的 prototype 属性
// 在分析结构与验证对象等测试与调试中, 会用到 __proto__

obj.name--->当前对象找  当前对象没有去原型对象里面找
obj.__proto__.name 直接去原型对象里面去找

```

- 
```
Object 中的成员：
// Object 原型中的常用方法
propertyIsEnumerable
// -able	表示可能性的后缀
// enum		枚举, 一个一个的展示出来
// 属性是否可以枚举, 属性是否可以被 for-in 遍历到
// var o = {};
// in
// alert( 'hasOwnProperty' in o );  // o.hasOwnProperty
// for ( var k in o ) {
//	console.log( k );
// }
// 这个方法判断属性是否可以被枚举, 同时判断属性是否是自己提供的
// 因此该方法表示判断属性必须是 自己提供的, 同时可以被枚举的, 那么就返回 true, 否则返回 false
// 在 ES3 的基础上, 该方法没有任何意义, 是对 hsOwnProperty 的一个升级版
// 在 ES5 中引入了 对象特性( attribute )的概念, 才会使得该方法有点作用
// console.log( Object.prototype.toString.call( 1 ) );
// console.log( toLocaleString.call( 1 ) );
```
- 创建函数的方式
 + 声明式
 + 表达式
 + new function
```
// new Function 的语法规则
// 语法
// var 函数名 = new Function( arg1, arg2, arg3, ..., argN, body );
// 解释
// 	Function 构造函数所有的参数都是字符串类型的
//	除了最后一个参数, 所有的参数都作为生成函数的参数. 这里可以没有参数
//	最后一个参数也是字符串, 表示的是生成函数的函数体
举例：
<script id="engin">
			/*
			 
		 		var total = 0, 
					args = arguments, 
					len = args.length;
				for ( var i = 0; i < len; i++ ) {
					total += args[ i ];
				}
				return total;
		 	
		 	
		 	*/
		</script>
		<script>
		
			var getBody = function ( id ) {
				var script = document.getElementById( id );
				var body = script.innerHTML.replace('/*', '').replace('*/', '');
				script.parentNode.removeChild( script );
				return body;
			}
		
			
			onload = function () {
				
				
				var fnSum = new Function( getBody( 'engin' ) );
				
				var res = fnSum( 1, 2, 3 );
				
				alert( res );
				
			};			
		</script>    
 ```

 - 结论概念 
 ```
 函数的原型链：
// 总结一下基本结论
			// 1, 对象都有原型对象, 对象默认继承自原型对象
			// 2, 函数被定义后, 默认就有原型属性, 原型属性也是对象
			// 3, 函数的原型属性默认继承自 Object.prototype
			// 4, 原型对象中 constructor 指向对应的构造函数
			// 5, 所有的函数都是 Function 的实例
			// 6, 函数也是对象
			
			// 基本的概念
			// prototype 是函数的原型属性, 是该函数创建的对象的原型对象
			// __proto__ 是对象的原型对象, 是创建该对象的构造函数的 原型属性
			
			
			function Foo() {} 
			
			// Foo 有 prototype 属性
			// 讨论 __proto__
			// 函数 Foo 是 Function 的实例
			// 即 Function 是 Foo 的构造函数
			// 类比
			//	 Person		p
			// => p.__proto__ 就是 Person.prototype
			// => Person.prototype.__proto__ 就是 Object.prototype
			
			// 替换
			// => Foo.__proto__ 就是 Function.prototype
			// => Function.prototype.__proto__ 就是 Object.prototype
			
			
			// 原型对象就是构造函数的原型属性
			
			// 所以, Foo.__proto__ 就是 构造函数的原型属性, 即 Function.prototype
			
			// 默认函数的原型属性继承自 Object.prototype
			// Function 是函数, Function.prototype 是函数的原型属性
			// Function.prototype 继承自 Object.prototype
			
			
			// 这里与之前唯一不同的是将 函数当做对象来看
			
			
			
			// 根据结论: Function, 和 函数, 和 Function.prototype 之间的关系, 可以得到
			// Array 是 Function 的实例, 继承自 Fucntion.prototype
			// Date 是 Function 的实例, 继承自 Fucntion.prototype
			// Object 是 Function 的实例, 继承自 Fucntion.prototype
			// ...
			// Fucntion 是 Function 的实例, 继承自 Fucntion.prototype
			// 	结论 Function.__proto__ 就是 Function.prototype

 ```
 - 
 ```
 			// 疑点
			function Fn() {} 
			function Foo() {} 
			var o = new Fn(); 
			console.log(o instanceof Fn); 	//true 
			Fn.prototype = new Foo(); 
			Fn.prototype.constructor = Fn;
			console.log(o instanceof Fn); 	// false 
            // new Foo() 是否在o的原型链上
			console.log(o instanceof Foo);  // false 

            function Fn() {} 
			function Foo() {}
			var f = new Fn();
			// f -> Fn.prototype -> Object.prototype -> null
			// 覆盖
			var o;
			Fn.prototype = o = new Foo();
			var f = new Fn();
			// f -> o -> Foo.prototype -> Object.prototype -> null
 ```
 - 实例成员 和 静态成员
```
// 实例成员就是 由构造函数创建的对象的成员
// 静态成员就是 构造函数的成员

// 一般在使用的时候, 将通用的方法 由 静态成员提供, 实例成员如果要实现该功能, 调用静态成员来实现
 

 递归：
 // 获得 node 的子节点
		// 化归一下, 已经完成获得节点的子节点, 那么子节点的子节点也或得到, 如此下去就是所有的后代的节点
		var getChildren = function ( node, list ) {
			// 要将 node 中所有的子元素 放到 list 中( 只要元素 )
			for ( var i = 0; i < node.childNodes.length; i++ ) {   // 遍历node的子节点
				var subNode = node.childNodes[ i ];	// 就是子节点
				// 判断是否为 元素标签
				if ( subNode.nodeType === 1 ) {
					// 如果是元素节点就存到 list 中
					list.push( subNode );
					
					getChildren( subNode, list );
				}
			}
		}
		function find() {
			var arr = [];
			// 获得元素
			getChildren( document.body, arr );
			return arr;
		}
		
		var nodes = find();
		for (var i= 0; i < nodes.length; i++) {
			nodes[ i ].style.border = "3px solid red"; 
		}		
高级写法：
<script>
			
			var find = function ( node ) {
				
				var arr = [];
				for ( var i = 0; i < node.childNodes.length; i++ ) {
					if ( node.childNodes[ i ].nodeType === 1 ) {
						arr.push( node.childNodes[ i ] );
						
						// 获得子节点的子节点
						arr = arr.concat( find( node.childNodes[ i ] ) );
						
					}
				}
				
				return arr;
			}
			
			
			onload = function () {
				var nodes = find( document.body );
			
				for ( var i = 0; i < nodes.length; i++ ) {
					nodes[i].style.border = "2px solid black";
				}
				
			};
			
 			
		</script>
 ```

 - 词法作用域
```
// 词法作用域 解释
// 只和代码的书写，定义时的顺序有关，和运行时候的顺序无关
// 函数内部可访问外部的变量，反之则不允许
// 什么是变量名提升--》告诉解释器 已经定义变量了 这个变量可以用了
// 什么是函数名提升--》 告诉解释器 现在已经定义了一个函数了 现在马上就可以用了

变量作用域琏的绘制：
// 结论
    // 1, 声明会提升
    // 2, 只有函数才会限定作用域
// 规则
    // 1> 将全部的 script 标签看做一个整体. 是一个 0 级别的链
    // 		链中所有的全局范围内的变量, 函数, 对象... 都是链中的成员
    //		由于声明会提升, 因此在绘制链之前将代码可以进行调整, 在开始的时候
    //		将声明都写在前面, 绘图的时候按照顺序绘制, 较为简单.
    //
    // 2> 由于只有函数才可以限定作用域. 因此在函数上引出一条新链, 级别为 n + 1
    // 		在函数内部, 又是一个完整, 独立的作用域结构
    //		因此在函数内部定义的任何成员也按照 1> 中的规则在该链上展开
    //
    // 3> 如果有函数, 继续绘制下去 

// 变量搜索原则
// 在代码的运行过程中, 如果访问某一个变量
// 那么首先在当前链上找 ( 无序 ), 如果没有, 在 n-1 级上找
// ( 在函数内部允许访问定义在函数外部的变量 )
// 如此往复, 直到 0 级链, 如果还没有 抛出异常
// 如果找到, 则结束寻找, 直接获得该链上变量的数据
//这两句话
//    var getName = function(){ alert(4); }; 提升了名字
//    function getName(){ alert(5); }		 提升了函数

// 1, 函数覆盖名字
//var  getName;
//function getName() {}

// 2, 
//function getName() {}
//var getName; 这个声明无效了  假如有数值 那就是有效的 var getName = 7;

var f = function f() {}; 表达式
function f() {}  声明 这两个不是一回事
var a;   意思就是有一个a存在了 a是什么呢 现在不知道 下面凡是看到a的时候不报错
function a(){alert(2);}  这个两个a是一个东西  赋值不是一回事
	代表这是一个函数 下面在用a的时候调用这个函数 这两句代码是不执行的
	 这两个是不是一个东西 代表他们分配的内存是不是一样的
	 这两个东西在声明阶段不占内存 告诉我们的解释器 有这两个东西存在了--》编译原理
	 声明不占内存 执行的时候才会分配内存 

var a;
function a(){} 这个把第一个声明覆盖了	 
a = function(){} 同一个作用域 不允许有两个同名的但是不同的数据
var f = function f(){};  表达式
function f(){} 这两个不是一回事 声明

举例：
//		var a = 1;
//		   
//		function a(){
//			a = 1
//		}
//		a()
//		console.log(a)
分析：		
    var a;
    function a(){
        a = 1
    }
    
    a = 1;
    
    // a()  a is not a function
    console.log(a) -->1 
```

- 闭包
```
闭包:
// 在函数内部允许访问外部的变量, 但是反之不允许

// 什么是闭包
// 闭包从字面上看就是封闭和包裹, 在函数中定义的变量
// 在函数外部无法访问, 因此这个函数就构成闭包

// 要解决闭包的什么问题
// 就是要想办法访问到它的数据
// 闭包的应用有两个模型
	// 1, 实现私有数据
	// 2, 实现缓存数据
			var fib = (function () {
				var arr = [];
				return function ( n ) {
					// count++;
					// 面试求兔子数列, 要求使用 callee
					if ( n < 0 ) throw new Error( '数字不允许是负数' );
					
					var res = arr[ n ];   // 先到数组中取
					if ( res !== undefined ) {
						// 数组中有数据
						return res;
					} else {
						// 如果是 1 或 0 则将 1 返回给 res
						// 否则递归结果交给 res;
						
						if ( n === 0 || n === 1 ) {
							res =  1;
						} else {
							res = arguments.callee( n - 1 ) + 
									arguments.callee( n - 2 );
						}
						
						arr[ n ] = res;  // 将计算的结果放到数组中, 那么下一次再计算的
										 // 时候可以直接拿来用, 就不用计算量
						return res;
					}
				};
			})();
			
			fib( 5 );	
函数名存储数据：
		// createCache
			var fib = function ( n ) {
				var res = fib[ n ];   // 先到函数名中取
				if ( res !== undefined ) {
					// 函数中有数据
					return res;
				} else {
					// 如果是 1 或 0 则将 1 返回给 res
					// 否则递归结果交给 res;
					
					if ( n === 0 || n === 1 ) {
						res =  1;
					} else {
						res = arguments.callee( n - 1 ) + 
								arguments.callee( n - 2 );
					}
					
					fib[ n ] = res;  // 将计算的结果放到数组中, 那么下一次再计算的
									 // 时候可以直接拿来用, 就不用计算量
					fib.len++;
					
					return res;
				}
			};
			
			fib.len = 0;
			
			fib( 5 );
```
- 题目
```
// 1, 如何验证写在构造函数中的方法是都占内存的？  
			/*
			var fn = function () {
				this.sayHello = function () {};
			};
			var p1 = new fn();
			var p2 = new fn();
			console.log( p1.sayHello === p2.sayHello );
			*/

// 1, 创建对象的方法
			//	-> 1, 字面量 或  var o = {};
			//  -> 2, 构造函数 或 代码
			//  -> 3, Object.create()
			//  -> 4, copy
// 3, 给对象添加属性的办法
			// 1> 利用动态特性 o.xxx = xxx
			// 2> 构造函数中 this.xxx = xxx
			// 3> 原型中添加 xxx.prototype.xxx = xxx
			// 4> 字面量   
			// 5> extend  
			// 6> 关联数组 o[ 'xxx' ] = xxx

// 8, 如何兼容的获得对象的类型名
			/*
			var getType = function ( obj ) {
				if ( obj.constructor.name ) {
					return obj.constructor.name;
				} else {
					return /function (.+?)\(/.exec( obj.constructor + '' )[ 1 ];
				}
			}
			*/

// 10,如何判断属性或者方法是被继承的 而不是被自己实现的
			严谨的话 使用递归判断实现
			var Fn = function () { this.age = 1; };
			Fn.prototype.name = 'jim';
			// Fn.prototype.age = undefined;
			var f = new Fn();
			// hasOwnProperty
			// 如何判断属性是被继承的??? 
			f.hasOwnProperty('age') 只能说明这个属性或者方法是f提供的
			f.age 保证有这个属性
			console.log( f.age && !f.hasOwnProperty( 'age' ) );
			有age这个属性 并且不是自己提供的
			console.log( 'age' in f && !f.hasOwnProperty( 'age' ) );
			// age 可能存在原型链上, 也可能不存在
			
			// 如果属性值就是 null 或 undefined, 那么此时 f.age 就无法判断了

// 11,  如何将一个Json 字符串转为对象
		eval, new Function, JSON.parse, 基本的字符串操作

// 13 原型继承   --- 实现共用  但是会有很多层级 原型链太长 搜索时间也长
			  组合式继承 --- 
			// 1> 要求每一个对象都有 inherit, 给 Object.prototype 添加即可
			// 2> 继承自 p, 在方法中 p 用什么表示, 即 this
			// 3> 继承自参数 obj
			
			Object.prototype.inherit = function ( obj ) {
				var o = {};
				for ( var k in this ) {
					o[ k ] = this[ k ];
				}
				for ( var k in obj ) {
					o[ k ] = obj[ k ];
				}
				
				return o;
			};

// 14, 函数有方法, Function.prototype
			//	       返回的对象继承自 函数.prototype
			// 1> 题目中的做法
			/*
			Function.prototype.inherit = function () {
				return Object.create( this.prototype );
			};
			*/
			// 2> 原意
			/*
			Function.prototype.inherit = function ( obj ) {
				var o = Object.create( this.prototype );
				for ( var k in obj ) {
					o[ k ] = obj[ k ];
				}
				return o;
			};
			*/
			函数的原型属性利用 函数.prototype 来获得. 表示由该函数创建的对象继承自 该函数的 prototype
			
			函数的原型对象利用 函数.__proto__ 来获得, 或 Function.prototype 来获得. 表示 该函数 继承自
				Function.prototype 或 函数.__proto__			

// 1, 定义函数, 函数有一个属性叫 prototype
			// 2, 函数的属性 prototype 是一个对象类型
			//    类似 var o = { name: {} };
			
			// 3, 属性 prototype 是一个含有 constructor 与 __proto__ 属性的对象
			//		这个对象就是 Person.prototype
			
			// 4, constructor 属性就是当前函数
			Person === Person.prototype.constructor (把Person.prototype看成一个整体)
			//	推论: 函数的 prototype 属性的 constructor 就是当前函数
			
			// 5, 所有的函数的 prototype 属性所表示的对象都继承自 Object.prototype
			//	即: 函数.prototype.__proto__ 就是 Object.prototype
			有一个例外---Object.						prototype.__proto__ === Object.prototype ---> false
					     Array.prototype.__proto__ === Object.prototype  ---> true				
```

- 原型相关
```
原型链的习题：
			// 1,
			// 原型继承: 每一个对象都可以找到一条由对象构成的, 一直到 Object.prototype 的链式结构
			// 			每一个在链上的对象所提供的方法或属性, 当前对象都可以访问. 这个就是原型继承.
			//			
			//			所以原型继承就是修改原型链上的对象, 以使得当前对象具有某个属性或方法
			
			// 2, 
			// 优点: 共享方法与节约内存
			// 缺点: 增加链式搜索的负担

深拷贝
var copy = function(o1,o2){
	for(var k in o2){
		if(typeof(o2[k]) === 'object'){
			o1[k] = {};
			copy(o1[k],o2[k]);
		} else {
			o1[k] = o2[k];
		}
	}
}			

var deepClone = function(obj){
	var o = {};
	copy(o,obj);
	return o;
}
```
- 函数调用模式
```
function foo() {
	console.log( this );
}

foo();							// 函数模式   --window
var o = {fn:foo, name:'xp'};	
o.fn();							// 方法模式   -- Object {name:'xp'} 当前调用方法的对象	
new foo();						// 构造器模式 -- foo 指的就是foo的对象 构造器模式 this 就是 new 出来的新的对象

//[].push.apply(divs,ps);  这个意思是把ps里面的每一个元素 当做一个个元素
						放到divs里面 ，把divs当做数组来调用 push方法
						这个push是借过来用的 数据全放在divs里面了 因为数据是可读的
						所以不可以使用push 可以使用concat
concat 代表把数组连起来 不能是伪数组 所以变成真数组 contact 返回的是新数组
push 返回的数组长度


简单分析：
	/*
			var a = 2;
			var o = {a: 3, foo: foo};
			var p = {a: 4};
			
			o.foo();  // 3
			
			(p.foo = o.foo)();   // 2  赋值运算符 a=b=c=1 
			记住 --》 取得是右边的值  赋值操作的时候 和对象无关 
			// 编译原理 相当于吧o.foo里面存的那个函数赋给了p.foo
			所以可以理解为foo = o.foo 取出来的是函数
			// 词法分析以后, 留下来的不是 o.foo 而是 o.foo 里面存储的值
			里面存的就是一个函数
			function foo() {
			    console.log(this.a);
			}
						
			(p.foo)();			// 4
			p.foo();			// 4
		*/
		
			var o = { num: 123, fn: function() { alert( this.num ); } };
			var num = 456;
			var foo = o.fn;  o.fn赋值给变量foo， 如果这个变量接收的是函数的话 此时
								是把里面存的值取出来赋值
								o不参与赋值 通过o找到里面的fn 赋给foo
								fn指向了一个函数  将函数赋给了foo
								foo 就是函数本身 foo调用的时候本身没有任何对象
								函数调用模式 this就代表全局window  
			
			foo();  //456 
		</script>

object.getName();
(object.getName)();
(object.getName = object.getName)(); //The window 非严格模式下
这个赋值表达式的值是函数本身 所以this的值不能得到维持 结果就返回了the window

// 要求写一个方法, 让多个对象来调用
			
			// 1, 简单的实现
			/*
			function Foo1 () {
				console.log( 'Foo1 被调用了' );
			}
			// 函数模式
			Foo1();
			// 方法
			var o1 = { name: 'jim' };
			var o2 = { age: 19 };
			Foo1.apply( o1 );
			Foo1.apply( o2 );
			*/
			
			// 2, 传参
			/*
			function Foo2 ( a, b, c ) {
				console.log( 'Foo2 被调用了, 参数是 ' + a + ", " + b + ", " + c );
			}
			// 函数式
			Foo2(1, 2, 3);
			// 方法模式
			var o1 = { name: 'jim' };
			var o2 = { age: 19 };
			Foo2.apply( o1, [ 1, 2, 3 ] );
			Foo2.apply( o2, [ 1, 2, 3 ] );
			*/
			
			
			// 3, 加入 this
			/*
			function Foo3() {
				console.log( this );
			}
			// 函数模式
			Foo3();	// window
			// 方法模式
			var o1 = { name: 'jim' };
			var o2 = { age: 19 };
			Foo3.apply( o1 ); 
			Foo3.apply( o2 );
			*/
			
			
			// 4, 加入 this, 和 参数
			/*
			function Foo4( a, b, c ) {
				console.log( this );
				console.log( [].join.apply( arguments, [', ']) );
				//arguments伪数组 apply调用apply 需要使用数组作为参数
				//元素连接 形成字符串 arguments 连接起来  用逗号分隔
 			}
			// 函数
			Foo4( 1, 2, 3 ) ;  object window  -- 1,2,3
			// 方法 
			var o1 = { name: 'jim' };
			var o2 = { age: 19 };
			
			Foo4.apply( o1, [ 1, 2, 3, 4 ]);  object{name:'jim'}  1,2,3,4
			
			Foo4.apply( o2, [ 1, 2, 3, 4 ]);
```
- 正则
```
//	     0123456789012345678901
var s = "abcdefgefgefghijefglmn";
var i = -1, arr = [];
do {
	i = s.indexOf( 'e', i + 1);
	if ( i != -1 ) {
		arr.push( i );
	}
} while ( i != -1 );

//	     0123456789012345678901
var s = "abcdefgefgefghijefglmn";
var r = new RegExp( "e", "g" ); 如果把一个字符串所以字符找出来
							第二个参数需要是'g'
							有了g代表从刚刚找过的下一个元素开始找
var arr = [];
var m;
// 在 exec 的方法中有一个规定, 如果同一个正则表达式对象 如果开启了全局模式
// 每调用一次 exec 方法就会查找下一个字符串, 直到最后找不到 返回 null
while ( ( m = r.exec( s ) ) != null ) {
	arr.push( m.index );
}

```
- 正则
```
			
			// 正则表达式在匹配的过程中就可以给你解析完成 元字符
			// .	任意除了换行以外的任意字符
			// ()	分组 一次匹配当中 一部分内容
			// +	代表紧挨的字符或字符组出现 1 次到多次 ( 默认匹配最多 )
			// ?	1> 0次或1次, 2> 放在次数限定元字符后表示尽可能少匹配
			// .+@.+  	 最左边的.+ 代表匹配最多 jim@ana.cn, tom@126.com, jack
			//			 最右边的.+代表匹配最少  163.com
			// + 默认匹配最多 123@12@34@ 如果是.+@ 这个默认匹配的是最后一个@
			var str = "jim@ana.cn, tom@126.com, jack@163.com";
			
			//var r = /.+@.+/; 之后m[0]会打出全部的字符  不知道 @前后是哪个
			m: Array[1]
				0:"jim@ana.cn, tom@126.com, jack@163.com"
				index:0
				input:"jim@ana.cn, tom@126.com, jack@163.com"
				length:1

			//var r = /(.+)@(.+)/; 分组
			0:"jim@ana.cn, tom@126.com, jack@163.com"
			1:"jim@ana.cn, tom@126.com, jack"  把@前面的全部找出来了
			2:"163.com"							  只把最少的@后面的找出来了				
			index:0
			input:"jim@ana.cn, tom@126.com, jack@163.com"
			length:3

						// 元字符 []
			// 含义:
			// 1, 匹配一个出现在 [] 中的字符   
			//		[abc] 匹配a 或者 b 或者 c
			/*      代表的是只匹配一个字符
			var r = /[abc]/g;
			var m = r.exec( "abcdefg" ); a
				m = r.exec( "abcdefg" ); b
				m = r.exec( "abcdefg" ); c
			*/
			
			/*
			var r = /[bac]+/;
			var m = r.exec( "abcdefg" );  --->abc   连着出现abc任意一个就可以

			var r = /([bac])+/;
			var m = r.exec( "abcdefg" );  --- c 括号里面匹配的是最后一组
										先匹配a - b - c 最后c 得到的是最后一个

			var r = /(?:[bac])+/;
			var m = r.exec( "abcdefg" );  --- abc 不捕获abc了

			简写形式的元字符：
			// 
			// \w	文字		\W	代表的是非文字		word 文字		默认表示英文和下划线
			// \d	数字		\D	代表的是非数字		digit 数字
			// \s	空白		\S	代表的是非空白		spcae 空白
			
			. 代表除了换行符以外的任何字符
			// 有些开发者使用 [\s\S] 表示增强的 .  ---> [\s\S] 代表任意的一个字符


			// 1> 基本元字符
// .	[]	()	|    
. 代表任意的非 换行字符
[] 
() 代表分组 和 提高优先级 ， 如果仅仅是为了提高优先级 不捕获的话 ， 需要使用(?:) 取消捕获
|  代表二者中的一个 

// 2> 限定元字符
// +		前面紧跟的字符或组至少 1 个			{1,}
// *		前面紧跟的字符或组至少 0 个			{0,}
// ?		前面紧跟的字符或组出现0次或1次; 如果跟在其他限定符后面表示取消贪婪模式
// 			{0,1}
// {n}		前面紧跟的字符或组 n 个
// {n,}		前面紧跟的字符或组至少 n 个
// {n,m}	前面紧跟的字符或组 n 到 m 个

// 3> 首尾元字符
//	^			hat   字符串里表示以什么什么开头 方括号里面表示以什么开头 
//	$			字符串以什么结尾 引导符 

// 4> 简写元字符
// \w	\W
// \s	\S
// \d	\D

正则替换 组引用
		<script type="text/javascript">
		
			var s = '今天是 1991-1-2, 天气很好. 明天是 2001-3-4, 天气怎样';
			
			// 1/2/1991
			// 1991年1月2日	
			// 2/1/1991
							1      2      3         1 2 3 代表捕获到的组 去对应的位置去找		
													$ 加上数字 组合表示 取前面组合里面的对应部分
			s = s.replace( /(\d+)\-(\d+)\-(\d+)/g, "$1年$2月$3日" );
			
			// s = s.replace( /(\d+)\-(\d+)\-(\d+)/g, "$2/$3/$1" );
			
			alert( s );
			
			// 
			// var s = '今天是 1991-1-2 1:1:1, 天气很好. 明天是 2001-3-4, 天气怎样';
		</script>


正则表达式疑问：
			// var str = "12345";
			// \d  
			/* 代表通过正则表达式 返回匹配成功的结果
			// \d 这个正则表达式代表 一个数字 匹配的话首先
				匹配到的是数字1	 返回的是把这个1 包装以后的对象
				所以这个数组里的第0项就是1
			m: Array[1]
			0:"1"
			index:0
			input:"12345"
			length:1				
			var m = /\d/.exec( str );

			m = /\d/.exec( str ); 再次执行===-> 匹配结果还是1

			var m = /\d/g.exec(str);	
			m = /\d/g.exec(str);  exec每次在处理的时候 每次只处理一个
			加上全局的/g 匹配结果还是1  因为他们用的是两个不同的正则表达式对象 所以总是从第一个
			开始查找 这里使用的是正则表达的字面量方式
			类似于 console.log( {} == {} ) 返回的就是false


如果 要把里面的数字都匹配出来---
			// var r = /\d/g; 使用同一个正则表达式 多次调用就可以
			
			
			// 如果使用 exec 将一个字符串中所有符合要求的内容找出来
			// 应该如何处理???
			
			// 1> 正则对象需要是一个
			// 2> 全局匹配
			// 3> 多次 exec 即可 直到返回为空为止
			
			
			
			// replace
			var s = '123';
			
			var str = s.replace( /\d/g, 'a' );  全局匹配 找见就替换
												 有/g 替换所有匹配结果
			
			console.log( str ); aaa
			var str = s.replace( /\d+/, 'a' ); 返回的是a 代表匹配连续的很多的数字		
```

- 框架
```
关键之处：
实现ByclassName的方法：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			div {
				width: 400px;
				height: 50px;
				margin: 10px 0;
			}
			.c {
				border: 1px solid red;
			}
			.c1 { border: 1px solid green; }
			.c2 { border: 1px solid blue; }
		</style>
		<script type="text/javascript">
			
			//为了解决浏览器兼容问题
			//我们有一个处理原则就是
			//类似Object.create() 
			//为了实现浏览器的兼容 我们有两种处理方法
			//1. 在原生对象里面给他加这个成员 
			//2. 提供方法  在方法里添加判断的操作 --可以避免污染原生对象
			var getClass = function ( className, results ) {
				results = results || [];
				
				var tempArr, i;
				
				// 首先判断系统所提供的方法是否可以实现该功能 这里可以用我们前面写的那个support方法
				if ( document.getElementsByClassName ) {
					// 系统可以实现
					results.push.apply( results, document.getElementsByClassName( className ) );
				} else {
					// 自定义实现
					// 思路: 首先获得所有元素, 然后在元素中搜索符合要求的, 再加入到数组中
					tempArr = document.getElementsByTagName( '*' );
					// for 循环, 判断是否符合要求
					for ( i = 0; i < tempArr.length; i++ ) {
						//一种是处理多种样式的情况 class="c1 c3 c2" 	
						// tempArr[ i ].className === className	// 多个样式

						// tempArr[ i ].className.indexOf( className ) != -1  // 例如查找 ' c ' 类样式
																			// 这个是肯定是可以找见c的
																			//但是是不正确的 所以可以在c
																			//两端加空格但是如果 
																			//class="c c1 c2" 这样的话第一个查找还是失败的
																			//所以在找的字符串和被找的字符串两端都加空格
						//所以下面这是一个很牛逼的写法
						// 需要考虑一下兼容: className 或 getAttribute
//						if ( ( ' ' + tempArr[ i ].className + ' ' )
//									.indexOf( ' ' + className + ' ' ) != -1 ) {
//							results.push( tempArr[ i ] );
//						}



						// 使用传统的处理方法
						// tempArr[ i ] 就是 一个元素, 判断该元素的 className 中是否包含 传入的参数
						// className
						
						// 比如元素 <div class="c1 c2 c3"></div>
						// "c"
						// 注意 className 属性需要验证非空
						var list = tempArr[ i ].className.split( ' ' );
						for ( var j = 0; j < list.length; j++ ) {
							if ( list[ j ] === className ) {
								results.push( tempArr[ i ] );
								break;
							}
						}

					}
				}
				return results;
			};
			
			
		</script>
	</head>
	<body>
		<div class="c1"></div>
		<div class="c2"></div>
		<div class="c"></div>
		<div class="c1"></div>
	</body>
	<script>
		var list = getClass( 'c2' );
		// list[ 0 ].style.backgroundColor = 'yellow';
		for ( var k in list ) {
			list[ k ].style.backgroundColor = 'pink';
		}
	</script>
</html>
 

以下代码会报错 因为IE8不支持伪数组
results.push.apply( results, document.getElementsByTagName( tag ) );

以下是我们JQ里面的源代码：
// Optimize for push.apply( _, NodeList )
try {
	push.apply(
	//这也就是在做能力检测
	//childNodes 是一个dom对象 这里一个伪数组， call操作 这里伪数组转为了真数组
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {

	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {} 这是一个空循环 里面是一个赋值操作
			target.length = j - 1;
		}
	};
}



解决IE的push 兼容性：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
			div, p {
				width: 100px; height:30px; border:1px solid red; margin: 10px 0;
			}
		</style>
		<script>
			var myPush = function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			};
			
		</script>
	</head>
	<body>
		<div></div>
		<div></div>
		<p></p>
		<p></p>
	</body>
	<script>
		
		
		

		// 如果利用 get 方法获得多个元素的话, 就会得到多个数组
		// 为了简化开发, 可以考虑将其合并到一个数组中
		// 调用多次 get 方法, 如果想要多个数组就可以使用多个数组
		// 想要一个数组, 就得到一个数组
		//缺点--- 这里try catch的性能会有损失 出一次错误报一次错误
		//JQ是把这个try放到外面 以后再调用getTag的时候 直接调用push方法即可
		以下是优化Push方法的思路:
		// 伪代码  把try放在外面， 以后使用getTag方法的时候 直接使用push方法就可以了
		这里的push就是一个方法
		var push = [].push;  要么用的是原来的可用的方法 要么用的是自己提供的方法这里的错误只会出现一次
		后面用的时候直接用我们自己定义的push方法就可以了，不需要做其余的判断了
		try {
			push 可用
		} catch ( e ) {
			push = {...};
		}

		var getTag = function ( tag, results ) {
			results = results || [];
			push.apply( results, document.getElementsByTagName( tag ) );
			return results;
		};
		这样不会每次都会出现错误了， 而是在框架加载的时候出现一次错误



		//这里的try写在里面 IE只要调用一次这个方法就会出一次错误 出一次错误捕获一次
		//这样写的话 try catch的性能会有所损耗 
		var getTag = function ( tag, results ) {
			results = results || [];
			try {
				results.push.apply( results, document.getElementsByTagName( tag ) );
			} catch ( e ) {
				myPush( results, document.getElementsByTagName( tag ) );
			}
			
			return results;
		};
		
		var each = function ( arr, fn ) {
			for ( var i = 0; i < arr.length; i++ ) {
				if ( fn.call( arr[ i ], i, arr[ i ] ) === false ) {
					break;
				}
			}
		};
		
		/*
		var list1 = getTag( 'div' );
		var list2 = getTag( 'p' );
		
		each( list1, function () {
			this.style.backgroundColor = 'orange';
		});
		each( list2, function () {
			this.style.backgroundColor = 'orange';
		});		
		*/
		
		
		each( getTag( 'p', getTag( 'div' ) ), function () {
			this.style.backgroundColor = 'red';
		});
	</script>
</html>
```
- 关于IE的push方法
```

		// 如果利用 get 方法获得多个元素的话, 就会得到多个数组
		// 为了简化开发, 可以考虑将其合并到一个数组中
		// 调用多次 get 方法, 如果想要多个数组就可以使用多个数组
		// 想要一个数组, 就得到一个数组
		//缺点--- 这里try catch的性能会有损失 出一次错误报一次错误
		//JQ是把这个try放到外面 以后再调用getTag的时候 直接调用push方法即可
		以下是优化Push方法的思路:
		// 伪代码  把try放在外面， 以后使用getTag方法的时候 直接使用push方法就可以了
		这里的push就是一个方法
		var push = [].push;  要么用的是原来的可用的方法 要么用的是自己提供的方法这里的错误只会出现一次
		后面用的时候直接用我们自己定义的push方法就可以了，不需要做其余的判断了
		try {
			push 可用
		} catch ( e ) {
			push = {...};
		}

		var getTag = function ( tag, results ) {
			results = results || [];
			push.apply( results, document.getElementsByTagName( tag ) );
			return results;
		};
		这样不会每次都会出现错误了， 而是在框架加载的时候出现一次错误



		//这里的try写在里面 IE只要调用一次这个方法就会出一次错误 出一次错误捕获一次
		//这样写的话 try catch的性能会有所损耗 
		var getTag = function ( tag, results ) {
			results = results || [];
			try {
				results.push.apply( results, document.getElementsByTagName( tag ) );
			} catch ( e ) {
				myPush( results, document.getElementsByTagName( tag ) );
			}
			
			return results;
		};
		
		var each = function ( arr, fn ) {
			for ( var i = 0; i < arr.length; i++ ) {
				if ( fn.call( arr[ i ], i, arr[ i ] ) === false ) {
					break;
				}
			}
		};


		support 
		能力检测如下：
var support = {};
			
			// support.getElementsByClassName = !!document.getElementsByClassName;
			// 在 jq 中不仅判断他是否存在, 还要判断其能力是否符合要求
			
			support.getElementsByClassName = (function () {
				
				var isExist = !!document.getElementsByClassName;
				
				if ( isExist && typeof document.getElementsByClassName == 'function' ) {
					// 自己创建一些元素, 并且加上 class 属性, 看是否可以获得到加上的所有元素
					var div = document.createElement( 'div' ),
						divWithClass = document.createElement( 'div' );
					
					divWithClass.className = 'c';
					div.appendChild( divWithClass );
					return div.getElementsByClassName( 'c' )[ 0 ] === divWithClass;
				
				}
				
				return false;
			})();
			
			
			if ( support.getElementsByClassName ) {
				// return node.getElementsByClassName( className );
				alert( '支持 class' );
			} else {
				// 自己实现( className );
				alert( '不支持 class' );
			}



push函数的疑问： IE不支持push的功能 所以在这里我们自己实现一下
<script>
			
			// push
			// push.apply 的形式进行调用
			// 功能 push.apply( 伪数组1, 伪数组2 );
			var push = {
				//			   [ 1, 2 ]  [ 3, 4, 5]
				apply: function ( arr1, arr2 ) {
					// 将 arr2 里面的每一个元素都一个个加到 arr1 中
					
					// 如果 arr1 是真数组
					/*
					for ( var i = 0; i < arr2.length; i++ ) {
						arr1.push( arr2[ i ] );
						arr1[ arr1.length++ ] = arr2[ i ];
					}
					*/
					//伪数组的length是不变的
					var l = arr1.length;
					for ( var i = 0; i < arr2.length; i++ ) {
						arr1[ l + i ] = arr2[ i ];
					}
					// 如果 arr1 是真数组, 没有问题, 如果是伪数组, 那么 length
					// 不会自动增加, 所以, 需要手动的赋值
					arr1.length = l + i;
					
					
					// jq 中使用的是 while
					var l = arr1.length;
					var i = 0;
					while( arr1[ l++ ] = arr2[ i++ ] ) ;   //当访问不到的时候 就会跳出
					arr1.length = l - 1;
				}
			};
			
			
		</script>

push的完善：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
			div, p {
				width: 400px; height: 50px; margin: 10px 0; padding: 0; border: 1px dashed red;
			} 
		</style>
		<script type="text/javascript">
			
			var push = [].push;
			
			try {
		 		var c = document.createElement( 'div' );
		 		c.appendChild( document.createElement( 'div' ) );
		 		var list = c.getElementsByTagName( '*' );
		 		push.apply([], list);
				
			} catch(e) {
				push = {
					apply: function(target, eles) {
						var j = target.length,
							i = 0;
						while ( target[j++] = eles[i++] );
						target.length = j-1;
					}
				};
			} finally {
				c = list = null;
			}
			
		</script>
	</head>
	<body>
		<div>div</div>
		<div>div</div>
		<div>div</div>
		<p>p</p>
		<p>p</p>
	</body>
	<script>
		var tag = function ( tag, results ) {
			results = results || [];
			push.apply( results, document.getElementsByTagName( tag ) );
			return results;
		}
		
		var list = tag( 'div' );
		list = tag( 'p', list );
		
		for ( var i= 0; i < list.length; i++) {
			list[ i ].style.backgroundColor = 'yellow';
		}
	</script>
</html>

DOM 设置属性
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
			.c {
				border: 1px solid red;
				width: 400px;
				height: 150px;
			}
		</style>
		<script type="text/javascript">
			
			// 2, 在页面中创建 3 个 div, 要求 设置其边框与颜色以及大小
			// 1> 直接设置 style 属性
			// 2> 使用 类样式
			// -> setAttribute
			// -> .语法
			
//			onload = function () {
//				var i, node;
//				for ( i = 0; i < 3; i++ ) {
//					node = document.createElement( 'div' );
//					// node.setAttribute( 'class', 'c' );
//					node.className = 'c';
//					document.body.appendChild( node );
//				}
//			};
			
			
			// 1, 方法比较多, 练习的过程的中每一个做法都要熟练
			// 2, 由于每次循环都使用 document.body.appenChild 因此
			//		会导致每次 for 都要刷新页面结构. 应该采用一个临时的数据
			//		存储这些 dom 对象, 在 全部创建完成以后, 再一并加入
					
					
			// 只有创建一个 节点标签, 才可以不影响 整个页面布局, 同时允许存储其他标签
//			onload = function () {
//				var i, node, container = document.createElement( 'div' );
//				for ( i = 0; i < 3; i++ ) {
//					node = document.createElement( 'div' );
//					// node.setAttribute( 'class', 'c' );
//					node.className = 'c';
//					container.appendChild( node );
//				}
//				document.body.appendChild( container );
//			};

			// 用于缓存文档片段的 DOM 对象 DocumentFragment
			onload = function () {
				var i, node, 
					container = document.createDocumentFragment();
					
				for ( i = 0; i < 3; i++ ) {
					node = document.createElement( 'div' );
					// node.setAttribute( 'class', 'c' );
					node.className = 'c';
					container.appendChild( node );
				}
				document.body.appendChild( container );
			};
		</script>
	</head>
	<body>
	</body>
</html>

或者使用下面的innerHTML：
	<script type="text/javascript">
		onload = function () {
			var i,s = '';
			for (var i = 0; i < 10; i++) {
				s += '<div>' + i + '</div>';
			}
			document.body.innerHTML = s;
		}
	</script>


	
DOM疑问：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script>
			
			// jq 
			// $( '<div></div>' ).appendTo( 'body' );
			
			// createElement 可以创建 HTML 的 DOM 对象
			
			// <DOM 对象>.appendTo( ... )
			
			// 原则: 不要直接的修改原生的内置对象的成员
			
			// 也就是说 DOM 对象不应该提供 appendTo 方法
			
			// 谁添加该方法?
			// -> DOM对象		错误
			// -> 原型对象		jq 对象的原型对象; 包装对象( 自定义对象 )的原型对象
			// -> jq 对象
			
			// $( '...' ).appendTo( $( 'body' ) )
			// 框架的结构
//			var ana = function ( selector ) {
//				return new F( selector );
//			};
//			var F = function ( selector ) {
//				
//			};
//			F.prototype = {
//				appendTo: function( selector ) {}
//			};
			
			// 缺点???
			// 首先在沙箱中 F 对外不可见, 无法实现扩展
			// 同时在描述中容易造成多个变量暴漏与全局中
			
			// 解决方案, 直接将 F 绑定到 ana 的上面 有两种方法
			// -> 1. ana.init = F  这个是放在了构造函数上 静态方法 作为工具来使用
			// -> 2. ana.prototype.init = F 放在了原型对象上
			// 法1 --如果想要扩展
			// -> ana.init.prototype.xx = xxx;
			
			// 由于在方法中提供的方法一般是静态方法, 作为工具使用
			// 但是 jq 中并不是如此操作
			// 同时根据代码的组织规范, 初始化方法放在原型中更加合理( 与实例相关 )
			
			//类似如下：
			var ana = function ( selector ) {
				return new ana.prototype.init( selector );
			};
			ana.prototype = {
				appendTo: function( selector ) {}
			};
			ana.prototype.init = function(selector) {}
			ana.prototype.init.prototype = ana.prototype;


			//继续优化
			var ana = function ( selector ) {
				return new ana.prototype.init( selector );
			};
			ana.prototype = {
				appendTo: function( selector ) {},
				init: function ( selector ) {}
			};
			
			ana.prototype.init.prototype = ana.prototype;
			
		</script>
	</head>
	<body>
	</body>
</html>


双等号：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript">
			
			var ana = function ( selector ) {
				return new ana.prototype.init( selector );
			};
			ana.prototype = {
				appendTo: function( selector ) {},
				init: function ( selector ) {}
			};
			
			ana.prototype.init.prototype = ana.prototype;
			
			//构造函数和原型都有这个方法
			ana.extend = ana.prototype.extend = function ( obj ) {}; 
			
			// 前面给大家描述过, 代码在逻辑上组织时候是需要按照特定功能分组的
			 
			// 工具型方法 并非是每个实例必须的方法  在原有方法的基础上功能增强
			// 例如要实现 nextSibling
			// jq 中就是 next()
			//	.next()					获得下一个元素
			//  .next( selector )		获得下一个元素,如果该元素是符合说选择器的取出来, 否则没有获得到元素
			
			// 如果要实现该方法
			// 实际上就是内部循环调用 获得下一个元素的方法
			// 就是一个 dom 数组, 获得每一个元素的下一个元素, 组成一个新数组
			// [ div1, div2 ]
			// [ div1.nextSibling, div2.nextSibling ]
			
			// 由于浏览器的不同, 该方法可能会获得空的文本节点, 这个不应该在元素上考虑
			// 需要一个通用的工具方法, 来获得某一个元素的下一个元素
			//缺点： 外界无法使用 因为已经在沙箱里了
			// 外界要使用它== 框架的扩展用 
//			var next = function ( dom ) {
//				var newDom = dom;
//				while( newDom = newDom.nextSibling ) {
//					if ( newDom.nodeType == 1 ) {
//						return newDom;
//					}
//				}
//			};
//			[ next( divs ), next( div2 ) ];
//			

			// 实际上该方法如果放到沙箱中, 外部是无法访问, 也就是说必须只能在沙箱内部使用
			// 而该方法如果在框架扩展的时候是需要使用该功能的, 那么就出现无法共享的问题
			// 因此为了共享应该将其作为静态方法存在
			// 那么在代码中如何添加该方法呢?
			
			// -> ana.next = function () ...
			// -> ana.extend({ next: function() {} });
			
			// 实例方法
			// -> ana.prototype.next = function () {}
			// -> ana.prototype.extend({ next: function() {} });
			
			
			
			// 将来在添加方法的时候
			
			// 1>
			ana.prototype.css = function () {};
			ana.prototype.hasClass = function () {};
			ana.prototype.addClass = function () {};
			ana.prototype.removeClass = function () {};
			ana.prototype.toggleClass = function () {};
			
			
			// 2>
			ana.prototype.extend({
				css: function () {
				},
				hasClass: function () {
				},
				addClass: function () {
				},
				removeClass: function () {
				},
				toggleClass: function () {
				}
			});
			
			
			// 工具型方法
			
			
			
		</script>
	</head>
	<body>
	</body>
</html>

双等号：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script>
			
			// ana
			// ana.prototype
			
			// 是要给这两个对象添加 extend 方法
			// 怎么添加
			
//			ana.extend = function ( obj ) {
//				for ( var k in obj ) {
//					this[ k ] = obj[ k ];  
//				}
//			};
//			
//			ana.prototype.extend = function ( obj ) {
//				for ( var k in obj ) {
//					this[ k ] = obj[ k ];  
//				}
//			};
			
			
			// console.log( {} == {} );   false
			// alert( function () {} == function () {} );  false
			
			
			// 优化一下: 减少一个函数, 共享
//			var fn = function ( obj ) {
//				for ( var k in obj ) {
//					this[ k ] = obj[ k ];  
//				}
//			};
//			ana.extend = fn;
//			ana.prototype.extend = fn;
			
			// 浪费一个变量名
			
			/*  从右往左 先把123 赋给b  再把整个表达式值b=123 当成整体赋给a
			var a, b;
			a = b = 123;
			*/
			
			// 现将 123 赋值给 b, 然后整个赋值表达式的值就是 123, 接着讲 123 赋值给 a
			ana.extend = ana.prototype.extend = function ( obj ) {
				for ( var k in obj ) {
					this[ k ] = obj[ k ];  
				}
			};
		</script>
	</head>
	<body>
	</body>
</html>



循环克隆：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script>
			// 将问题简化
			I( '<div></div><div></div>' ).appendTo( 'div' );
			
			// 将一个 div 数组( 2 个元素 ) 添加到 页面中的 div 中( 2 个 )
			// [ d1, d2 ]						[ div1, div2 ]
			// 将 d1 加到 div1 和 div2 中
			// 将 d2 加到 div1 和 div2 中
			
			// 单个元素要克隆几个由需要添加的元素个数决定, 刚刚是需要添加的个数 - 1
			
			// 再简化
			// 将 dv 加到 [ div1, div2, div3 ] 中
			/*
			div1.appendChild( dv.cloneNode( true ) );
			div2.appendChild( dv.cloneNode( true ) );
			div3.appendChild( dv );
			*/
			
			// 最后一个不克隆, 前面的所有都要克隆
			/*
			for ( var i = 0; i < list.length; i++ ) {
				list[ i ].appendChild( i === list.length - 1 ?
										dv : 
										dv.cloneNode( true ) );
			}
			*/
			
			
			
			// 接下来讨论两个循环
			// ds = [ d1, d2 ]						list = [ div1, div2, dv3 ]
			div1.appendChild( d1.cloneNode( true ) );
			div1.appendChild( d2.cloneNode( true ) );
			
			div2.appendChild( d1.cloneNode( true )  );
			div2.appendChild( d2.cloneNode( true )  );
			
			div3.appendChild( d1 );
			div3.appendChild( d2 );
			
			// 添加一层循环
			for ( var i = 0; i < ds.length; i++ ) {
				div1.appendChild( ds[ i ].cloneNode( true ) );
			}
			for ( var i = 0; i < ds.length; i++ ) {
				div2.appendChild( ds[ i ].cloneNode( true ) );
			}
			for ( var i = 0; i < ds.length; i++ ) {
				div3.appendChild( ds[ i ] );
			}
			// 合并
			for ( var j = 0; j < list.length; j++ ) {
				for ( var i = 0; i < ds.length; i++ ) {
					list[ j ].appendChild( j === list.length - 1 ? 
												ds[ i ] : 
												ds[ i ].cloneNode( true ) );
				}
			}
			
		</script>
	</head>
	<body>
	</body>
</html>

- JavaScript 匿名函数
函数作为表达式出现、或者作为其他表达式的一部分时才是函数表达式，此时函数可以是匿名或者有名的。 
知乎的解释 https://www.zhihu.com/question/20249179
匿名函数 https://my.oschina.net/u/2331760/blog/468672?p=%7B%7BcurrentPage+1%7D%7D
http://blog.csdn.net/rishengcsdn/article/details/38680425
http://www.cnblogs.com/wl0000-03/p/6050108.html
```
Immediately-invoked Function Expression（IIFE，立即调用函数），简单的理解就是定义完成函数之后立即执行。

比较常见的三种写法：

// Crockford's preference - parens on the inside
(function() {
  console.log('Welcome to the Internet. Please follow me.');
}());

(function() {
  console.log('Welcome to the Internet. Please follow me.');
})();

!function() {
  console.log('Welcome to the Internet. Please follow me.');
}();

```
```
 闭包允许内层函数引用父函数中的变量，但是该变量是最终值

示例六：

/**
 * <body>
 * <ul>
 *     <li>one</li>
 *     <li>two</li>
 *     <li>three</li>
 *     <li>one</li>
 * </ul>
 */

var lists = document.getElementsByTagName('li');
for(var i = 0 , len = lists.length ; i < len ; i++){
    lists[ i ].onmouseover = function(){
        alert(i);    
    };
}
你会发现当鼠标移过每一个<li&rt;元素时，总是弹出4，而不是我们期待的元素下标。这是为什么呢？注意事项里已经讲了（最终值）。显然这种解释过于简单，当mouseover事件调用监听函数时，首先在匿名函数（ function(){ alert(i); }）内部查找是否定义了 i，结果是没有定义；因此它会向上查找，查找结果是已经定义了，并且i的值是4（循环后的i值）；所以，最终每次弹出的都是4。

解决方法一：

var lists = document.getElementsByTagName('li');
for(var i = 0 , len = lists.length ; i < len ; i++){
    (function(index){
        lists[ index ].onmouseover = function(){
            alert(index);    
        };                    
    })(i);
}
解决方法二：

var lists = document.getElementsByTagName('li');
for(var i = 0, len = lists.length; i < len; i++){
    lists[ i ].$$index = i;    //通过在Dom元素上绑定$$index属性记录下标
    lists[ i ].onmouseover = function(){
        alert(this.$$index);    
    };
}
解决方法三：

function eventListener(list, index){
    list.onmouseover = function(){
        alert(index);
    };
}
var lists = document.getElementsByTagName('li');
for(var i = 0 , len = lists.length ; i < len ; i++){
    eventListener(lists[ i ] , i);
}
```
- 匿名函数中undefined形参
完美解释
http://www.111cn.net/wy/js-ajax/39218.htm
(function() {
// ...
})();
很简单，大家都在用。但是，我们需要了解更多。
首先，闭包是一个匿名函数 (Anonymous function), 即是 (function() {}) 这部分。
之所以要给 function 添加括弧是为了让它形成一个表达式 (expression), 有了表达式，
并且确定它的类型是个函数 (Function 实例), 就可以直接调用它。所以，后面的一对括弧是可以工作的，
它的意义是：我要调用 (call) 这个函数。

http://blog.csdn.net/fbysss/article/details/8173177
;(function($,window,document,undefined){
	//code
})(JQuery,window,document);
一般在很多jQuery插件中可以看到这类的代码。首先说说非常值得提倡的几点：
	代码最前面的分号，可以防止多个文件压缩合并以为其他文件最后一行语句没加分号，而引起合并后的语法错误。
	匿名函数(function(){})();：由于Javascript执行表达式是从圆括号里面到外面，所以可以用圆括号强制执行声明的函数。避免函数体内和外部的变量冲突。
	$实参:$是jquery的简写，很多方法和类库也使用$,这里$接受jQuery对象，也是为了避免$变量冲突，保证插件可以正常运行。
	window, document实参分别接受window, document对象，window, document对象都是全局环境下的，而在函数体内的window, document其实是局部变量，不是全局的window, document对象。这样做有个好处就是可以提高性能，减少作用域链的查询时间，如果你在函数体内需要多次调用window 或 document对象，这样把window 或 document对象当作参数传进去，这样做是非常有必要的。当然你如果你的插件用不到这两个对象，那么就不用传递这两个参数了。

undefined 并不是js关键字，这样可以用作变量名
function a(){
	var undefined = "ana";
	alert(undefined);
}
a();
----弹出来的是5，而不是undefined。也就是说全局的undefined有可能被覆盖。
在一些浏览器输出的undefined，比如高版本的firefox，chrome。看上去有点蛋痛，但这是真的，幸好，ECMAScript 5中undefined会变成只读属性，
The value properties NaN, Infinity, and undefined of the Global Object have been changed to be read-only properties.
这样就很好解释上面的匿名函数为什么要使用undefined这个形参了，因为这个匿名函数使用了$, window, document三个实参，
undefined形参是没有任何值传入进来的，那么这里的undefined是真正的undefined，是window的undefined属性。这样写可以避免
函数体内的undefined被外部重写。



简单封装一下：
// by ana
// xxxx-xx-xx
//这里使用window -- 减少变量作用域的搜索 提高性能, 
//这里使用undefined  --- 下面没有传参 所以我们这个值就是undefined 这是为了解决早期浏览器有的
//没有实现undefined 功能， 有的没有实现undefined功能， 如果没有实现undefined功能，在浏览器使用的时候，
他会把undefined当做变量来用， 一旦把他当做变量来使用，就表明改变量未定义，报错，
所以参数里面给一个undefined,但是不给他传参，所以表明这个变量就是undefined,他的值也就是undefined， 这里巧妙的用到了
值和名字是一样的情况，那么在代码里面使用undefined的话 就不会出现这种报错的情况
(function ( window, undefined ) {
	
	
// 构造函数
var ana = function ( selector ) {
	return new ana.fn.init( selector );
};
// 核心原型
ana.fn = ana.prototype = {
	constructor: ana,
	selector: null,
	init: function ( selector ) {
		// 字符串: 选择器, html
		if ( typeof selector == 'string' ) {
			if ( selector.charAt( 0 ) === '<' ) {
				this.elements = parseHTML( selector );
			} else {
				this.elements = select( selector );
			}
		}
		this.selector = selector;
	}
};
ana.fn.init.prototype = ana.prototype;

// 可扩展
ana.extend = ana.fn.extend = function ( obj ) {
	// 将 obj 的成员加到 this 上
	var k;
	for ( k in obj ) {
		this[ k ] = obj[ k ];
	}
};

var select = function ( selector ) {
	var first = selector.charAt( 0 ), arr = [];
	if ( first === '#' ) {
		arr.push.call( arr, document.getElementById( selector.slice( 1 ) ) )
	} else if ( first === '.' ) {
		arr.push.apply( arr, document.getElementsByClassName( selector.slice( 1 ) ) )
	} else {
		arr.push.apply( arr, document.getElementsByTagName( selector ) );
	}
	return arr;
};

var parseHTML = function ( html ) {
	var div = document.createElement( 'div' ),
		arr = [], i;
	div.innerHTML = html;
	for ( i = 0; i < div.childNodes.length; i++ ) {
		arr.push( div.childNodes[ i ] );
	}
	return arr;
};

// 基本的工具方法
ana.extend({
	each: function ( arr, fn ) {
		var i, l = arr.length, 
			isArray = ana.isLikeArray( arr );
		if ( isArray ) {
			// 数组
			for ( i = 0; i < l; i++ ) {
				if ( fn.call( arr[ i ], i, arr[ i ] ) === false ) {
					break;
				}
			}
		} else {
			// 对象
			for ( i in arr ) {
				if ( fn.call( arr[ i ], i, arr[ i ] ) === false ) {
					break;
				}
			}
		}
		return arr;
	}
});

// 判断类型的方法
ana.extend({
	isFunction: function ( obj ) {
		return typeof obj === 'function';
	},
	isString: function ( obj ) {
		return typeof obj === 'string';
	},
	isLikeArray: function ( obj ) {
		return obj && obj.length && obj.length >= 0;
	},
	isana: function ( obj ) {
		return !!obj.selector;
	},
	isDOM: function ( obj ) {
		return !!obj.nodeType;
	}
});


// 基本的 DOM 操作
ana.fn.extend({
	appendTo: function ( selector ) {
		// var objs = ana( selector ).elements,
		// 	i, j,
		// 	len1 = objs.length,
		// 	len2 = this.elements.length;
		// // 将 this.elements 加到 objs 中
		// for ( i = 0; i < len1; i++ ) {
		// 	for ( j = 0; j < len2; j++ ) {
		// 		objs[ i ].appendChild( i === len1 - 1 ? 
		// 								this.elements[ j ] :
		// 								this.elements[ j ].cloneNode( true ) );
		// 	}
		// }
		var objs = ana(selector).elements, i,j,
				len1 = objs.length,
				len2 = this.elements.length;
		for( i = 0; i < len1; i++) {
			for( j = 0; j < len2; j++) {
				objs[i].appendChild(i === len1 - 1 ? 
								this.elements[j] 
								:this.elements[j].cloneNode(true));
			}
		}
	}
});




// 对外公开
window.I = window.ana = ana;
//这里使用window -- 减少变量作用域的搜索 提高性能
})( window );



关于appendTo中elements的思考：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript">
			
			// obj.elements
			// 特点就是数据都在 elements 中
			// 方法与它并列, 也就是说方法与数据分离了
			
			// 这样的组织方式管理非常方便
			// 但是在给予它的开发变得每次都要使用 elements, 很繁琐
			
			// jq 中将数据直接存储到 this 中, 也就是说将 jq 对象看成一个伪数组
			// 里面的每一个元素都是 dom 对象
			// 同时提供了很多的方法
			
			// jq -> DOM
			// $(...).get(0)
			// $(...)[ 0 ]
		</script>
		<script src="../../js/jquery-1.12.1.js"></script>
		<script>
			
			$(function () {
				var temp = $( 'div' );
				var temp = $();
			});
		</script>
	</head>
	<body>
		<div class="c1"></div>
		<div class="c2"></div>
		<div class="c3"></div>
	</body>
</html>

验证修改原型继承属性
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script>
			var Person = function () {
				
			};
			Person.prototype.age = 10;
			
			var p = new Person();
			
			console.log( p.age );
//执行下面这句话之前  这个时候age是在他的原型里面的 
	p: Person
		__proto__:Object
		age:10
		constructor:()
		__proto__:Object

//执行下面这句话 	赋值以后 p里面有了age	 所以我们原型当中的age是不能修改的
			// p.age = 123; 
	p: Person
		age:123
		__proto__:Object
		age:10
		constructor:()
		__proto__:Object

			
			p.age += 123;
			// p.age = p.age + 123 注释了上面的p.age=123 执行这句话
								//代表的是用原型里面的数据加上123 在给P一个age 
			
			console.log( p.age );
			
			
			
		</script>
	</head>
	<body>
	</body>
</html>


什么是事件：
	事件不是一个名词 其实是一个过程 是人出发的一个行为 节点标签注册了一个
	事件处理程序 节点会调用事件处理程序， 如果他注册事件处理程序的这个名字和我们的
	这个行为刚好相同的话，那么我的dom对象就会调用我们的事件处理程序 这个过程称之为事件
	事件的内部在操作的时候， 比如现在又一个click事件，在我们点一下的时候 会执行click方法
	这就是在响应事件 ，这是内部去做的， 那么对于我们的onClick方法，当我们内部响应的时候，如果我们注册的事件处理程序，
	我们的系统就会 调用这样的方法， 执行我们的Onclick方法。如果里面什么都没有返回
	就把onclick执行了 同时把他的默认行为执行了，如果返回的是false, 代表的是取消他的默认
	行为， 那么就把onclik执行了， 默认行为不执行
click() {
	if onclick != null {
		if (onclick() !== false) {
			默认行为
		}
	}
}

以前用的添加事件

// addEventLisener   这种添加事件可以绑定多个事件 连续增加事件
// 	dom.addEventLisener( 事件名, fn ) 事件名--  这个地方 fn 函数里面的this代表dom对象
//	
IE里面的添加事件
// attachEvent
//  dom.attachEvent( 事件名, fn ) 这个地方fn函数里面的this代码window 

这种方式的事件的 新事件会把原来事件覆盖
div.onclick = function() {
	
}



// 什么是事件对象? 有什么用?
事件就是用户做了一件事情，然后他就可以给我一个响应
事件对象就是 用户在做这件事情的，有很多附带的信息 比如说
用户做的是什么事情  用户在哪个地方的事情 
// 如何访问事件对象????
// 1> IE
//		window.event
// 2> 火狐
//		事件处理函数的参数


事件移出：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src="ana.js"></script>
		<script>
			// 添加事件 addEventListener
			// 语法: addEventListener( 事件的类型, 事件处理函数, 冒泡还是捕获  )
			// 移除事件 removeEventListener
			// 语法: removeEventListener( 事件类型, 事件处理函数 )
			// 移除的只能是加入的函数
			onload = function () {
				
				
				// var btn = document.getElementById( 'btn' );
				
				var fn = function () {
					alert( '123' );
				}
				
				/*
				btn.addEventListener( 'click', fn );  // 这个函数无法移除
				
				btn.removeEventListener( 'click', fn );
				*/
				
				I( '#btn' ).on( 'click', fn ); 
				
				I( '#btn' ).off( 'click', fn );
			};
		</script>
	</head>
	<body>
		<input type="button" id="btn" value=" click " />
	</body>
</html>




<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
			div {
				width: 100px; height: 20px; border: 1px solid red; margin: 10px 0;
			}
			.c1 {
				background-color: red;	/* #ff0000 */
			}
			.c2 {
				background-color: green; /* #00ff00 */
			}
			.c3 {
				background-color: blue; /* #0000ff */
			}
		</style>
		<script src="ana.js"></script>
		<script>
			ana.fn.extend({
				css: function ( cssName, cssValue ) {
					// 假设只有一个参数 cssName
					// this 是多个元素是一个 DOM 的数组, 但是获取数据的时候
					// 获得的是第 0 个元素的样式
					// return this[ 0 ].style[ cssName ];
					
					// 在 js 中, 利用 js 获得样式, 默认只能获得行内样式, 类样式与外部样式无法获得
					// 考虑使用 计算样式来获得第一次的结果
					// window.getComputedStyle
					// 如果是 低版本的 IE 浏览器, 需要使用 currentStyle
					
					var style = window.getComputedStyle( this[ 0 ] );
					
					return style[ cssName ];
				}
 			});
			
			I(function () {
				var res = I( 'div' ).css( 'background-color' );
				console.log(typeof res );
			});
		</script>
	</head>
	<body>
		<div class="c1"></div>
		<div class="c2"></div>
		<div class="c3"></div>
	</body>
</html>




<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style>
			div {
				width: 100px; height: 20px; border: 1px solid red; margin: 10px 0;
			}
			.c1 {
				background-color: red;	/* #ff0000 */
			}
			.c2 {
				background-color: green; /* #00ff00 */
			}
			.c3 {
				background-color: blue; /* #0000ff */
			}
		</style>
		<script src="../js/jquery-1.12.1.js"></script>
		<script type="text/javascript">
			
			// .css( '名字' )
			// .css( '名字', '值' )
			// .css( {  } );
			
			// addClass()
			// removeClass()
			// hasClass()
			// toggleClass()
			
			$(function () {
				
				// var res = $( 'div' ).css( 'backgroundColor' );
				
				// console.log( res );
				
				alert( $('div').hasClass('c3') );
			});
			
		</script>
	</head>
	<body>
		<div class="c1"></div>
		<div class="c2"></div>
		<div class="c3"></div>
	</body>
</html>



去空格
str.replace(/^\s+/g,'').replace(/\s+$/g,'');
在很多其他编程语言当中有trim方法，但是很多语言支持函数重载
有一个规则 如果trim函数不带参数 则去掉左右空格
如果带有参数 表示取消左右指定的字符
'abc132'.trim('a') ---> bc132
/^a+|a+$/g

'abc132a'.trim('a','b') ---> c132
/^[ab]+ | (a|b)+$/g



兼容IE的currentStyle() 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			div { width: 100px; height: 40px; border:1px solid red;}
		</style>
		<script>
			var support = {};
			// 浏览器检查
			
			onload = function () {
				var dv = document.getElementsByTagName('div')[ 0 ];
				
				var style1 = dv.style;
				var style2 = window.getComputedStyle( dv );
				var style3 = dv.currentStyle;
				
				var _ = 0;
			};
			
		</script>
	</head>
	<body>
		<div></div>
	</body>
</html>


移动前端：
标准viewport 操作： meta:vp  tab键
1. 流式布局
	流式布局  就是百分比布局，通过盒子的宽度设置成百分比来根据屏幕的宽度来进行伸缩，不受固定像素的限制，内容向两侧填充。
	这样的布局方式  就是移动web开发使用的常用布局方式
2. viewport
	有三层 一个是我们的浏览器 一个是我们的viewport 一个使我们的页面
	viewport是一个虚拟的窗口 他可能比浏览器窗口大  可能比浏览器窗口小
	是用来承载我们网页的 能设置缩放比例

总结： 用meta标签 把view-port宽度设置为device-width 同时initial-scale = 1
,user-scalable = 1 就构建了一个标准的移动web页面


非标准viewport

假如手机分辨率320 * 1000 ,  pc 端网页 640 * 1040px
那么手机上显示 淘宝的做法是缩小一半
例如我们的 m.taobao.com 
body　比例是　640*960
手机端配置显示是 如下 配置为了0.5
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">

```

- node
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
```