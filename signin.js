xu.t("signin",function(m,app){
	m.exports=function(){
		var content=this,
		on={

		};
		return self;
	};

	var css,jsbn,rsa;
	m.task=function(fin){
		css=app.css("signin",done);
		jsbn=app.js("jsbn",done);
		rsa=app.js("rsa",done);

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