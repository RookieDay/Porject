    var box = document.getElementById("box");
    var ul = box.children[0];
    var lis = ul.children;

    for (var i = 0; i < lis.length; i++) {
        lis[i].style.backgroundImage = "url(images/" + (i + 1) + ".jpg)";
        lis[i].onmouseover = function() {
            for (var j = 0; j < lis.length; j++) {
                animate(lis[j], { "width": 100 });
            }
            animate(this, { "width": 800 });
        }
        lis[i].onmouseout = function() {
            for (var k = 0; k < lis.length; k++) {
                animate(lis[k], { "width": 240 });
            }
        }
    }