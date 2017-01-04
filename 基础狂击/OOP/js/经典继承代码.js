// 在实际开发中, 如果希望获得一个继承自 对象 o 的对象
// 可以使用 Object.create 方法
// ES5 提供的方法

// 新对象 Object.create( 作为原型对象的对象 )

var o1 = { name: 'jim' };
// var o2 = Object.create( o1 );
// 类型无关

// 明确函数调用语法
// 功能是什么?


// 它会创建一个新对象, 让他继承自参数 对象
// 创建新对象就有构造函数
// 继承对象就有原型对象


//			function create( obj ) {
//				function F() {}
//				// 要有继承
//				F.prototype = obj;
//				return new F();
//			}
//			var o3 = create( o1 );


// 在实际开发中, 如果是为了兼容所有的浏览器, 有两种做法
// 1, 在原生对象中提供方法
if (!Object.create) {
    Object.create = function(obj) {
        function F() {}
        // 要有继承
        F.prototype = obj;
        // 会造成对原生对象的污染 F new出来的对象 通通继承
        return new F();
    }
}

var o4 = Object.create(o1);

var _ = 0;
// 2, 统一用新的方法
var create = function(obj) {
    if (Object.create) {
        return Object.create(obj);
    } else {
        function F() {}
        F.prototype = obj;
        return new F();
    }
}


var o5 = create(obj);
// 无论浏览器是否支持该方法, 都应该使用自己定义的方法来完成, 但是
// 在方法内部, 判断浏览器是否具有该功能, 如果有该功能
// 则使用浏览器提供 的功能
// 如果浏览器不支持该功能, 则自己实现