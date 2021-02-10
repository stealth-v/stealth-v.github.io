xu.r(function(){
	parent.postMessage({
		title:document.title,
		favicon:document.querySelector("[rel=icon]").href
	},"b.apx.kr");
})