//ready函数
;(function(global){
	// 防止低版本IE浏览器里，undefined被重写
    // 原理：void后面加表达式，返回undefined
    var undefined = void(0);

	var ready = (function(){
		var isReady = false;
		// 标准浏览器
		if(window.addEventListener){
			return function (callback){
				if(isReady){
					callback();
					return;
				}
				// dom树加载完成就会触发该事件
				window.addEventListener("DOMContentLoaded",function(){
					isReady = true;
					callback();
				},false);
			}
		}
		// IE 需要检测两个地方onreadystatechange/document.doScroll
		// dom标准浏览器用DOMContentLoaded，这是非常正现的W3C论DOM方法，与FF的DOMMouseScroll 不一样，基本上所有非IE内核的浏览器最新版都支持它了。IE下我们可以通过侦听document. documentElement. doScroll()来判断DOM树是否完成，原理是IE下只有当DOM树构建完成后才能doScroll.
		document.onreadystatechange = function(){
			if(isReady === false && (document.readyState === "interactive" || document.readyState === "complete")){
				complete();
			}
		},
		setTimeout(function(){
			// 当dom树加载完成的时候，就可以执行这个方法，否则执行出错
			try{
				document.doScroll("left");
				document.onreadystatechange = null;
				isReady === false && complete();
			}catch(ex){
				setTimeout(arguments.callee, 50);
			}
		},50)
	})();

	global.ready = ready;
})(this)
