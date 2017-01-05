// 什么是继承( 原型式, 组合式 ), 自己没有, 别人有, 然后自己就有了
var Person = function(name, age) {
    this.name = name;
    this.age = age;
}
var p = new Person('jim', 14);
var o = {};
Person.call(o, 'tom', 20);

var nop = function() {};
nop.prototype = Person.prototype;

var obj = new nop();
Person.call(obj, 'tom', 20);


// 借用构造函数继承模型
/*
var Student = function ( name, age, gender ) {
	
	Person.call( this, name, age );
	
	this.gender = gender;
};
*/