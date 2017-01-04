// createCache
var fib = function(v) {
    var res = fib[n]; //先到函数中取
    if (res !== undefined) {
        // 函数中有数据
        return res;
    } else {
        // 如果是 1 或 0 则将 1 返回给 res
        // 否则递归结果交给 res;
        if (n === 0 || n === 1) {
            res = 1;
        } else {
            res = arguments.callee(n - 1) + arguments.callee(n - 2);
        }
        fib[n] = res; // 将计算的结果放到数组中, 那么下一次再计算的
        // 时候可以直接拿来用, 就不用计算量
        fib.len++;
        return res;
    }
}

fib.len = 0;
fib(5);