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
				xu.float(aside,0,1);
			},
			usr:function(){
				if(sessionStorage.getItem("a"))xu.float(usr,0,1);
				else app.sign_state(app.sign_toggle,"q",usr);
			},
			out:function(){
				xu.post(self.out1,"/out.ps","").send();
			},
			sch:function(){
				xu.float(sch,0,1);
			}
		},
		self={on:on,freg:null,
			reset_profile:function(nn,pi){
				var pf=content.querySelector("[name=usr]");
				if(nn){
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
					xu.float(usr,1,1);
					app.set_profile();
					app.reset_profile();
					break;
				}
			}
		};
		self.onload=function(){
			var a=app.get_profile();
			if(a)app.reset_profile(a[0],a[1],a[2]);
			app.sign_state(app.sign_profile,"p");
		};
		return self;
	};
})