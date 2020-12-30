(function(){
	var module={},app={
		module:module,
		load:load,
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
		}
	},wq=html.querySelector("[src$='root.js']").src;
	wq=wq.substr(0,wq.length-7);
	app.language();
	EndDOM(function(){
		attach();
	});

	function load(dir,self,target){

	}
	function attach(){
		for(var n,a=doc.querySelectorAll(".-module"),i=a.length-1;i>=0;i--){
			if(a[i].onunload)continue;
			n=a[i].getAttribute("data-module");
			if(module[n])module[n].entry(a[i]);
			else{

			}
		}
	}
})()