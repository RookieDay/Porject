##Javascript 基础问题
###类型判断
在类型判断的问题上, 基础上 推荐阅读 lodash 的源代码.
[https://github.com/lodash/lodash](lodash)
[https://lodash.com/](官网)
###作用域
一般会问的是 es6 中 let 与 var 的区别, 或者列举代码, 然后通过对代码的解读来看你对作用域的掌握比较方便.
- let所声明的变量，只在let命令所在的代码块内有效。
- var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined。这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。

为了纠正这种现象，let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。
```
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```
上面代码中，变量foo用var命令声明，会发生变量提升，即脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined。变量bar用let命令声明，不会发生变量提升。这表示在声明它之前，变量bar是不存在的，这时如果用到它，就会抛出一个错误。
- 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
```
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```
上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。

ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。
```
typeof x; // ReferenceError
let x;
```
上面代码中，变量x使用let命令声明，所以在声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就会抛出一个ReferenceError。

作为比较，如果一个变量根本没有被声明，使用typeof反而不会报错。
```
typeof undeclared_variable // "undefined"
```
上面代码中，undeclared_variable是一个不存在的变量名，结果返回“undefined”。所以，在没有let之前，typeof运算符是百分之百安全的，永远不会报错。现在这一点不成立了。这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。
```
// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined
```
上面代码报错，也是因为暂时性死区。使用let声明变量时，只要变量在还没有声明完成前使用，就会报错。上面这行就属于这个情况，在变量x的声明语句还没有执行完成前，就去取x的值，导致报错”x 未定义“。

ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了。

总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

- let不允许在相同作用域内，重复声明同一个变量。
```
// 报错
function () {
  let a = 10;
  var a = 1;
}

// 报错
function () {
  let a = 10;
  let a = 1;
}
```
因此，不能在函数内部重新声明参数。
```
function func(arg) {
  let arg; // 报错
}

function func(arg) {
  {
    let arg; // 不报错
  }
}
```


印象中那本 《你不知道的 Javascript》 讲的很好了, 有兴趣可以去看那本书, 以下是该书的部分目录:

第1章 作用域是什么
第2章 词法作用域
第3章 函数作用域和块作用域
第4章 提升
第5章 作用域闭包

###引用传递
对象是引用传递, 基础类型是值传递, 通过将基础类型包装 (boxing) 可以以引用的方式传递
面试写代码的话, 可以通过 如何编写一个 json 对象的拷贝函数 等类似的问题来考察对引用的了解. 不过笔者偶尔会有恶趣味, 喜欢先问应聘者对于 == 的 === 的区别的了解. 然后再问 [1] == [1] 是 true 还是 false. 如果基础不好的同学可能会被自己对于 == 和 === 的结论影响然后得出错误的结论.
```
  let a = { b: {c:4} , d: { e: {f:1}} }
  let g = Object.assign({},a)
  let h = JSON.parse(JSON.stringify(a));
  console.log(g.d) // { e: { f: 1 } }
  g.d.e = 32
  console.log('g.d.e set to 32.') // g.d.e set to 32.
  console.log(g) // { b: { c: 4 }, d: { e: 32 } }
  console.log(a) // { b: { c: 4 }, d: { e: 32 } }
  console.log(h) // { b: { c: 4 }, d: { e: { f: 1 } } }
  h.d.e = 54
  console.log('h.d.e set to 54.') // h.d.e set to 54.
  console.log(g) // { b: { c: 4 }, d: { e: 32 } }
  console.log(a) // { b: { c: 4 }, d: { e: 32 } }
  console.log(h) // { b: { c: 4 }, d: { e: 54 } }

  对于Symbol 的解析http://es6.ruanyifeng.com/#docs/symbol
```
传递引用实际上是传递一个副本，如果是对象 传递对象的内存地址，所以在函数中修改属性的对象就是函数外面创建的对象本身。

”==”与”===”是不同的,一个是判断值是否相等,一个是判断值及类型是否完全相等。
```
function changeStuff(a, b, c)
{
  a = a * 10;
  b.item = "changed";
  c = {item: "changed"};
}

var num = 10;
var obj1 = {item: "unchanged"};
var obj2 = {item: "unchanged"};

changeStuff(num, obj1, obj2);

console.log(num);
console.log(obj1.item);    
console.log(obj2.item);
```
If it was pure pass by value, then changing obj1.item would have no effect on the obj1 outside of the function. If it was pure pass by reference, then everything would have changed. num would be 100, and obj2.item would read "changed".

Instead, the situation is that the item passed in is passed by value. But the item that is passed by value is itself a reference. Technically, this is called call-by-sharing.

In practical terms, this means that if you change the parameter itself (as with num and obj2), that won't affect the item that was fed into the parameter. But if you change the INTERNALS of the parameter, that will propagate back up (as with obj1).


```
var copy = function(o1,o2){
    for (var k in o2){
        if(typeof(o2[k]) === 'Object'){
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

### 内存释放
> Javascript 中不同类型以及不同环境下变量的内存都是何时释放?
引用类型是在没有引用之后, 通过 v8 的 GC 自动回收, 值类型如果是处于闭包的情况下, 要等闭包没有引用才会被 GC 回收, 非闭包的情况下等待 v8 的新生代 (new space) 切换的时候回收.
 -  v8 内存 GC 的机制  内存快照
 - 内存释放
 - 内存泄漏
 - V8 中不同类型的数据存储的位置, 在内存释放的时候不同区域的不同策略
 - [nodejs 垃圾回收](https://eggggger.xyz/2016/10/22/node-gc/)
 ```
 var theThing = null  
var replaceThing = function () {
  var originalThing = theThing
  var unused = function () {
    if (originalThing)
      console.log("hi")
  }
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log(someMessage)
    }
  };
};
setInterval(replaceThing, 1000)
 ```

 ```
 比如如下代码能否爆掉 V8 的内存?

