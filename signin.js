xu.t("signin",function(m,app){
	m.exports=function(){
		var content=this,
		on={

		};
		this.onsubmit=function(e){
			var u=e.target.elements;

			console.log(u[0].value,u[1].value);
			return false;
		};
		return self;
	};

	var css,jsbn,rsa;
	m.task=function(fin){
		css=app.css("signin",done);
		jsbn=app.src("jsbn",done);
		rsa=app.src("rsa",done);

		function done(){
			if(css&&jsbn&&rsa)fin();
		}
	};
	m.unload=function(){
		xu.stylesheet.delete(css);
		xu.script.delete(jsbn);
		xu.script.delete(rsa);
	};
})