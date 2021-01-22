var xu={
	lang:{
		set:"en-US	English",
		current:0,
		text:0
	},
	new:(function(){
		function x(){

		}
		x.prototype.module=[];
		x.prototype.attach=function(x,tar){

		};
		x.prototype.detach=function(tar){

		};
		x.prototype.lang=function(a){
			var m=/lang=([^;]+)/.exec(doc.cookie);
			if(!a)a=m[1];
			if(a){
				z(a);
				return;
			}
			for(var l=navigator.languages,i=0,c=l.length;i<c&&z(l[i]);i++){}

			function z(a){
				if(m=new RegExp("^("+a+"[^\t]*)\t(.*)","im").exec(xu.lang.set)){
					doc.cookie="lang="+m[1];
					xu.lang.currrent=m[1];
					xu.lang.text=m[2];
				}else return 1;
			}
		};
		return x;
	})()
};