let arr = [];
while(true)
  arr.push(1);

  然后上述代码与下方的情况有什么区别?

let arr = [];
while(true)
  arr.push();


  如果 push 的是 Buffer 情况又会有什么区别?

let arr = [];
while(true)
  arr.push(new Buffer(1000));


  思考完之后可以尝试找找别的情况如何爆掉 V8 的内存. 以及来聊聊内存泄漏?

var theThing = null  
var replaceThing = function () {
  var originalThing = theThing
  var unused = function () {
    if (originalThing)
      console.log("hi")
  }
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log(someMessage)
    }
  };
};
setInterval(replaceThing, 1000)
 ```

比如上述情况中 unused 的函数中持有了 originalThing 的引用, 使得每次旧的对象不会释放从而导致内存泄漏

###ES6 新特性
- let 与 var 的区别, 以及 箭头函数 与 function 的区别
函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
```
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
```
setTimeout 的参数是一个箭头函数，这个箭头函数的定义生效是在 foo 函数生成时，而它的真正执行要等到100毫秒后。如果是普通函数，执行时 this 应该指向全局对象 window，这时应该输出 21 。但是，箭头函数导致 this 总是指向函数定义生效时所在的对象，所以输出的是 42 。
不可以当做构造函数，也就是说，不可以使用 new 命令，否则会抛出错误。
不可以使用 arguments 对象，该对象在函数体内不存在。
不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

- ES6 引用 的知识点来询问 const 方面的知识. 结合 {} 的使用与缺点来谈 Set, Map 等. 比如私有化的问题与 symbol 
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set 本身是一个构造函数，用来生成 Set 数据结构。
```
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```
上面代码通过add方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。

Set 函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。
```
/ 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
function divs () {
  return [...document.querySelectorAll('div')];
}

const set = new Set(divs());
set.size // 56

// 类似于
divs().forEach(div => set.add(div));
set.size // 56
```
例一和例二都是Set函数接受数组作为参数，例三是接受类似数组的对象作为参数。
上面代码中，也展示了一种去除数组重复成员的方法。
```
[...new Set([array])]
```
向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set内部判断两个值是否不同，使用的算法叫做“Same-value equality”，它类似于精确相等运算符（===），主要的区别是NaN等于自身，而精确相等运算符认为NaN不等于自身。
```
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
```
上面代码向 Set 实例添加了两个NaN，但是只能加入一个。这表明，在 Set 内部，两个NaN是相等。
另外，两个对象总是不相等的。
```
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2
```
上面代码表示，由于两个空对象不相等，所以它们被视为两个值。

Set 实例的属性和方法
Set 结构的实例有以下属性。

Set.prototype.constructor：构造函数，默认就是Set函数。
Set.prototype.size：返回Set实例的成员总数。
Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

add(value)：添加某个值，返回Set结构本身。
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
has(value)：返回一个布尔值，表示该值是否为Set的成员。
clear()：清除所有成员，没有返回值。

Array.from方法可以将 Set 结构转为数组。
```
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
```
这就提供了去除数组重复成员的另一种方法。
```
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

遍历操作
Set 结构的实例有四个遍历方法，可以用于遍历成员。

