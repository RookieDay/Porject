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

function Foo4(a, b, c) {
    console.log(this);
    console.log([].join.apply(arguments, [', ']));
}
// 函数
Foo4(1, 2, 3);
// 方法
var o1 = { name: 'jim' };
var o2 = { age: 19 };

Foo4.apply(o1, [1, 2, 3, 4]);

Foo4.apply(o2, [1, 2, 3, 4]);