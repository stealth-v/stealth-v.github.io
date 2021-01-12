t("post",function(m,app){
	var t=this,i=0,self={
		pagi:1,
		update:function(){
			var a=t.querySelectorAll(".navp"),b,h=this.pagi,i=0;
			b=a[1].children;
			a=a[0].children;
			app.page(function(j){
				a[i].textContent=b[i].textContent=j;
				a[i].name=b[i].name=h==j?"go":"page "+j;
				i++;
			},this.pagi);
		},page:function(i,e){
			var u="/?",m=/c=\d+/.exec(location);
			if(m)u+=m[0]+"&";
			post(function(){
				console.log(this.response);
			},u+"p="+i);
		},cc:function(){

		},go:function(){

		}
	};
	this.onclick=function(e){
		for(var p=e.target,i=16;p&&i>0;p=p.parentNode,i--){
			switch(p.tagName){
			case "ARTICLE":
				p.querySelector("a").click();
				return;
			}
			switch(p.constructor){
			case HTMLButtonElement:ncall(self,p,e);return;
			}
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