t("post",function(m,app){
	var content=this,i=0,
	art=this.querySelector("article.t").cloneNode(true),
	go=this.querySelector(".go"),
	aside=doc.querySelector("aside"),
	self={
		update:function(page){
			var a=content.querySelectorAll(".navp"),b,i=0;
			b=a[1].children;
			a=a[0].children;
			app.page(function(j){
				b[i].textContent=a[i].textContent=j;
				b[i].href=a[i].href="/?p="+j;
				i++;
			},page);
		},reload:function(j){
			var l=content.querySelector(".lip"),r=l.children[0];
			l.textContent="";
			l.appendChild(r);
			for(var d,k,i=0,c=j.length;i<c;i++){
				k=j[i];
				d=new Date(k.DATE);

				l.appendChild(art({
					TITLE:k.TITLE,CONTENT:k.CONTENT,
					"a.IMG":(k.CNTI>0?"<img src=\""+k.IMG+"?type=ffn300_300\">":""),
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
		},page:function(a,i){
			post(function(s,e){
				if(this.readyState==4){
					self.reload(JSON.parse(this.response));
					self.update(i);
				}else if(e){

				}else{

				}
				return 1;
			},a).send();
		},cc:function(){
			app.sh(aside);
		},go:function(i){
			go.querySelector("input").placeholder=i;
			app.sh(go);
		}
	};
	art.removeAttribute("class");
	art=app.parset(art);
	aside.onclick=this.onclick=function(e){
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
	var navp=this.querySelectorAll(".navp");
	navp[0].onclick=navp[1].onclick=function(e){
		for(var a,b,m,p=e.target,i=16;p&&i>0;p=p.parentNode,i--)
		switch(p.constructor){
		case HTMLAnchorElement:
			a=p.getAttribute("href");
			b=+/p=(\d+)/.exec(a)[1];
			m=/p=(\d+)/.exec(location);
			if(b==(m?+m[1]:1)){
				self.go(b);
			}else{
				self.page(a,b);
				history.pushState("","",a);
			}
			break;
		}
		return false;
	};
	m.reload=function(){
		m.css=app.css("post",load);
		m.lang=app.cssl("post",load);
	};

	function load(){
		if(i++>0)m.show();
	}
});