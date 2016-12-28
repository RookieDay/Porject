var video = document.querySelector('video');
// 当前播放时间
var current = $('.current');
// 获取进度条
var line = $('.line');

// 视频可以播放了
video.oncanplay = function() {
    var duration = video.duration;

    var h = Math.floor(duration / 3600);
    var m = Math.floor(duration / 60);
    var s = Math.floor(duration % 60);

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    $('.total').text(h + ':' + m + ':' + s);
}


// 播放暂停
$('.switch').on('click', function() {
    // 需要明确当前是否处理播放状态
    if (video.paused) {
        // 播放视频
        video.play();
    } else {
        // 暂停视频
        video.pause();
    }

    $(this).toggleClass('fa-play fa-pause');
})

// 时间进度
// 1、应该要有事件监听
video.ontimeupdate = function() {
        //变量处理
        var currentTime = video.currentTime;
        var duration = video.duration;

        // 小时
        var h = Math.floor(currentTime / 3600);
        var m = Math.floor(currentTime / 60);
        var s = Math.floor(currentTime % 60);

        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        // 将时间放入页面里(时间进度)
        current.text(h + ':' + m + ':' + s);

        // 进度条
        // 当前时间/总的时间=当前播放的百分比
        if (currentTime > 0) {
            var loaded = currentTime / duration * 100;
        }

        // console.log(loaded);
        line.css('width', loaded + '%');
    }
    //点击跳播
$('.bar').on('click', function(ev) {
        // 可以通过设置currentTime 实现跳播
        // video.currentTime = 120;
        // 当前点击位置/总进度条的宽度*总的播放时间

        // 当前总的宽度（相当于是父的宽度）
        var width = $(this).width();
        // 可以获得当前点击位置
        // console.log(ev.offsetX);
        var offsetX = ev.offsetX;
        // 设置定点播放
        video.currentTime = offsetX / width * video.duration;
    })
    //视频结束
video.onended = function() {
    // 播放进度清0
    video.currentTime = 0;
    line.css('width', 0);
    // 播放按钮
    $('.switch').addClass('fa-play').removeClass('fa-pause');
}

$('.expand').on('click', function() {
    video.webkitRequestFullScreen();
})