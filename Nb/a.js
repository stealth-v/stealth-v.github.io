document.write('<style class="app-loading">article img{display:none}</style>');
xu.r(function(v){
	xu.lang.set+="\nko-KR	한국어,Korean";
	xu.lang.apply();

	var module={},
	on={
	},
	app,x=xu.new(xu.body,app=v.app={
		on:on,module:module,pjs:0,pskin:0,viewport:0,
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
		css:function(a,b){return xu.stylesheet.new(this.pskin+a+".css",b)},
		cssl:function(a,b){
			return xu.stylesheet.new(this.pskin+a+"+"+xu.lang.current+".css",function(a,e){
				if(b)b(a,e);

				if(e){
					a.onerror=null;
					a.src=this.pskin+a+"+en-US.css";
				}
			},a,1)
		},
		NotReady:function(a,c){
			open(a.replace(/{([^}]+)}/g,function(a,b){
				var z=xu.body.querySelector("["+b+"]");
				if(z)return z.getAttribute(b);
				else a;
			}),"_self");
		}
	});

	app.viewport=xu.head.querySelector("[name=viewport]");

	var r=xu.html.querySelector("[src$='a.js']"),a=xu.body.querySelector("[data-skin]");
	app.pjs=r.src.replace(/[^\/]+$/,"");
	app.pskin=app.pjs+a.getAttribute("data-skin")+"/";
	a.removeAttribute("data-skin");

	app.reload();
	x.url_prefix=function(a){return app.pjs+a+".js"};
	x.load(0,0,function(){
		xu.head.removeChild(xu.doc.querySelector("style.app-loading"));
	});

	addEventListener("click",function(e){
		for(var p=e.target,i=16;p&&i>0;p=p.parentNode,i--){
			switch(p.constructor){
			case HTMLButtonElement:
				xu.ncall(on,p,e);
				z(app.header);
				z(app.content);
				return;
			case HTMLDivElement:
				if(xu.ncall(on,p,e))return;
			}
		}
		xu.float(0,0,e);
		function z(a){if(a)xu.ncall(a.on,p,e)}
	});
})