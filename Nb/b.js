xu.r(function(v){
	v.app.loc=function(a,b,c){
		history.pushState(a,b,c);
		parent.postMessage({
			title:b,
			href:href()
		},"https://b.apx.kr");
	};
	parent.postMessage({
		href:href(),
		title:document.title,
		favicon:document.querySelector("[rel=icon]").href
	},"https://b.apx.kr");
	function href(){
		return location.pathname.replace(/.[^\/]+/,"").replace(/\/index.ps/,'/')+location.search;
	}
})