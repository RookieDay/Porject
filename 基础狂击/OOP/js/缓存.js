// var createCache = function() {
//     var internalCache = {};
//     var arr = [];
//     return function(k, v) {
//         if (v) {
//             if (!internalCache[k]) {
//                 if (arr.length >= 3) {
//                     delete internalCache[arr.shift()];
//                 }
//                 arr.push(k);
//             }
//             internalCache[k] = v;
//         } else {
//             return internalCache[k];
//         }
//     }
// }

// 优化
// 1> 将键值对模型从闭包中提取出来, 放到函数名上

// 2> 既然键值对存储在函数名上, 那么表示直接用 函数名[ key ] 就可以访问数据了
// 表明函数体可简化. 
// 简化后, 如果调用函数就是在往缓存中存储数据, 如果使用
// 函数名[ .. ] 就是在获取缓存中的数据

var createCache = function() {
    var arr = [];
    var cache = function(k, v) {
        // 在 jq 中目标很明确, 调用函数就是在加数据
        // 并没有修改数据的意思, 所以不需要判断是否有该键存在
        if (arr.length >= 3) {
            // 删除
            delete cache[arr.shift()];
        }
        arr.push(k); // 缓存中没有数据的时候才会加进去

        cache[k] = v;

    };
    return cache;
};

var c = createCache();
c('name1', 'jim');
var v = c['name1'];
console.log(c['age']);
console.log(c['name1']);


// var v = c( 'k', 'v' );


// // jq 的优势
// var data = cache[ key ] || cache( key, value );
// // 我们的框架
// var data;
// if ( cache[ key ] ) {
// 	date = cache[ key ];
// } else {
// 	cache( key, value );
// 	data = value;
// }
// // 使用


// // 
// cache( key, value )
// cache[ key ]
// cache.update( key, value )