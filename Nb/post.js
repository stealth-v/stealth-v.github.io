xu.t("post",function(m,app){
	m.exports=function(){
		var content=this,
		art=this.querySelector("article.t").cloneNode(true),
		aside=this.parentNode.querySelector("aside"),
		go=this.querySelector(".go"),
		on={
			cc:function(){
				xu.toggle(aside);
			},go:function(i){
				xu.toggle(go);
				if(i>0)xu.focus(go.querySelector("input"),i);
			}
		},
		self={on:on,freg:null,
			update:function(page,url){
				if(!(/\b=\d+/.test(url)))url=url.replace("?","?p=1&");
				var a=content.querySelectorAll(".navp"),b,i=0;
				b=a[1].children;
				a=a[0].children;
				app.page(function(j){
					b[i].textContent=a[i].textContent=j;
					b[i].href=a[i].href=url.replace(/\bp=\d+/,"p="+j);
					if(page==j)b[i].className=a[i].className="on";
					else b[i].removeAttribute("class"),a[i].removeAttribute("class");
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
						"a.DATE":d.getFullYear()+"-"+("0"+(d.getMonth()+1)).substr(-2)+"-"+("0"+d.getDate()).substr(-2)+' '+('0'+d.getHours()).substr(-2)+':'+('0'+d.getMinutes()).substr(-2),
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
						"a.DATE":"",
						"a.NUM":"",
						"a.VISC":" h",
						"a.VISS":" h",
						"a.CNTC":0,
						"a.CNTS":0,
						"a.CNTI":0
					}));
				}
			},page:function(a,i){
				app.loc("","",a);
				xu.post(function(s,e){
					if(this.readyState==4){
						if(this.response)self.reload(JSON.parse(this.response));
						else self.reload([]);
						self.update(i,a);
					}else if(e){
	
					}else{
	
					}
					return 1;
				},a).send();
			},v_page:function(){
				var m=/p=(\d+)/.exec(location);
				return m?+m[1]:1;
			}
		};
		history.replaceState({header:"mnu.mn1",content:"post",p:self.v_page()},"",location);
		art.removeAttribute("class");
		art=xu.template(art);
		this.onclick=function(e){
			for(var a,p=e.target,i=16;p&&i>0;p=p.parentNode,i--){
				switch(p.tagName){
				case "ARTICLE":
					a=p.querySelector("a");
					if(a.textContent)a.click();
					return;
				}
			}
		};
		var navp=this.querySelectorAll(".navp");
		navp[0].onclick=navp[1].onclick=function(e){
			for(var a,b,p=e.target,i=16;p&&i>0;p=p.parentNode,i--)
			switch(p.constructor){
			case HTMLAnchorElement:
				a=p.getAttribute("href");
				b=+/p=(\d+)/.exec(a)[1];
				if(b==self.v_page()){
					self.on.go(b);
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
				a=location.pathname+"?p="+b;
				self.page(a,+b);
				self.on.go();
			}
			return false;
		};
		return self;
	};

	var css;
	m.task=function(fin){
		css=app.css("post",fin);
	};
	m.unload=function(){
		xu.stylesheet.delete(css);
	};
})