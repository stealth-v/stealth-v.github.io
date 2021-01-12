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
		page:function(rt,i){
			var a,b,m=7,h=Math.round(m/2+.5);
			if(i<h)a=1,b=m;
			else{h/=2;a=i-h;b=i+h}
			for(;a<=b;a++)rt(a);
		},
		ctl:function(a,b){return post(b,this.pjs+a)},
		src:function(a,b){return src(this.pjs+a+".js",b)},
		css:function(a,b){return css(this.pskin+a+".css",b)},
		cssl:function(a,b){
			return css(this.pskin+a+"+"+app.lang+".css",function(a,c){
				b(a,c);
				if(c){
					a.onerror=null;
					a.src=this.pskin+a+"+en-US.css";
				}
			})
		},parset:function(ht){
			var o,y=doc.createElement("div"),rep=[],rx=/([^%]+)|(%[^%]+)%/g;

			y.appendChild(ht);
			o=y.querySelectorAll("*");

			for(var i=0,c=o.length;i<c;i++){
				trs([i,-1],o[i].className);
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
					if(p[1]<0)w[p[0]].className=tts(p);
					else{
						q=w[p[0]].childNodes[p[1]];
						d2.innerHTML=tts(p);
						p=q.parentNode;
						while(d2.childNodes.length)p.insertBefore(d2.childNodes[0],q);
						p.removeChild(q);
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
		var a=body.querySelector(".mnu"),b=html.querySelector("[src$='root.js']").src;
		b=b.substr(0,b.length-7);
		app.pjs=b;
		app.pskin=b+a.getAttribute("data-skin")+"/";
		a.removeAttribute("data-skin");
		deploy();
	});

	function load(dir,node){
		var f,x=post(function(a,e){
			if(e){

			}else if(this.readyState==4&&a==2){
				f=doc.createDocumentFragment();
				f.innerHTML=this.response;
				for(var a=f.querySelectorAll("[data-module]"),i=a.length-1;i>=0;i--){
					t(a[i],attach(a[i],function(){
						node.parentNode.replaceChild(node,f);
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
	function attach(div){
		var m,n=div.getAttribute("data-module");

		if(module[n])module[n].entry(a[i]);
		else{
			m=module[n]={
				src:app.src(n,function(){
					
				}),
				css:null,lang:null,
				entry:null,
				reload:null,
				show:null
			};
			return m;
		}
	}
	function t(a,b){
		a.onload=function(p){
			p.call(a,b,app);
			if(b.reload)b.reload();
		};
		b.show=function(){
			a.removeAttribute("data-module");
		};
	}
})();
function t(a,b){for(var z=body.querySelectorAll("[data-module='"+a+"']"),i=z.length-1;i>=0;i--)z[i].onload(b)}