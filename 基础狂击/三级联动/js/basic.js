// 取出一个地区的所结果
// 1、父一级结果的ID
// 2、当前从属于哪个级别
// 3、创建HTML元素即select

// 1、想取省一级 p 想取市一级 c 想取县一级 d
// 2、c + p一级级的ID
// 3、d + c一级的ID
// 4、p + 000000

// 取出省一级
$.ajax({
    url: 'region.php',
    type: 'get',
    data: { type: 'p', pid: '000000' },
    success: function(info) {
        var data = {
            opt: info
        }
        var html = template('tpl', data);
        $('#province').append(html);
    }
})

// 取出市一级
$('#province').on('change', function() {

    var pid = $(this).val();

    // 清空后面所有节点内容
    $(this).nextAll().empty();

    $.ajax({
        url: 'region.php',
        type: 'get',
        data: { type: 'c', pid: pid },
        success: function(info) {
            console.log(info);

            var data = {
                opt: info
            }

            var html = template('tpl', data);

            $('#city').empty().append(html);
        }
    });
});

// 县一级
$('#city').on('change', function() {

    var pid = $(this).val();

    // 清空后面所有节点内容
    $(this).nextAll().empty();

    $.ajax({
        url: 'region.php',
        type: 'get',
        // 
        data: { type: 'd', pid: pid },
        success: function(info) {
            console.log(info);

            var data = {
                opt: info
            }

            var html = template('tpl', data);

            $('#district').empty().append(html);
        }
    });
});