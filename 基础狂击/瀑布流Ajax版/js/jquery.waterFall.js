;
(function($) {
    $.fn.waterFall = function(options) {
        // 合并默认值 参数
        var defaults = $.extend({
            gap: 20
        }, options);

        //初始化
        var _this = $(this),
            items = _this.children(),
            width = items.width(),
            height = 0,
            count = Math.floor(_this.width() / (width + defaults.gap)),
            columns = [];
        items.each(function(key, val) {
            // 计算每个元素的高度
            height = $(val).height();
            // 第一行
            if (key < count) {
                // 每一列高度
                columns[key] = height;
                // 设置定位坐标
                $(val).css({
                    top: 0,
                    left: (width + defaults.gap) * key
                })
            } else {
                var min_h = columns[0];
                var min_k = 0;
                // 取出最小列以及下标
                for (var i = 0; i < columns.length; i++) {
                    if (columns[i] < min_h) {
                        min_h = columns[i];
                        min_k = i;
                    }
                }
                // 更新当前列的高度
                columns[min_k] += height;
                $(val).css({
                    top: min_h + defaults.gap,
                    left: (width + defaults.gap) * min_k
                })
            }
        })

        columns = columns.sort(function(a, b) {
            return b - a;
        })
        _this.css({
            height: columns[0]
        })
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