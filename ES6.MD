Object.freeze() 方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。
> Object.freeze(obj)

返回值:被冻结的对象。

描述:
冻结对象的所有自身属性都不可能以任何方式被修改。任何尝试修改该对象的操作都会失败，可能是静默失败，也可能会抛出异常（严格模式中）。

数据属性的值不可更改，访问器属性（有getter和setter）也同样（但由于是函数调用，给人的错觉是还是可以修改这个属性）。如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象。


Object.keys() 方法会返回一个由给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。

语法
Object.keys(obj)
参数:obj - 要返回其枚举自身属性的对象。
返回值: 一个表示给定对象的所有可枚举属性的字符串数组。
描述:Object.keys 返回一个所有元素为字符串的数组，其元素来自于从给定的对象上面可直接枚举的属性。这些属性的顺序与手动遍历该对象属性时的一致。

```
var arr = ["a", "b", "c"];
alert(Object.keys(arr)); 
// 弹出"0,1,2"

/* 类数组对象 */ 
var obj = { 0 : "a", 1 : "b", 2 : "c"};
alert(Object.keys(obj)); 
// 弹出"0,1,2"

/* 具有随机键排序的数组类对象 */
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(an_obj)); 
// console: ['2', '7', '100']

/* getFoo是个不可枚举的属性 */ 
var my_obj = Object.create(
   {}, 
   { getFoo : { value : function () { return this.foo } } }
);
my_obj.foo = 1;

alert(Object.keys(my_obj)); 
// 只弹出foo
```


Object.create() 方法使用指定的原型对象和其属性创建了一个新的对象。
语法
>Object.create(proto, [ propertiesObject ])

参数:
proto
一个对象，应该是新创建的对象的原型。
propertiesObject
可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符（这些属性描述符的结构与Object.defineProperties()的第二个参数一样）。注意：该参数对象不能是 undefined，另外只有该对象中自身拥有的可枚举的属性才有效，也就是说该对象的原型链上属性是无效的。

抛出异常:
如果 proto 参数不是 null 或一个对象值，则抛出一个 TypeError 异常。

使用Object.create实现类式继承
下面的例子演示了如何使用Object.create()来实现类式继承。这是一个单继承。
```
//Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info("Shape moved.");
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); //call super constructor.
}

Rectangle.prototype = Object.create(Shape.prototype);

var rect = new Rectangle();

rect instanceof Rectangle //true.
rect instanceof Shape //true.

rect.move(1, 1); //Outputs, "Shape moved."
```

使用Object.create 的 propertyObject 参数
```
var o;

// 创建一个原型为null的空对象
o = Object.create(null);


o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);


o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { writable:true, configurable:true, value: "hello" },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) { console.log("Setting `o.bar` to", value) }
}})


function Constructor(){}
o = new Constructor();
// 上面的一句就相当于:
o = Object.create(Constructor.prototype);
// 当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码


// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })

// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24
o.p
//42

o.q = 12
for (var prop in o) {
   console.log(prop)
}
//"q"

delete o.p
//false

//创建一个可写的,可枚举的,可配置的属性p
o2 = Object.create({}, { p: { value: 42, writable: true, enumerable: true, configurable: true } });
```


ES6 声明变量的六种方法
ES5 只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有6种声明变量的方法。


###变量的解构赋值
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。


解构赋值对提取JSON对象中的数据，尤其有用。
```
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```


任何部署了Iterator接口的对象，都可以用for...of循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便。
```
var map = new Map();
map.set('first','hello');
map.set('second','world');
for(let [key,value] of map) {
  console.log(key + ' is ' + value);
}
```
如果只想获取键名，或者只想获取键值，可以写成下面这样。
```
获取键名
for(let [key] of map){}
获取键值
for(let [,value] of map){}
```


Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。
```
let arrayLike = {
  '0':'a',
  '1':'b',
  '2':'c',
  length:3
};
//ES5
var arr1 = [].slice.call(arrayLike);
//ES6
var arr2 = Arrayfrom(arrayLike);
```

