var xu={
	win:window,loc:location,doc:document,html:document.documentElement,
	head:0,title:0,body:0,
	style0:0,
	module:{},
	r:(function(a){
		document.addEventListener("DOMContentLoaded",y);
		return z;
		function z(o){
			a.push(o);
		}
		function y(){
			delete xu.r;
			xu.doc.removeEventListener("DOMContentLoaded",y);
			xu.head=xu.doc.head;
			xu.title=xu.head.querySelector("title");
			xu.body=xu.doc.body;
			var b=xu.style0=xu.doc.createElement("style");
			b.textContent=".xu-loading{display:none}";
			xu.head.appendChild(b);
			for(var i=a.length-1;i>=0;i--)a[i]();
		}
	})([]),
	t:function(a,b){
		for(var z=xu.body.querySelectorAll("[data-module='"+a+"']"),i=z.length-1;i>=0;i--){
			if(z[i].onload)z[i].onload(b);
		}
	},
	lang:{
		set:"en-US	English",
		current:0,
		text:0,
		apply:function(a){
			var t=this,m=/lang=([^;]+)/.exec(xu.doc.cookie);
			if(!a)a=m[1];
			if(a){
				z(a);
				return;
			}
			for(var l=navigator.languages,i=0,c=l.length;i<c&&z(l[i]);i++){}
	
			function z(a){
				if(m=new RegExp("^("+a+"[^\t]*)\t(.*)","im").exec(t.set)){
					xu.doc.cookie="lang="+m[1];
					t.current=m[1];
					t.text=m[2];
				}else return 1;
			}
		}
	},
	new:(function(){
		function x(content,app){
			this.content=content;
			this.app=app;
		}
		x.prototype.url_prefix=null;
		x.prototype.template=function(p,path){
			var f,x=post(function(a,e){
				if(e){
					p(a,e);
				}else if(this.readyState==4&&a==2){
					f=xu.doc.createDocumentFragment();
					f.innerHTML=this.response;
					p(f);
				}
			},path);
			x.send();
		};
		x.prototype.procedure=function(dom,target){
			var t,a,wait,n=dom.getAttribute("data-module"),m=xu.module[n];

			if(m){
				if(m.exports){
					a=m.exports.call(dom);
					if(target)this.app[target]=a;
				}
			}else{
				t=this;
				wait=[];
				m=xu.module[n]={
					src:xu.script.new(this.url_prefix?this.url_prefix(n):n,function(a,e){
						if(e)delete xu.module[n];
					}),
					exports:function(){
						this.className=(this.className+" xu-loading").trim();
						wait.push(this);
					},
					reload:null,
					unload:null,
					task:null
				};

				m.exports.call(dom);
				dom.onload=function(proc){
					this.onload=null;

					proc(m,t.app);
					if(m.reload)m.reload();
					if(m.task)m.task(fin);
					else fin();

					function fin(){
						for(var a,b,ex=m.exports,i=wait.length-1;i>=0;i--){
							a=wait[i];
							b=a.className.replace(/\s?xu-loading/,"");
							a.className=b;
							if(!b)a.removeAttribute("class");

							b=ex.call(a);
							if(target)t.app[target]=b;
						}
					}
				};
			}
		};
		x.prototype.load=function(dom,target){
			for(var a=(dom||xu.body).querySelectorAll("[data-module]"),i=a.length-1;i>=0;i--){
				this.procedure(a[i],target);
			}
		};
		x.prototype.unload=function(name){
			var m=xu.module[name];
			if(m.unload)m.unload();
			delete xu.module[name];
		};
		x.prototype.refrash=function(){
			for(var n in xu.module){
				if(!xu.body.querySelector("[data-module='"+n+"']"))this.unload(n);
			}
		};
		return function(content,app){
			return new x(content,app);
		}
	})(),
	template:function(src){
		var o,y=xu.doc.createElement("div"),rep=[],rx=/([^%]+)|(%[^%]+)%/g;

		y.appendChild(src);
		o=y.querySelectorAll("*");

		for(var i=0,c=o.length;i<c;i++){
			for(var attr=o[i].attributes,j=0,d=attr.length;j<d;j++)trs([i,attr[j].name],attr[j].value);

			for(var p=o[i].childNodes,j=0,d=p.length;j<d;j++)
			switch(p[j].constructor){
			case Text:trs([i,j],p[j].textContent);break;
			}
		}

		return function(j){
			var w,du=src.cloneNode(true),d1=xu.doc.createElement("div"),d2=xu.doc.createElement("div");

			d1.appendChild(du);
			w=d1.querySelectorAll("*");

			for(var p,q,i=0,c=rep.length;i<c;i++){
				p=rep[i];
				if(p[1]>=0){
					q=w[p[0]].childNodes[p[1]];
					d2.innerHTML=tts(p);
					p=q.parentNode;
					while(d2.childNodes.length)p.insertBefore(d2.childNodes[0],q);
					p.removeChild(q);
				}
				else{
					w[p[0]].setAttribute(p[1],tts(p));
				}
			}
			return du;
			function tts(arg){
				for(var r="",i=2,c=arg.length;i<c;i++){
					r+=arg[i][0]==" "?arg[i].substr(1):j[arg[i].substr(1)];
				}
				return r;
			}
		};

		function trs(arg,text){
			var i=0;
			text.replace(rx,function(a,b,c){
				if(b)arg.push(" "+b);
				else{
					arg.push(c);
					i++;
				}
				return "";
			});
			if(i)rep.push(arg);
		}
	},
	increment:0,
	newId:function(){
		return (Date.now()+this.increment++).toString(36);
	},
	got:function(a){
		var x=new XMLHttpRequest();
		if(a){
			x.onreadystatechange=function(){a.call(x,x.status/100|2)};
			x.ontimeout=x.onerror=function(e){a.call(x,0,e)};
		}
		return x;
	},
	get:function(a,b,c){
		var x=this.got(a);
		x.open("GET",b,true);
		if(c)return x;
		else x.send();
	},
	post:function(a,b,c){
		var x=this.got(a);
		x.open("POST",b,true);
		if(c!==null)x.setRequestHeader("Content-Type",c||"application/x-www-form-urlencoded");
		return x;
	},
	rpc:function(a,b,c){
		return this.post(function(e){
			for(var i=0,j,k,c=a.length,m,n,p,q=this.response,r=/[^\u0001]*\u0001/g,s;i<c;i++){
				m=r.exec(q)||["\1"];
				j=0;k=a[i].constructor==Array;s=/([^\u0002]*)[\u0001\u0002]/g;
				while(n=s.exec(m[0])){
					if((k?a[i][j]:a[i]).apply(this,n[1].split("\3"))){
						j++;
					}
				}
				if(k&&(k=a[i][++j]))k();
			}
		},b,c);
	},
	script:(function(){
		var z={},y={};
		return {
			new:function(a,b){
				var s=xu.doc.createElement("script");
				xu.hhv(s,b);
				s.src=a;
				xu.head.insertBefore(s,xu.style0);
				return s;
			},
			delete:function(a){
				xu.head.removeChild(a);
			},
			load:function(a,b,id,re){
				if(!id)id=a;
				var i=z[id]|0;

				if(i){
					if(!re)z[id]=i+1;
					if(y[id].getAttribute("src")!=a)y[id].src=a;
					return y[id];
				}
				z[id]=i+1;
				return y[id]=this.new(a,b);
			},
			unload:function(id){
				if(--z[id]<1){
					this.delete(y[id]);
					delete z[id];
					delete y[id];
				}
			}
		}
	})(),
	stylesheet:(function(){
		var z={},y={};
		return {
			new:function(a,b){
				var s=xu.doc.createElement("link");
				xu.hhv(s,b);
				s.rel="stylesheet";
				s.href=a;
				xu.head.insertBefore(s,xu.style0);
				return s;
			},
			delete:function(a){
				a.disabled=true;
				xu.head.removeChild(a);
			},
			load:function(a,b,id,re){
				if(!id)id=a;
				var i=z[id]|0;

				if(i){
					if(!re)z[id]=i+1;
					if(y[id].getAttribute("href")!=a)y[id].href=a;
					return y[id];
				}
				z[id]=i+1;

				return y[id]=this.new(a,b);
			},
			unload:function(id){
				if(--z[id]<1){
					this.delete(y[id]);
					delete z[id];
					delete y[id];
				}
			}
		}
	})(),
	hhv:function(a,b){
		if(b){
			a.onload=b;
			a.onerror=function(e){
				b(a,e);
			};
		}
	},
	ncall:function(a,p,e){
		var g=/[^;]+/g,m,q,r;
		while(m=g.exec(p.name)){
			m=m[0].split(" ");
			if(q=a[m.shift()]){
				m.push(e);
				switch(r=q.apply(p,m)){
				case "end":return;
				}
			}
		}
		return r;
	},
	clk:function(a,b,c){
		a.onchange=a.onclick=function(e){
			for(var p=e.target,i=16;p&&i>=0;p=p.parentNode,i--)
			switch(p.constructor){
			case HTMLButtonElement:
			case HTMLInputElement:
			case HTMLSelectElement:
				return this.ncall(b,p,e);
			}
		};
	},
	focus:function(a,b){
		if(b)a.placeholder=b;
		a.focus();
	},
	toggle0:0,
	toggle:function(f,z){
		var a=z.className,b=this.toggle0;
		if(f||/ on$/.test(a)){
			z.className=a.replace(/\son/g,"");
			this.toggle0=0;
		}else{
			if(b)this.toggle(b,1);
			z.className+=" on";
			this.toggle0=z;
		}
	},
	i36_save:function(x){return (+x.toString().replace(/[^\-\d\.]/g,"")).toString(36)},
	i36_load:function(x){return parseInt(x,36)},
	number_out:function(x){return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,",")},
	number_in:function(x){return +x.replace(/,/g,"")},
	code_save:function(i){var a;return i?(a=i.replace(/^0+/,""),(+a).toString(36)+(i.length-a.length).toString(36)):""},
	code_load:function(i){return "0".repeat(parseInt(i.substr(-1),36))+parseInt(i.substr(0,i.length-1),36)}
}