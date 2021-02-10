xu.r(function(){
	parent.postMessage({
		title:document.title,
		favicon:document.querySelector("[rel=icon]").href
	},"https://b.apx.kr");
})