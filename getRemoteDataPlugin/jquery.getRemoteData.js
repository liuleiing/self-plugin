;(function($){
	$.extend({
		getRemoveData:function(url,callback){
			//创建一个iframe节点，因为iframe节点自带获取连接的属性
			var iframe=$("<iframe style='display:none'></iframe>");
			//设置src属性为url
			iframe.prop({"src":url});
			//将iframe到body中
			$("body").append(iframe);
			
			//iframe，是在网页上新开一个窗口。具有dom对象。等加载完后，获取数据
			iframe.load(function(){
				//获取iframe中的dom
				var iframeDom=this.contentDocument;
				//变为jquery对象，获取body节点
				var jsonStr=$(iframeDom).find("body").text();
				var jsonObj=JSON.parse(jsonStr);
				//执行回调函数
				callback(jsonObj);
				//删除iframe
				$(iframe).remove();
				
			});
			
		}
	});
})(jQuery)
