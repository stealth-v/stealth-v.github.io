xu.r(function(){
	var module={},langlist="en-US	English\nko-KR	한국어,Korean",
	on={
	},
	app,x=xu.new(xu.body,app={
		on:on,module:module,langcur:0,langlist:langlist,langtxt:0,pjs:0,pskin:0,
		header:0,content:0,
		reload:function(){
			this.cssl("a");
		},
		unload:function(){
			xu.stylesheet.unload("a");
		},
		attach:function(path,node,target){
			x.template(function(f){
				x.load(f,target);
				x.refrash();
			},path);
		},
		page:function(rt,i){
			var a,b,m=7,h=m/2|0;
			if(i<Math.round(m/2+.5))a=1,b=m;
			else{a=i-h;b=i+h}
			for(;a<=b;a++)rt(a);
		},
		ctl:function(a,b){return xu.post(b,this.pjs+a)},
		src:function(a,b){return xu.script.new(this.pjs+a+".js",b,a)},
		css:function(a,b){return xu.stylesheet.new(this.pskin+a+".css",b,a)},
		cssl:function(a,b){
			return xu.stylesheet.new(this.pskin+a+"+"+xu.lang.current+".css",function(a,e){
				if(b)b(a,e);

				if(e){
					a.onerror=null;
					a.src=this.pskin+a+"+en-US.css";
				}
			},a,1)
		}
	});

	xu.lang.apply();

	var r=html.querySelector("[src$='root.js']"),a=body.querySelector("[data-skin]");
	app.pjs=r.src.replace(/[^\/]+$/,"");
	app.pskin=app.pjs+a.getAttribute("data-skin")+"/";
	a.removeAttribute("data-skin");

	app.reload();

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