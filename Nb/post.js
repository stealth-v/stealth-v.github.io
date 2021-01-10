t("post",function(m,app){
	var t=this,i=0,self={
		page:1,
		update:function(){
			var a=t.querySelectorAll(".navp"),b,i=0;
			b=a[1].children;
			a=a[0].children;
			app.page(function(j){
				a[i].textContent=b[i].textContent=j;
				i++;
			},this.page);
		}
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
	self.update();
	function load(){
		if(i++>0)m.show();
	}
});