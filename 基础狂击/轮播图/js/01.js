    var box = document.getElementById("box");
    var arr = document.getElementById("arr");
    var arrRight = document.getElementById("right");
    var arrLeft = document.getElementById("left");
    var screen = box.children[0];
    var ul = screen.children[0];
    var ol = screen.children[1];
    var ulLis = ul.children;
    var imgWidth = screen.offsetWidth;
    var timer = null;

    //动态生成li
    for (var i = 0; i < ulLis.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = i + 1;
        ol.appendChild(li);
    }
    //当前标号
    var olLis = ol.children;
    olLis[0].className = 'current';
    //动态复制第一张到最后面
    var firstImage = ulLis[0].cloneNode(true);
    ul.appendChild(firstImage);
    //鼠标经过
    for (var j = 0; j < olLis.length; j++) {
        olLis[j].index = j;
        olLis[j].onmouseover = function() {
            for (var k = 0; k < olLis.length; k++) {
                olLis[k].className = "";
            }
            this.className = 'current';

            //图片轮播动画控制
            var target = -this.index * imgWidth;
            animate(ul, target);
            pic = square = this.index;
        }
    }

    //鼠标悬停
    box.onmouseover = function() {
        arr.style.display = "block";
        clearInterval(timer);
    }

    box.onmouseout = function() {
        arr.style.display = "none";
        // timer = setInterval(playNext,1000);
    }

    //点击箭头
    var pic = 0; //当前图片索引
    var square = 0; //当前亮起按钮索引

    arrRight.onclick = function() {
        playNext();
    }

    arrLeft.onclick = function() {
        //到达第一张
        if (pic == 0) {
            ul.style.left = -imgWidth * (ulLis.length - 1) + 'px';
            pic = ulLis.length - 1;
        }
        pic--;
        //target 和 pic有关 和 图片宽度 而且是负数
        var target = -pic * imgWidth;
        animate(ul, target);

        //如果sqaure大于第一个按钮的索引号才能自减 否则从最后一个开始
        if (square > 0) {
            square++;
        } else {
            square = olLis.length - 1;
        }

        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        olLis[square].className = "current";
    }

    function playNext() {
        //判断边界 如果是最后一张图片（假的第一张）的索引
        //让ul跳回开始 pic也要调回去
        if (pic === ulLis.length - 1) {
            ul.style.left = 0;
            pic = 0;
        }
        pic++;
        //target 和 pic有关 和 图片宽度 而且是负数
        var target = -pic * imgWidth;
        animate(ul, target);

        if (square < olLis.length - 1) {
            square++;
        } else {
            square = 0;
        }
        //干掉所有人
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        //留下当前的
        olLis[square].className = "current";
    }

    function animate(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var leader = obj.offsetLeft;
            var step = 20;
            step = leader < target ? step : -step; //判断对象移动的方向
            if (Math.abs(leader - target) > Math.abs(step)) {
                obj.style.left = leader + step + 'px';
            } else {
                clearInterval(obj.timer);
                obj.style.left = target + 'px';
            }
        }, 25);
    }