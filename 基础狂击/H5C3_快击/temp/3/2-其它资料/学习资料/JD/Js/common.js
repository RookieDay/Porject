// 标签式切换
function tabTag(bar,panel,line) {
	if(typeof bar != 'object' || typeof panel != 'object') return false;
	bar.mouseover(function () {
		var barWidth = $(this).outerWidth();
		var key = $(this).index();
		line.animate({left:barWidth * key},200);

		panel.css('display','none');
		panel.eq(key).css('display','block');
	});
}