实际应用中，常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
```
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```

Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
```
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```
```
下面的例子是取出一组DOM节点的文本内容。

let spans = document.querySelectorAll('span.name');

// map()
let names1 = Array.prototype.map.call(spans, s => s.textContent);

// Array.from()
let names2 = Array.from(spans, s => s.textContent)
```

Array.from()可以将各种值转为真正的数组，并且还提供map功能。这实际上意味着，只要有一个原始的数据结构，你就可以先对它的值进行处理，然后转成规范的数组结构，进而就可以使用数量众多的数组方法。
```
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']
```
上面代码中，Array.from的第一个参数指定了第二个参数运行的次数。这种特性可以让该方法的用法变得非常灵活。

Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。
```
function countSymbols(string) {
  return Array.from(string).length;
}
```


Array.of()
Array.of方法用于将一组值，转换为数组。

```
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```


数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
```
Array.prototype.copyWithin(target, start = 0, end = this.length)
```
它接受三个参数。

target（必需）：从该位置开始替换数据。
start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
这三个参数都应该是数值，如果不是，会自动转为数值。
```
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
```
上面代码表示将从3号位直到数组结束的成员（4和5），复制到从0号位开始的位置，结果覆盖了原来的1和2。
```
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
({0:undefined,1:undefined,2:undefined,3: 1,4:undefined,5:undefined,length: 5}).copyWithin(0,3,5);
结果为：
{0:1,1:undefined,2:undefined,3: 1,4:undefined,5:undefined,length: 5};
也就是
{0:1,3:1,length:5}
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署TypedArray的copyWithin方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

数组实例的find()和findIndex() 
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
 第一个参数是值 第二个参数是索引  第三个参数是数组
```
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
```

数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
```
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```
这两个方法都可以发现NaN，弥补了数组的IndexOf方法的不足。
```
[NaN].indexOf(NaN)
// -1
[NaN].findIndex(y => Object.is(NaN, y))
```


fill方法使用给定值，填充一个数组。
```
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```
上面代码表明，fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。

fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
```
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
上面代码表示，fill方法从1号位开始，向原数组填充7，到2号位之前结束。
```

ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
```
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持。
该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
```
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
```

没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。
```
if (arr.indexOf(el) !== -1) {
  // ...
}
```
indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相当运算符（===）进行判断，这会导致对NaN的误判。

[NaN].indexOf(NaN)
// -1
includes使用的是不一样的判断算法，就没有这个问题。

[NaN].includes(NaN)
// true

下面代码用来检查当前环境是否支持该方法，如果不支持，部署一个简易的替代版本。
```
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(["foo", "bar"], "baz"); // => false
```
```
some() 方法测试数组中的某些元素是否通过了指定函数的测试。
下面的例子检测在数组中是否有元素大于 10。

function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [2, 5, 8, 1, 4].some(isBigEnough);
// passed is false
passed = [12, 5, 8, 1, 4].some(isBigEnough);
// passed is true
```

另外，Map和Set数据结构有一个has方法，需要注意与includes区分。

Map结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
Set结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。


数组的空位
数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。
```
Array(3) // [, , ,]
```
上面代码中，Array(3)返回一个具有3个空位的数组。

注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
```
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
```
上面代码说明，第一个数组的0号位置是有值的，第二个数组的0号位置没有值。


```
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```
上面两种写法都对函数的参数设定了默认值，区别是写法一函数参数的默认值是空对象，但是设置了对象解构赋值的默认值；写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。
```
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x和y都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x有值，y无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x和y都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]
```

函数的 length 属性
指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。
```
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```


rest参数
ES6 引入 rest 参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
```
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

rest 参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。下面是一个利用 rest 参数改写数组push方法的例子。
```
function push(array,...items){
  items.forEach(function(item){
      array.push(item);
      console.log(item);
  })
}
var a = [];
push(a,1,2,3,4);
```

扩展运算符 
含义
扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
```
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]
```

扩展运算符的应用
（1）合并数组

扩展运算符提供了数组合并的新写法。
```
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```

（2）与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组。
```
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []
```

如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
```
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

（3）函数的返回值

JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。
```
var dateFields = readDateFields(database);
var d = new Date(...dateFields);
```
上面代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数Date。

（4）字符串

扩展运算符还可以将字符串转为真正的数组。
```
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```
上面的写法，有一个重要的好处，那就是能够正确识别32位的Unicode字符。
```
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
```
上面代码的第一种写法，JavaScript会将32位Unicode字符，识别为2个字符，采用扩展运算符就没有这个问题。因此，正确返回字符串长度的函数，可以像下面这样写。
```
function length(str) {
  return [...str].length;
}
length('x\uD83D\uDE80y') // 3
```
凡是涉及到操作32位Unicode字符的函数，都有这个问题。因此，最好都用扩展运算符改写。
```
let str = 'x\uD83D\uDE80y';

str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'
```
上面代码中，如果不用扩展运算符，字符串的reverse操作就不正确。

（5）实现了Iterator接口的对象

任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。
```
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```
上面代码中，querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了Iterator接口。

对于那些没有部署Iterator接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。
```
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};
```
// TypeError: Cannot spread non-iterable object.
let arr = [...arrayLike];
上面代码中，arrayLike是一个类似数组的对象，但是没有部署Iterator接口，扩展运算符就会报错。这时，可以改为使用Array.from方法将arrayLike转为真正的数组。


name 属性 § ⇧
函数的name属性，返回该函数的函数名。
```
function foo() {}
foo.name // "foo"

const bar = function baz() {};

// ES5
bar.name // "baz"

// ES6
bar.name // "baz"

(new Function).name // "anonymous"


function foo() {};
foo.bind({}).name // "bound foo"

(function(){}).bind({}).name // "bound "
```

箭头函数：
```
const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]
```
使用注意点
箭头函数有几个使用注意点。

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作Generator函数。

上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。
```
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

var id = 21;

foo.call({ id: 42 });
```
上面代码中，setTimeout的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到100毫秒后。如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42。

箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。下面是另一个例子。
```
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0
```
上面代码中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。所以，3100毫秒之后，timer.s1被更新了3次，而timer.s2一次都没更新。

所以，箭头函数转成ES5的代码如下。
```
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```

箭头函数可以让this指向固定化，这种特性很有利于封装回调函数。下面是一个例子，DOM事件的回调函数封装在一个对象里面。
```
var handler = {
  id: '123456',

  init: function() {
    document.addEventListener('click',
      event => this.doSomething(event.type), false);
  },

  doSomething: function(type) {
    console.log('Handling ' + type  + ' for ' + this.id);
  }
};
```
上面代码的init方法中，使用了箭头函数，这导致这个箭头函数里面的this，总是指向handler对象。否则，回调函数运行时，this.doSomething这一行会报错，因为此时this指向document对象。

this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。


除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。
```
function foo() {
  setTimeout(() => {
    console.log('args:', arguments);
  }, 100);
}

foo(2, 4, 6, 8)
// args: [2, 4, 6, 8]
```

绑定 this § ⇧
箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法（call、apply、bind）。但是，箭头函数并不适用于所有场合，所以ES7提出了“函数绑定”（function bind）运算符，用来取代call、apply、bind调用。虽然该语法还是ES7的一个提案，但是Babel转码器已经支持。

函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。
```
foo::bar;
// 等同于
bar.bind(foo);

foo::bar(...arguments);
// 等同于
bar.apply(foo, arguments);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj::hasOwnProperty(key);
}
```
如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。
```
var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;

let log = ::console.log;
// 等同于
var log = console.log.bind(console);
```
由于双冒号运算符返回的还是原对象，因此可以采用链式写法。
```
N1:
import {map,takeWhile,forEach} from "iterlib";
getPlayers();
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));
N2:
let {find, html} = jake;
document.querySelectorAll('div.myClass')
::find('p')
::html('haha');
```
什么是尾调用？
尾调用（Tail Call）是函数式编程的一个重要概念，本身非常简单，一句话就能说清楚，就是指某个函数的最后一步是调用另一个函数。
```
function f(x){
  return g(x);
}
```
上面代码中，函数f的最后一步是调用函数g，这就叫尾调用。

