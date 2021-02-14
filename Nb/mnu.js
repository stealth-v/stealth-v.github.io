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
		this.onclick=function(e){
			for(var a,p=e.target,i=16;p&&i>0;p=p.parentNode,i--){
				switch(p.tagName){
				case "A":
					switch(p.getAttribute("data-not-ready")){
					case "subscribe":app.NotReady("https://m.blog.naver.com/BuddyAddForm.nhn?blogId={data-id}&returnUrl={href}");return false;
					case "guest":app.NotReady("https://m.blog.naver.com/GuestbookList.nhn?blogId={data-id}");return false;
					}
					break;
				}
			}
		}
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