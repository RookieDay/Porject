    var demo = document.getElementById("demo");
    var btn = document.getElementById("btn");
    btn.onclick = function() {
        animate(demo, { "left": 400, "top": 200, "width": 300, "height": 200 }, function() {
            animate(demo, { "left": 100, "top": 50, "width": 50, "height": 300 })
        });
    }

    //让任意对象移动到指定位置
    //让任意对象的任意属性变为任意数值
    //让任意对象的任意多个数值属性同时改变

    function animate(obj, json, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var flag = true;
            for (var k in json) {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                obj.style[k] = leader + step + 'px';
                if (leader != target) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }, 15)
    }

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return window.getComputedStyle(obj, null)[attr];
        }
    }