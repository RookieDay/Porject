		// 1, 新的js版本有类似的方法但是旧版本没有, 所有模拟一下
		// 2, 在其他编程语有类似的功能, 但是 js 没有, 而现在的开发者习惯于 该语言特性, 所以模拟一个

		Function.prototype.c = function(aArgs) {
		    var fConstructor = this,
		        fNewConstr = function() {
		            fConstructor.apply(this, aArgs);
		        };

		    fNewConstr.prototype = fConstructor.prototype;
		    return new fNewConstr();
		};

		var f = function() {};

		var o1 = new f();
		var o2 = f.c();