keys()：返回键名的遍历器
values()：返回键值的遍历器
entries()：返回键值对的遍历器
forEach()：使用回调函数遍历每个成员
需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用Set保存一个回调函数列表，调用时就能保证按照添加顺序调用。


因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
```
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a,...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```
如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。
```
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
```

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是对象，而不能是其他类型的值
WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。对于那些不重要的引用，在结束使用之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakMap 里面的引用就会自动消失。

由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

这些特点同样适用于本章后面要介绍的 WeakMap 结构。

WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
```
const foos = new WeakSet();
class Foo{
  constructor(){
    foos.add(this);
  }
  method (){
    if(!foos.has(this)){
      throw new TypeErroe('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}
```
上面代码保证了Foo的实例方法，只能在Foo的实例上调用。这里使用WeakSet的好处是，foos对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏。

Map的遍历
```
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```
Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。
```
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```
forEach方法还可以接受第二个参数，用来绑定this。
```
const reporter = {
  report:function(key,value){
 console.log("Key: %s, Value: %s", key, value);
  }
}
map.forEach(function(value,key,map){
  this.report(key,value);
},reporter)
```
上面代码中，forEach方法的回调函数的this，就指向reporter。

互相转换：
（1）Map 转为数组

前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（...）。

const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]


（2）数组 转为 Map

将数组传入 Map 构造函数，就可以转为 Map。

new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }

（3）Map 转为对象

如果所有 Map 的键都是字符串，它可以转为对象。

function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }

（4）对象转为 Map

function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}

（5）Map 转为 JSON

Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
（6）JSON 转为 Map

JSON 转为 Map，正常情况下，所有键名都是字符串。

function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为Map。这往往是数组转为 JSON 的逆操作。

function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}


- 闭包应用的场景 / 闭包实现数据的私有  / es6 的一些新特性 (例如 class, symbol) 能否实现私有, 如果能的话那为什么要用闭包? 亦或者是什么闭包中的数据/私有化的数据的内存什么时候释放? 

// 闭包的应用有两个模型
			// 1, 实现私有数据
			// 2, 实现缓存数据

```
缓存数据
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

```
function Foo() {
				var num;
				return {
					get_Num: function () {
						return num;
					},
					set_Num: function ( v ) {
						num = v;
					}
				};
			}
			
			var o = Foo();
			
			console.log( o.get_Num() );
			
			o.set_Num( 123 );
			
			console.log( o.get_Num() );
```
```
私有化
var Student=(function(){  
    var m_staticMaxAge = 120;//定义一个私有的静态属性  
    
    function ageIsValid(age){ //定义一个私有的静态方法  
        if(age > m_staticMaxAge){  
            throw Error("the property age must be less than "+m_staticMaxAge);  
        }  
    }  
  
    //返回构造函数，设置一些属性  
    return function (name,age) {  
  
        var m_name, m_age;//把私有属性都放到这里定义  
  
        //私有属性的 setter 和 getter 都放到这里  
        this.setName = function (name) {  
  
            Student.nameIsValid(name);  
            m_name = name;  
        };  
  
        this.setAge = function (age) {  
            ageIsValid(age);  
            m_age = age;  
        };  
  
        this.getName = function () {  
            return m_name;  
        };  
  
        this.getAge = function () {  
            return m_age;  
        };  
  
        this.setName(name);  
        this.setAge(age);  
    };  
})();
```
      
- ... 的使用上, 如何实现一个数组的去重 (使用 Set 可以加分).
```
[...new Set([array])]

