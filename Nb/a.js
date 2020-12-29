var $app=(function(){
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
	};
	app.language();
	function load(dir,self,target){

	}

	return {
		attach:function(){

		}
	}
})()