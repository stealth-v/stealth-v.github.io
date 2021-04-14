document.write('<style class="app-loading">article img{display:none}</style>');
xu.r(function(v){
	xu.lang.set+="\nko-KR	한국어,Korean";
	xu.lang.apply();

	var module={},
	on={
	},
	app,x=xu.new(xu.body,app=v.app={
		on:on,module:module,pjs:0,viewport:0,
		header:0,content:0,
		reload:function(){
			this.cssl("a");
		},
		unload:function(){
			xu.stylesheet.unload("a");
		},
		attach:function(path,target){
			x.template(function(f){
				var p,ex=app[target];
				x.load(f,target);
				if(ex){
					p=ex.freg.parentNode;
					p.insertBefore(f,ex.freg);
					p.removeChild(ex.freg);
					if(ex.unload)ex.unload();
				}
				x.refrash();
			},path);
		},
		loc:function(a,b,c){
			history.pushState(a,b,c);
		},
		page:function(rt,i){
			var a,b,m=7,h=m/2|0;
			if(i<Math.round(m/2+.5))a=1,b=m;
			else{a=i-h;b=i+h}
			for(;a<=b;a++)rt(a);
		},
		ctl:function(a,b){return xu.post(b,this.pjs+a)},
		src:function(a,b){return xu.script.new(this.pjs+a+".js",b)},
		css:function(a,b){return xu.stylesheet.new(this.pjs+a+".css",b)},
		cssl:function(a,b){
			return xu.stylesheet.new(this.pjs+a+"+"+xu.lang.current+".css",function(a,e){
				if(b)b(a,e);

				if(e){
					a.onerror=null;
					a.src=this.pjs+a+"+en-US.css";
				}
			},a,1)
		},
		sign_state:function(a,b,p){xu.post(a,"/in.ps?b="+b,p).send()},
		sign_toggle:function(s,e,p){
			if(e){

			}else switch(s){
			case 2:
				if(p)xu.toggle(p);
				break;
			case 4:
				app.set_profile();
				location.href="/in.ps";
				break;
			}
		},
		sign_profile:function(s,e){var a;
			if(e){

			}else switch(s){
			case 2:
				if(/^1\t/.test(this.response)){
					a=this.response.split("	");
					app.set_profile(a[1],a[2],a[3]);
					app.reset_profile(a[1],a[2],a[3]);
				}else{
					app.set_profile();
				}
				break;
			}
		},
		set_profile:function(id,n,p){
			if(id){
				sessionStorage.setItem("a",id);
				sessionStorage.setItem("n",n);
				sessionStorage.setItem("p",p);
			}else{
				sessionStorage.removeItem("a");
				sessionStorage.removeItem("n");
				sessionStorage.removeItem("p");
			}
		},
		get_profile:function(){
			var a=sessionStorage.getItem("a");
			if(a)return [a,
				sessionStorage.getItem("n"),
				sessionStorage.getItem("p")];
		},
		reset_profile:function(id,nn,pi){
			if(this.header)this.header.reset_profile(nn,pi);
		}
	});

	app.viewport=xu.head.querySelector("[name=viewport]");

	var r=xu.html.querySelector("[src$='a.js']");
	app.pjs=r.src.replace(/[^\/]+$/,"");

	app.reload();
	x.url_prefix=function(a){return app.pjs+a+".js"};
	x.load(0,0,function(){
		xu.head.removeChild(xu.doc.querySelector("style.app-loading"));
		var a=xu.doc.querySelector("[autofocus]");
		if(a)a.focus();
	});

	addEventListener("click",function(e){
		for(var p=e.target,i=16;p&&i>0;p=p.parentNode,i--){
			switch(p.constructor){
			case HTMLButtonElement:
				xu.ncall(on,p,e);
				z(app.header);
				z(app.content);
				break;
			}
		}
		function z(a){if(a)xu.ncall(a.on,p,e)}
	});
})