(function(){
	var module={},langlist="en-US	English\nko-KR	한국어,Korean",
	on={
	},
	app={
		on:on,module:module,lang:0,langcur:0,langlist:langlist,langtxt:0,pjs:0,pskin:0,
		header:0,content:0,
		onreload:function(){
			this.lang=this.cssl("a");
		},
		load:load,
		deploy:deploy,
		attach:attach,detach:detach,
		language:function(a){
			if(!a)a=cookie("lang",0,"/");
			if(a){
				ch(a);
				return;
			}
			for(var l=navigator.languages,i=0,c=l.length;i<c&&ch(l[i]);i++){}
			function ch(a){
				var m=new RegExp("^("+a+"[^\t]*)\t(.*)","im").exec(langlist);
				if(m){
					cookie("lang",app.langcur=m[1],"/");
					app.langtxt=m[2];
				}else return 1;
			}
		},
		page:function(rt,i){
			var a,b,m=7,h=m/2|0;
			if(i<Math.round(m/2+.5))a=1,b=m;
			else{a=i-h;b=i+h}
			for(;a<=b;a++)rt(a);
		},
		ctl:function(a,b){return post(b,this.pjs+a)},
		src:function(a,b){return src(this.pjs+a+".js",b)},
		css:function(a,b){return css(this.pskin+a+".css",b)},
		cssl:function(a,b){
			return css(this.pskin+a+"+"+app.langcur+".css",function(a,e){
				if(b)b(a,e);

				if(e){
					a.onerror=null;
					a.src=this.pskin+a+"+en-US.css";
				}
			})
		},shw0:0,shw:function(z,f){
			var a=z.className,b=this.shw0;
			if(f||/ on$/.test(a)){
				z.className=a.replace(/\son/g,"");
				this.shw0=0;
			}else{
				if(b)this.shw(b,1);
				z.className+=" on";
				this.shw0=z;
			}
		},foci:function(a,b){
			if(b)a.placeholder=b;
			a.focus();
		},parset:function(ht){
			var o,y=doc.createElement("div"),rep=[],rx=/([^%]+)|(%[^%]+)%/g;

			y.appendChild(ht);
			o=y.querySelectorAll("*");

			for(var i=0,c=o.length;i<c;i++){
				for(var attr=o[i].attributes,j=0,d=attr.length;j<d;j++)trs([i,attr[j].name],attr[j].value);

				for(var p=o[i].childNodes,j=0,d=p.length;j<d;j++)
				switch(p[j].constructor){
				case Text:trs([i,j],p[j].textContent);break;
				}
			}

			return function(j){
				var w,du=ht.cloneNode(true),d1=doc.createElement("div"),d2=doc.createElement("div");

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
		}
	};

	app.language();
	EndDOM(function(){
		var r=html.querySelector("[src$='root.js']"),a=body.querySelector("[data-skin]"),b=r.src;
		b=b.replace(/[^\/]+$/,"");
		app.pjs=b;
		app.pskin=b+a.getAttribute("data-skin")+"/";
		a.removeAttribute("data-skin");

		b=doc.createElement("style");
		b.textContent="[data-module]{display:none}";
		head.insertBefore(b,r);

		app.onreload();
		deploy();
	});

	addEventListener("click",function(e){
		for(var p=e.target,i=16;p&&i>0;p=p.parentNode,i--){
			switch(p.constructor){
			case HTMLButtonElement:
				ncall(on,p,e);
				z(app.header);
				z(app.content);
				break;
			}
		}
		function z(a){if(a)ncall(a.on,p,e)}
	});

	function load(dir,node){
		var f,x=post(function(a,e){
			if(e){

			}else if(this.readyState==4&&a==2){
				f=doc.createDocumentFragment();
				f.innerHTML=this.response;
				for(var a=f.querySelectorAll("[data-module]"),i=a.length-1;i>=0;i--){
					t(a[i],app.attach(a[i],function(){
						node.parentNode.replaceChild(node,f);
					}));
				}
			}
		},dir);
		x.send();
	}
	function deploy(){
		for(var a=body.querySelectorAll(".-module"),i=a.length-1;i>=0;i--){
			t(a[i],app.attach(a[i],a[i].getAttribute("data-target")));
		}
	}
	function attach(dom,target){
		var n=dom.getAttribute("data-module"),m=module[n];

		if(m){
			m.entry.call(a[i],m,app);
			if(m.onload)m.onload();
		}else
			m=module[n]={
				src:app.src(n,function(){
					
				}),
				entry:entry,
				css:null,lang:null,
				onload:null,
				onreload:null,
				onunload:null,
				show:null
			};

		if(target)detach(target);

		return m;

		function entry(dom,p){
			this.entry=p;
			var a=p.call(dom,this,app);
			if(target)app[target]=a;
		}
	}
	function detach(target){
		var a=app[target];
		if(a){
			a.onunload();
			app[target]=0;
		}
	}
	function t(dom,m){
		dom.onload=function(p){
			this.onload=null;
			m.entry(dom,p);
			if(m.onload)m.onload();
			if(m.onreload)m.onreload();
		};
		m.show=function(){
			dom.removeAttribute("data-module");
		};
	}
})();
function t(a,b){for(var z=body.querySelectorAll("[data-module='"+a+"']"),i=z.length-1;i>=0;i--)z[i].onload(b)}