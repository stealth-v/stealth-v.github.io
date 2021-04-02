xu.t("mnu",function(m,app){
	m.exports=function(){
		var content=this,
		aside=xu.body.querySelector("aside"),
		usr=this.querySelector(".usr"),
		usp=xu.template(usr.querySelector(".usr .xu-temp")),
		sch=this.querySelector(".sch"),
		usp0,
		on={
			mnu:function(){
				xu.toggle(aside);
			},
			usr:function(){
				var a=sessionStorage.getItem("a");
				if(a)xu.toggle(usr);
				else app.sign_state(app.sign_toggle,"q",usr);
			},
			out:function(){
				xu.post(self.out1,"/out.ps","").send();
			},
			sch:function(){
				xu.toggle(sch);
			}
		},
		self={on:on,freg:null,
			reset_profile:function(nn,pi){
				var pf=content.querySelector("[name=usr]");
				if(a){
					pf.style.backgroundImage="url("+pi+")";
					if(usp0)usr.removeChild(usp0);
					usr.insertBefore(usp0=usp({UN:nn}),usr.children[0]);
				}else{
					pf.removeAttribute("style");
					usr.removeChild(usp0);
					usp0=0;
				}
			},
			out1:function(s,e){
				if(e){
	
				}else switch(s){
				case 2:
					xu.toggle(usr,1);
					app.set_profile();
					app.reset_profile();
					break;
				}
			}
		};
		var a=app.get_profile();
		if(a)app.reset_profile(a);
		app.sign_state(app.sign_profile,"p");
		return self;
	};
})