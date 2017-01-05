var deepClone = function(obj) {
    var o = {};
    copy(o, obj);
    return o;

    function copy(o1, o2) {
        // o2拷贝到o1上
        for (var k in o2) {
            // 判断 o2[ k ] 是不是对象, 如果是对象
            // 表示 o1[ k ] 和 o2[ k ] 都是对象
            // 也就是说 需要将 o2[ k ] 这个对象中的属性拷贝到 o1[ k ] 上
            if (typeof(o2[k]) === 'object') {
                o1[k] = {};
                copy(o1[k], o2[k]);
            } else {
                o1[k] = o2[k];
            }
        }
    }
}
var c = { carName: 'BMW' };
var p = { name: "张三", car: c };


console.log(p.name);
console.log(p.car.carName);

var p2 = deepClone(p);

console.log(p2.name);
console.log(p2.car.carName);


p.car.carName = '奥迪';

console.log('========================');
console.log(p.name);
console.log(p.car.carName);
console.log(p2.name);
console.log(p2.car.carName);