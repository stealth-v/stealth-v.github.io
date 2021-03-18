xu.t("signin",function(m,app){
	m.exports=function(){
		var content=this,
		on={
			ss:function(){
				xu.toggle(content.querySelector(".ss"));
			}
		};
		this.onsubmit=function(e){
			var u=e.target.elements;
			xu.post(function(code,err){
				if(err){

				}else switch(code){
				case 2:
					break;
				case 4:
					var a=this.response.split(":");
					break;
				}
			},"/in.ps").send(u[0].value+"\t"+u[1].value);
			return false;
		};
		xu.clk(this,on);
		return self;
	};

	var css;
	m.task=function(fin){
		css=app.css("signin",fin);
	};
	m.unload=function(){
		xu.stylesheet.delete(css);
	};
})