```

```
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1,1,2,3,1])
```

- const 定义的 Array 中间元素能否被修改? 如果可以, 那 const 修饰对象有什么意义?
其中的值可以被修改. 意义上, 主要保护引用不被修改 (如用 Map 等接口对引用的变化很敏感, 使用 const 保护引用始终如一是有意义的), 也适合用在 immutable 的场景.
const 定义的 Array 中间元素能被修改，const 定义的变量只是持有 Array 的地址，这个变量只是本身不能修改，而对于存在于堆内存中的 Array 本身是可以修改的。
对于 const 声明，只是它的赋值操作被冻结了，而值不会因为 const 而不变。主要是预防在coding过程中的coder因为疏忽对变量的意外修改。


### 模块
exports 和 module.exports 的区别：
·1.module.exports 初始值为一个空对象 {}
 2.exports 是指向的 module.exports 的引用
 3.require() 返回的是 module.exports 而不是 exports
 
我们经常看到这样的写法：
exports = module.exports = somethings
上面的代码等价于:
module.exports = somethings
exports = module.exports
原理很简单，即 module.exports 指向新的对象时，exports 断开了与 module.exports 的引用，那么通过 exports = module.exports 让 exports 重新指向 module.exports 即可。

[https://cnodejs.org/topic/5734017ac3e4ef7657ab1215](module.exports区别)

CommonJS是服务器端模块的规范，Node.js采用了这个规范。
根据CommonJS规范，一个单独的文件就是一个模块。加载模块使用require方法，该方法读取一个文件并执行，最后返回文件内部的exports对象。

CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD CMD 解决方案。

[https://www.h5jun.com/post/luckey-draw-in-5-minutes.html](抽奖程序)
利用 Array(n).fill().map(...) 可以方便快速地构造数组：
```
Array(10).fill().map((_,i) => i+1); // 得到 [1,2,3,4,5,6,7,8,9,10]
或者
Array.from({length:10}, (_,i) => i+1)
或者
[...Array(10).keys()] 
```

Array.keys()
```
keys() 方法返回一个新的Array迭代器，它包含数组中每个索引的键。
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]
```


Array.from() 方法从一个类似数组或可迭代对象创建一个新的数组实例。
语法：
```
Array.from(arrayLike[, mapFn[, thisArg]])
```
Array.from() 允许你从下面两者来创建数组：

类数组对象（拥有一个 length 属性和若干索引属性的任意对象）
可遍历对象（你可以从它身上迭代出若干个元素的对象，比如有 Map 和 Set 等）
Array.from() 方法有一个可选参数 mapFn，让你可以在最后生成的数组上再执行一次 map 方法后再返回。也就是说 Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg), 除非创建的不是可用的中间数组。 这对一些数组的子类,如  typed arrays 来说很重要, 因为中间数组的值在调用 map() 时需要是适当的类型。

from() 的 length 属性为 1 。

在 ES2015 中， Class 语法允许我们为内置类型（比如 Array）和自定义类新建子类（比如叫 SubArray）。这些子类也会继承父类的静态方法，比如 SubArray.from()，调用该方法后会返回子类 SubArray 的一个实例，而不是 Array 的实例。
```
const bar = ["a", "b", "c"];
Array.from(bar);
// ["a", "b", "c"]

Array.from('foo');
// ["f", "o", "o"]
```
```
// Using an arrow function as the map function to
// manipulate the elements
Array.from([1, 2, 3], x => x + x);      
// [2, 4, 6]


// Generate a sequence of numbers
// Since the array is initialized with `undefined` on each position,
// the value of `v` below will be `undefined`
Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
```

从 1 ~ 62，一共有 62 人，从其中要公平地抽取出 10 人，而且不重复。所以，初步判断，这是一个简单的随机抽取过程，有 N 个数，从中抽出 M 个（M < N）
```
const cards = Array(62).fill().map((_,i)=>i+1); //初始化一个1-62位的数组
function draw(n = 1 ){
  var ret = [];
  for(var i = 0; i < n; i++){
    let idx = Math.floor(cards.length * Math.random());
    ret.push(...cards.splice(idx,1));
  }
  return ret;
}

console.log(draw(10));
```
首先生成一个顺序的 1 ~ 62 号的数组，然后从其中随机抽取 10 次，为了不重复，将抽取的数字通过 cards.splice(idx, 1) 从原数组中取出来。

上面这种方式可行，但它不是最好的，因为每次 splice 一个数字，取 10 个数字需要 splice 10 次，这看起来不是特别好。可以想到另一种方法，先对数组进行“洗牌”，然后一次把 10 个数字取出来：

```
function draw(amounts,n=1){
  const cards = Array(amounts).fill().map((_,i)=>i+1);
  for(let i = amounts - 1;i >= 0; i--){
    let rand = Math.floor((i+1)*Math.random());
            17         60          60         17
    [cards[rand],cards[i]] = [cards[i],cards[rand]];
  }
  return cards.slice(0,n);
}
console.log(draw(62,10));
```
首先它先把所有的牌都排序了，但实际上只需要排序 10 张牌就好，多余的排序没有必要。其次，它不方便连续抽奖，比如第一次抽取 10 个号，然后再想多抽取 5 个号，它就做不到了。

[http://es6.ruanyifeng.com/#docs/destructuring](变量的解构赋值)
```
交换变量的值
let x = 1;
let y = 2;

