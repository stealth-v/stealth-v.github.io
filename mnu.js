xu.t("mnu",function(m,app){
	m.exports=function(){
		var content=this,
		usr=this.querySelector(".usr"),
		on={
			usr:function(){
				if(xu.peek(usr))xu.toggle(usr);
				else app.sign_state(app.sign_toggle,"q",usr);
			}
		},
		self={on:on,freg:null,
			reset_profile:function(a){
				if(a){
					usr.style.background="url("+a[2]+")";
				}else{
					usr.removeAttribute("style");
				}
			}
		};
		return self;
	};
})