以下三种情况，都不属于尾调用。
```
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}
```
上面代码中，情况一是调用函数g之后，还有赋值操作，所以不属于尾调用，即使语义完全一样。情况二也属于调用后还有操作，即使写在一行内。情况三等同于下面的代码。
```
function f(x){
  g(x);
  return undefined;
}
```
尾调用不一定出现在函数尾部，只要是最后一步操作即可。
```
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
```
上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。



对象的扩展
```
var birth = '2000/01/01';

var Person = {

  name: '张三',

  //等同于birth: birth
  birth,

  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }

};
```
CommonJS模块输出变量，就非常合适使用简洁写法。
```
var ms = {};
function getItem(key){
  return key in ms ? ms[key] : null;
}
function setItem(key,value){
  ms[key] = value;
}
function clear (){
  ms = {};
}
module.exports = {getItem,setItem,clear};
// 
module.exports = {
  getItem:getItem,
  setItem:setItem,
  clear:clear
}
```
属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。
```
var cart = {
  _wheels: 4,

  get wheels () {
    return this._wheels;
  },

  set wheels (value) {
    if (value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}
```

Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
```
Object.defineProperty(obj, prop, descriptor)
```
参数
```
obj
要在其上定义属性的对象。
prop
要定义或修改的属性的名称。
descriptor
将被定义或修改的属性的描述符。
```

Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
```
var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
```
var target = { a: 1, b: 1 };

