$(function () {
	/* 下拉菜单 */
	$('.sub').hover(
		function () {
			$(this).css({'box-shadow':'0 0 5px #CCCCCC','background':'#FFFFFF'}).find('.blank').show().end().find('.sub-list').stop(true,true).slideDown(200);
		},
		function () {
			var _this = $(this);
			$(this).find('.sub-list').slideUp(200,function () {_this.css({'box-shadow':'','background':''});_this.find('.blank').hide();});
		}
	);
	/* 搜索框优化 */
	$('.form input[type=text]').focus(function () {
		if($(this).val() == this.defaultValue) {
			$(this).val('');
		}
	}).blur(function () {
		if($(this).val() == '') {
			$(this).val(this.defaultValue);
		}	
	});
	/* 首页焦点图 */
	var n = 0;
	var timer;
	var Tips;
	var slideTags = $('ul.pics li');
	var tagNums = slideTags.size();
	var Tip = $('ul.tips');
	for(var i=1; i<=tagNums; i++) {
		Tip.append('<li>'+i+'</li>');
	}
	function move() {
		Tips = Tip.find('li');
		timer = setInterval(function () {
			if(n > tagNums - 1) {
				n = 0;
			}
			slideTags.stop();
			slideTags.eq(n).fadeIn(400);
			slideTags.eq(n).siblings().fadeOut(400);
			Tips.eq(n).css('background','#E4393C');
			Tips.eq(n).siblings().css('background','');
			n++;
		},3000);
	}
	move();
	slideTags.hover(
		function () {
			clearInterval(timer);
		},
		function () {
			move();
		}
	);
	Tips.hover(
		function () {
			clearInterval(timer);
			var key = $(this).index();
			slideTags.eq(key).fadeIn(400);
			slideTags.eq(key).siblings().fadeOut(400);
			Tips.eq(key).css('background','#E4393C');
			Tips.eq(key).siblings().css('background','');
		},
		function () {
			move();
		}
	);

	/* 焦点图下面商品滑动展示 */
	var ulWidth = $('#view-1 li').size() * $('#view-1 li').outerWidth();
	var t = 0;
	$('#view-1 ul').width(ulWidth);
	var step = $('#view-1 li').size() / 3;
	$('div.prev-bar').hover(
		function () {
			$(this).find('b').css('background','url(./Images/icon_4.png) 0 0 no-repeat');
			$(this).css({'background':'#F5F5F5'});
		},
		function () {
			$(this).find('b').css('background','');
			$(this).css({'background':''});
		}
	).click(function () {
		if(t == 0) {
			t = step;
		}
		t--;
		$('#view-1 ul').animate({'left':-609 * t},500);
	});

	$('div.next-bar').hover(
		function () {
			$(this).find('b').css('background','url(./Images/icon_4.png) 0 -37px no-repeat');
			$(this).css({'background':'#F5F5F5'});
		},
		function () {
			$(this).find('b').css('background','');
			$(this).css({'background':''});
		}
	).click(function () {
		if(t == step - 1) {
			t = -1;
		}
		t++;
		$('#view-1 ul').animate({'left':-609 * t},500);
	});

	/* 全部分类 */
	$('.sort-item').hover(
		function () {
			$(this).children('.sup-item').css({'background':'#FFFFFF','box-shadow':'0 0 4px #CCCCCC'});
			$(this).find('.blank').show();
			$(this).find('.sub-item').show();
		},
		function () {
			$(this).children('.sup-item').css({'background':'','box-shadow':''});
			$(this).find('.blank').hide();
			$(this).find('.sub-item').hide();
		}
	);
	// 热卖商品标签式切换
	tabTag($('.hots .title li'),$('.hots .hots-tab'),$('.hots .line'));
	
	var wrapper = $('.slide-3 ul');
	wrapper.width(wrapper.find('li').size() * wrapper.find('li').width());

	$('.slide-bar-3 a').mouseover(function () {
		var key = $(this).index();
		wrapper.animate({left:-key * wrapper.find('li').width()},400);
		$(this).css('background','#7ABD54');
		$(this).siblings().css('background','#999999');
	})
	
	
});