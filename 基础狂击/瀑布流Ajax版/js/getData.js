function getData(page) {
    $.ajax({
        url: './data.php',
        type: 'post',
        data: { page: page },
        beforeSend: function() {
            $('p.tips').text('loading...')
                .addClass('loading');
        },
        success: function(info) {
            console.log(info);
            var html = template('tpl', info);
            $('.items').append(html).waterFall();
            $('p.tips').attr('data-page', info.page);
        },
        complete: function() {
            $('p.tips').text('loading more...')
                .removeClass('loading');
        }
    })
}

// 获取第一页
getData(1);

// 点击加载更多
$('p.tips').on('click', function() {
    var page = $(this).attr('data-page');
    // 禁止重复提交
    if ($(this).hasClass('loading')) return;
    getData(page);
})

$(window).on('scroll', function() {
    var offsetTop = $('.items').offset().top; //距离顶部的距离
    var height = $('.items').height(); //内容的高度
    var scrollTop = $(this).scrollTop(); //被卷去的高度
    var winHeight = $(this).height(); //window高度

    var offset = offsetTop + height - scrollTop - winHeight;
    if (offset <= 200 && !$('p.tips').is('.loading')) {
        var page = $('p.tips').attr('data-page');
        getData(page);
    }
})