var source1 = { b: 2, c: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

Promise 的含义 
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 stream 模式是比部署Promise更好的选择。

Promise新建后就会立即执行。
```
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('Resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// Resolved
```

Promise实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为Promise实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是Resolved状态的回调函数，第二个参数（可选）是Rejected状态的回调函数。

then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
```
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```
上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

采用链式的then，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
```
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function funcA(comments) {
  console.log("Resolved: ", comments);
}, function funcB(err){
  console.log("Rejected: ", err);
});
```
上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为Resolved，就调用funcA，如果状态变为Rejected，就调用funcB。

如果采用箭头函数，上面的代码可以写得更简洁。
```
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("Resolved: ", comments),
  err => console.log("Rejected: ", err)
);
```

Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
```
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```
上面代码中，getJSON方法返回一个 Promise 对象，如果该对象状态变为Resolved，则会调用then方法指定的回调函数；如果异步操作抛出错误，状态就会变为Rejected，就会调用catch方法指定的回调函数，处理这个错误。另外，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。
```
p.then((val) => console.log('fulfilled:',val))
  .catch((err)=>console.log('rejected:',err));
//等同于
p.then((val) => console.log('fulfilled:',val))
  .then(null,(err)=>console.log('rejected:',err));
```
下面是一个例子。
```
var promise = new Promise(function(resolve,reject){
  throw new Error('test');
})
promise.catch(function(error){
  console.log(error);
})
```
上面代码中，promise抛出一个错误，就被catch方法指定的回调函数捕获。注意，上面的写法与下面两种写法是等价的。
```
var promise = new Promise(function(resolve,reject){
  try {
    throw new Erro('test');
  } catch(e){
    reject(e);
  }
});
promise.catch(function(error){
  console.log(error);
})
// 写法二
var promise = new Promise(function(resolve,rejecet){
  reject(new Error('test'));
})
promise.catch(function(error){
    console.log(error);
})
```

一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法。
```
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```

跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise对象抛出的错误不会传递到外层代码，即不会有任何反应。
```
var someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});
```
上面代码中，someAsyncThing函数产生的Promise对象会报错，但是由于没有指定catch方法，这个错误不会被捕获，也不会传递到外层代码，导致运行后没有任何输出。注意，Chrome浏览器不遵守这条规定，它会抛出错误“ReferenceError: x is not defined”。


Generator 函数
形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。
```
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```
上面代码定义了一个 Generator 函数helloWorldGenerator，它内部有两个yield表达式（hello和world），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

然后，Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。

下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。

上面代码一共调用了四次next方法。

第一次调用，Generator 函数开始执行，直到遇到第一个yield表达式为止。next方法返回一个对象，它的value属性就是当前yield表达式的值hello，done属性的值false，表示遍历还没有结束。

第二次调用，Generator 函数从上次yield表达式停下的地方，一直执行到下一个yield表达式。next方法返回的对象的value属性就是当前yield表达式的值world，done属性的值false，表示遍历还没有结束。

第三次调用，Generator 函数从上次yield表达式停下的地方，一直执行到return语句（如果没有return语句，就执行到函数结束）。next方法返回的对象的value属性，就是紧跟在return语句后面的表达式的值（如果没有return语句，则value属性的值为undefined），done属性的值true，表示遍历已经结束。

第四次调用，此时 Generator 函数已经运行完毕，next方法返回对象的value属性为undefined，done属性为true。以后再调用next方法，返回的都是这个值。

总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。
```
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
```
由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在function关键字后面。本书也采用这种写法。

yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
```
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
```
yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
```
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
```

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
var find = function(node){
  var arr = [];
  for(var i = 0; i < node.childNodes.length;i++){
    arr.push(node.childNodes[i]);
    arr = arr.concat(find(node.childNodes[i]));
  }
  return arr;
}

onload = function(){
  var nodes = find(document.body);
  for(var i = 0 ; i < nodes.length; i++){
    nodes[i].style.border = "1px solid black";
  }
}
```

词法作用域：
// 词法作用域
			// 在 开发语言中 常见的作用域规则就是: 块级作用域 和 词法作用域
			// 
			
			// 什么叫作用域?
			// 起作用的区域
			// 定义变量后, 可以在哪一个范围内使用该变量
			
			// 块级作用域
			// 所谓的块级作用域就是 用一个块 结构分割变量的访问区域
			// 所谓的块就是 {}
			// 代表语言: C 语言( C 系 )
			
			
			// 词法作用域
			// 就是变量的作用范围, 在书写代码的时候就已经决定, 与运行时无关
			// 分割作用域的只有函数

			// 词法作用域 解释

			// 只和代码的书写，定义时的顺序有关，和运行时候的顺序无关
			// 函数内部可访问外部的变量，反之则不允许

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


闭包的应用：
<script>
			// 闭包的应用有两个模型
			// 1, 实现私有数据
			// 2, 实现缓存数据
			
			
			// 1> 带有缓存功能函数
			// var count = 0;
//			var fib = function ( n ) {
//				count++;
//				// 面试求兔子数列, 要求使用 callee
//				if ( n < 0 ) throw new Error( '数字不允许是负数' );
//				if ( n === 0 || n === 1 ) return 1;
//				return arguments.callee( n - 1 ) + 
//						arguments.callee( n - 2 );
//			};
//			
//			var count = 0;
//			for ( var i= 0; i <= 10; i++ ) {
//				count = 0;
//				console.log( fib( i )  + ", " + count + ' 次');
//			}
			
			/*
			for ( var i= 0; i <= 10; i++ ) {
				console.log( fib( i ) );
			}
			*/
			// fib( 21 );
			// 1, 3, 5, 9, 15, 25
			// 41, 67
			// console.log( count );
			
			
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
			
			// 首先计算 第 n 项
			// 在计算的时候首先看缓存中是否有该数据
			// 那么如果缓存里面没有数据, 就递归, 并将计算的结果放到对应的缓存位置上
			// 那么如果缓存中有数据, 则直接返回
			
			
			
//			var count = 0;
//			for ( var i= 0; i <= 10; i++ ) {
//				count = 0;
//				console.log( fib( i )  + ", " + count + ' 次');
//			}
			
			// fib( 100 );
			// 1, 3, 5, 9, 15, 25
			// 41, 67
			// console.log( count );
			
			
		</script>		

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

开发中使用到的缓存：
var createCache = function() {
  var internalCache = {};
  var arr = [];
  return function(k,v){
    if(v){
      if(!internalCache[k]){
        if(arr.length >= 3){
          var deleteKey = arr.shift();
          delete internalCache[deleteKey];
        }
        arr.push(k);
      }
      internalCache[k] = v;
    } else {
      return internalCache[k];
    }
  }
}       
var cc = createCache();


var s = 'qdqsadaewrq ';
var i = -1,arr = [];
do {
  i = s.indexOf('e',i+1);
  if(i != -1){
    arr.push(i);
  }
} while(i != -1);

var s = 'adqwrsaf';
var r  = /e/g;
var arr = [];
var m;
while((m = r.exec(s)) != null) {
  arr.push(m.index);
}

简写形式的元字符：
			// 
			// \w	文字		\W	代表的是非文字		word 文字		默认表示英文和下划线
			// \d	数字		\D	代表的是非数字		digit 数字
			// \s	空白		\S	代表的是非空白		spcae 空白
			
			. 代表除了换行符以外的任何字符
			// 有些开发者使用 [\s\S] 表示增强的 .  ---> [\s\S] 代表任意的一个字符
			
			
			var get = function ( str ) {
				
				// 		      1                   2                 3
				var r = /^(?:#([\w\-]+)|\.([\w\-]+)|([\w\-]+))$/;
//				var r = /^(?:#([\w-]+)|\.([\w-]+)|([\w-]+)|(\*)+)$/;
				var m = r.exec( str );
				
				if ( m[ 1 ]  ) {
					return [ document.getElementById( m[ 1 ] ) ];
				} else if ( m[ 2 ] ) {
					return document.getElementsByClassName( m[ 2 ] );
				} else if ( m[ 3 ] ){
					return document.getElementsByTagName( m[ 3 ] );
				}
				
			};

// 分组
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

性能分析：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script>
			
			// 在页面中添加 1000 个div
			
			var count = 50000;
			
			var test1 = function () {
				var start = +new Date(),
					i, end, node, docfrag;
				
				docfrag = document.createDocumentFragment();
				for ( i = 0; i < count; i++ ) {
					node = document.createElement( 'div' );
					docfrag.appendChild( node );
				}
				document.body.appendChild( docfrag );
				
				end = +new Date();
				
				console.log( 'test1 = ' + ( end - start ) );
			};
			
			
			var test2 = function () {
				var start = +new Date(),
					i, end, s;
				
				s = '';
				for ( i = 0; i < 1000; i++ ) {
					s += '<div></div>';
					// document.body.innerHTML += '<div></div>';
				}
				document.body.innerHTML = s;
				
				end = +new Date();
				
				console.log( 'test2 = ' + ( end - start ) );
			};
			
			
			onload = function() {
				// test1();
				test2()
			};
		</script>
	</head>
	<body>
	</body>
</html>

dom中创建代码：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript">
			
			// jq 中
			// $( '<div style=""></div>' );
			
			// itcast -> I
			// var dom = I( '<a href="http://www.baidu.com">一个链接</a>' )
			
			var cElem = function ( html ) {
				// 1, 在内部创建一个 docfrag
				var docfrag = document.createDocumentFragment();
				// 2, 创建真正的 div, 然后设置其 innerHTMl 为出入的字符串
				// 然后在遍历该子元素, 将内容加入到 docfrag 中
				var div = document.createElement( 'div' );
				// 3, 将字符串设置为 它的 innerHTML
				div.innerHTML = html;
				// 4, 遍历div的子元素, 加入 docfrag 下面为什么这么写呢
				// 因为在 DOM 元素中默认有一个特征, 即元素只允许有一个 父节点
				// 如果添加元素到另一个节点中, 该元素会自动的离开原来的父节点
				//最好不用for循环
				while( div.firstChild ) {
					docfrag.appendChild( div.firstChild );
				}
				// 5, 获得其子元素返回
				return docfrag;
			};
			
		</script>
	</head>
	<body>
	</body>
	<script>
		var dom = cElem( '<a href="http://www.baidu.com">一个链接</a><br />' + 
						 '<a href="http://www.itcast.cn">传智播客</a>'	);
						 
		document.body.appendChild( dom );
		
		// I( ... ).appendTo( 'body' );
	</script>
</html>


解析while 
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript">
			
			var id = function ( id ) {
				return document.getElementById( id );
			};
			
			
			onload = function () {
				var d1 = id( 'dv1' );
				var d2 = id( 'dv2' );
				var list = d1.getElementsByTagName("p");
				var len;
				// dom 节点只能有一个父节点 你把这个节点append到了
				//另一个节点上 ，当前这个节点就少了一个节点
				//i继续累加 节点本身length也在减少 总在变化
				//所以这里让他固定不动就可以了
				//这种写法不太好
				//比较好使用while循环
//				for ( var i = 0, len = list.length; i < len; i++ ) {
//					
//					d2.appendChild( list[ 0 ] );
//					
//				}
				
//				while ( list[ 0 ] ) {
//					d2.appendChild( list[ 0 ] );
//				}
				
				while ( d1.firstChild ) {
					d2.appendChild( d1.firstChild );
				}
			};
			
		</script>
	</head>
	<body>
		<div id="dv1">
			<p>p1</p>
			<p>p2</p>
			<p>p3</p>
			<p>p4</p>
		</div>
		<div id="dv2">
			
		</div>
	</body>
</html>


抽离出一种方法， 分析：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript">
			
			// 将字符串转换成 DOM 对象
			var cElem = function ( html ) {
				var docfrag = document.createDocumentFragment();
				var div = document.createElement( 'div' );
				div.innerHTML = html;
				while( div.firstChild ) {
					docfrag.appendChild( div.firstChild );
				}
				return {
					element: docfrag,
					appendTo: function ( dom ) {
						dom.appendChild( this.element );
					}
				};
			};
			
			
			
			// cElem( '...' ).appendTo( document.body );
			// 函数返回 DOM 对象, 没有该方法
			// 但是现在需要该方法. 在原型中添加??? 在哪一个原型中添加呢?
			// 首先不确定 dom 对象的共有原型, 同时可能引起原型链搜索性能问题
			// 其次开发的原则是不影响内置对象成员
			
			// 因此不应该直接在 DOM 对象上添加成员
			
			// 给 DOM 对象提供一个包装对象
			// 可以考虑将 cELem 函数返回的对象做一个修改, 然后其是一个 自定义对象
			// 该对象中有 appendTo 方法
			
			
			onload = function () {
				
				cElem( '<div style="border: 1px solid red; width: 200px; height: 100px;"></div>' )
					.appendTo( document.body );
					
			};
		</script>
	</head>
	<body>
	</body>
</html>



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
//			var itcast = function ( selector ) {
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
			
			// 解决方案, 直接将 F 绑定到 itcast 的上面 有两种方法
			// -> 1. itcast.init = F  这个是放在了构造函数上 静态方法 作为工具来使用
			// -> 2. itcast.prototype.init = F 放在了原型对象上
			// 法1 --如果想要扩展
			// -> itcast.init.prototype.xx = xxx;
			
			// 由于在方法中提供的方法一般是静态方法, 作为工具使用
			// 但是 jq 中并不是如此操作
			// 同时根据代码的组织规范, 初始化方法放在原型中更加合理( 与实例相关 )
			
			//类似如下：
			var itcast = function ( selector ) {
				return new itcast.prototype.init( selector );
			};
			itcast.prototype = {
				appendTo: function( selector ) {}
			};
			itcast.prototype.init = function(selector) {}
			itcast.prototype.init.prototype = itcast.prototype;


			//继续优化
			var itcast = function ( selector ) {
				return new itcast.prototype.init( selector );
			};
			itcast.prototype = {
				appendTo: function( selector ) {},
				init: function ( selector ) {}
			};
			
			itcast.prototype.init.prototype = itcast.prototype;
			
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
			
			var itcast = function ( selector ) {
				return new itcast.prototype.init( selector );
			};
			itcast.prototype = {
				appendTo: function( selector ) {},
				init: function ( selector ) {}
			};
			
			itcast.prototype.init.prototype = itcast.prototype;
			
			//构造函数和原型都有这个方法
			itcast.extend = itcast.prototype.extend = function ( obj ) {}; 
			
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
			
			// -> itcast.next = function () ...
			// -> itcast.extend({ next: function() {} });
			
			// 实例方法
			// -> itcast.prototype.next = function () {}
			// -> itcast.prototype.extend({ next: function() {} });
			
			
			
			// 将来在添加方法的时候
			
			// 1>
			itcast.prototype.css = function () {};
			itcast.prototype.hasClass = function () {};
			itcast.prototype.addClass = function () {};
			itcast.prototype.removeClass = function () {};
			itcast.prototype.toggleClass = function () {};
			
			
			// 2>
			itcast.prototype.extend({
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
			
			// itcast
			// itcast.prototype
			
			// 是要给这两个对象添加 extend 方法
			// 怎么添加
			
//			itcast.extend = function ( obj ) {
//				for ( var k in obj ) {
//					this[ k ] = obj[ k ];  
//				}
//			};
//			
//			itcast.prototype.extend = function ( obj ) {
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
//			itcast.extend = fn;
//			itcast.prototype.extend = fn;
			
			// 浪费一个变量名
			
			/*  从右往左 先把123 赋给b  再把整个表达式值b=123 当成整体赋给a
			var a, b;
			a = b = 123;
			*/
			
			// 现将 123 赋值给 b, 然后整个赋值表达式的值就是 123, 接着讲 123 赋值给 a
			itcast.extend = itcast.prototype.extend = function ( obj ) {
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




简单封装一下：
// by itcast
// xxxx-xx-xx
//这里使用window -- 减少变量作用域的搜索 提高性能, 
//这里使用undefined  --- 下面没有传参 所以我们这个值就是undefined 这是为了解决早期浏览器有的
//没有实现undefined 功能， 有的没有实现undefined功能， 如果没有实现undefined功能，在浏览器使用的时候，他会把undefined当做变量来用， 一旦把他当做变量来使用，就表明改变量未定义，报错，所以参数里面给一个undefined,但是不给他传参，所以表明这个变量就是undefined,他的值也就是undefined， 这里巧妙的用到了
值和名字是一样的情况，那么在代码里面使用undefined的话 就不会出现这种报错的情况
(function ( window, undefined ) {
	
	
// 构造函数
var itcast = function ( selector ) {
	return new itcast.fn.init( selector );
};
// 核心原型
itcast.fn = itcast.prototype = {
	constructor: itcast,
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
itcast.fn.init.prototype = itcast.prototype;

// 可扩展
itcast.extend = itcast.fn.extend = function ( obj ) {
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
itcast.extend({
	each: function ( arr, fn ) {
		var i, l = arr.length, 
			isArray = itcast.isLikeArray( arr );
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
itcast.extend({
	isFunction: function ( obj ) {
		return typeof obj === 'function';
	},
	isString: function ( obj ) {
		return typeof obj === 'string';
	},
	isLikeArray: function ( obj ) {
		return obj && obj.length && obj.length >= 0;
	},
	isItcast: function ( obj ) {
		return !!obj.selector;
	},
	isDOM: function ( obj ) {
		return !!obj.nodeType;
	}
});


// 基本的 DOM 操作
itcast.fn.extend({
	appendTo: function ( selector ) {
		// var objs = itcast( selector ).elements,
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
		var objs = itcast(selector).elements, i,j,
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
window.I = window.itcast = itcast;
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
		<script src="itcast.js"></script>
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
		<script src="itcast.js"></script>
		<script>
			itcast.fn.extend({
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




正则单词边界：
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script>
			
			// 利用正则表达式是用来匹配数据的. 匹配字符串
			// 但是有些时候, 查找的东西可能比较复杂
			// 比如需要查询一个方法, 叫 a
			
			// append
			// appendTo
			// add
			// attach
			// addEvent...
			// ...
			
			// 因此需要规范, 我现在需要的是 a 的边界( 英文 )
			// 使用 \b 表示一个单词的边界, 比如: I have a dream
			
			var s = "I have a dream";
			var r = /\b\w\b/g;
			var m = r.exec( s );
			
			m = r.exec( s );
			
			m = r.exec( s );
			
		</script>
	</head>
	<body>
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

一些css的设置  reset css  、 common css



