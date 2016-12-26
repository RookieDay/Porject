$('.submit').on('click', function() {
    //缓存外部this
    var _this = $(this);

    //禁止重复提交
    if (_this.hasClass('disabled')) return;
    // serialize()
    var formData = $('#ajaxForm').serialize();
    console.log(formData);
    $.ajax({
        type: 'post',
        url: 'register.php',
        data: formData,
        beforeSend: function() {
            //验证用户名
            if ($('.pass').val() == '') {
                $('.tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('用户名不能为空');
                return false;
            }
            _this.addClass('disabled');
            _this.val('正在提交...');
        },
        success: function() {},
        error: function() {},
        complete: function() {
            // 恢复初始状态
            _this.removeClass('disabled');
            _this.val('立即注册');
        }
    })
})


$('.verify').on('click', function() {
    var _this = $(this);
    // 禁止重复提交
    if (_this.is('.disabled')) return;
    _this.addClass('disabled');
    var mobile = $('.mobile').val();
    $.ajax({
        url: 'post',
        url: 'getCode.php',
        data: { mobile: mobile },
        timeout: 2000,
        beforeSend: function() {
            var regMobile = /1\d{10}/;
            if (!regMobile.test($('.mobile').val())) {
                $('.tips p').stop(true, true).fadeIn(400)
                    .delay(1500).fadeOut(400).text('手机格式不正确');

                // 终止请求
                return false;
            }
            var seconds = 10;
            var t = setInterval(function() {
                _this.val(--seconds + '秒后重新获取');
                if (seconds <= 0) {
                    clearInterval(t);
                    _this.val('获取验证码').removeClass('disabled');
                }
            }, 1000);
        },
        success: function() {

        },
        error: function() {

        },
        complete: function() {

        }
    })
})

// 全局设置
$.ajaxSetup({
    // 设置超时
    timeout: 3000
});

// 也可以单独设，但单独设地优先级高