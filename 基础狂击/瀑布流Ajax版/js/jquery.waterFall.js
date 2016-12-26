;
(function($) {
    $.fn.waterFall = function(options) {
        // 合并默认值 参数
        var defaults = $.extend({
            gap: 20
        }, options);

        //初始化
        var _this = $(this);
    }

})(jQuery);


// var obj = {
//     name: 'itcast',
//     age: 10
// }
// var opt = {
//     name: 'web',
//     age: 15,
//     sex: '男'
// }
// // 合并两个对象，后面的 有则替换 无则添加
// console.log($.extend(obj, opt));