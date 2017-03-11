;(function($){
	function ll_validate(opts){
		var $form=this;
		var result=true;
		//默认数据
		var defaults={
			//提示信息
			msg_required:"不能为空",
			msg_success:"验证成功",
			msg_email:"邮箱格式不正确",
			//规则
			reg_email:/^[a-zA-Z0-9]+@\w+\.[a-z0-9]+&/
		}
		var settings=$.extend({},defaults, opts);
		//submit事件
		$form.submit(function(){
			var valid=_onsubmit();
			return valid;
		})
		/**
		 * 功能：验证
		 */
		function _onsubmit(){
			$form.find("input").each(function(i,item){
				var validateType=$(item).attr("validateType");
				if(validateType){
					validate(validateType,item);
				}
			})
			return result;
		}
		/**
		 * 功能：具体验证
		 * @param {Object} value
		 * @param {Object} input
		 */
		function validate(validateType,input){
			if(validateType=="required"){
				var value=$(input).val();
				if(value==""){
					result = false;
					
				}else{
					result = true;
				}
			}
			if(validateType=="email"){
				var value=$(input).val();
				if(settings.reg_email.test(value)){
					result =true;
				}else{
					result=false;
					
				}
			}
		}
	}
	
	$.fn.ll_validate=ll_validate;
	return $(this);
})(jQuery);
