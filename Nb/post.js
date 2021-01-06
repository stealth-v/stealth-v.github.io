t("post",function(m,app){
	var i=0,on={

	};
	this.onclick=function(e){
		for(var p=e.target,i=16;p&&i>0;p=p.parentNode,i--)
		switch(p.tagName){
		case "ARTICLE":
			p.querySelector("a").click();
			return;
		}
	}
	m.reload=function(){
		m.css=app.css("post",load);
		m.lang=app.cssl("post",load);
	};
	function load(){
		if(i++>0)m.show();
	}
});