[x, y] = [y, x];
```
```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
let {length : len} = 'hello';
len // 5
```
Knuth-Durstenfeld Shuffle
Fisher-Yates 洗牌算法的一个变种是 Knuth Shuffle
每次从未处理的数组中随机取一个元素，然后把该元素放到数组的尾部，即数组的尾部放的就是已经处理过的元素，这是一种原地打乱的算法，每个元素随机概率也相等，时间复杂度从 Fisher 算法的 O(n2)提升到了 O(n)

选取数组(长度n)中最后一个元素(arr[length-1])，将其与n个元素中的任意一个交换，此时最后一个元素已经确定
选取倒数第二个元素(arr[length-2])，将其与n-1个元素中的任意一个交换
重复第 1 2 步，直到剩下1个元素为止
```
functuin shuffle(arr){
  var length = arr.length, temp, random;
  while(0 != length){
    random = Math.floor(Math.random()*length);
    length--;
    temp = arr[length];
    arr[length] = arr[random]l
    arr[random] = temp;
  }
  return arr;
}
```

Array.sort()
利用Array的sort方法可以更简洁的实现打乱，对于数量小的数组来说足够。因为随着数组元素增加，随机性会变差。
```
[1,3,14,11,2,4,5].sort(()=>{
  return .5 - Math.random();
})
Math.round(Math.random() * 1000)
表示产生一个随机数并把它放大1000倍再取整，即生成0~1000之间的随机整数。

((Math.random() * 10 + 5).toFixed(1) - 0)
表示产生一个5到15之间，包含一位小数的随机数。
分步解释一下，先产生一个随机数把它乘以10再加上5，即生成5~15的随机数，然后调用toFixed转换成保留1位小数的字符串形式，最后减0是做了隐式转换，把字符串再转换为数字。
```
不需要洗所有的牌
```
function draw(amount,n=1){
  const cards = Array(amount).fill().map((_,i)=>i+1);
  for(let i = amount - 1, stop = amount - n - 1;i > stop;i--){
    let rand = Math.floor((i+1)*Math.random());
    [cards[rand],cards[i]] = [cards[i],cards[rand]];
  }
  return cards.slice(-n);
}
console.log(draw(62,10));
```
上面这个版本是优化过的版本，显然如果取 10 个数，只需要循环 10 次即可，不需要把 64 张牌都洗了。

要解决可以连续抽奖的问题，就需要把 cards 提取出来（就像方案 1 的随机抽取一样），但是那样的话就使得函数有副作用，虽说是临时写一个抽奖，也不喜欢设计得太糙。或者，那就加一个构造器执行初始化？
```
function Box(amount){
  this.cards = Array(amount).fill().map((_,i)=>i+1);
}
Box.prototype.draw = function(n = 1){
  let cards = this.cards,amount = this.cards.length;
  for(let i = amount - 1, stop = amount - n - 1; i > stop; i--){
    let rand = Math.floor((i + 1) * Math.random());
    [cards[rand], cards[i]] =  [cards[i], cards[rand]];
 }
 let ret = cards.slice(-n);  //截取最后的十个数字
 cards.length = amount - n;  //数组长度减少 去掉部分值
 return ret;
}
var box = new Box(62);
console.log(box.draw(5),box.draw(5));
```

更优雅的解决方式？
实际上，对于一次可能抽取任意多个获奖人的场景，用 ES6 的 generators 非常合适，我们可以直接拿洗牌的版本略做修改
```
function* draw(amount){
  const cards = Array.from({length:amount},(_,i)=>i+1);
  const cards1 = [...Array(62).keys()];
  for(let i = amount - 1; i >= 0;i--){
    let rand = Math.floor((i+1)*Math.random());
    [cards[rand],cards[i]] = [cards[i],cards[rand]];
    yield cards[i];
  }
}
var draw = draw(62);
console.log(Array(10).fill().map(()=>draw.next().value));
```


function*
function* 声明 (function关键字后跟一个星号）定义了一个生成器函数 (generator function)，它返回一个  Generator  对象。

你也可以定义 生成器函数  使用构造函数  GeneratorFunction 和一个  function* expression 。
语法EDIT
function* name([param[, param[, ... param]]]) { statements }
描述EDIT
生成器是一种可以从中退出并在之后重新进入的函数。生成器的环境（绑定的变量）会在每次执行后被保存，下次进入时可继续使用。
调用一个生成器函数并不马上执行它的主体，而是返回一个这个生成器函数的迭代器（iterator）对象。当这个迭代器的next()方法被调用时，生成器函数的主体会被执行直至第一个yield表达式，该表达式定义了迭代器返回的值，或者，被 yield*委派至另一个生成器函数。next()方法返回一个对象，该对象有一个value属性，表示产出的值，和一个done属性，表示生成器是否已经产出了它最后的值。
示例EDIT
简单示例
```
function* idMaker(){
  var index = 0;
  while(index<3)
    yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // undefined
```
yield*的示例
```
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i){
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
```