// 复用
// 1> 对象 -> 得到一个新对象
// 2> 函数 -> 创建新对象, 反复调用
(function(w) {

    var f = function(name, age) {
        this.name = name;
        this.age = age;
    };

    // f.prototype.sayHello = function() {}
    f.prototype = new Foo();

    function Foo() {}

    w.f = f;

})(window);


var o1 = new f('jim', 19);
var o2 = new f('tom', 20);