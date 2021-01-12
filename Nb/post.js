t("post",function(m,app){
	var content=this,i=0,art=this.querySelector("article.t").cloneNode(true),self={
		pagi:1,
		update:function(){
			var a=content.querySelectorAll(".navp"),b,h=this.pagi,i=0;
			b=a[1].children;
			a=a[0].children;
			app.page(function(j){
				a[i].textContent=b[i].textContent=j;
				a[i].name=b[i].name=h==j?"go":"page "+j;
				i++;
			},this.pagi);
		},reload:function(j){
			var l=content.querySelector(".lip"),r=l.children[0];
			l.textContent="";
			l.appendChild(r);
			for(var d,k,i=0,c=j.length;i<c;i++){
				k=j[i];
				d=new Date(k.DATE);

				l.appendChild(art({
					TITLE:k.TITLE,CONTENT:k.CONTENT,
					"a.IMG":k.IMG?"<img src=\""+k.IMG+"?type=ffn300_300\">":"",
					"a.YYYY":d.getFullYear(),
					"a.MM":("0"+(d.getMonth()+1)).substr(-2),
					"a.DD":("0"+d.getDate()).substr(-2),
					"a.NUM":k.NUM,
					"a.VISC":k.VISC?"":" h",
					"a.VISS":k.VISS?"":" h",
					"a.CNTC":k.CNTC,
					"a.CNTS":k.CNTS,
					"a.CNTI":k.CNTI
				}));
			}
		},page:function(i,e){
			var u="/?",m=/c=\d+/.exec(location);
			if(m)u+=m[0]+"&";
			post(function(s,e){
				if(this.readyState==4){
					self.reload(JSON.parse(this.response));
				}else if(e){

				}else{

				}
				return 1;
			},u+"p="+i).send();
		},cc:function(){

		},go:function(){

		}
	};
	art.removeAttribute("class");
	art=app.parset(art);
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