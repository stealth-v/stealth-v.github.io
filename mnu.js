xu.t("mnu",function(m,app){
	m.exports=function(){
		var content=this,
		usr=this.querySelector(".usr"),
		on={
			usr:function(){
				if(xu.peek(usr))xu.toggle(usr);
				else app.sign_state(app.sign_state1,"q",usr);
			}
		},
		self={on:on,freg:null,
			reload:function(){
				this.reset_profile();
			},
			reset_profile:function(){
				var a=app.get_profile();
				if(a){
					usr.style.background=a[2];
				}else{
					usr.removeAttribute("style");
				}
			}
		};
		return self;
	};
})