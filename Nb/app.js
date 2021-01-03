(function(){
	var module={},lang="en-US	English\nko-KR	한국어,Korean",app={
		module:module,lang:lang,langtxt:0,pskin:0,
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
		css:function(a){return css(this.pskin+a+".css")},
		cssl:function(a){
			return css(this.pskin+a+"+"+app.lang+".css",function(a,b){
				if(b){
					a.onerror=null;
					a.src=this.pskin+a+"+en-US.css";
				}
			})
		},
		src:function(a){return src(this.pskin+a+".js")}
	};

	app.language();
	EndDOM(function(){
		var a=body.querySelector(".mnu"),b=html.querySelector("[src$='root.js']").src
		b=b.substr(0,b.length-7);
		app.pskin=b+a.getAttribute("data-skin")+"/";
		a.removeAttribute("data-skin");
		deploy();
	});

	function load(dir,target,node){
		var div,x=post(function(a,e){
			if(e){

			}else if(this.readyState==4&&a==2){
				div=doc.createElement("div");
				div.innerHTML=this.response;
				div=div.children[0];
				node.setAttribute("data-module-loading",div.getAttribute("data-module"));
				node.onload=function(p){
					p(m,app);
				};
				var m=attach(div,target,function(){
					node.parentNode.replaceChild(node,div);
					deploy();
				});
			}
		},dir);
		x.send();
	}
	function deploy(){
		for(var a=doc.querySelectorAll(".-module"),i=a.length-1;i>=0;i--){
			attach(a[i],div.getAttribute("data-target"));
		}
	}
	function attach(div,target,loaded){
		if(div.onunload)continue;
		var m,n=div.getAttribute("data-module");
		div.removeAttribute("data-module");

		if(module[n])module[n].entry(a[i]);
		else{
			m=module[n]={
				src:src(p+".js",function(){
					
				}),
				css:null,lang:null,
				entry:null,
				content:null
			};
			m[target||"content"]=div;
			return m;
		}
	}
})();
function t(a,b){
	var c=doc.querySelector("[data-module-loading='"+a+"']");
	c.onload(b);
}