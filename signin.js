xu.t("signin",function(m,app){
	m.exports=function(){
		var content=this,
		re=xu.template(this.querySelector(".re.xu-temp").cloneNode(true)),
		re0,
		qbody="",
		on={
			ss:function(){
				xu.toggle(content.querySelector(".ss"));
			}
		};
		this.onsubmit=function(e){
			var u=e.target.querySelectorAll("input"),body=u[0].value+"\t"+u[1].value+"\t"+(u[2].checked?"1":"");
			if(u[3])body+="\t"+u[3].value+"\t"+qbody;
			xu.post(function(code,err){
				if(err){

				}else switch(code){
				case 2:
					if(re0){
						re0.parentNode.removeChild(re0);
						re0=0;
					}

					break;
				case 4:
					var a=this.response.split(":"),b=content.querySelector(".ss :checked").value
					switch(b){
					case "N":qbody=a[0]+"\t"+a[1];NC(a[1]);break;
					default:qbody="";
					}
					break;
				}
			},"/in.ps").send(body);
			return false;
		};
		xu.clk(this,on);
		return self;

		function NC(k){
			xu.get(function(s,e){
				if(e){

				}else{
					var a=JSON.parse(this.response).receiptData;
					if(re0)re0.parentNode.removeChild(re0);
					re0=re({
						SRC:a.image,
						Q:a.question
					});
					content.querySelector("form").appendChild(re0);
				}
			},"https://rcaptcha.nid.naver.com/question?key="+k+"&svc=nid");
		}
	};

	var css;
	m.task=function(fin){
		css=app.css("signin",fin);
	};
	m.unload=function(){
		xu.stylesheet.delete(css);
	};
})