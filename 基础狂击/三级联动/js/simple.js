// 三级联动菜单
(function(select) {
    // 数据映射
    var map = ['p', 'c', 'd'];
    $.each(select, function(key, val) {
        // 修改dom
        $('#' + val).attr({
            'data-level': key
        }).on('change', function() {
            var _this = $(this),
                level = parseInt(_this.attr('data-level')),
                pid = _this.val() || '000000',
                select;

            // 首次请求省级列表
            if (level == 0 && !_this.children().size()) {
                type = map[level];
            } else {
                level = level + 1;
            }
            type = map[level];
            select = $('[data-level=' + level + ']');
            $.ajax({
                url: './region.php',
                tyrpe: 'get',
                dataType: 'json',
                data: { type: type, pid: pid },
                success: function(data) {
                    // 清空下一级数据
                    $('[data-level]').each(function() {
                        if ($(this).attr('data-level') >= level) {
                            $(this).empty();
                        }
                    });

                    var opts = '';
                    for (var k in data) {
                        opts += '<option value="' + k + '">' + data[k] + '</option>';
                    }
                    select.append(opts);
                }
            })
        })
        $('select[data-level=0]').trigger('change');
    })
})(['province', 'city', 'district']);