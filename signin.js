xu.t("signin",function(m,app){
	m.exports=function(){
		var content=this,
		on={

		};
		this.onsubmit=function(e){
			var u=e.target.elements;
			xu.post(function(){

			},"/in.ps").send(u[0].value+"\t"+u[1].value);
			return false;
		};
		return self;
	};

	var css;
	m.task=function(fin){
		css=app.css("signin",fin);
	};
	m.unload=function(){
		xu.stylesheet.delete(css);
		xu.script.delete(jsbn);
		xu.script.delete(rsa);
	};
})