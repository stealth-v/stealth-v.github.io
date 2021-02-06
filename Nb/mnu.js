xu.t("postview",function(m,app){
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
		return self;
	};
})