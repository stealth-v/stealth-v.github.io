xu.t("mnu",function(m,app){
	m.exports=function(){
		var content=this,
		sc=this.querySelector(".sc"),
		on={
			sc:function(){
				xu.toggle(sc);
				xu.focus(sc.querySelector("[type=search"));
			}
		},
		self={on:on,freg:null,
		};
		sc.onsubmit=function(){
			if(app.content&&app.content.page){
				var a=this.querySelector("[type=search]"),b;
				if(b=a.value){
					if(this.querySelector(":checked").value)b+="&s=1";
					app.content.page("/?q="+b,1);
				}
			}
			return false;
		};
		return self;
	};
})