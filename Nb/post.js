t("post",function(m,app){
	var content=this,
	art=this.querySelector("article.t").cloneNode(true),
	go=this.querySelector(".go"),
	aside=doc.querySelector("aside"),
	self={
		update:function(page,cat){
			var a=content.querySelectorAll(".navp"),b,i=0;
			cat=cat?"&c="+cat[1]:"";
			b=a[1].children;
			a=a[0].children;
			app.page(function(j){
				b[i].textContent=a[i].textContent=j;
				b[i].href=a[i].href="/?p="+j+cat;
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
			if(j.length==0){
				l.appendChild(art({
					TITLE:"<span class=\"ll-empty\"></span>",CONTENT:"...",
					"a.IMG":"",
					"a.YYYY":"0000",
					"a.MM":"00",
					"a.DD":"00",
					"a.NUM":"",
					"a.VISC":" h",
					"a.VISS":" h",
					"a.CNTC":0,
					"a.CNTS":0,
					"a.CNTI":0
				}));
			}
		},page:function(a,i){
			var c;
			if(!/\bc=/.test(a)&&(c=/\bc=(\d+)/.exec(location)))a+="&"+c[0];
			history.pushState("","",a);
			post(function(s,e){
				if(this.readyState==4){
					if(this.response)self.reload(JSON.parse(this.response));
					else self.reload([]);
					self.update(i,c);
				}else if(e){

				}else{

				}
				return 1;
			},a).send();
		},cc:function(){
			app.sh(aside);
		},go:function(i){
			var a=go.querySelector("input");
			app.sh(go);
			if(i>0){
				a.placeholder=i;
				a.focus();
			}
		},href:function(a){
			if(a.textContent)a.click();
		}
	};
	art.removeAttribute("class");
	art=app.parset(art);
	aside.onclick=this.onclick=function(e){
		for(var p=e.target,i=16;p&&i>0;p=p.parentNode,i--){
			switch(p.tagName){
			case "ARTICLE":
				self.href(p.querySelector("a"));
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
			}
			break;
		}
		return false;
	};
	go.onsubmit=function(){
		var a=this.querySelector("input"),b;
		if(a.placeholder!=a.value){
			b=a.value;
			a="/?p="+b;
			self.page(a,+b);
			self.go();
		}
		return false;
	};
	m.reload=function(){
		m.css=app.css("post",function(){
			m.show();
		});
	};
});