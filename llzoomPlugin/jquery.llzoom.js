;
(function($) { //控制变量作用域
	$.fn.extend({
		llzoom: function(opts) {
			var defaults = {
				imgW: 480, //图片的宽度
				imgH: 300, //图片的高度	
				vaW:100,//可见区域的宽度
				vaH:100,//可见区域的高度
				multiple:2//放大倍数
			}
			var settings = $.extend({}, defaults, opts);
			$(this).each(function(index, item) { //此处循环是因为选择器可能选择了页面上多个放大镜
				//重置.srcImg的宽高
				$(".srcImg").css({
					"width": settings.imgW,
					"height": settings.imgH
				});
				//获取图片的宽度,高度
				var srcImgWidth=$(".srcImg>img").width();
				var srcImgHeight=$(".srcImg>img").height();
				//复制图片节点加到.zoomImg下
				$(this).find(".srcImg>img").clone().appendTo($(".zoomImg"));
				//设置.zoomImg下面的img的样式
				$(".zoomImg>img").css({
					"transform":"scale("+settings.multiple+")",
					"position":"absolute",
					"left":srcImgWidth/2*(settings.multiple-1),
					"top":srcImgHeight/2*(settings.multiple-1)
				});
				//设置可见区域的宽度，高度
				$(".srcImg>.visbleArea").css({
					"width":settings.vaW,
					"height":settings.vaH
				});
				//放大区域的宽度，高度
				$(".zoomImg").css({
					"width":settings.vaW*settings.multiple,
					"height":settings.vaH*settings.multiple
				});
				//鼠标移动事件
				$(".srcImg").mousemove(function(e) {
					//获取.srcImg的中心点相对于body的坐标
					var srcImgX = $(this).offset().left + $(this).width() / 2;
					var srcImgY = $(this).offset().top + $(this).height() / 2;
					//获取鼠标移动时的相对于body动态坐标
					var mousemoveX = e.pageX;
					var mousemoveY = e.pageY;
					//鼠标相对于中心点的坐标
					var centerX = mousemoveX - srcImgX;
					var centerY = mousemoveY - srcImgY;
					//visibleArea的坐标
					var vaX = $(this).width() / 2 + centerX - settings.vaW/2;
					var vaY = $(this).height() / 2 + centerY - settings.vaH/2;
					//visibleArea的坐标最大不能超过
					var maxX = $(this).width() - $(".srcImg .visbleArea").width();
					var maxY = $(this).height() - $(".srcImg .visbleArea").height();
					vaX = vaX < 10 ? 0 : vaX;
					vaX = vaX > maxX - 10 ? maxX : vaX;
					vaY = vaY < 10 ? 0 : vaY;
					vaY = vaY > maxY - 10 ? maxY : vaY;
					$(".visbleArea").css({
						"left": vaX,
						"top": vaY
					});
					$(".zoomImg>img").css({
						"left": -settings.multiple * vaX + srcImgWidth/2*(settings.multiple-1),
						"top": -settings.multiple * vaY + srcImgHeight/2*(settings.multiple-1)
					});

				}).hover(function() {
					$(".visbleArea").show();
					$(".zoomImg").css({
						"visibility": "visible"
					});
				}, function() {
					$(".visbleArea").hide();
					$(".zoomImg").css({
						"visibility": "hidden"
					});
				})

				
			})
			return $(this); //支持链式操作
		}
	}); //与$.fn.llzoom=function(){}相同
})(jQuery);