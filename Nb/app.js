(function(){
	var module={},lang="en-US	English\nko-KR	한국어,Korean",app={
		module:module,lang:lang,langtxt:0,pjs:0,pskin:0,
		load:load,
		deploy:deploy,
		attach:attach,
		language:function(a){
			if(!a)a=cookie("lang",0,"/");
			if(a){
				ch(a);
				return;
			}
			for(var l=navigator.languages,i=0,c=l.length;i<c&&ch(l[i]);i++){}
			function ch(a){
				var m=new RegExp("^("+a+"[^\t]*)\t(.*)","im").exec(lang);
				if(m){
					cookie("lang",app.lang=m[1],"/");
					app.langtxt=m[2];
				}else return 1;
			}
		},
		src:function(a){return src(this.pjs+a+".js")},
		css:function(a){return css(this.pskin+a+".css")},
		cssl:function(a){
			return css(this.pskin+a+"+"+app.lang+".css",function(a,b){
				if(b){
					a.onerror=null;
					a.src=this.pskin+a+"+en-US.css";
				}
			})
		}
	};

	app.language();
	EndDOM(function(){
		var a=body.querySelector(".mnu"),b=html.querySelector("[src$='root.js']").src;
		b=b.substr(0,b.length-7);
		app.pjs=b;
		app.pskin=b+a.getAttribute("data-skin")+"/";
		a.removeAttribute("data-skin");
		deploy();
	});

	function load(dir,target,node){
		var f,x=post(function(a,e){
			if(e){

			}else if(this.readyState==4&&a==2){
				f=doc.createDocumentFragment();
				f.innerHTML=this.response;
				for(var a=f.querySelectorAll("[data-module]"),i=a.length-1;i>=0;i--){
					t(a[i],attach(a[i],target||a[i].getAttribute("data-target"),function(){
						node.parentNode.replaceChild(node,f);
						deploy();
					}));
				}
			}
		},dir);
		x.send();
	}
	function deploy(){
		for(var a=body.querySelectorAll(".-module"),i=a.length-1;i>=0;i--){
			t(a[i],attach(a[i],a[i].getAttribute("data-target")));
		}
	}
	function attach(div,target){
		var m,n=div.getAttribute("data-module");

		if(module[n])module[n].entry(a[i]);
		else{
			m=module[n]={
				src:app.src(n,function(){
					
				}),
				css:null,lang:null,
				entry:null,
				reload:null,
				content:null
			};
			m[target||"content"]=div;
			return m;
		}
	}
	function t(a,b){
		a.onload=function(p){
			p(b,app);
			if(b.reload)b.reload();
		};
	}
})();
function t(a,b){
	var c=body.querySelector("[data-module='"+a+"']");
	c.removeAttribute("data-module");
	c.onload(b);
}