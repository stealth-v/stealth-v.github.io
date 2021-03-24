xu.t("mnu",function(m,app){
	m.exports=function(){
		var content=this,
		usr=this.querySelector(".usr"),
		usp=xu.template(usr.querySelector(".xu-temp")),
		usp0,
		on={
			usr:function(){
				var a=sessionStorage.getItem("a");
				if(a)xu.toggle(usr);
				else app.sign_state(app.sign_toggle,"q",usr);
			}
		},
		self={on:on,freg:null,
			reset_profile:function(a){
				if(a){
					content.querySelector("[name=usr]").style.backgroundImage="url("+a[2]+")";
					if(usp0)usr.removeChild(usp0);
					usr.insertBefore(usp0=usp({UN:a[1]}),usr.children[0]);
				}else{
					usr.removeAttribute("style");
					usr.removeChild(usp0);
					usp0=0;
				}
			}
		};
		var a=app.get_profile();
		if(a)app.reset_profile(a);
		app.sign_state(app.sign_profile,"p");
		return self;
	};
})