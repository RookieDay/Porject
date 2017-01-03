// 全局计数器
var current = 0;

$('.prev').on('click', function() {
    // 加加操作
    current++;

    // 控制li进行旋转
    $('li').each(function(key) {
        // key 是元素的索引值

        $(this).css({
            'transform': 'rotateX(' + current * 90 + 'deg)',
            'transition-delay': key * 0.25 + 's'
        });
    });
});

// 
$('.next').on('click', function() {
    // 减减操作
    current--;

    // 控制li进行旋转
    $('li').each(function(key) {
        // key 是元素的索引值

        $(this).css({
            'transform': 'rotateX(' + current * 90 + 'deg)',
            'transition-delay': key * 0.25 + 's'
        });
    });
});