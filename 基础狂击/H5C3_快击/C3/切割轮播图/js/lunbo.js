// 索引
var current = 0;
$('.prev').on('click', function() {
    current++;
    $('li').each(function(key) {
        // 旋转加延时
        $(this).css({
            'transform': 'rotateX(' + current * 90 + 'deg)',
            'transition-delay': key * 0.25 + 's'
        })
    })
})

$('.next').on('click', function() {
    current--;
    $('li').each(function(key) {
        // 旋转加延时
        $(this).css({
            'transform': 'rotateX(' + current * 90 + 'deg)',
            'transition-delay': key * 0.25 + 's'
        })
    })
})