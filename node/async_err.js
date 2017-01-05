// 关于封装异步代码的规范：如果有多个参数，回调函数一定放在最后一个位置
// 强调错误优先
function parseJsonStrToObj(str, callback) {
    process.nextTick(function() {
        try {
            var jsonObj = JSON.parse(str);

            // 我们约定好，在没有错误的情况下，回调函数的第一个参数为 null
            callback(null, jsonObj);
        } catch (e) {

            // 我们约定好，在有错误的情况下，回调函数的第一个参数为 错误对象
            callback(e, null);
        }
    });
}

// 既然已经约定了，第一个参数为错误对象，第二个参数是真正的数据结果
parseJsonStrToObj('{ "foo": "bar" }', function(err, obj) {
    if (err) {
        return console.log('糟了，出错了'); // 一种简写方式，先执行return右边，再执行return 左边
    }
    console.log('数据正确，可以放心的使用');
    console.log(obj);
});